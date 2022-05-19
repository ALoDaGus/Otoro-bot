module.exports = {
    app: {
        px: 'gus',
        token: 'OTc2ODIyNTIzMjA1NDE5MDY5.GO0F_y.Qup5NNgPVeRMQAYUKpxGVMUJyqP6PrFTtKX-no',
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