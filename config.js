module.exports = {
    app: {
        px: 'gus',
        token: 'OTc1OTYwNzQzMDI5NjYxNzM2.G9OhM_.TdnBp2ww7RU9BBTWaYl5XBfWgn9As-65aUroOk',
        playing: 'บทเพลงของกัสจัง'
    },

    opt: {
        DJ: {
            enabled: false,
            roleName: 'DJ',
            commands: ['back', 'clear', 'filter', 'loop', 'pause', 'resume', 'seek', 'shuffle', 'skip', 'stop', 'volume']
        },
        maxVol: 100,
        loopMessage: false,
        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 25
            }
        }
    }
};