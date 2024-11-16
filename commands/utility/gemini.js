const { SlashCommandBuilder } = require('discord.js');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { AI_TOKEN } = process.env;
const fs = require('fs');

const genAI = new GoogleGenerativeAI(AI_TOKEN);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ai")
    .setDescription("Ask Gemini AI for creative text formats")
    .addStringOption(option =>
      option
        .setName("prompt") // Clearer option name
        .setDescription("Provide a text prompt for Gemini AI to generate")
        .setRequired(true) // Make prompt mandatory
    ),
  async execute(interaction) {
    const prompt = interaction.options.getString("prompt");

    
    await interaction.deferReply(); // Defer the initial reply (hidden)

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response.text();

      // Split the response text into chunks of 2000 characters or less
      const chunks = response.match(/[\s\S]{1,2000}/g);

      // Send each chunk as a separate follow-up message
      for (const chunk of chunks) {
        const formattedResponse = {
          content: chunk,
        };

        await interaction.followUp(formattedResponse);
      }
    } catch (error) {
      console.error("Error generating text:", error);

      // Provide a more informative error message
      await interaction.followUp({
        content: "An error occurred while processing your request. Check the console for details.",
      });
    }
  },
};
