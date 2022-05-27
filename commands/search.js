const ytpl = require('ytpl');
const ytdl = require('ytdl-core')
const ytSearch = require('yt-search');
const Discord = require("discord.js");
const queue = require("./p.js")
const { PREFIX, MUTE_CHANNEL} = require('../config.json')

module.exports = {
    commands: ['search'],
    expectedArgs: '',
    permissionError: '',
    minArgs: 1,
    maxArgs: null,
    callback: async (message, arguments, text) => {
        if (message.channel.id === MUTE_CHANNEL) return;
        const videoResult = await ytSearch(`${arguments.join(' ')}`);
        const filter = m => m.author.id === message.author.id;
        const voice_channel = await message.member.voice.channel;
        var searchResult = "";

        for (let i = 0; i < 10; i++) {
            searchResult = searchResult + `${i+1}. [${videoResult.videos[i].title}](${videoResult.videos[i].url}) [${videoResult.videos[i].timestamp}]` +"\n\n"
        }
        
        let embed = new Discord.MessageEmbed()
        .setColor('#faebd7')
        .setTitle("Videos encontrados")
        .setDescription(searchResult);
        embedMsg = await message.channel.send(embed);

        const collector = new Discord.MessageCollector(message.channel, filter, {
            max: 1,
        });
        collector.on('collect', async m => {
            if (m.content == 'cancel') return m.react("❌");
            try {
                if (Number.isInteger(parseInt(m.content))) {
                    vNumber = parseInt(m.content-1)
                    m.react("👍")
                    embedMsg.delete();
                    queue.callback(m, [videoResult.videos[vNumber].url], text)
                } else {
                    m.channel.send("Tem que passar um numero burro")
                }
            } catch (err) {
                console.log(err)
            }
        })
        /*
        const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 10000 });
        console.log(collector)
        collector.on('collect', message => {
            videoNumber = parseInt(message.content);
            console.log(message.content);
            console.log(videoNumber);
            queue.songQueue.songs.push(videoResult[videoNumber])
        })*/
    },
    permissions: '',    
    requiredRoles: [],
  }