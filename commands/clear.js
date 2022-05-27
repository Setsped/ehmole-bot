const queue = require('./p.js')
const { PREFIX, MUTE_CHANNEL} = require('../config.json')
const Discord = require("discord.js")

module.exports = {
    commands: ['clear'],
    expectedArgs: '',
    permissionError: '',
    minArgs: 0,
    maxArgs: 0,
    callback: async (message, arguments, text) => {
        if (message.channel.id === MUTE_CHANNEL) return;

        const player = message.client.manager.get(message.guild.id);
        if (!player){
            embed.setDescription("Nem tem nada tocando man")
            return message.channel.send(embed);
        }

        let embed = new Discord.MessageEmbed()
        .setTitle("Tocando agora ♪")
        .setColor('#faebd7')

       
        const bot_channel = await message.guild.me.voice.channel;

        if (!bot_channel) return message.channel.send(
            "**Eu não estou conectado a uma call.** Use ``*join`` para eu entrar na call")

            player.destroy();
            await message.channel.send("Clearado");
        
    },

    permissions: '',    
    requiredRoles: [],
  }