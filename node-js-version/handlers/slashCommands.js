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
                await interaction.deferReply({ ephemeral: true })

                let chatid = interaction.options.getString("chatid")
                let messagets = interaction.options.getString("message")

                bot.sendMessage(chatid, messagets).then(interaction.followUp({ content: "Sent the message" }))
            } else if (interaction.commandName === "reply") {
                await interaction.deferReply({ ephemeral: true })

                let chatid = interaction.options.getString("chatid")
                let messagets = interaction.options.getString("message")
                let messageid = interaction.options.getString("messageid")

                bot.sendMessage(chatid, messagets, { reply_to_message_id: messageid }).then(interaction.followUp({ content: "Sent the message" }))
            }
        }
    })
}