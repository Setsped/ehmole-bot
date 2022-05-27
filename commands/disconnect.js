const queue = require('./p.js')
const { PREFIX, MUTE_CHANNEL} = require('../config.json')

module.exports = {
    commands: ['disconnect', 'dc'],
    expectedArgs: '',
    permissionError: '',
    minArgs: 0,
    maxArgs: 0,
    callback: async (message, arguments, text) => {
        //if (message.channel.id === MUTE_CHANNEL) return;
        try { var songQueue = await queue.songQueue.get(message.guild.id);
        } catch (err) {
            
        }
        const bot_channel = await message.guild.me.voice.channel;
        const voice_channel = await message.member.voice.channel;
        /*if (!message.member.voice.channel) return message.channel.send(
            'você precisa estar em um chat de voz para usar esse comando burro')*/
        if (bot_channel === voice_channel) {
            if (songQueue?.songs?.length){
                queue.songQueue.delete(message.guild.id);
                await songQueue.connection.dispatcher.end();
            }
            bot_channel.leave()
        }
    },
    permissions: '',    
    requiredRoles: [],
  }