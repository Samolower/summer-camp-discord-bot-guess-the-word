const dotenv = require('dotenv')
const DJS = require("discord.js")
const bot = new DJS.Client({intents: 3276799})
const loadCommands = require("./loaders/loadCommands")
const loadEvents = require("./loaders/loadEvents")

//Read .env file to set up env variables
dotenv.config();

bot.commands = new DJS.Collection();

bot.login(process.env.BOT_TOKEN)
loadCommands(bot)
loadEvents(bot)
