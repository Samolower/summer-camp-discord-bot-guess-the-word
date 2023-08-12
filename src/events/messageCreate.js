const DJS = require("discord.js")
const txtFunctions = require("../fileFunctions/txtFunctions.js");
const pointFunctions = require("../fileFunctions/pointFunctions.js");

module.exports = async (bot, message) => {

    // Vérifier si l'auteur du message est l'auteur du mot à trouver

    var idAuthor = "";

    const channelId =  process.env.CHAN_ID_NEW_WORD;
    const channelEvent = message.guild.channels.cache.get(channelId);

    channelEvent.messages.fetch({ limit: 1 }).then(messages => {
        const lastMessage = messages.first();

        if (lastMessage.embeds.length > 0) {
            const lastEmbed = lastMessage.embeds[0];

            const mentionRegex = /<@(\d+)>/g;
            const matches = lastEmbed.description.match(mentionRegex);

            if (matches) {
                idAuthor = matches.map(match => match.replace(/<@(\d+)>/, "$1"))[0];
            }
        }
    }).catch(console.error);

    await new Promise(resolve => setTimeout(resolve, 500));

    if (message.channel.id == process.env.CHAN_ID_GAME && idAuthor !== message.author.id && txtFunctions.isFileNotEmpty("./dataFiles/wordtofind.txt")) {
        if (message.content.toLowerCase() === txtFunctions.readWord("./dataFiles/wordtofind.txt")) {
            let word = txtFunctions.readWord("./dataFiles/wordtofind.txt");

            // Ajouter une réaction "✅" au message
            message.react('✅').catch(console.error);

            // Féliciter le joueur
            const eb = new DJS.EmbedBuilder()
            eb.setDescription("「:white_check_mark:」Félicitations <@" + message.author.id + "> !");
            message.reply({ embeds: [eb] }).catch(console.error);

            // Récupérer le dernier message du bot dans le channel et le modifier
            const channelId =  process.env.CHAN_ID_NEW_WORD;
            const channelEvent = message.guild.channels.cache.get(channelId);

            channelEvent.messages.fetch({ limit: 10 }).then(messages => {
                const lastBotEmbedMessage = messages.find(msg => msg.author.bot && msg.embeds.length > 0);

                if(lastBotEmbedMessage) {
                    const lastEmbed = lastBotEmbedMessage.embeds[0];
                    const modifiedEmbed = new DJS.EmbedBuilder()
                        .setTitle("「:pencil2:」Summer Game: Guess the word !")
                        .setColor("#00ff00")
                        .setDescription(`A vous de deviner l'expression crypto qui se cache derrière cette image !\n\nBonne chance !\n\nTrouvé par : Trouvé par <@${message.author.id}> ! Il fallait trouver **"${word}"**`)
                        .setImage(lastEmbed.image?.url);

                    lastBotEmbedMessage.edit({ embeds: [modifiedEmbed] }).catch(console.error);
                }
            }).catch(console.error);

            // Attendre le temps que l'Embed s'envoie
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Effacer le mot du fichier
            txtFunctions.removeContent("./dataFiles/wordtofind.txt");

            // Ajouter les points aux joueurs + Trier les joueurs en fonction du nombre de points
            const points = await pointFunctions.loadPoints();
            const currentPoints = points.get(message.author.id) || 0;
            points.set(message.author.id, currentPoints + 1);
            const sortedPlayers = Array.from(points.entries()).sort((a, b) => b[1] - a[1]);
            await pointFunctions.savePoints(sortedPlayers);

            // Modifier le classement initial dans le channel
            const classementChannelId = process.env.CHAN_ID_LADDER;
            const channelClassement = message.guild.channels.cache.get(classementChannelId);

            channelClassement.messages.fetch({ limit: 10 }).then(classementMessages => {
                // Créer la description pour l'embed du classement
                let description = '';
                let position = 1;
                let lastPlayerPoints = null;

                for (const entry of sortedPlayers) {
                    const playerId = entry[0];
                    const playerPoints = entry[1];

                    // Attribuer la même position aux joueurs ayant le même nombre de points
                    if (playerPoints !== lastPlayerPoints) {
                        position = sortedPlayers.indexOf(entry) + 1;
                        lastPlayerPoints = playerPoints;
                    }

                    // Ajout d'un emoji special pour les trois premiers
                    let tag = position;
                    if (position === 1) tag = ':first_place:';
                    else if (position === 2) tag = ':second_place:';
                    else if (position === 3) tag = ':third_place:';
                  
                    description += `→ **#${tag}** <@${playerId}> : **${playerPoints} point(s)**\n`;
                }
              
                // Créer le nouvel Embed pour le classement
                const modifiedEmbed = new DJS.EmbedBuilder()
                    .setTitle("「:trophy:」Classement des Summer Games")
                    .setColor("#00ff00")
                    .setDescription(description);

                const lastBotEmbedMessage = classementMessages.find(msg => msg.author.bot && msg.embeds.length > 0);

                if (lastBotEmbedMessage) {
                    lastBotEmbedMessage.edit({ embeds: [modifiedEmbed] }).catch(console.error);
                }
                else {
                    channelClassement.send({ embeds: [modifiedEmbed] }).catch(console.error);
                }

                }).catch(console.error);

        }
        else {
            const words = message.content.trim().split(/\s+/);
            const wordtofind = txtFunctions.readWord("./dataFiles/wordtofind.txt").trim().split(/\s+/);
            if (words.length <= wordtofind.length && !message.author.bot) message.react('❌').catch(console.error);
        }
    }
}
