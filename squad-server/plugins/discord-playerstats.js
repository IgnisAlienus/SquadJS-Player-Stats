//Plugin by PSG - Ignis
import DiscordBasePlugin from './discord-base-plugin.js';
import Sequelize from 'sequelize';
import { Op } from 'sequelize';
import moment from 'moment';

const { DataTypes } = Sequelize;

// Function written by Nath
// Function removes BM_ from string content as well as replaces all "_" with " "
function modifyString(string) {
    if (string.startsWith("BP_")) {
        string = string.slice(3);
    }
    string = string.replace(/_/g, " ");

    return string;
}

export default class DiscordPlayerStats extends DiscordBasePlugin {
    static get description() {
        return (
            'The <code>DiscordPlayerStats</code> plugin allows players to view their Stats ingame.' +
            'This requires DBLog to be turned on!'
        );
    }

    static get defaultEnabled() {
        return false;
    }

    static get optionsSpecification() {
        return {
            ...DiscordBasePlugin.optionsSpecification,
            channelID: {
                required: false,
                description: 'ChannelID where Daily Stats are posted.',
                default: '112233445566778899'
            },
            database: {
                required: true,
                connector: 'sequelize',
                description: 'The Sequelize connector to log server information to.',
                default: 'mysql'
            },
            daysBackToQuery: {
                required: false,
                description: 'Days Back to Query for Stats',
                default: 30
            },
            enableInGameStatsCommand: {
                required: false,
                description: 'Enable In Game Stats Command',
                default: true
            },
            inGameStatsCommand: {
                required: false,
                description: 'Command Players use in-game Chat to see their stats.',
                default: "mystats"
            },
            enableInDiscordStatsCommand: {
                required: false,
                description: 'Enable In Discord Stats Command',
                default: true
            },
            linkDiscordAccountCommand: {
                required: false,
                description: 'Command Players use in Discord to link their Discord Account.',
                default: "link"
            },
            linkDiscordEmbedColor: {
                required: false,
                description: 'Color of the Embed when linking Discord Account.',
                default: 16759808
            },
            linkInGameAccountCommand: {
                required: false,
                description: 'Command Players use in-game Chat to link their In Game Account.',
                default: "link"
            },
            inDiscordStatsCommand: {
                required: false,
                description: 'Command Players use in Discord to see their stats.',
                default: "mystats"
            },
            inDiscordStatsEmbedColor: {
                required: false,
                description: 'Color of the Embed when viewing Stats in Discord.',
                default: 16759808
            },
            statCooldown: {
                required: false,
                description: 'Command Cooldown time in minutes. Prevents Users from Spamming the command.',
                default: 15
            },
            ingameRequireReserve: {
                required: false,
                description: 'Require Reserve to Use in Game command',
                default: true
            },
            enableDailyStats: {
                required: false,
                description: 'Enable Daily Stats',
                default: true
            },
            dailyStatsTime: {
                required: false,
                description: 'Time of day to manually send Daily Stats in UTC Time.',
                default: "10:00"
            },
            dailyStatsManualPostCmd: {
                required: false,
                description: 'Command to manually send the Daily Stats in Discord.',
                default: "stats"
            },
            dailyStatsEmbedColor: {
                required: false,
                description: 'Color of the Embed when posting Daily Stats.',
                default: 16759808
            },
            dailymanualCmdRole: {
                required: false,
                description: 'Role allowed to trigger manual posting of Daily Stats.',
                default: '667741905228136459'
            }
        };
    }

    constructor(server, options, connectors) {
        super(server, options, connectors);

        this.models = {};

        this.createModel(
            'Player',
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                eosID: {
                    type: DataTypes.STRING,
                    unique: true
                },
                steamID: {
                    type: DataTypes.STRING,
                    notNull: true,
                    unique: true
                },
                lastName: {
                    type: DataTypes.STRING
                },
                lastIP: {
                    type: DataTypes.STRING
                }
            },
            {
                charset: 'utf8mb4',
                collate: 'utf8mb4_unicode_ci',
                indexes: [
                    {
                        fields: ['eosID']
                    },
                    {
                        fields: ['steamID']
                    }
                ]
            }
        );

