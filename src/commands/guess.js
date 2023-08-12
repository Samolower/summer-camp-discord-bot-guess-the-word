const DJS = require("discord.js")
const fileFunctions = require("../fileFunctions/txtFunctions.js");

module.exports = {
    name: "guess",
    description: "Faire deviner un mot",
    permission: DJS.PermissionFlagsBits.Administrator,
    dm: false,
    options: [
        {
            type: "string",
            name: "mot",
            description: "Mot à faire deviner",
            required: true

        },
        {
            type: "string",
            name: "image",
            description: "Lien de l'image",
            required: true
        },
        {
            type: "string",
            name: "auteur",
            description: "Auteur du mot",
            required: true
        }
    ],

    async run(bot, message, args) {
        let word = args.get("mot").value;
        let imageLink = args.get("image").value;
        let mention = args.get("auteur").value;

        // Vérifier si un jeu est déjà en cours
        const channelId =  process.env.CHAN_ID_NEW_WORD;
        const channelEvent = message.guild.channels.cache.get(channelId);

        channelEvent.messages.fetch({ limit: 1 }).then(messages => {
            const lastMessage = messages.first();
        
            if (lastMessage.embeds.length > 0) {
                const hexColor = "#" + lastMessage.embeds[0].color.toString(16);
                if (hexColor !== "#da262e") {
                    message.reply({embeds: [sendGuessEmbed(word, imageLink, mention)]});
                }
                else {
                    const eb = new DJS.EmbedBuilder()
                        .setColor("#da262e")
                        .setDescription("「:x:」Un jeu est déjà en cours !")
                    message.reply({embeds: [eb], ephemeral: true})
                }
            }
            else {
                message.reply({embeds: [sendGuessEmbed(word, imageLink, mention)]});
            }
        }).catch(console.error);
    },
}

function sendGuessEmbed(word, imageLink, mention) {

    const eb = new DJS.EmbedBuilder()
        .setColor("#da262e")
        .setTitle("「:pencil2:」Summer Game: Guess the word !")
        .setDescription("A vous de deviner l'expression crypto qui se cache derrière cette image !\n\nBonne chance ! (Proposé par " + mention + ")\n\nTrouvé par : Personne n'a encore trouvé ! Faites vos propositions dans <#" + process.env.CHAN_ID_GAME + ">")
        .setImage(imageLink);
    fileFunctions.writeWord(word);

    return eb;
}
