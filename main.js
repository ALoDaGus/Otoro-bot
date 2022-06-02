const { Player, QueryType, QueueRepeatMode } = require('discord-player');
const { Client,GuildMember, Intents } = require('discord.js');

global.client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES
    ],
    disableMentions: 'everyone',
});

client.config = require('./config');

global.player = new Player(client, client.config.opt.discordPlayer);
global.GuildMember = GuildMember;
global.QueryType = QueryType;
global.QueueRepeatMode = QueueRepeatMode;

require('./src/loader');
require('./src/events');
require('./src/command');
require('./src/deployler')

client.login(client.config.app.token);