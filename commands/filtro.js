const queue = require('./p.js')
const { PREFIX } = require('../config.json')
const Discord = require("discord.js");

const filtros = {
    reset: "reset",
    nightcore: "nightcore",
    vaporwave: "vaporwave",
    bassboost: "bassBoost",
    pop: "pop",
    soft: "soft",
    treblebass: "treblebass",
    eightd: "eightD",
    karaoke: "karaoke",
    vibrato: "vibrato",
    tremolo: "tremolo",
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
            embed.setDescription(' Nightcore, Vaporwave, BassBoost, Pop, Soft, Treblebass, EightD, Karaoke, Vibrato, Tremolo ')
            embed.setFooter("\n Ou para resetar use >filter Reset ")
            return message.channel.send(embed)
        }


        if (arguments.length && arguments[0].toLowerCase() in filtros) {
            for(e in filtros){
                console.log()
                console.log(filtros[e])
                console.log(arguments[0].toLowerCase())

                if(arguments[0].toLowerCase() === filtros[e].toLowerCase()){
                    filtro = filtros[e];
                }
            }
        } else{
            embed.setAuthor("Filtro não encontrado!")
            return message.channel.send(embed); 
        }
        

        if(filtro === "reset"){
            player.reset();
            embed.setAuthor("Filtros Resetados!")
            return message.channel.send(embed);
        } else {
            player[filtro] ^= true
            embed.setAuthor(filtro +" "+ (player[filtro] ? "Ligado" : "Desligado"))
            return message.channel.send(embed);
        }
    },
    permissions: '',    
    requiredRoles: [],
  }