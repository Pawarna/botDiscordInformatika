const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('jorgan')
		.setDescription('Replies with INFORMATIKA!!! SATU PADU BERSATU!!!'),
	async execute(interaction) {
		await interaction.reply('INFORMATIKA!!!\nSATU PADU BERSATU!!!');
	},
};