const queue = require('./p.js')
const { PREFIX } = require('../config.json')
const Discord = require("discord.js");

module.exports = {
    commands: ['skip', 's'],
    expectedArgs: '',
    permissionError: '',
    minArgs: 0,
    maxArgs: 0,
    callback: async (message, arguments, text) => {
        if (message.channel.id === '753413520606887967') return;
        const { channel } = message.member.voice;


        let embed = new Discord.MessageEmbed()
        .setColor('#faebd7')
        .setTitle("Tocando agora ♪")

        const player = message.client.manager.get(message.guild.id);
        if (!player){
            embed.setDescription("Nem tem nada tocando man")
            return message.channel.send(embed);
        }

        if (channel.id !== player.voiceChannel) return message.channel.send("voce nem ta na mesma call que eu 🙄");
         
        const { title } = player.queue.current;
        player.stop();
        return message.channel.send("**" + `${title}` + "**" + " foi skipada.");
    },
    permissions: '',    
    requiredRoles: [],
  }