        this.createModel(
            'LinkCode',
            {
              id: {
                type: DataTypes.STRING,
                primaryKey: true,
                autoIncrement: true
              },
              linkCode: {
                type: DataTypes.STRING,
                allowNull: false
              },
              discordID: {
                type: DataTypes.STRING,
                allowNull: false
              }
            },
            {
              charset: 'utf8mb4',
              collate: 'utf8mb4_unicode_ci'
            }
          );

        this.createModel(
            'Wound',
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                time: {
                    type: DataTypes.DATE,
                    notNull: true
                },
                victimName: {
                    type: DataTypes.STRING
                },
                victimTeamID: {
                    type: DataTypes.INTEGER
                },
                victimSquadID: {
                    type: DataTypes.INTEGER
                },
                attacker: {
                    type: DataTypes.STRING
                },
                attackerName: {
                    type: DataTypes.STRING
                },
                attackerTeamID: {
                    type: DataTypes.INTEGER
                },
                attackerSquadID: {
                    type: DataTypes.INTEGER
                },
                damage: {
                    type: DataTypes.FLOAT
                },
                weapon: {
                    type: DataTypes.STRING
                },
                teamkill: {
                    type: DataTypes.BOOLEAN
                }
            },
            {
                charset: 'utf8mb4',
                collate: 'utf8mb4_unicode_ci'
            }
        );

        this.createModel(
            'Death',
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                time: {
                    type: DataTypes.DATE,
                    notNull: true
                },
                woundTime: {
                    type: DataTypes.DATE
                },
                attacker: {
                    type: DataTypes.STRING
                },
                victim: {
                    type: DataTypes.STRING
                },
                victimName: {
                    type: DataTypes.STRING
                },
                victimTeamID: {
                    type: DataTypes.INTEGER
                },
                victimSquadID: {
                    type: DataTypes.INTEGER
                },
                attackerName: {
                    type: DataTypes.STRING
                },
                attackerTeamID: {
                    type: DataTypes.INTEGER
                },
                attackerSquadID: {
                    type: DataTypes.INTEGER
                },
                damage: {
                    type: DataTypes.FLOAT
                },
                weapon: {
                    type: DataTypes.STRING
                },
                teamkill: {
                    type: DataTypes.BOOLEAN
                }
            },
            {
                charset: 'utf8mb4',
                collate: 'utf8mb4_unicode_ci'
            }
        );

        this.createModel(
            'Revive',
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                time: {
                    type: DataTypes.DATE,
                    notNull: true
                },
                woundTime: {
                    type: DataTypes.DATE
                },
                victimName: {
                    type: DataTypes.STRING
                },
                victimTeamID: {
                    type: DataTypes.INTEGER
                },
                victimSquadID: {
                    type: DataTypes.INTEGER
                },
                attackerName: {
                    type: DataTypes.STRING
                },
                attackerTeamID: {
                    type: DataTypes.INTEGER
                },
                attackerSquadID: {
                    type: DataTypes.INTEGER
                },
                damage: {
                    type: DataTypes.FLOAT
                },
                weapon: {
                    type: DataTypes.STRING
                },
                teamkill: {
                    type: DataTypes.BOOLEAN
                },
                reviver: {
                    type: DataTypes.STRING
                },
                reviverName: {
                    type: DataTypes.STRING
                },
                reviverTeamID: {
                    type: DataTypes.INTEGER
                },
                reviverSquadID: {
                    type: DataTypes.INTEGER
                }
            },
            {
                charset: 'utf8mb4',
                collate: 'utf8mb4_unicode_ci'
            }
        );

        this.onStatCommand = this.onStatCommand.bind(this)
        this.onLinkCommand = this.onLinkCommand.bind(this);
        this.onMessage = this.onMessage.bind(this);
    }

    createModel(name, schema) {
        this.models[name] = this.options.database.define(`DBLog_${name}`, schema, {
            timestamps: false
        });
    }

    async mount() {
        this.checkVersion();
        this.models.Player.sync();
        this.models.LinkCode.sync();
        this.models.Wound.sync();
        this.models.Death.sync();
        this.models.Revive.sync();
        if (this.options.enableDailyStats === true) {
            this.scheduleDailyStats();
        }
        if (this.options.enableDailyStats === true || this.options.enableInDiscordStatsCommand === true) {
            this.options.discordClient.on('message', this.onMessage);
        }
        if (this.options.enableInGameStatsCommand === true) {
            this.server.on(`CHAT_COMMAND:${this.options.inGameStatsCommand}`, this.onStatCommand);
        }
        if (this.options.enableInDiscordStatsCommand === true) {
            this.server.on(`CHAT_COMMAND:${this.options.linkInGameAccountCommand}`, this.onLinkCommand);
        }
        this.verbose(1, 'PlayerStats Plugin was Mounted.');
        // Verify that the database connection was successful
        try {
            await this.options.database.authenticate();
            this.verbose(1, 'Database connection successful.');
        } catch (error) {
            this.verbose(1, `Database connection failed: ${error}`);
        }
    }

    async unmount() {
        this.options.discordClient.removeEventListener('message', this.onMessage);
        this.server.removeEventListener(`CHAT_COMMAND:${this.options.statsCommand}`, this.onStatCommand);
        this.server.removeEventListener(`CHAT_COMMAND:${this.options.linkInGameAccountCommand}`, this.onLinkCommand);
        this.verbose(1, 'PlayerStats Plugin was Unmounted.');
    }

    // Check if current version is the latest version
    async checkVersion() {
        const owner = 'IgnisAlienus';
        const repo = 'SquadJS-Player-Stats';
        const currentVersion = 'v3.0.0';

        try {
            const latestVersion = await getLatestVersion(owner, repo);

            if (currentVersion < latestVersion) {
                this.verbose(1, 'A new version is available. Please update your plugin.');
                this.sendDiscordMessage({
                    content: `A new version of \`${repo}\` is available. Please update your plugin.\nCurrent version: \`${currentVersion}\` [Latest version](https://github.com/${owner}/${repo}/releases): \`${latestVersion}\``
                });
            } else if (currentVersion > latestVersion) {
                this.verbose(1, 'You are running a newer version than the latest version.');
                this.sendDiscordMessage({
                    content: `You are running a newer version of \`${repo}\` than the latest version.\nThis likely means you are running a pre-release version.\nCurrent version: \`${currentVersion}\` [Latest version](https://github.com/${owner}/${repo}/releases): \`${latestVersion}\``
                });
            } else if (currentVersion === latestVersion) {
                this.verbose(1, 'You are running the latest version.');
            } else {
                this.verbose(1, 'Unable to check for updates.');
            }
        } catch (error) {
            this.verbose(1, 'Error retrieving the latest version:', error);
        }
    }

    async onStatCommand(info) {
        const steamID = info.player.steamID;

        if (this.options.ingameRequireReserve === true) {
            // Check for Whitelist
            const reserves = await this.server.getAdminsWithPermission('reserve');
            if (!reserves.includes(steamID)) {
                await this.server.rcon.warn(
                    steamID,
                    `You must be Whitelisted to use this Command.\nYou can use this Command in our Discord.\nUse !whitelist for more info.`
                );
                return;
            }
        }

        const daysAgo = moment().subtract(this.options.daysBackToQuery, 'days').toDate();
        const currentTime = Date.now();
        const lastExecutedTimes = this.lastStatCommandExecutionTimes || {}; // use an object to store last execution times for each steamID
        const cooldownTime = this.options.statCooldown;
        const lastExecutedTime = lastExecutedTimes[steamID] || 0; // get the last execution time for the steamID, default to 0 if not set
        const timeSinceLastExecution = (currentTime - lastExecutedTime) / 1000 / 60; // convert milliseconds to minutes

        if (timeSinceLastExecution < cooldownTime) {
            await this.server.rcon.warn(
                steamID,
                `Please wait ${Math.ceil(cooldownTime - timeSinceLastExecution)} minute(s) before using this command again.`
            );
            return;
        }

        // SQL queries
        // Wounds - add wounds.count to warn when turned back on
        const Wounds = await this.models.Wound.findAndCountAll({
            where: {
                attacker: steamID,
                time: {
                    [Op.and]: [
                        { [Op.gte]: daysAgo },
                        { [Op.ne]: null }
                    ]
                },
                teamkill: false
            }
        });

        // Kills
        const Kills = await this.models.Death.findAndCountAll({
            where: {
                attacker: steamID,
                time: {
                    [Op.and]: [
                        { [Op.gte]: daysAgo },
                        { [Op.ne]: null }
                    ]
                },
                teamkill: false
            }
        });

        // Deaths
        const Deaths = await this.models.Death.findAndCountAll({
            where: {
                victim: steamID,
                time: {
                    [Op.and]: [
                        { [Op.gte]: daysAgo },
                        { [Op.ne]: null }
                    ]
                },
                teamkill: { [Op.ne]: null }
            }
        });

        // Revives
        const Revives = await this.models.Revive.findAndCountAll({
            where: {
                reviver: steamID,
                time: {
                    [Op.and]: [
                        { [Op.gte]: daysAgo },
                        { [Op.ne]: null }
                    ]
                }
            }
        });

        // Calculate K/D
        const kdRatio = Deaths.count !== 0 ? (Kills.count / Deaths.count).toFixed(2) : 0;

        // Send the stats to the player
        await this.server.rcon.warn(
            steamID,
            `Your Stats\nWounds: ${Wounds.count}\nKills: ${Kills.count}\nDeaths: ${Deaths.count}\nK/D: ${kdRatio}\nRevives: ${Revives.count}`
        );

        // Update last execution time
        lastExecutedTimes[steamID] = currentTime; // set the last execution time for the steamID
        this.lastStatCommandExecutionTimes = lastExecutedTimes; // store the last execution times object
    }

    async onLinkCommand(info) {
        const steamID = info.player.steamID;

        // Check if message is empty
        if (info.message.length === 0) {
            await this.server.rcon.warn(
                steamID,
                `Please input your linking code given in our Discord using !${this.options.linkInGameAccountCommand}.`
            );
            return;
        }

        // Check if message is not the right length
        if (info.message.length !== 6) {
            await this.server.rcon.warn(
                steamID,
                `Please input a valid 6-digit linking code.\nUse !${this.options.linkDiscordAccountCommand} in Discord to get your linking code.`
            );
            return;
        }

        // Find Matching Link Code in DB
        const linkCode = await this.models.LinkCode.findOne({
            where: {
                linkCode: info.message
            }
        });

        // Add Discord ID to Player Table
        if (linkCode) {
            await this.models.Player.update(
                {
                    discordID: linkCode.discordID
                },
                {
                    where: {
                        steamID: steamID
                    }
                }
            );
            await this.server.rcon.warn(
                steamID,
                `Your Discord Account has been linked to your In Game Account.\nYou can now use !mystats in-game to view your stats.`
            );
            // Delete Link Code from DB
            await this.models.LinkCode.destroy({
                where: {
                    linkCode: info.message
                }
            });
        } else {
            await this.server.rcon.warn(
                steamID,
                `Please input a valid 6-digit linking code.\nUse !${this.options.linkDiscordAccountCommand} in Discord to get your linking code.`
            );
            return;
        }
    }

    async onMessage(message) {
        if (message.author.bot) return;
        const manualCmdRegex = new RegExp("^!" + this.options.dailyStatsManualPostCmd + "$");

        // Format is !this.options.inDiscordStatsCommand <steamID>
        const mystatsCmdRegex = new RegExp("^!" + this.options.inDiscordStatsCommand);

        const linkCmdRegex = new RegExp("^!" + this.options.linkDiscordAccountCommand);

        if (message.content.match(manualCmdRegex) && this.options.enableDailyStats === true) {
            if (message.member._roles.includes(this.options.dailymanualCmdRole)) {
                return message.reply('You do not have permission to use this command.');
            }
            await this.postDailyStats();
            return;
        } else if (message.content.match(manualCmdRegex) && this.options.enableDailyStats === false) {
            return message.reply('Daily Stats are not enabled.');
        }

        if (message.content.match(mystatsCmdRegex) && this.options.enableInDiscordStatsCommand === true) {
            // Find Player in DB
            const playerResult = await this.models.Player.findOne({
                where: {
                    discordID: message.author.id
                },
                attributes: ['steamID']
            });
            const steamID = playerResult ? playerResult.steamID : null;
            if (!steamID) {
                return message.reply(`Your Discord Account is not linked to an In Game Account.\nUse !${this.options.linkDiscordAccountCommand} in Discord begin linking your account.`);
            }
            await this.postUserStats(steamID);
            return;
        } else if (message.content.match(mystatsCmdRegex) && this.options.enableInDiscordStatsCommand === false) {
            return message.reply('In Discord Stats are not enabled.');
        }

        if (message.content.match(linkCmdRegex) && this.options.enableInDiscordStatsCommand === true) {
            // Generate a random 6-digit code
            const linkCode = Math.floor(100000 + Math.random() * 900000);
            // Add Link Code to Database
            await this.models.LinkCode.create({
                linkCode: linkCode,
                discordID: message.author.id
            });  
            // Send Message to Discord User's DM
             await message.author.send({
                 embed: {
                     title: `Your linking code is: \`${linkCode}\``,
                     description: `Please use \`!${this.options.linkInGameAccountCommand} ${linkCode}\` in-game to link your account.`,
                     color: this.options.linkDiscordEmbedColor,
                     timestamp: new Date().toISOString()
                 }
            });
        }
        return;
    }

    async scheduleDailyStats() {
        const now = moment.utc();
        const statsTime = moment.utc(this.options.dailyStatsTime, 'HH:mm');
        let delay = statsTime.diff(now);
        if (delay < 0) {
            delay += 24 * 60 * 60 * 1000; // Add 24 hours to the delay if the scheduled time has already passed
        }

        const nextScheduledTime = moment.utc().add(delay, 'milliseconds').format('YYYY-MM-DD HH:mm:ss');
        this.verbose(1, `Next scheduled time for daily stats: ${nextScheduledTime}`);

        setTimeout(() => {
            this.postDailyStats();
            setInterval(this.postDailyStats.bind(this), 24 * 60 * 60 * 1000); // Post daily stats every 24 hours
        }, delay);
    }

    async postDailyStats() {
        const daysAgo = moment().subtract(this.options.daysBackToQuery, 'days').toDate();
        // Find player with the highest number of kills in the past 30 days
        const result = await this.models.Death.findOne({
            where: {
                time: { [Op.gte]: daysAgo },
                attacker: { [Op.not]: null },
                teamkill: false
            },
            attributes: ['attacker', 'attackerName'],
            group: ['attacker', 'attackerName'],
            order: [[Sequelize.literal('COUNT(attacker)'), 'DESC']],
            limit: 1
        });

        const { attacker, attackerName } = result.dataValues;

        // Calculate total kills for the top player
        const killsCount = await this.models.Death.count({
            where: {
                attacker,
                time: { [Op.gte]: daysAgo },
                teamkill: false
            }
        });
        // Calculate Favorite Weapon
        const { weapon } = await this.models.Wound.findOne({
            where: {
                attacker,
                time: { [Op.gte]: daysAgo },
                teamkill: false
            },
            attributes: ['weapon'],
            group: ['weapon'],
            order: [[Sequelize.literal('COUNT(weapon)'), 'DESC']],
            limit: 1
        });
        // Wounds
        const woundsCount = await this.models.Wound.count({
            where: {
                attacker,
                time: { [Op.gte]: daysAgo },
                teamkill: false
            }
        });
        // Deaths
        const deathsCount = await this.models.Death.count({
            where: {
                victim: attacker,
                time: { [Op.gte]: daysAgo },
                teamkill: { [Op.ne]: null }
            }
        });
        // Times Teamkilled
        const teamkilledCount = await this.models.Death.count({
            where: {
                victim: attacker,
                time: { [Op.gte]: daysAgo },
                teamkill: true
            }
        });
        // Revives
        const revivesCount = await this.models.Revive.count({
            where: {
                reviver: attacker,
                time: { [Op.gte]: daysAgo }
            }
        });

        // Calculate K/D
        const kdRatio = deathsCount !== 0 ? (killsCount / deathsCount).toFixed(2) : 0;

        // Calculate Server Total Kills
        const serverKillsCount = await this.models.Death.count({
            where: {
                time: { [Op.gte]: daysAgo },
                teamkill: false
            }
        });
        // Calculate Server Favorite Weapon
        const serverWeaponResult = await this.models.Wound.findOne({
            where: {
                time: { [Op.gte]: daysAgo },
                teamkill: false
            },
            attributes: ['weapon'],
            group: ['weapon'],
            order: [[Sequelize.literal('COUNT(weapon)'), 'DESC']],
            limit: 1
        });
        const serverWeapon = serverWeaponResult ? serverWeaponResult.weapon : 'N/A';
        // Server Wounds
        const serverWoundsCount = await this.models.Wound.count({
            where: {
                time: { [Op.gte]: daysAgo },
                teamkill: false
            }
        });
        // Server Deaths
        const serverDeathsCount = await this.models.Death.count({
            where: {
                time: { [Op.gte]: daysAgo },
                teamkill: { [Op.ne]: null }
            }
        });
        // Server Revives
        const serverRevivesCount = await this.models.Revive.count({
            where: {
                time: { [Op.gte]: daysAgo }
            }
        });

        await this.sendDiscordMessage({
            embed: {
                title: `Squad Server Stats for the Last ${this.options.daysBackToQuery.toString()} Days`,
                color: this.options.dailyStatsEmbedColor,
                fields: [
                    {
                        name: 'Top Player',
                        value: attackerName,
                        inline: false
                    },
                    {
                        name: 'SteamID',
                        value: attacker,
                        inline: true
                    },
                    {
                        name: 'Total Kills',
                        value: killsCount.toString(),
                        inline: true
                    },
                    {
                        name: 'Total Wounds',
                        value: woundsCount.toString(),
                        inline: true
                    },
                    {
                        name: 'Total Deaths',
                        value: deathsCount.toString(),
                        inline: true
                    },
                    {
                        name: 'K/D Ratio',
                        value: kdRatio,
                        inline: true
                    },
                    {
                        name: 'Times Teamkilled',
                        value: teamkilledCount.toString(),
                        inline: true
                    },
                    {
                        name: 'Total Revives',
                        value: revivesCount.toString(),
                        inline: true
                    },
                    {
                        name: 'Favorite Weapon',
                        value: modifyString(weapon),
                        inline: true
                    },
                    {
                        name: 'Server Total Kills',
                        value: serverKillsCount,
                        inline: false
                    },
                    {
                        name: 'Server Total Wounds',
                        value: serverWoundsCount,
                        inline: true
                    },
                    {
                        name: 'Server Total Deaths',
                        value: serverDeathsCount,
                        inline: true
                    },
                    {
                        name: 'Server Total Revives',
                        value: serverRevivesCount,
                        inline: true
                    },
                    {
                        name: 'Server Favorite Weapon',
                        value: modifyString(serverWeapon),
                        inline: true
                    }
                ],
                timestamp: new Date().toISOString()
            }
        });
    }

    async postUserStats(steamID) {
        const daysAgo = moment().subtract(this.options.daysBackToQuery, 'days').toDate();

        // Get Player
        const playerResult = await this.models.Player.findOne({
            where: {
                steamID: steamID
            },
            attributes: ['lastName']
        });
        const lastName = playerResult ? playerResult.lastName : null;

        // Calculate total kills for the player
        const killsCount = await this.models.Death.count({
            where: {
                attacker: steamID,
                time: { [Op.gte]: daysAgo },
                teamkill: false
            }
        });
        // Calculate Favorite Weapon
        const { weapon } = await this.models.Wound.findOne({
            where: {
                attacker: steamID,
                time: { [Op.gte]: daysAgo },
                teamkill: false
            },
            attributes: ['weapon'],
            group: ['weapon'],
            order: [[Sequelize.literal('COUNT(weapon)'), 'DESC']],
            limit: 1
        });
        // Wounds
        const woundsCount = await this.models.Wound.count({
            where: {
                attacker: steamID,
                time: { [Op.gte]: daysAgo },
                teamkill: false
            }
        });
        // Deaths
        const deathsCount = await this.models.Death.count({
            where: {
                victim: steamID,
                time: { [Op.gte]: daysAgo },
                teamkill: { [Op.ne]: null }
            }
        });
        // Times Teamkilled
        const teamkilledCount = await this.models.Death.count({
            where: {
                victim: steamID,
                time: { [Op.gte]: daysAgo },
                teamkill: true
            }
        });
        // Revives
        const revivesCount = await this.models.Revive.count({
            where: {
                reviver: steamID,
                time: { [Op.gte]: daysAgo }
            }
        });

        // Calculate K/D
        const kdRatio = deathsCount !== 0 ? (killsCount / deathsCount).toFixed(2) : 0;

        // Top Victim
        const topVictimResult = await this.models.Death.findOne({
            where: {
                attacker: steamID,
                time: { [Op.gte]: daysAgo },
                teamkill: false,
                victim: { [Op.not]: steamID }
            },
            attributes: ['victimName', [Sequelize.fn('COUNT', Sequelize.literal('victim')), 'Count']],
            group: ['victimName'],
            order: [[Sequelize.literal('Count'), 'DESC']],
            limit: 1
        });
        const topVictim = topVictimResult ? topVictimResult.victimName : null;
        const topVictimCount = topVictimResult ? topVictimResult.get('Count') : null;

        // Top Nemesis
        const topNemesisResult = await this.models.Death.findOne({
            where: {
                victim: steamID,
                time: { [Op.gte]: daysAgo },
                teamkill: false,
                attacker: { [Op.not]: steamID }
            },
            attributes: ['attackerName', [Sequelize.fn('COUNT', Sequelize.literal('attacker')), 'Count']],
            group: ['attackerName'],
            order: [[Sequelize.literal('Count'), 'DESC']],
            limit: 1
        });
        const topNemesis = topNemesisResult ? topNemesisResult.attackerName : null;
        const topNemesisCount = topNemesisResult ? topNemesisResult.get('Count') : null;

        await this.sendDiscordMessage({
            embed: {
                title: `Squad Server Stats for the Last ${this.options.daysBackToQuery.toString()} Days`,
                color: this.options.inDiscordStatsEmbedColor,
                fields: [
                    {
                        name: 'Found in Game Name',
                        value: lastName,
                        inline: false
                    },
                    {
                        name: 'SteamID',
                        value: steamID,
                        inline: true
                    },
                    {
                        name: 'Total Kills',
                        value: killsCount.toString(),
                        inline: true
                    },
                    {
                        name: 'Total Wounds',
                        value: woundsCount.toString(),
                        inline: true
                    },
                    {
                        name: 'Total Deaths',
                        value: deathsCount.toString(),
                        inline: true
                    },
                    {
                        name: 'K/D Ratio',
                        value: kdRatio,
                        inline: true
                    },
                    {
                        name: 'Times Teamkilled',
                        value: teamkilledCount.toString(),
                        inline: true
                    },
                    {
                        name: 'Total Revives',
                        value: revivesCount.toString(),
                        inline: true
                    },
                    {
                        name: 'Favorite Weapon',
                        value: modifyString(weapon),
                        inline: true
                    },
                    {
                        name: 'Top Victim',
                        value: `\`${lastName}\` has Killed \`${topVictim}\` \`${topVictimCount}\` Times!`,
                        inline: true
                    },
                    {
                        name: 'Top Nemesis',
                        value: `\`${topNemesis}\` has Killed \`${lastName}\` \`${topNemesisCount}\` Times!`,
                        inline: true
                    },
                ],
                timestamp: new Date().toISOString()
            }
        });
    }
}

// Retrieve the latest version from GitHub
async function getLatestVersion(owner, repo) {
    const url = `https://api.github.com/repos/${owner}/${repo}/releases/latest`;
    const response = await fetch(url);
    const data = await response.json();
    return data.tag_name;
}