const queue = require('./p.js')
const Discord = require("discord.js");
const { MUTE_CHANNEL } = require("../config.json")

module.exports = {
    commands: ['shuffle'],
    expectedArgs: '',
    permissionError: '',
    minArgs: 0,
    maxArgs: 0,
    callback: async (message, arguments, text) => {
      if (message.channel.id === MUTE_CHANNEL) return;
      let embed = new Discord.MessageEmbed()
      .setTitle("Tocando agora ♪")
      .setColor('#faebd7')
      try { var songQueue = await queue.songQueue.get(message.guild.id);
      } catch (err){} 
      if (typeof songQueue === 'undefined') {
        embed.setDescription("Nem tem nada tocando man")
        return message.channel.send(embed);
      }
      const bot_channel = await message.guild.me.voice.channel;
      if (!bot_channel) return message.channel.send(
         "**Eu não estou conectado a uma call.** Use ``*join`` para eu entrar na call")

      function shuffle(array) {
         let currentIndex = array.length,  randomIndex;
       
         while (currentIndex != 0) {
       
           randomIndex = Math.floor(Math.random() * currentIndex);
           --currentIndex;
           [array[currentIndex], array[randomIndex]] = [
             array[randomIndex], array[currentIndex]];
         }
       
         return array;
       }

      if (bot_channel && songQueue?.songs?.length) {
         var firstElement = songQueue.songs.shift();
         shuffle(songQueue.songs);
         songQueue.songs.unshift(firstElement);
         await message.channel.send("Shufflado.");
       } 
    },
    permissions: '',    
    requiredRoles: [],
  }