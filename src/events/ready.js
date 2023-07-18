const DJS = require("discord.js")
const loadSlashCommands = require("../loaders/loadSlashCommands")

module.exports = async bot => {
    await loadSlashCommands(bot)
}