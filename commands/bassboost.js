const Discord = require('discord.js');

const levels = {
	nenhum: 0.0,
	baixo: 0.1,
	medio: 0.15,
	alto: 0.25,
};

module.exports = {
	commands: ['bs', 'bass', 'bassboost'],
	expectedArgs: '',
	permissionError: '',
	minArgs: 0,
	maxArgs: 1,
	callback: async (message, arguments, text) => {
		if (message.channel.id === '753413520606887967') return;
		const { channel } = message.member.voice;

		const embed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Tocando agora ♪');

		const player = message.client.manager.get(message.guild.id);
		if (!player) {
			embed.setDescription('Nem tem nada tocando man');
			return message.channel.send(embed);
		}

		if (channel.id !== player.voiceChannel) {return message.channel.send('voce nem ta na mesma call que eu 🙄');}

		let level = 'nenhum';
		if (arguments.length && arguments[0].toLowerCase() in levels) {level = arguments[0].toLowerCase();}

		const bands = new Array(3)
			.fill(null)
			.map((_, i) => ({ band: i, gain: levels[level] }));

		player.setEQ(...bands);

		return message.channel.send(`Bassboost setado em: ${level}`);
	},
	permissions: '',
	requiredRoles: [],
};
