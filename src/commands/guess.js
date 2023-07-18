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

        const eb = new DJS.EmbedBuilder()
        eb.setColor("Red").setDescription("A vous de deviner l'expression crypto qui se cache derrière cette image !\n\nBonne chance ! (Proposé par " + mention + ")\n\nTrouvé par : Personne n'a encore trouvé ! Faites vos propositions dans " + process.env.CHAN_URL_GAME).setImage(imageLink);
        fileFunctions.writeWord(word);
        
        message.reply({embeds: [eb]});
    },
}

