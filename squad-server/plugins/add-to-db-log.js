// I'm opting to have you add this to the db-log.js file instead of providing a full file incase the original db-log.js file gets modified in the future.
// Please contact me if you have any questions.

// This goes in the Constructor of db-log.js
// Underneath these lines:

// constructor(server, options, connectors) {
//    super(server, options, connectors);
//    this.models = {};

this.createModel(
    'LinkCode',
    {
        id: {
            type: DataTypes.INTEGER,
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



// This goes the prepareToMount() Function
// Underneath this line:

// async prepareToMount() {

await this.models.LinkCode.sync();




// FINALLY, update the this.createModel('Player', ...) to this:
// Notice it adds discordID to the Table

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
        },
        discordID: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
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
