// Logging 
const fs = require("fs")
const util = require('util')
var today = new Date()
var dateTime = today.getDate() + '.' + `${today.getMonth() + 1}` + '.' + today.getFullYear() + ' . ' + today.getHours() + '.' + today.getMinutes()
// console.log(dateTime)
fs.writeFileSync(__dirname + `/logs/${dateTime}.log`, 'Setting up log...\n')
var log_file = fs.createWriteStream(__dirname + `/logs/${dateTime}.log`, { flags: 'w' });
var log_stdout = process.stdout;

console.log = function (d) { //
    log_file.write(util.format(d) + '\n');
    log_stdout.write(util.format(d) + '\n');
};

require("dotenv").config()
const TelegramBot = require('node-telegram-bot-api');
const token = process.env["API_KEY"]
const bot = new TelegramBot(token, {
    polling: true
})
console.log("Telegram bot is online")

// discord shit
const {
    Client,
    Intents,
    WebhookClient
} = require("discord.js")
const discordToken = process.env["DISCORD_TOKEN"]

const client = new Client({
    intents: [Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_MESSAGES]
})

client.login(discordToken).catch(console.error)

const slashCommands = require("./handlers/registerSlashCommands")
const slashCommandsE = require("./handlers/slashCommands")

const errorWebhook = new WebhookClient({ url: process.env['webhookURL'] })

const mongoose = require("mongoose")
const mongoURI = process.env["mongoURI"]

mongoose.connect(mongoURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(() => { console.log("Connected to MongoDB") })

const userSchema = require("./schemas/users.js")

client.on("ready", async () => {
    console.log(`Logged into ${client.user.tag}`)
    const j = await client.users.fetch("398752205043400724")
    slashCommands(client)
    slashCommandsE(client, bot)
    errorWebhook.send({ content: "bot alive" })

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
			const schema = await userSchema.findOne({
				chatID: msg.chat.id
			})

			if (schema) {
				
			} else if (!schema) {
				console.log("New user talking. Saving info to database")
				j.send({ content: "New user talking. Saving info to database" })
				await userSchema.create({
					name: `${msg.from.first_name} ${msg.from.last_name}`,
					chatID: msg.chat.id,
					username: msg.chat.username					
				})
			}
        
            if (msg.video) {
                const fileID = msg.video.file_id
                const chatid = msg.chat.id
                const message = await bot.getFileLink(fileID)
                const messageid = msg.message_id
                const name = `${msg.from.first_name} ${msg.from.last_name}`

                console.log(`${new Date().toLocaleString()} UTC ${getTimeZone()}: ${name} (${chatid}) sent a video message: ${message} (${messageid})`)
                j.send({
                    content: `${new Date().toLocaleString()} UTC ${getTimeZone()}: ${name} (${chatid}) sent a video message: ${message} (${messageid})`
                })
            } else if (msg.location) {
                const message = `Latitude: ${msg.location.latitude}, Longitude: ${msg.location.longitude}`
                const chatid = msg.chat.id
                const messageid = msg.message_id
                const name = `${msg.from.first_name} ${msg.from.last_name}`

                console.log(`${new Date().toLocaleString()} UTC ${getTimeZone()}: ${name} (${chatid}) sent a location: ${message} (${messageid})`)
                j.send({
                    content: `${new Date().toLocaleString()} UTC ${getTimeZone()}: ${name} (${chatid}) sent a location: ${message} (${messageid})`
                })
            } else if (msg.document) {
                const fileID = msg.document.file_id
                const message = await bot.getFileLink(fileID)
                const messageid = msg.message_id
                const name = `${msg.from.first_name} ${msg.from.last_name}`
                const chatid = msg.chat.id

                console.log(`${new Date().toLocaleString()} UTC ${getTimeZone()}: ${name} (${chatid}) sent a document: ${message} (${messageid})`)
                j.send({
                    content: `${new Date().toLocaleString()} UTC ${getTimeZone()}: ${name} (${chatid}) sent a document: ${message} (${messageid})`
                })
            } else if (msg.contact) {
                const contact = msg.contact
                const message = `Name: ${contact.first_name} ${contact.last_name}, Phone number: ${contact.phone_number}, User ID: ${contact.user_id}, VCard: ${contact.vcard}`
                const messageid = msg.message_id
                const name = `${msg.from.first_name} ${msg.from.last_name}`
                const chatid = msg.chat.id

                console.log(`${new Date().toLocaleString()} UTC ${getTimeZone()}: ${name} (${chatid}) sent a contact: ${message} (${messageid})`)
                j.send({
                    content: `${new Date().toLocaleString()} UTC ${getTimeZone()}: ${name} (${chatid}) sent a contact: ${message} (${messageid})`
                })
            } else {
                const chatid = msg.chat.id
                const message = msg.text
                const messageid = msg.message_id
                const name = `${msg.from.first_name} ${msg.from.last_name}`

                console.log(`${new Date().toLocaleString("en-US", { timeZone: "Asia/Kuala_Lumpur" })}: ${name} (${chatid}) sent a private message: ${message} (${messageid})`)
                j.send({
                    content: `${new Date().toLocaleString("en-US", { timeZone: "Asia/Kuala_Lumpur" })}: ${name} (${chatid}) sent a private message: ${message} (${messageid})`
                })
            }
        } else return
    })

})

function getTimeZone() {
    var offset = new Date().getTimezoneOffset(), o = Math.abs(offset);
    return (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
}

process.on('uncaughtException', function (err) {
    console.error(err.stack);
    console.log("Node NOT Exiting...");
    errorWebhook.send({
        content: `\`\`\`bash${err.stack}\`\`\``
    })
});

process.on("unhandledRejection", err => {
    console.error(err.stack);
    console.log("Node NOT Exiting...");
  errorWebhook.send({
        content: `\`\`\`${err.stack}\`\`\``
    })
})