const ytpl = require('ytpl');
const ytdl = require('ytdl-core')
const Discord = require("discord.js");
const queue = require('./p.js')
const { PREFIX, MUTE_CHANNEL} = require('../config.json')

module.exports = {
    commands: ['loop'],
    expectedArgs: '',
    permissionError: '',
    minArgs: 0,
    maxArgs: null,
    callback: async (message, arguments, text) => {
      if (message.channel.id === MUTE_CHANNEL) return;

      const player = message.client.manager.get(message.guild.id);

        let embed = new Discord.MessageEmbed()
        .setColor('#faebd7')


        if (!player) {
          embed.setDescription("Nem tem nada tocando man")
          return message.channel.send(embed);
        }


        const voice_channel = await message.member.voice.channel;
        const bot_channel = await message.guild.me.voice.channel;
        if(!voice_channel) return message.channel.send('Voce precisa estar em uma call pra usar esse comando troxa')

        if (!bot_channel) return message.channel.send("Nem to em call BURRO");

        if (bot_channel && bot_channel !== voice_channel) return message.channel.send(
                "Você precisa estar na mesma call que o bot para usar esse comando burro")
        
      if (arguments.length && /queue/i.test(arguments[0])) {
          player.setQueueRepeat(!player.queueRepeat);
          //const queueRepeat = player.queueRepeat ? "loopada" : "desloopada";
          embed.setAuthor("Queue "+ (player.queueRepeat ? "Loopada" : "Deslopada"))
          return message.channel.send(embed);
        }

        player.setTrackRepeat(!player.trackRepeat);
        embed.setAuthor("Musica "+ (player.queueRepeat ? "Loopada" : "Deslopada"))
        return message.channel.send(embed);
        
      
    },
    permissions: '',    
    requiredRoles: [],
}
  