client.on('messageCreate', async (message) => {
	if (message.author.bot || !message.guild) return;
	if (!client.application?.owner) await client.application?.fetch();
	if (
		message.content === '!deploy' 
		// &&
		// message.author.id === client.application?.owner?.id
	) {
		await message.guild.commands.set([
			{
				name: 'gplay',
				description: 'Plays a song from youtube',
				options: [
					{
						name: 'query',
						type: 'STRING',
						description: 'The song you want to play',
						required: true,
					},
				],
			},
			{
				name: 'gvolume',
				description: 'Sets music volume',
				options: [
					{
						name: 'amount',
						type: 'INTEGER',
						description: 'The volume amount to set (0-100)',
						required: false,
					},
				],
			},
			{
				name: 'gloop',
				description: 'Sets loop mode',
				options: [
					{
						name: 'mode',
						type: 'INTEGER',
						description: 'Loop type',
						required: true,
						choices: [
							{
								name: 'Off',
								value: QueueRepeatMode.OFF,
							},
							{
								name: 'Track',
								value: QueueRepeatMode.TRACK,
							},
							{
								name: 'Queue',
								value: QueueRepeatMode.QUEUE,
							},
							{
								name: 'Autoplay',
								value: QueueRepeatMode.AUTOPLAY,
							},
						],
					},
				],
			},
			{
				name: 'gskip',
				description: 'Skip to the current song',
			},
			{
				name: 'gqueue',
				description: 'See the queue',
			},
			{
				name: 'gpause',
				description: 'Pause the current song',
			},
			{
				name: 'gresume',
				description: 'Resume the current song',
			},
			{
				name: 'gstop',
				description: 'Stop the player',
			},
			{
				name: 'gnp',
				description: 'Now Playing',
			},
			{
				name: 'gbassboost',
				description: 'Toggles bassboost filter',
			},
			{
				name: 'gping',
				description: 'Shows bot latency',
			},
		]);
		await message.reply('Deployed!');
	}
});