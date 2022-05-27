const queue = require('./p.js')
const { PREFIX, MUTE_CHANNEL} = require('../config.json')
const Discord = require("discord.js");

module.exports = {
    commands: ['remove'],
    expectedArgs: '<número> da música na queue.',
    permissionError: '',
    minArgs: 1,
    maxArgs: 1,
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
        const voice_channel = await message.member.voice.channel;
        const number = arguments.join(" ");

        if(!voice_channel) return message.channel.send('Voce precisa estar em uma call pra usar esse comando troxa')
        if (bot_channel && bot_channel !== voice_channel) return message.channel.send(
                "Você precisa estar na mesma call que o bot para usar esse comando burro")

        if (bot_channel === voice_channel) {
            if (Number.isInteger(parseInt(number))) {
                if (number === '1') return message.channel.send(`Não pode usar esse comando na primeira música. Use o **${PREFIX}skip** pra isso`);
                if (songQueue.songs.length >= number) {
                    message.channel.send(`**${songQueue.songs[number -1].title}** foi removido da fila.`);
                    return songQueue.songs.splice(number -1, 1);
                } else return message.channel.send("Nem tem uma música com esse número na fila man.");
            } else {
                return message.channel.send("Você precisa passar um número seu burro.");
            }
        }
    },
    permissions: '',
    requiredRoles: [],
}