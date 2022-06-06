const Discord = require('discord.js');
const { MUTE_CHANNEL } = require('../config.json');

module.exports = {
	commands: ['shuffle'],
	expectedArgs: '',
	permissionError: '',
	minArgs: 0,
	maxArgs: 0,
	callback: async (message, arguments, text) => {
		if (message.channel.id === MUTE_CHANNEL) return;

		const embed = new Discord.MessageEmbed()
			.setTitle('Tocando agora ♪')
			.setColor('#faebd7');

		const player = message.client.manager.get(message.guild.id);
		if (!player) {
			embed.setDescription('Nem tem nada tocando man');
			return message.channel.send(embed);
		}

		const songQueue = player.queue;

		const bot_channel = await message.guild.me.voice.channel;
		if (!bot_channel) {
			return message.channel.send(
				'**Eu não estou conectado a uma call.** Use ``>join`` para eu entrar na call',
			);
		}

		if (bot_channel && player.queue?.length) {
			shuffle(player.queue);
			await message.channel.send('Shufflado.');
		}
	},
	permissions: '',
	requiredRoles: [],
};

function shuffle(array) {
	let currentIndex = array.length,
		randomIndex;

	while (currentIndex != 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		--currentIndex
		;[array[currentIndex], array[randomIndex]] = [
			array[randomIndex],
			array[currentIndex],
		];
	}
	return array;
}
