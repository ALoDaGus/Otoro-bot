module.exports = {
    app: {
        px: 'gus',
        token: 'OTQ1NzE0OTU5NTI5MTc3MDg4.GgGbLw.p17IgF_Z9189ZRXvxWNcW_stptBqWrkpcVDTpI',
        playing: 'บทเพลงของกัสจัง'
    },

    opt: {
        DJ: {
            enabled: false,
            roleName: 'DJ',
            commands: ['back', 'clear', 'filter', 'loop', 'pause', 'resume', 'seek', 'shuffle', 'skip', 'stop', 'volume', 'sleep']
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