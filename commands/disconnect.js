const queue = require('./p.js')
const { PREFIX, MUTE_CHANNEL} = require('../config.json')

module.exports = {
    commands: ['disconnect', 'dc'],
    expectedArgs: '',
    permissionError: '',
    minArgs: 0,
    maxArgs: 0,
    callback: async (message, arguments, text) => {
        if (message.channel.id === '753413520606887967') return;

        const { channel } = message.member.voice;

        const player = message.client.manager.get(message.guild.id);
        if (channel.id !== player.voiceChannel) return message.channel.send("voce nem ta na mesma call que eu 🙄");

            if (player){
                player.destroy();
            }

            channel.leave()
    },
    permissions: '',    
    requiredRoles: [],
  }