const lyricsFinder = require('lyrics-finder');
const Discord = require('discord.js');
const { MUTE_CHANNEL } = require('../config.json');

module.exports = {
	commands: ['lyrics', 'l'],
	expectedArgs: '<nome da música> - <artista>',
	permissionError: '',
	minArgs: 1,
	maxArgs: null,
	callback: async (message, arguments, text) => {
		if (message.channel.id === MUTE_CHANNEL) return;
		const embed = new Discord.MessageEmbed()
			.setTitle('Tocando agora ♪')
			.setColor('#0099ff');
		const lyricFinder = async (artist, title) => {
			const lyrics = await lyricsFinder(artist, title);
			if (!lyrics) {
				return message.channel.send(
					'Não encontrei o lyrics dessa música. tente usar >l <artista> - <música>',
				);
			}
			embed.setAuthor('').setTitle('Lyrics: ').setDescription(lyrics);
			embedMsg = await message.channel.send(embed);
		};
		if (arguments.length) {
			arguments = arguments.join(' ').split('-');
			const song = arguments[0],
				artist = arguments[1] || '';
			return lyricFinder(`${song}`, `${artist}`);
		}
	},
	permissions: '',
	requiredRoles: [],
};
