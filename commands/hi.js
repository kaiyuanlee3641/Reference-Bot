const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hi')
		.setDescription('says a friendly greeting message'),
	async execute(interaction) {
		await interaction.reply('https://i.pinimg.com/600x315/b0/1c/8a/b01c8a067842fa576cd9d370f487cfa6.jpg');
	},
};