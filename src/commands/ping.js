const DJS = require("discord.js")

module.exports = {
    name: "ping",
    description: "affiche la latence",
    permission: "none",
    dm: false,

    async run(bot, message, args) {
        await message.reply(`Ping: \`${bot.ws.ping}\``)
    }
}