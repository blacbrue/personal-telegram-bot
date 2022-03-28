const {
    Client
} = require("discord.js");

/**
 * @param { Client } client
 */

module.exports = (client, bot) => {
    client.on("interactionCreate", async interaction => {
        if (interaction.isCommand()) {
            if (interaction.commandName === "send") {
				await interaction.deferReply({ ephemeral: false })

                if (interaction.user.id !== "398752205043400724") {
                    return interaction.followUp({ ephemeral: true, content: "Imagine using this command lol" })
              	}
              
                let chatid = interaction.options.getString("chatid")
                let messagets = interaction.options.getString("message")

                bot.sendMessage(chatid, messagets)
                interaction.followUp({ content: "Sent the message: " + messagets })
            } else if (interaction.commandName === "reply") {
				await interaction.deferReply({ ephemeral: false })

                if (interaction.user.id !== "398752205043400724") {
                    return interaction.followUp({ ephemeral: true, content: "Imagine using this command lol" })
                }
              
                let chatid = interaction.options.getString("chatid")
                let messagets = interaction.options.getString("message")
                let messageid = interaction.options.getString("messageid")

                bot.sendMessage(chatid, messagets, { reply_to_message_id: messageid })
                  interaction.followUp({ content: "Sent the reply: " + messagets })
            }
        }
    })
}