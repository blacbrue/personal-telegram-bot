const mongoose = require("mongoose")

const schema = new mongoose.Schema({
	name: String,
	chatID: String,
	username: String
})

module.exports = mongoose.model("users", schema)