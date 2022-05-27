const queue = require('./p.js')
const { PREFIX } = require('../config.json')
const Discord = require("discord.js");

module.exports = {
    commands: ['volume', 'v'],
    expectedArgs: '',
    permissionError: '',
    minArgs: 0,
    maxArgs: 1,
    callback: async (message, arguments, text) => {
        if (message.channel.id === '753413520606887967') return;
        const { channel } = message.member.voice;


        let embed = new Discord.MessageEmbed()
        .setColor('#faebd7')

        const player = message.client.manager.get(message.guild.id);
        if (!player){
            embed.setDescription("Nem tem nada tocando man")
            return message.channel.send(embed);
        }

        if (channel.id !== player.voiceChannel) return message.channel.send("voce nem ta na mesma call que eu 🙄");
        
        if (!arguments.length){
            embed.setAuthor(`O volume ta em: ${player.volume}\%.`)
            return message.channel.send(embed);
        } 


        const volume = Number(arguments[0]);
        
        if (!volume || volume < 1 || volume > 100) return message.channel.send("Voce precisa falar um valor entre 1 e 100.");
    
        player.setVolume(volume);

        embed.setAuthor(`Volume setado em: ${volume}\%.`)
        return message.channel.send(embed);
         
    },
    permissions: '',    
    requiredRoles: [],
  }