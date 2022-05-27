const queue = require('./p.js')
const { PREFIX, MUTE_CHANNEL} = require('../config.json')
const Discord = require("discord.js")

module.exports = {
    commands: ['move'],
    expectedArgs: '',
    permissionError: '',
    minArgs: 1,
    maxArgs: 2,
    callback: async (message, arguments, text) => {
        if (message.channel.id === MUTE_CHANNEL) return;

        let embed = new Discord.MessageEmbed()
        .setTitle("Tocando agora ♪")
        .setColor('#0099ff')

        const player = message.client.manager.get(message.guild.id);
        if (!player){
            embed.setDescription("Nem tem nada tocando man")
            return message.channel.send(embed);
        }

        const songQueue = player.queue;
        
        let validateValueN1 = isNaN(arguments[0]);
        let validateValueN2 = isNaN(arguments[1]);
        let validateLengthN1 = parseInt(arguments[0], 10) > songQueue.length;
        let validateLengthN2 = parseInt(arguments[1], 10) > songQueue.length;

        if (validateValueN1) {
            return message.channel.send("Mano só aceito números.")
        } else if (validateLengthN1) {
            return message.channel.send("Mano nem tem esse número na queue.")
        }

        function queueMove(arr, fromIndex, toIndex) {
            var element = arr[fromIndex];
            arr.splice(fromIndex, 1);
            arr.splice(toIndex, 0, element);
            return arr;
        }

        let from = arguments[0]-1;
        let to = arguments[1]-1;

        if (arguments.length < 2) {
            queueMove(songQueue, from, 1)
            message.react("👍")
        } else if (arguments.length == 2) {
            if (validateValueN2) {
                return message.channel.send("Mano só aceito números.")
            } else if (validateLengthN2) {
                return message.channel.send("Mano nem tem esse número na queue.")
            }
            [songQueue[from], songQueue[to]] = [songQueue[to], songQueue[from]]
            message.react("👍")
        }
    },
    permissions: '',    
    requiredRoles: [],
  }