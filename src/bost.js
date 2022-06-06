require('dotenv').config();

// console.log(process.env.DISCORD_BOT_TOKEN);

const { Client } = require('discord.js');
const client = new Client({
	partials: ['MESSAGE', 'REACTION'],
});
const commands = require('./commands.js');
const reaction_role = require('./reaction_role.js');
const { PREFIX } = require('../config.json');

client.on('ready', () => {
	console.log(`${client.user.username} entrou no servidor. oikkkk`);
});

client.on('message', (message) => {
	// author, escanear mensagens de usuário talvez.
	console.log(`[${message.author.tag}]: ${message.content}`);
	if (message.author.bot) return; // verifica se a mensagem é de um bot
	switch (message.content.toLowerCase()) {
	case 'oi':
		message.reply('oi');
		break;
	case 'para':
		message.reply('parei');
		break;
	case 'oikkk':
		message.channel.send('oikkk');
		break;
	case 'teste':
		break;
	case 'peça':
	case 'peças':
	case 'pedaços':
		message.channel.send(
			'https://tenor.com/view/pirate-dance-music-radio-mustache-gif-17090901',
		);
		break;
	case '<@!804422431548112896>':
		message.reply('q');
	}
	if (message.content.startsWith(PREFIX)) {
		const [CMD_NAME, ...args] = message.content
			.toLocaleLowerCase()
			.trim() // separa a str por espaços
			.substr(PREFIX.length) // vai ler o comando após o prefixo.
			.split(' '); // colocar str separados por espaço no args
		console.log(CMD_NAME);
		// let scuffed = await client.users.fetch(args[0]);
		const scuffed = message.guild.members.cache.get(args[0]);
		const member = message.mentions.members.first();
		const { MessageAttachment } = require('discord.js');
		const messageAttachment = new MessageAttachment(`${arguments}`);

		// COMANDOS
		switch (CMD_NAME) {
		case 'kick':
			commands.kickUser(member, args, message);
			break;
		case 'ameaça':
			commands.ameacaUser(message);
			break;
		case 'ban':
			commands.banUser(member, args, message);
			break;
		case 'unban':
			commands.unbanUser(member, args, message);
			break;
		case 'festa':
			commands.festa(message);
			break;
		}
	}
});

client.on('messageReactionAdd', (reaction, user, message) => {
	const { name } = reaction.emoji;
	const member = reaction.message.guild.members.cache.get(user.id);
	if (reaction.message.id === '859195668052443136') {
		reaction_role.roleReactionAdd(name, message, member);
	}
});

client.on('messageReactionRemove', (reaction, user, message) => {
	const { name } = reaction.emoji;
	const member = reaction.message.guild.members.cache.get(user.id);
	if (reaction.message.id === '859195668052443136') {
		reaction_role.roleReactionRemove(name, message, member);
	}
});

client.login(process.env.DISCORD_BOT_TOKEN);
