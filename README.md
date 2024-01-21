# In Game and Daily in Discord Squad Stats

## What it do?
- Posts a Daily Top Player and Server Totals Stats Embed to your Discord at your Configured Time.
- Allow Players to check Stats while in-game with a configurable Cooldown.
- Allow Player to link their in-game and Discord Accounts so that they can:
    - Check Stats in Discord with a configuralbe Cooldown.

## How do the Players use this?
- In-game, players use `!mystats` to view Stats in Game. (or your configured command - don't put an `!` in the config.json)
- In Discord, players use `!link` to get a linking code that is used in game. (or your configured command - don't put an `!` in the config.json).
    - In-game, players use `!link [code]` to link thier in-game to their Discord. (or your configured command - don't put an `!` in the config.json).
- In Discord, once linked, players can use `!mystats` to view thier stats in Discord. (or your configured command - don't put an `!` in the config.json).

## Requirements
- DBLog Plugin needs to be ENABLED
- You need to have your Reserve List Configured in `adminLists` if you wish to require in game players to be a Reserve to use the in game Command.

## Installation & Configuration
- Add the bits to your SquadJS - See below for more instructions.
- `channelID` sets the channel that the daily stats embed will be sent to.
- `daysBackToQuery` sets how many days back the in game and in Discord queries check back for stats. Recommended Max is 30 Days
- `enableInGameStatsCommand` enables or disables the in game stats command.
- `inGameStatsCommand` sets the in game stats command. Must have a leading `!` when used by the player in game. DO NOT Configure `config.json` with a leading `!`.
- `enableInDiscordStatsCommand` enables or disables the in Discord stats command.
- `linkDiscordAccountCommand` is the command to use in Discord to link to a Player Account. Must have a leading `!` when used by the player in game. DO NOT Configure `config.json` with a leading `!`.
- `linkDiscordEmbedColor` sets the linking Embed Color.
- `linkInGameAccountCommand` set the in-game linking command. Must have a leading `!` when used by the player in game. DO NOT Configure `config.json` with a leading `!`.
- `inDiscordStatsCommand` sets the in Discord stats command. Must have a leading `!` when used by the player in Discord. DO NOT Configure `config.json` with a leading `!`.
- `inDiscordStatsEmbedColor` set the stats Embed Color.
- `statCooldown` sets the in game & in Discord stats command cooldown in minutes. This prevents abuse of the command to confirm kills.
- `ingameRequireReserve` sets whether the in game command requires the user to have a `Reserve` slot.
- `enableDailyStats` turn on or off the daily top player post.
- `dailyStatsTime` sets the time of day that the daily stats will be sent. Use 24 Hour time.
- `dailyStatsManualPostCmd` sets the manual command to force the daily stats embed. Must have a leading `!` when used by someone with the `dailymanualCmdRole` in Discord. DO NOT Configure `config.json` with a leading `!`.
- `dailymanualCmdRole` sets the role required to force the daily stats embed.

## Further Instructions/Notes for Installing
- You are welcome to use the provided `a-complete-db-log.js` file contents for your `db-log.js` plugin. Just note, that I may not have this file updated as fast if the Main SquadJS updates their version of `db-log.js`.
- Therefore, I have provided the individual bits you need to paste in the `add-to-db-log.js` file.
- Please contact me if there is any confusion.

## Example Player Discord Posting
![Example](https://raw.githubusercontent.com/IgnisAlienus/SquadJS-Player-Stats/master/example-player-discord.png)

## Example Daily Discord Posting
![Example](https://raw.githubusercontent.com/IgnisAlienus/SquadJS-Player-Stats/master/example-daily-discord.png)

## Example In Game Stats
![Example](https://raw.githubusercontent.com/IgnisAlienus/SquadJS-Player-Stats/master/example-ingame.png)