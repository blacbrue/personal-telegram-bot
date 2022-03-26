require("dotenv").config()
const TelegramBot = require('node-telegram-bot-api');
const token = process.env.API_KEY
const bot = new TelegramBot(token, {
    polling: true
})
module.exports = bot
console.log("Telegram bot is online")

// discord shit
const {
    Client,
    Intents
} = require("discord.js")
const discordToken = process.env.DISCORD_TOKEN

const client = new Client({
    intents: [Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_MESSAGES]
})

const slashCommands = require("./handlers/registerSlashCommands")
const slashCommandsE = require("./handlers/slashCommands")

client.on("ready", async () => {
    console.log(`Logged into ${client.user.tag}`)
    const j = await client.users.fetch("398752205043400724")
    slashCommands(client)
    slashCommandsE(client, bot)

    // telegram shit
    bot.onText(/^[eE]/, async (msg, match) => {
        let chatID = msg.chat.id
        // the intellisense on js is just built different
        // would consider moving to typescript
        let response = match[0]

        await bot.sendMessage(chatID, response)
    })

    bot.on("message", async msg => {
        if (msg.chat.type === "group") return

        if (msg.chat.type === "private") {
            const chatid = msg.chat.id
            const message = msg.text
            const messageid = msg.message_id
            const name = `${msg.from.first_name} ${msg.from.last_name}`

            console.log(`${new Date().toLocaleString()} UTC ${getTimeZone()}: ${name} (${chatid}) sent a private message: ${message} (${messageid})`)
            j.send({ content: `${new Date().toLocaleString()} UTC ${getTimeZone()}: ${name} (${chatid}) sent a private message: ${message} (${messageid})` })
        } else return
    })

})

function getTimeZone() {
    var offset = new Date().getTimezoneOffset(), o = Math.abs(offset);
    return (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
}

client.login(discordToken)