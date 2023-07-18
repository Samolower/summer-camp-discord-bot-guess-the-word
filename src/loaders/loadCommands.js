const fs = require("fs")

module.exports = async bot => {
    fs.readdirSync("./commands").filter(f => f.endsWith(".js")).forEach(async file => {
        let command = require(`../commands/${file}`)
        bot.commands.set(command.name, command)
    })
}