-- Script (servidor) — coloque em ServerScriptService junto com o ModuleScript "AntiCheat".

local AntiCheat = require(script.Parent.AntiCheat)

AntiCheat.Start()

AntiCheat.Flagged:Connect(function(player, reason, strikes)
	-- Aqui você pode salvar logs, mandar pra um webhook, etc.
	print(("[AntiCheat] %s detectado: %s (strikes %.1f)"):format(player.Name, reason, strikes))
end)
