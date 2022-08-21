require('dotenv').config();
const path = require('path');
const Discord = require('discord.js');
const fs = require('fs');
const { Manager } = require('erela.js');
const { Client } = require('discord.js');
const client = new Client();
require('discord-buttons')(client);
const Spotify = require('erela.js-spotify');
const filter = require('fairy-erela.js-filters');

let mensagemNP = null,
	TrackDuration;
const SpotifyThumb =
    'https://i.pinimg.com/564x/9e/75/23/9e75237755b7261a24668d240b5d1cdf.jpg';
const clientID = process.env.clientID;
const clientSecret = process.env.clientSecret;

client.manager = new Manager({
	plugins: [
		new filter(),
		new Spotify({
			clientID,
			clientSecret,
		}),
	],
	nodes: [
		{
			host: 'lavalink-dos-cria.herokuapp.com',
			identifier: 'Musica',
			port: 80,
			password: 'senhadolavalink',
		},
	],

	send(id, payload) {
		const guild = client.guilds.cache.get(id);
		if (guild) guild.shard.send(payload);
	},
})
	.on('nodeConnect', (node) =>
		console.log(`Node ${node.options.identifier} Conectado`),
	)
	.on('nodeError', (node, error) =>
		console.log(
			`Node ${node.options.identifier} ocorreu um erro: ${error.message}`,
		),
	)
	.on('trackStart', async (player, track) => {
		if (track.duration >= 9023372036854776000) {
			TrackDuration = 'Live';
		}
		else {
			TrackDuration = ssTohms(track.duration / 1000);
		}
		const embedNP = new Discord.MessageEmbed()
			.setTitle('♪ Tocando agora ♪')
			.setColor('#faebd7')
			.setThumbnail(`${track.thumbnail || SpotifyThumb}`)
			.setDescription(`[${track.title}](${track.uri || null})`)
			.addFields(
				{
					name: 'Canal',
					value: track.author || '\u200b',
					inline: true,
				},
				{ name: 'Duração', value: TrackDuration, inline: true },
				{
					name: '\u200B',
					value: '`Requested by: `' + '<@' + track.requester + '>',
				},
			);

		if (mensagemNP === null) {
			mensagemNP = await client.channels.cache
				.get(player.textChannel)
				.send(embedNP);
		}
		else {
			mensagemNP.delete().catch((err) => {
				console.log(err);
			});
			mensagemNP = await client.channels.cache
				.get(player.textChannel)
				.send(embedNP);
		}
	})
	.on('queueEnd', (player) => {
		client.channels.cache.get(player.textChannel);

		player.destroy();
	});

client.on('ready', async () => {
	console.log(
		`\u001b[1;36m${client.user.username} ` +
            '\u001b[1;34m entrou no servidor. oikkkk \u001b[0m',
	);

	client.manager.init(client.user.id);
	console.log('Manager Iniciado!');

	const baseFile = 'commands-base.js';
	const commandBase = require(`./commands/${baseFile}`);

	const readCommands = (dir) => {
		// Vai ler os arquivos dentro do commands e armazenar em dir.
		const files = fs
			.readdirSync('./commands')
			.filter((file) => file.endsWith('.js'));

		for (const file of files) {
			// Vai checar se o diretório é uma folder ou archive.
			const stat = fs.lstatSync(path.join(__dirname, dir, file));
			if (stat.isDirectory()) {
				// Se for uma folder vai chamar a função de novo e rodar para os archives dentro dela.
				readCommands(path.join(dir, file));
			}
			else if (file !== baseFile) {
				const option = require(path.join(__dirname, dir, file));
				commandBase(option);
			}
		}
	};
	readCommands('commands');
	commandBase.listen(client);
});

client.on('raw', (d) => client.manager.updateVoiceState(d));

client.on('message', (message) => {
	if (message.author.bot) return;
	if (message.guild === null) return;
	if (message.channel.type === 'voice') return;
	try {
		console.log(
			`\u001B[1m \u001B[35m{${message.guild.name}}\u001B[36m [${message.channel.name}] \u001B[21m \u001B[34m(${message.member.user.tag}):\u001B[0m ${message.content}`,
		);
	}
	catch (error) {
		console.log(error);
	}
});

client.on('voiceStateUpdate', async (member) => {
	const guildID = member.member.guild.id;
	const botChannel = client.voice.connections.get(guildID);

	try {
		if (botChannel) {
			const player = await client.manager.get(guildID);
			if (player === undefined) return;

			player.voiceChannel = botChannel;
			const songQueue = player.queue;

			if (botChannel.channel.members.size == 1 && !songQueue) {
				botChannel.channel.leave();
				player.destroy();
			}
		}
	}
	catch (err) {
		console.log(err);
	}
});

client.login(process.env.DISCORD_BOT_TOKEN);

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
