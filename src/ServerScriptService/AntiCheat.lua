-- AntiCheat (ModuleScript) — coloque em ServerScriptService.
-- Tudo roda no servidor: o cliente nunca é confiável.
--
-- Detecta: teleporte, speed hack, noclip (atravessar paredes) e fly.
-- Ação: puxa o jogador de volta pra última posição válida ("rubberband"),
-- soma strikes e expulsa ao atingir o limite.

local Players = game:GetService("Players")
local RunService = game:GetService("RunService")

local AntiCheat = {}

AntiCheat.Config = {
	CheckInterval = 0.25, -- segundos entre verificações
	SpeedTolerance = 1.4, -- multiplica o WalkSpeed permitido
	SpeedGrace = 4, -- studs extras tolerados por verificação (lag)
	TeleportDistance = 60, -- studs em uma verificação = teleporte
	MaxAirTime = 3, -- segundos no ar sem cair = fly
	FlyGroundDistance = 12, -- distância até o chão pra considerar "no ar"
	MinFallSpeed = 5, -- studs/s descendo pra considerar queda legítima
	SpawnGrace = 2, -- segundos ignorados após spawn/teleporte do servidor
	MaxStrikes = 5,
	StrikeDecay = 10, -- segundos pra perder 1 strike
	KickOnMaxStrikes = not RunService:IsStudio(), -- no Studio só avisa
	Debug = true,
}

-- Disparado a cada detecção: (player, motivo, strikes)
local flaggedEvent = Instance.new("BindableEvent")
AntiCheat.Flagged = flaggedEvent.Event

local cfg = AntiCheat.Config
local states = {}

local rayParams = RaycastParams.new()
rayParams.FilterType = Enum.RaycastFilterType.Exclude

local function log(player, msg)
	if cfg.Debug then
		warn(("[AntiCheat] %s: %s"):format(player.Name, msg))
	end
end

local function getCharacter(player)
	local char = player.Character
	if not char then
		return nil
	end
	local hum = char:FindFirstChildOfClass("Humanoid")
	local root = char:FindFirstChild("HumanoidRootPart")
	if not hum or not root or hum.Health <= 0 then
		return nil
	end
	return char, hum, root
end

local function grantGrace(player, seconds)
	local st = states[player]
	if st then
		st.graceUntil = os.clock() + seconds
		st.lastPos = nil
		st.airTime = 0
	end
end

local function flag(player, st, root, reason, weight)
	st.strikes += weight
	log(player, ("%s (strikes %.1f/%d)"):format(reason, st.strikes, cfg.MaxStrikes))
	flaggedEvent:Fire(player, reason, st.strikes)

	if st.lastValid then
		root.AssemblyLinearVelocity = Vector3.zero
		root.CFrame = st.lastValid
		st.lastPos = st.lastValid.Position
	else
		st.lastPos = root.Position
	end
	st.airTime = 0

	if st.strikes >= cfg.MaxStrikes then
		st.strikes = 0
		if cfg.KickOnMaxStrikes then
			player:Kick("Comportamento suspeito detectado.")
		else
			log(player, "atingiu o limite de strikes (kick desativado no Studio)")
		end
	end
end

local function check(player, st, dt)
	local char, hum, root = getCharacter(player)
	if not char then
		return
	end

	local pos = root.Position
	if os.clock() < st.graceUntil or not st.lastPos then
		st.lastPos = pos
		st.lastValid = root.CFrame
		st.airTime = 0
		return
	end

	local delta = pos - st.lastPos
	local horizontal = Vector3.new(delta.X, 0, delta.Z).Magnitude

	-- Teleporte
	if delta.Magnitude > cfg.TeleportDistance then
		flag(player, st, root, ("Teleporte (%.0f studs)"):format(delta.Magnitude), 2)
		return
	end

	-- Speed (WalkSpeed é lido do servidor, o cliente não consegue alterar aqui)
	if not hum.SeatPart then
		local maxHorizontal = hum.WalkSpeed * dt * cfg.SpeedTolerance + cfg.SpeedGrace
		if horizontal > maxHorizontal then
			flag(player, st, root, ("Speed (%.1f > %.1f studs)"):format(horizontal, maxHorizontal), 1)
			return
		end
	end

	-- Noclip: o caminho entre a última posição e a atual atravessou algo sólido?
	if delta.Magnitude > 0.5 and not hum.SeatPart then
		local hit = workspace:Raycast(st.lastPos, delta, rayParams)
		if hit and hit.Instance.CanCollide then
			flag(player, st, root, ("Noclip (atravessou %s)"):format(hit.Instance:GetFullName()), 1)
			return
		end
	end

	-- Fly: muito tempo no ar, longe do chão, sem estar caindo
	local state = hum:GetState()
	local grounded = hum.FloorMaterial ~= Enum.Material.Air
		or hum.SeatPart ~= nil
		or state == Enum.HumanoidStateType.Climbing
		or state == Enum.HumanoidStateType.Swimming

	if grounded then
		st.airTime = 0
	else
		local nearGround = workspace:Raycast(pos, Vector3.new(0, -cfg.FlyGroundDistance, 0), rayParams)
		local verticalSpeed = delta.Y / dt
		if not nearGround and verticalSpeed > -cfg.MinFallSpeed then
			st.airTime += dt
		else
			st.airTime = 0
		end
		if st.airTime > cfg.MaxAirTime then
			flag(player, st, root, ("Fly (%.1fs no ar)"):format(st.airTime), 2)
			return
		end
	end

	st.lastPos = pos
	if grounded then
		st.lastValid = root.CFrame
	end
end

-- Use isso pra teleportar jogadores pelo servidor sem gerar falso positivo.
function AntiCheat.TeleportPlayer(player, cframe)
	local char = player.Character
	if char then
		grantGrace(player, cfg.SpawnGrace)
		char:PivotTo(cframe)
	end
end

local function onPlayerAdded(player)
	states[player] = {
		lastPos = nil,
		lastValid = nil,
		airTime = 0,
		strikes = 0,
		graceUntil = 0,
	}
	player.CharacterAdded:Connect(function()
		grantGrace(player, cfg.SpawnGrace)
	end)
end

function AntiCheat.Start()
	Players.PlayerAdded:Connect(onPlayerAdded)
	for _, player in Players:GetPlayers() do
		onPlayerAdded(player)
	end
	Players.PlayerRemoving:Connect(function(player)
		states[player] = nil
	end)

	task.spawn(function()
		while true do
			local dt = task.wait(cfg.CheckInterval)

			-- Ignora todos os personagens nos raycasts (inclusive o próprio)
			local filter = {}
			for _, player in Players:GetPlayers() do
				if player.Character then
					table.insert(filter, player.Character)
				end
			end
			rayParams.FilterDescendantsInstances = filter

			for player, st in states do
				st.strikes = math.max(0, st.strikes - dt / cfg.StrikeDecay)
				local ok, err = pcall(check, player, st, dt)
				if not ok then
					warn("[AntiCheat] erro:", err)
				end
			end
		end
	end)
end

return AntiCheat
