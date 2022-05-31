
const Discord = require("discord.js");
const {MUTE_CHANNEL} = require('../config.json')

module.exports = {
    commands: ['search'],
    expectedArgs: '',
    permissionError: '',
    minArgs: 1,
    maxArgs: null,
    callback: async (message, arguments, text,client) => {
        if (message.channel.id === MUTE_CHANNEL) return;
        const search = arguments.join(' ');
        var player = await  message.client.manager.get(message.guild.id);

        if(player === undefined){
            var player = await client.manager.create({
                guild: message.guild.id,
                voiceChannel: message.member.voice.channel.id,
                textChannel: message.channel.id,
              });
        }

        if(player.state !== "CONNECTED") player.connect();

        let res;
        try {
          res = await player.search(search, message.author);
          if (res.loadType === 'LOAD_FAILED') {
            if (!player.queue.current) player.destroy();
            throw res.exception;
          }
        } catch (err) {
            return message.reply(`Ocorreu um Erro tentando pesquisar essa musica: ${err.message}`);
        }

        switch (res.loadType) {
            case 'NO_MATCHES':
              if (!player.queue.current) player.destroy();
              return message.reply('Não encontrei nenhum resultado \:\(.');

              case 'SEARCH_RESULT':
                let max = 15, collected, filter = (m) => m.author.id === message.author.id && /^(\d+|end)$/i.test(m.content);
                if (res.tracks.length < max) max = res.tracks.length;
        
                
                const results = res.tracks
                    .slice(0, max)
                    .map((track, index) => `${++index}. [${track.title}](${track.uri}) [`+ssTohms(track.duration/1000)+`]`)
                    .join('\n\n');

                    let embed = new Discord.MessageEmbed()
                     .setColor('#faebd7')
                     .setTitle("Videos encontrados")
                     .setDescription(results);
                    embedMsg = await message.channel.send(embed);
        
                try {
                  collected = await message.channel.awaitMessages(filter, { max: 1, time: 30e3, errors: ['time'] });
                } catch (e) {
                  if (!player.queue.current) player.destroy();
                  return message.channel.send("voce não falou um numero :\.");
                }

                const first = collected.first().content;
                const m = collected.first();
        
                if (first.toLowerCase() === 'end') {
                  if (!player.queue.current) player.destroy();
                  return message.channel.send('Seleção cancelada.');
                }
        
                const index = Number(first) - 1;
                if (index < 0 || index > max - 1) return message.reply(`O numero que voce falou é muito pequeno ou muito grande '-' (1-${max}).`);
        
                const track = res.tracks[index];
                player.queue.add(track);
        
                if (!player.playing && !player.paused && !player.queue.size) player.play();
                
                embedMsg.delete().catch(err=>{
                    console.log(err)
                })

                m.react("👍");
        }

    },
    permissions: '',    
    requiredRoles: [],
  }

  function ssTohms(secs){
    var sec_num = parseInt(secs, 10)
    var hours   = Math.floor(sec_num / 3600)
    var minutes = Math.floor(sec_num / 60) % 60
    var seconds = sec_num % 60
  
    return [hours,minutes,seconds]
        .map(v => v < 10 ? "0" + v : v)
        .filter((v,i) => v !== "00" || i > 0)
        .join(":")
  }