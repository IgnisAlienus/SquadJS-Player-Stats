# In Game and Daily in Discord Squad Stats

## What it do?
- Posts a Daily Stats Embed to your Discord at your Configured Time.
- Allow Players to check in game Stats with a configurable Cooldown.

## Requirements
- DBLog Plugin needs to be ENABLED
- You need to have your Reserve List Configured in `adminLists` if you wish to require in game players to be a Reserve to use the in game Command.

## Installation & Configuration
- Add the bits to your SquadJS
- `daysBackToQuery` sets how many days back the in game and in Discord queries check back for stats. Recommended Max is 30 Days
- `enableInGameStatsCommand` enables or disables the in game stats command.
- `inGameStatsCommand` sets the in game stats command. Must have a leading `!` when used by the player in game. DO NOT Configure `config.json` with a leading `!`.
- `enableInDiscordStatsCommand` enables or disables the in Discord stats command.
- `inDiscordStatsCommand` sets the in Discord stats command. Must have a leading `!` when used by the player in Discord. DO NOT Configure `config.json` with a leading `!`.
- `statCooldown` sets the in game & in Discord stats command cooldown in minutes. This prevents abuse of the command to confirm kills.
- `ingameRequireReserve` sets whether the in game command requires the user to have a `Reserve` slot.
- `channelID` sets the channel that the daily stats embed will be sent to.
- `dailyStatsTime` sets the time of day that the daily stats will be sent. Use 24 Hour time.
- `dailyStatsManualPostCmd` sets the manual command to force the daily stats embed. Must have a leading `!` when used by someone with the `dailymanualCmdRole` in Discord. DO NOT Configure `config.json` with a leading `!`.
- `dailymanualCmdRole` sets the role required to force the daily stats embed.