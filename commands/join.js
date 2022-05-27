const { PREFIX, MUTE_CHANNEL} = require('../config.json')

module.exports = {
    commands: ['join', 'entrar'],
    expectedArgs: '',
    permissionError: '',
    minArgs: 0,
    maxArgs: null,
    callback: (message, arguments, text) => {
        if (message.channel.id === MUTE_CHANNEL) return;
        if (!message.member.voice.channel) return message.channel.send(
            'você precisa estar em um chat de voz para usar esse comando burro')
        if (message.member.voice.channel) {
            const connection = message.member.voice.channel.join()
        }
    },
    permissions: '',    
    requiredRoles: [],
  }