const { MUTE_CHANNEL } = require('../config.json');
const Discord = require('discord.js');
const botao = require('discord-buttons');
const np = require('./np.js');
// const { MessageActionRow, MessageButton } = require('discord-buttons');

module.exports = {
	commands: ['q', 'queue'],
	expectedArgs: '<page>',
	permissionError: '',
	minArgs: 0,
	maxArgs: null,
	callback: async (message, arguments, text, client) => {
		if (message.channel.id === MUTE_CHANNEL) return;

		const bot_channel = await message.guild.me.voice.channel;

		const embed = new Discord.MessageEmbed()
			.setTitle('Queue de música ♪')
			.setColor('#faebd7');

		const player = await client.manager.get(message.guild.id);
		if (!player) {
			embed.setDescription('Nem tem nada tocando man');
			return message.channel.send(embed);
		}

		const songQueue = player.queue;
		if (songQueue.length === 0) {
			np.callback(message, arguments, text, client);
		}

		let songQueueArray = [],
			page = arguments[0] || 1;
		const disab = [false, false, false, false];
		let embedMsg;

		if (bot_channel && songQueue?.length) {
			for (let i = 0; songQueue.length > i; i++) {
				songQueueArray.push(
					`${i + 1}. [` +
                        ssTohms(songQueue[i].duration / 1000) +
                        ']' +
                        ` [${songQueue[i].title}](${
                        	songQueue[i].uri || null
                        })` +
                        ` requested by ${songQueue[i].requester.username}\n`,
				);
			}
			songQueueArray = separate(songQueueArray, 10);
			if (songQueueArray[page - 1] == undefined) {message.channel.send('essa page nem existe man');}
			else {send();}
		}
		// songQueueArray,page,message,embed
		async function send() {
			if (page === songQueueArray.length) {
				disab[2] = true;
				disab[3] = true;
			}
			else {
				disab[2] = false;
				disab[3] = false;
			}

			if (page === 1) {
				disab[0] = true;
				disab[1] = true;
			}
			else {
				disab[0] = false;
				disab[1] = false;
			}

			embed.setDescription(songQueueArray[page - 1]);
			embed.setFooter('página ' + page + ' de ' + songQueueArray.length);

			const button1 = new botao.MessageButton()
				.setID('firstPage')
				.setEmoji('⏮')
				.setDisabled(disab[0])
				.setStyle(1);

			const button2 = new botao.MessageButton()
				.setID('previousPage')
				.setDisabled(disab[1])
				.setEmoji('⏪')
				.setStyle(1);

			const button3 = new botao.MessageButton()
				.setID('nextPage')
				.setEmoji('⏩')
				.setDisabled(disab[2])
				.setStyle(1);

			const button4 = new botao.MessageButton()
				.setID('lastPage')
				.setEmoji('⏭')
				.setDisabled(disab[3])
				.setStyle(1);

			const row = new botao.MessageActionRow()
				.addComponent(button1)
				.addComponent(button2)
				.addComponent(button3)
				.addComponent(button4);

			if (embedMsg) {
				embedMsg.edit({ content: embed, components: [row] });
			}
			else {
				embedMsg = await message.channel.send({
					content: embed,
					components: [row],
				});
			}

			const filter = (button) =>
				button.clicker.user.id === message.author.id;
			const collector = embedMsg.createButtonCollector(filter, {
				max: 1,
				time: 30000,
			});

			collector.on('collect', async (button) => {
				if (button.id === 'firstPage') {
					button.reply.defer();
					page = 1;
					embed
						.setDescription(songQueueArray[page - 1])
						.setFooter(
							'page ' + page + ' de ' + songQueueArray.length,
						);
					send();
				}
				if (button.id === 'previousPage') {
					button.reply.defer();
					page--;
					embed
						.setDescription(songQueueArray[page - 1])
						.setFooter(
							'page ' + page + ' de ' + songQueueArray.length,
						);
					send();
				}
				if (button.id === 'nextPage') {
					button.reply.defer();
					page++;
					embed
						.setDescription(songQueueArray[page - 1])
						.setFooter(
							'page ' + page + ' de ' + songQueueArray.length,
						);
					send();
				}
				if (button.id === 'lastPage') {
					button.reply.defer();
					page = songQueueArray.length;
					embed
						.setDescription(songQueueArray[page - 1])
						.setFooter(
							'página ' + page + ' de ' + songQueueArray.length,
						);
					send();
				}
			});
		}
	},

	permissions: '',
	requiredRoles: [],
};

function separate(arr, size) {
	if (size <= 0) throw 'Invalid chunk size';
	const R = [];
	for (let i = 0, len = arr.length; i < len; i += size) {R.push(arr.slice(i, i + size));}
	return R;
}

function hmsToSecondsOnly(str) {
	let p = str.split(':'),
		s = 0,
		m = 1;

	while (p.length > 0) {
		s += m * parseInt(p.pop(), 10);
		m *= 60;
	}
	return s;
}

function ssTohms(secs) {
	const sec_num = parseInt(secs, 10);
	const hours = Math.floor(sec_num / 3600);
	const minutes = Math.floor(sec_num / 60) % 60;
	const seconds = sec_num % 60;

	return [hours, minutes, seconds]
		.map((v) => (v < 10 ? '0' + v : v))
		.filter((v, i) => v !== '00' || i > 0)
		.join(':');
}
