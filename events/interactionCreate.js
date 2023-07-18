const DJS = require("discord.js")

module.exports = async (bot, interaction) => {
    if(interaction.type === DJS.InteractionType.ApplicationCommand) {
        let command = require(`../commands/${interaction.commandName}`)
        command.run(bot, interaction, interaction.options)
    }
}