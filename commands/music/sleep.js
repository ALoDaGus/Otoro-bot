const { QueryType } = require('discord-player');

module.exports = {
    name: 'sleep',
    aliases: ['sp'],
    utilisation: '{prefix}sleep',
    voiceChannel: true,

    async execute(client, message, args) {

        const queue = await player.createQueue(message.guild, {
            metadata: message.channel
        });

        try {
            if (!queue.connection) await queue.connect(message.member.voice.channel);
        } catch {
            await player.deleteQueue(message.guild.id);
            return message.channel.send(`I can't join the voice channel ${message.author}... try again ? ❌`);
        }

    },
};