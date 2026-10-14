# Anti-cheat + testador (Roblox Studio)

## Arquivos

| Arquivo | Tipo | Onde colocar no Studio |
|---|---|---|
| `src/ServerScriptService/AntiCheat.lua` | ModuleScript (nome: `AntiCheat`) | ServerScriptService |
| `src/ServerScriptService/AntiCheatBootstrap.server.lua` | Script | ServerScriptService |
| `src/StarterPlayer/StarterPlayerScripts/AntiCheatTester.client.lua` | LocalScript | StarterPlayer > StarterPlayerScripts |

(Se usar Rojo, a estrutura de pastas já está no formato certo.)

## Como testar

1. Coloque os três scripts no seu jogo e aperte **Play** no Studio.
2. Use as teclas do testador (aparece um painel no canto da tela):
   - **Z**: speed hack
   - **X**: teleporte de 100 studs
   - **C**: fly (Espaço sobe, Ctrl desce)
   - **V**: noclip (ande contra uma parede)
3. Veja o **Output**: cada detecção aparece como `[AntiCheat] ...` e o personagem é puxado de volta.
   No Studio o kick fica desligado; em servidor publicado, 5 strikes = kick.

O testador só funciona no Studio (`RunService:IsStudio()`), então não tem risco de ele ir para o jogo publicado.

## Ajustes

Tudo fica em `AntiCheat.Config`. Se aparecer falso positivo (lag, esteiras, pulos altos etc.), aumente
`SpeedTolerance`, `SpeedGrace` ou `MaxAirTime`.

Quando o **servidor** teleportar um jogador, use a função do módulo para não gerar falso positivo:

```lua
local AntiCheat = require(game.ServerScriptService.AntiCheat)
AntiCheat.TeleportPlayer(player, CFrame.new(0, 10, 0))
```

Se o seu jogo muda o `WalkSpeed` (corrida, poções...), faça isso **no servidor**: o anti-cheat lê o valor do servidor.
