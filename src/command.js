client.on('interactionCreate', async (interaction) => {
	if (!interaction.isCommand() || !interaction.guildId) return;
	if (interaction.commandName === 'gping') {
		await interaction.deferReply();
		const queue = player.getQueue(interaction.guild);
		return void interaction.followUp({
			embeds: [
				{
					title: '⏱️ | Latency',
					fields: [
						{
							name: 'Bot Latency',
							value: `\`${Math.round(client.ws.ping)}ms\``,
						},
						{
							name: 'Voice Latency',
							value: !queue
								? 'N/A'
								: `UDP: \`${
										queue.connection.voiceConnection.ping
											.udp ?? 'N/A'
								  }\`ms\nWebSocket: \`${
										queue.connection.voiceConnection.ping
											.ws ?? 'N/A'
								  }\`ms`,
						},
					],
					color: 0xffffff,
				},
			],
		});
	}
	if (
		!(interaction.member instanceof GuildMember) ||
		!interaction.member.voice.channel
	) {
		return void interaction.reply({
			content: 'You are not in a voice channel!',
			ephemeral: true,
		});
	}
	if (
		interaction.guild.me.voice.channelId &&
		interaction.member.voice.channelId !==
			interaction.guild.me.voice.channelId
	) {
		return void interaction.reply({
			content: 'You are not in my voice channel!',
			ephemeral: true,
		});
	}
	if (
		interaction.commandName === 'gplay' ||
		interaction.commandName === 'gsoundcloud'
	) {
		await interaction.deferReply();
		const query = interaction.options.get('query').value;
		const searchResult = await player
			.search(query, {
				requestedBy: interaction.user,
				searchEngine:
					interaction.commandName === 'gsoundcloud'
						? QueryType.SOUNDCLOUD_SEARCH
						: QueryType.AUTO,
			})
			.catch(() => {});
		if (!searchResult || !searchResult.tracks.length)
			return void interaction.followUp({
				content: 'No results were found!',
			});
		const queue = await player.createQueue(interaction.guild, {
			metadata: interaction.channel,
			leaveOnEnd: false,
			leaveOnStop: false,
			leaveOnEmpty: false,
			autoSelfDeaf: false,
		});
		try {
			if (!queue.connection)
				await queue.connect(interaction.member.voice.channel);
		} catch {
			void player.deleteQueue(interaction.guildId);
			return void interaction.followUp({
				content: 'Could not join your voice channel!',
			});
		}
		await interaction.followUp({
			content: `⏱ | Loading your ${
				searchResult.playlist ? 'playlist' : 'track'
			}...`,
		});
		searchResult.playlist
			? queue.addTracks(searchResult.tracks)
			: queue.addTrack(searchResult.tracks[0]);
		if (!queue.playing) await queue.play();
	} else if (interaction.commandName === 'gvolume') {
		await interaction.deferReply();
		const queue = player.getQueue(interaction.guildId);
		if (!queue || !queue.playing)
			return void interaction.followUp({
				content: '❌ | No music is being played!',
			});
		const vol = interaction.options.get('amount');
		if (!vol)
			return void interaction.followUp({
				content: `🎧 | Current volume is **${queue.volume}**%!`,
			});
		if (vol.value < 0 || vol.value > 100)
			return void interaction.followUp({
				content: '❌ | Volume range must be 0-100',
			});
		const success = queue.setVolume(vol.value);
		return void interaction.followUp({
			content: success
				? `✅ | Volume set to **${vol.value}%**!`
				: '❌ | Something went wrong!',
		});
	} else if (interaction.commandName === 'gskip') {
		await interaction.deferReply();
		const queue = player.getQueue(interaction.guildId);
		if (!queue || !queue.playing)
			return void interaction.followUp({
				content: '❌ | No music is being played!',
			});
		const currentTrack = queue.current;
		const success = queue.skip();
		return void interaction.followUp({
			content: success
				? `✅ | Skipped **${currentTrack}**!`
				: '❌ | Something went wrong!',
		});
	} else if (interaction.commandName === 'gqueue') {
		await interaction.deferReply();
		const queue = player.getQueue(interaction.guildId);
		if (!queue || !queue.playing)
			return void interaction.followUp({
				content: '❌ | No music is being played!',
			});
		const currentTrack = queue.current;
		const tracks = queue.tracks.slice(0, 10).map((m, i) => {
			return `${i + 1}. **${m.title}** ([link](${m.url}))`;
		});
		return void interaction.followUp({
			embeds: [
				{
					title: 'Server Queue',
					description: `${tracks.join('\n')}${
						queue.tracks.length > tracks.length
							? `\n...${
									queue.tracks.length - tracks.length === 1
										? `${
												queue.tracks.length -
												tracks.length
										  } more track`
										: `${
												queue.tracks.length -
												tracks.length
										  } more tracks`
							  }`
							: ''
					}`,
					color: 0xff0000,
					fields: [
						{
							name: 'Now Playing',
							value: `🎶 | **${currentTrack.title}** ([link](${currentTrack.url}))`,
						},
					],
				},
			],
		});
	} else if (interaction.commandName === 'gpause') {
		await interaction.deferReply();
		const queue = player.getQueue(interaction.guildId);
		if (!queue || !queue.playing)
			return void interaction.followUp({
				content: '❌ | No music is being played!',
			});
		const paused = queue.setPaused(true);
		return void interaction.followUp({
			content: paused ? '⏸ | Paused!' : '❌ | Something went wrong!',
		});
	} else if (interaction.commandName === 'gresume') {
		await interaction.deferReply();
		const queue = player.getQueue(interaction.guildId);
		if (!queue || !queue.playing)
			return void interaction.followUp({
				content: '❌ | No music is being played!',
			});
		const paused = queue.setPaused(false);
		return void interaction.followUp({
			content: !paused ? '❌ | Something went wrong!' : '▶ | Resumed!',
		});
	} else if (interaction.commandName === 'gstop') {
		await interaction.deferReply();
		const queue = player.getQueue(interaction.guildId);
		if (!queue || !queue.playing)
			return void interaction.followUp({
				content: '❌ | No music is being played!',
			});
		queue.destroy();
		return void interaction.followUp({
			content: '🛑 | Stopped the player!',
		});
	} else if (interaction.commandName === 'gnp') {
		await interaction.deferReply();
		const queue = player.getQueue(interaction.guildId);
		if (!queue || !queue.playing)
			return void interaction.followUp({
				content: '❌ | No music is being played!',
			});
		const progress = queue.createProgressBar();
		const perc = queue.getPlayerTimestamp();
		return void interaction.followUp({
			embeds: [
				{
					title: 'Now Playing',
					description: `🎶 | **${queue.current.title}**! (\`${perc.progress}%\`)`,
					fields: [
						{
							name: '\u200b',
							value: progress,
						},
					],
					color: 0xffffff,
				},
			],
		});
	} else if (interaction.commandName === 'gloop') {
		await interaction.deferReply();
		const queue = player.getQueue(interaction.guildId);
		if (!queue || !queue.playing)
			return void interaction.followUp({
				content: '❌ | No music is being played!',
			});
		const loopMode = interaction.options.get('mode').value;
		const success = queue.setRepeatMode(loopMode);
		const mode =
			loopMode === QueueRepeatMode.TRACK
				? '🔂'
				: loopMode === QueueRepeatMode.QUEUE
				? '🔁'
				: '▶';
		return void interaction.followUp({
			content: success
				? `${mode} | Updated loop mode!`
				: '❌ | Could not update loop mode!',
		});
	} else if (interaction.commandName === 'gbassboost') {
		await interaction.deferReply();
		const queue = player.getQueue(interaction.guildId);
		if (!queue || !queue.playing)
			return void interaction.followUp({
				content: '❌ | No music is being played!',
			});
		await queue.setFilters({
			bassboost: !queue.getFiltersEnabled().includes('bassboost'),
			normalizer2: !queue.getFiltersEnabled().includes('bassboost'), // because we need to toggle it with bass
		});
		return void interaction.followUp({
			content: `🎵 | Bassboost ${
				queue.getFiltersEnabled().includes('bassboost')
					? 'Enabled'
					: 'Disabled'
			}!`,
		});
	} else {
		interaction.reply({
			content: 'Unknown command!',
			ephemeral: true,
		});
	}
});
