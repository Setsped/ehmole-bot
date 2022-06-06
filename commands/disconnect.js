module.exports = {
	commands: ['disconnect', 'dc', 'leave'],
	expectedArgs: '',
	permissionError: '',
	minArgs: 0,
	maxArgs: 0,
	callback: async (message, arguments, text) => {
		if (message.channel.id === '753413520606887967') return;

		const { channel } = message.member.voice;
		if (!channel) return;

		const player = await message.client.manager.get(message.guild.id);

		if (channel.id !== message.guild.voice.channel.id) {return message.channel.send('voce nem ta na mesma call que eu 🙄');}

		if (player) {
			player.destroy();
		}

		channel.leave();
	},
	permissions: '',
	requiredRoles: [],
};
