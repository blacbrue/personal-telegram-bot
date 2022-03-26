const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");
const { Client } = require("discord.js");
require("dotenv").config()

/**
 *  @param { Client } client
 */

module.exports = (client) => {
  const slashCmd = [];
  const slashCmdFiles = fs
    .readdirSync("./slashCommands/")
    .filter((file) => file.endsWith(".js"));

  const clientId = client.user.id
  // const guildId = "943350037952487485";

  for (const file of slashCmdFiles) {
    const command = require(`../slashCommands/${file}`);
    slashCmd.push(command.data.toJSON());
    // console.log(command.data.toJSON())
  }

  const rest = new REST({
    version: "9",
  }).setToken(process.env.DISCORD_TOKEN);

  (async () => {
    try {
      console.log("[Main] Started refreshing application (/) commands.");

      await rest.put(Routes.applicationCommands(clientId), { body: slashCmd });
      // await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: slashCmd });

      console.log("[Main] Successfully reloaded application (/) commands.");
    } catch (error) {
      console.error(error);
    }
  })();
};
