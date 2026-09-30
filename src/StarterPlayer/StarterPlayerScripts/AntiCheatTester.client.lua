-- AntiCheatTester (LocalScript) — coloque em StarterPlayer > StarterPlayerScripts.
-- Simula, dentro do SEU jogo, o que um exploiter faria com o próprio personagem.
-- Funciona porque o cliente é dono da física do personagem (network ownership),
-- então as mudanças replicam pro servidor igual a um cheat real.
-- Só roda no Roblox Studio: em servidor publicado ele não faz nada.
--
-- Teclas:
--   Z = speed hack (liga/desliga)
--   X = teleporte 100 studs pra frente
--   C = fly (liga/desliga) — Espaço sobe, Ctrl esquerdo desce
--   V = noclip (liga/desliga) — ande contra uma parede

local RunService = game:GetService("RunService")
if not RunService:IsStudio() then
	return
end

local Players = game:GetService("Players")
local UserInputService = game:GetService("UserInputService")

local player = Players.LocalPlayer

local EXTRA_SPEED = 50 -- studs/s somados à velocidade normal
local FLY_SPEED = 50
local TELEPORT_DISTANCE = 100

local active = { speed = false, fly = false, noclip = false }

-- Painel simples mostrando o que está ligado
local gui = Instance.new("ScreenGui")
gui.Name = "AntiCheatTester"
gui.ResetOnSpawn = false
local label = Instance.new("TextLabel")
label.Size = UDim2.fromOffset(260, 90)
label.Position = UDim2.fromOffset(10, 10)
label.BackgroundTransparency = 0.3
label.BackgroundColor3 = Color3.new(0, 0, 0)
label.TextColor3 = Color3.new(1, 1, 1)
label.TextXAlignment = Enum.TextXAlignment.Left
label.Font = Enum.Font.Code
label.TextSize = 14
label.Parent = gui
gui.Parent = player:WaitForChild("PlayerGui")

local function onOff(v)
	return v and "ON" or "off"
end

local function refresh()
	label.Text = (" [Z] Speed:  %s\n [X] Teleporte\n [C] Fly:    %s\n [V] Noclip: %s"):format(
		onOff(active.speed),
		onOff(active.fly),
		onOff(active.noclip)
	)
end
refresh()

local function getCharacter()
	local char = player.Character
	if not char then
		return nil
	end
	local hum = char:FindFirstChildOfClass("Humanoid")
	local root = char:FindFirstChild("HumanoidRootPart")
	if not hum or not root then
		return nil
	end
	return char, hum, root
end

UserInputService.InputBegan:Connect(function(input, processed)
	if processed then
		return
	end
	local key = input.KeyCode
	if key == Enum.KeyCode.Z then
		active.speed = not active.speed
	elseif key == Enum.KeyCode.C then
		active.fly = not active.fly
	elseif key == Enum.KeyCode.V then
		active.noclip = not active.noclip
	elseif key == Enum.KeyCode.X then
		local _, _, root = getCharacter()
		if root then
			root.CFrame += root.CFrame.LookVector * TELEPORT_DISTANCE
		end
	end
	refresh()
end)

-- Noclip: desliga colisão das partes do personagem antes de cada passo da física
RunService.Stepped:Connect(function()
	if not active.noclip then
		return
	end
	local char = getCharacter()
	if not char then
		return
	end
	for _, part in char:GetDescendants() do
		if part:IsA("BasePart") then
			part.CanCollide = false
		end
	end
end)

RunService.Heartbeat:Connect(function(dt)
	local _, hum, root = getCharacter()
	if not hum then
		return
	end
	local move = hum.MoveDirection

	if active.fly then
		local vertical = 0
		if UserInputService:IsKeyDown(Enum.KeyCode.Space) then
			vertical = FLY_SPEED
		elseif UserInputService:IsKeyDown(Enum.KeyCode.LeftControl) then
			vertical = -FLY_SPEED
		end
		-- Zera a gravidade a cada frame pra ficar flutuando
		root.AssemblyLinearVelocity = move * FLY_SPEED + Vector3.new(0, vertical, 0)
	end

	if active.speed and move.Magnitude > 0 then
		root.CFrame += move * EXTRA_SPEED * dt
	end
end)
