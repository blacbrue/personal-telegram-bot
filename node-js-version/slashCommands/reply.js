const { SlashCommandBuilder } = require("@discordjs/builders")

const data1 = new SlashCommandBuilder()
    .setName("reply")
    .setDescription("Reply to user message")
    .addStringOption(option => {
        option.setName("chatid")
            .setDescription("chat id")
            .setRequired(true)
            return option
    })
    .addStringOption(option => {
        option.setName("messageid")
            .setDescription("message id")
            .setRequired(true)
            return option
    })
    .addStringOption(option => {
        option.setName("message")
            .setDescription("message")
            .setRequired(true)
            return option
    })

module.exports = {
    data: data1
}