
const { PREFIX, MUTE_CHANNEL} = require('../config.json')
const Discord = require("discord.js");
const SpotifyThumb = "https://i.pinimg.com/564x/9e/75/23/9e75237755b7261a24668d240b5d1cdf.jpg";


module.exports = {
    commands: ['np'],
    expectedArgs: '',
    permissionError: '',
    minArgs: 0,
    maxArgs: null,
    callback: async (message, arguments, text) => {
      if (message.channel.id === MUTE_CHANNEL) return;

      let embed = new Discord.MessageEmbed()
      .setTitle("Tocando agora ♪")
      .setColor('#faebd7')

      const player = message.client.manager.get(message.guild.id);
      if (!player){
          embed.setDescription("Nem tem nada tocando man")
          return message.channel.send(embed);
        
      }

      var {current} = player.queue;
      posicao = player.position;
      tempo = msToHour(posicao), posicao= ~~(posicao / 1000);

      embed.setDescription(`[${current.title}](${current.uri || null})`)
       .addFields(
          {"name": "\u200B",
          "value": "`"+`${tempo}[${progressBarEnhanced(posicao,(current.duration/1000),15)}]${ssTohms(current.duration/1000)}`+"`"},
          {"name": "\u200B","value": "`Requested by: `" + `${current.requester.username}`}
        )
        .setThumbnail(current.thumbnail || SpotifyThumb)
        
      embedMsg = await message.channel.send(embed)
      
    },
    permissions: '',    
    requiredRoles: [],
  }

  let progressBarEnhanced =(current, total, barSize)=> {
    let progress = Math.round((barSize * current) / total);

    return (
      "━".repeat(progress > 0 ? progress - 1 : progress) +
      "🔘" + //
      "━".repeat(barSize - progress)
    );
  }

  const msToHour = (time) =>{
    time = time || 0
    time = Math.round(time / 1000);
    const s = time % 60,
      m = ~~((time / 60) % 60),
      h = ~~(time / 60 / 60);

    return h === 0
      ? `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
      : `${String(Math.abs(h) % 24).padStart(2, "0")}:${String(m)
        .padStart(2,"0")}:${String(s).padStart(2, "0")}`;
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
  