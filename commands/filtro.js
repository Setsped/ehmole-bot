const queue = require('./p.js')
const { PREFIX } = require('../config.json')
const Discord = require("discord.js");

const filtros = {
    reset: "reset",
    nightcore: "Nightcore",
    vaporwave:"Vaporwave",
    bassboost:"BassBoost",
    pop:"pop",
    soft:"soft",
    treblebass:"treblebass",
    eightdimension:"EightDimension",
    karaoke:"Karaoke",
    vibrato:"Vibrato",
    tremolo:"Tremolo",
  };


module.exports = {
    commands: ['filtro','filter'],
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
        if(!arguments.length){
            embed.setTitle("Mande algum filtro da lista:")
            embed.setDescription(' Nightcore, Vaporwave, BassBoost, Pop, Soft, Treblebass, EightDimension, Karaoke, Vibrato, Tremolo ')
            embed.setFooter("\n Ou para resetar use >filter Reset ")
            return message.channel.send(embed)
        }

        if (arguments.length && arguments[0].toLowerCase() in filtros) filtro = arguments[0].toLowerCase();
        
        switch(filtro){
            case 'reset': player.reset()
            embed.setAuthor("Filtros Resetados!")
                return message.channel.send(embed);

            case 'nightcore':
                player.nightcore ^= true; 
                embed.setAuthor("Nightcore "+ ( player.nightcore ? "Ligado" : "Desligado"))
                return message.channel.send(embed);

            case 'vaporwave':
                player.vaporwave ^= true;
                embed.setAuthor("Vaporwave "+ ( player.vaporwave ? "Ligado" : "Desligado"))
                return message.channel.send(embed);

            case 'bassboost':
                player.bassBoost ^= true;
                embed.setAuthor("BassBoost "+ ( player.bassBoost ? "Ligado" : "Desligado"))
                return message.channel.send(embed);

            case 'pop':
                player.pop ^= true;
                embed.setAuthor("Pop "+ ( player.pop  ? "Ligado" : "Desligado"))
                return message.channel.send(embed);

            case 'soft':
                player.soft ^= true;
                embed.setAuthor("Soft "+ ( player.soft ? "Ligado" : "Desligado"))
                return message.channel.send(embed);

            case 'eightdimension':
                player.eightD ^= true;
                embed.setAuthor("EightDimension "+ ( player.eightD ? "Ligado" : "Desligado"))
                return message.channel.send(embed);

            case 'karaoke':
                player.karaoke ^= true;
                embed.setAuthor("Karaoke "+ (player.karaoke ? "Ligado" : "Desligado"))
                return message.channel.send(embed);

            case 'vibrato':
                player.vibrato ^= true;
                embed.setAuthor("Vibrato "+ (player.vibrato ? "Ligado" : "Desligado"))
                return message.channel.send(embed);

            case 'treblebass':
                player.treblebass ^= true;
                embed.setAuthor("treblebass "+ (player.treblebass ? "Ligado" : "Desligado"))
                return message.channel.send(embed);

            case 'tremolo':
                player.tremolo ^= true;
                embed.setAuthor("Tremolo "+ (player.tremolo ? "Ligado" : "Desligado"))
                return message.channel.send(embed);

        }
    },
    permissions: '',    
    requiredRoles: [],
  }