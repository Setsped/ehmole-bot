const {MUTE_CHANNEL} = require('../config.json')
const Discord = require("discord.js")
const SpotifyThumb = "https://photos5.appleinsider.com/gallery/38530-73272-Spotify-Lead-Image-xl.jpg";

module.exports = {
    commands: ['play', 'p'],
    expectedArgs: '<url do video>',
    permissionError: '',
    minArgs: 1,
    maxArgs: null,
    callback: async (message, arguments, manager, client) => {
        if (message.channel.id === MUTE_CHANNEL) return;
        const voice_channel = await message.member.voice.channel;
        const bot_channel = await message.guild.me.voice.channel;
        if(!voice_channel) return message.channel.send('Voce precisa estar em uma call pra usar esse comando troxa')
        if (bot_channel && bot_channel !== voice_channel) return message.channel.send(
                "Você precisa estar na mesma call que o bot para usar esse comando burro")
        if (arguments.join().includes('&ab_channel')) {
            argumentArr = arguments.join().split('&ab_channel');
            arguments = [argumentArr[0]];
        }
       


        const player = client.manager.create({
            guild: message.guild.id,
            voiceChannel: message.member.voice.channel.id,
            textChannel: message.channel.id,
          });

        if (player.state !== "CONNECTED") player.connect();

        const search = arguments.join(' ');
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

            case 'TRACK_LOADED':
                if(player.playing){
                    player.queue.add(res.tracks[0]);
                    embedAF = new Discord.MessageEmbed()
                        .setTitle("♪ Adicionado à fila ♪")
                        .setColor('#faebd7')
                        .setThumbnail(`${res.tracks[0].thumbnail || SpotifyThumb}`)
                        .setDescription(`[${res.tracks[0].title}](${res.tracks[0].uri || null})`)
                        .addFields(
                        {"name": "Canal", "value": res.tracks[0].author, inline: true},
                        {"name": "Duração", "value": ssTohms(res.tracks[0].duration/1000) , inline: true},
                        {"name": "\u200B","value": "`Requested by: `" + "<@"+res.tracks[0].requester+">"})
                        message.channel.send(embedAF);
                }else{
                    player.queue.add(res.tracks[0]);
                    if (!player.playing && !player.paused && !player.queue.size) player.play();
                }
            break;
            
            case 'PLAYLIST_LOADED':
              player.queue.add(res.tracks);
      
              if (!player.playing && !player.paused && player.queue.totalSize === res.tracks.length) player.play();
              return message.reply(`Playlist adicionada \`${res.playlist.name}\` com  ${res.tracks.length} musicas.`);

            case 'SEARCH_RESULT':
                if(player.playing){
                    player.queue.add(res.tracks[0]);
                    embedAF = new Discord.MessageEmbed()
                        .setTitle("♪ Adicionado à fila ♪")
                        .setColor('#faebd7')
                        .setThumbnail(`${res.tracks[0].thumbnail || SpotifyThumb}`)
                        .setDescription(`[${res.tracks[0].title}](${res.tracks[0].uri || null})`)
                        .addFields(
                        {"name": "Canal", "value": res.tracks[0].author, inline: true},
                        {"name": "Duração", "value": ssTohms(res.tracks[0].duration/1000) , inline: true},
                        {"name": "\u200B","value": "`Requested by: `" + "<@"+res.tracks[0].requester+">"})
                        message.channel.send(embedAF);
                }else{
                    player.queue.add(res.tracks[0]);
                    if (!player.playing && !player.paused && !player.queue.size) player.play();
                }
          }
   




    //para playlist

        
    },
    permissions: '',
    requiredRoles: [],
}

function hmsToSecondsOnly(str) {
    var p = str.split(':'),
        s = 0, m = 1;
  
    while (p.length > 0) {
        s += m * parseInt(p.pop(), 10);
        m *= 60;
    }
    return s;
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
  