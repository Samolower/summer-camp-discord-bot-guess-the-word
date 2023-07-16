package fr.neobile.cryptofr.commands;

import java.awt.*;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;
import java.util.List;
import net.dv8tion.jda.api.EmbedBuilder;
import net.dv8tion.jda.api.entities.Message;
import net.dv8tion.jda.api.entities.MessageEmbed;
import net.dv8tion.jda.api.entities.channel.concrete.TextChannel;
import net.dv8tion.jda.api.entities.emoji.Emoji;
import net.dv8tion.jda.api.events.interaction.command.SlashCommandInteractionEvent;
import net.dv8tion.jda.api.events.message.MessageReceivedEvent;
import net.dv8tion.jda.api.hooks.ListenerAdapter;

public class FindCommand extends ListenerAdapter {

    private static final String POINTS_FILE = "points.txt";

    @Override
    public void onSlashCommandInteraction(SlashCommandInteractionEvent event) {
        if (event.getName().equals("find")) {
            String word = event.getOptions().get(0).getAsString();
            String imageLink = event.getOption("image").getAsAttachment().getUrl();
            String mention = event.getOptions().get(2).getAsString();

            EmbedBuilder eb = new EmbedBuilder();
            eb.setColor(Color.RED).setDescription("A vous de deviner l'expression du lexique (https://journalducoin.com/lexique/) qui se cache derrière cette image !\n\nBonne chance ! (Proposé par " + mention + ")\n\nTrouvé par : Personne n'a encore trouvé ! Faites vos propositions dans https://discord.com/channels/926375322293768213/1126205527244931194").setImage(imageLink);
            writeWord(word);

            event.replyEmbeds(eb.build()).queue();
        }
    }

    @Override
    public void onMessageReceived(MessageReceivedEvent event) {
        try {
            if (event.getMessage().getChannel().getId().equals("1130131501833523331") && Files.size(Paths.get("wordtofind.txt")) != 0) {
                if (event.getMessage().getContentRaw().equals(readWord("wordtofind.txt"))) {

                    String word = readWord("wordtofind.txt");

                    // Ajouter check reaction
                    event.getMessage().addReaction(Emoji.fromUnicode("U+2705")).queue();

                    // Féliciter le joueur
                    EmbedBuilder eb = new EmbedBuilder();
                    eb.setDescription("「:white_check_mark:」Félicitation <@" + event.getAuthor().getId() + "> !");
                    event.getChannel().sendMessageEmbeds(eb.build()).queue();

                    // Récupérer le dernier message du bot dans le channel et le modifier
                    TextChannel channelEvent = event.getGuild().getTextChannelById("1130131481424048188");
                    List<Message> messages = channelEvent.getHistory().retrievePast(10).complete();

                    for (Message message : messages) {
                        if (!message.getEmbeds().isEmpty()) {
                            MessageEmbed lastEmbed = message.getEmbeds().get(0);
                            EmbedBuilder modifiedEmbed = new EmbedBuilder();
                            modifiedEmbed.setColor(Color.GREEN).setDescription("A vous de deviner l'expression du lexique (https://journalducoin.com/lexique/) qui se cache derrière cette image !\n\nBonne chance !\n\nTrouvé par : Trouvé par <@" + event.getAuthor().getId() + "> ! Il fallait trouver **\"" + readWord("wordtofind.txt") + "\"** https://journalducoin.com/lexique/" + word + "/")
                                    .setImage(lastEmbed.getImage().getUrl());
                            message.editMessageEmbeds(modifiedEmbed.build()).queue();
                            break;
                        }
                    }

                    // Attendre le temps que l'Embed s'envoie
                    try {
                        Thread.sleep(2000);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }

                    // Effacer le mot du fichier
                    removeContent("wordtofind.txt");

                    // Ajouter les points aux joueurs
                    Map<String, Integer> points = loadPoints();
                    int currentPoints = points.getOrDefault(event.getAuthor().getId(), 0);
                    points.put(event.getAuthor().getId(), currentPoints + 1);

                    // Trier les joueurs en fonction du nombre de points
                    List<Map.Entry<String, Integer>> sortedPlayers = new ArrayList<>(points.entrySet());
                    sortedPlayers.sort(Map.Entry.comparingByValue(Comparator.reverseOrder()));
                    savePoints(sortedPlayers);

                    // Modifier le classement initial dans le channel
                    TextChannel channelClassement = event.getGuild().getTextChannelById("1130131525799788554");
                    List<Message> classement = channelClassement.getHistory().retrievePast(10).complete();

                    StringBuilder descriptionBuilder = new StringBuilder();
                    int position = 1;
                    for (Map.Entry<String, Integer> entry : sortedPlayers) {
                        String playerId = entry.getKey();
                        int playerPoints = entry.getValue();
                        descriptionBuilder.append("#").append(position).append(": <@").append(playerId).append("> - ")
                                .append(playerPoints).append(" point(s)\n");
                        position++;
                    }

                    EmbedBuilder modifiedEmbed = new EmbedBuilder();
                    modifiedEmbed.setColor(Color.GREEN).setDescription(descriptionBuilder.toString());

                    if (classement.isEmpty()) {
                        channelClassement.sendMessageEmbeds(modifiedEmbed.build()).queue();
                    }
                    else {
                        for (Message message : classement) {
                            if (!message.getEmbeds().isEmpty()) {
                                message.editMessageEmbeds(modifiedEmbed.build()).queue();
                                break;
                            }
                        }
                    }
                }
                else {
                    String[] words = event.getMessage().getContentRaw().trim().split("\\s+");
                    if (words.length == 1 && !event.getAuthor().isBot()) {
                        event.getMessage().addReaction(Emoji.fromUnicode("U+274C")).queue();
                    }
                }
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public void writeWord(String word) {
        String filePath = "wordtofind.txt";
        try (BufferedWriter chosenWriter = new BufferedWriter(new FileWriter(filePath, false))) {
            chosenWriter.write(word);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public String readWord(String filePath) {
        try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {
            return reader.readLine().toLowerCase();
        } catch (IOException e) {
            e.printStackTrace();
            return "";
        }
    }

    public void removeContent(String filePath) {
        try {
            BufferedWriter writer = new BufferedWriter(new FileWriter(filePath));
            writer.write("");
            writer.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private Map<String, Integer> loadPoints() {
        Map<String, Integer> points = new HashMap<>();
        try (BufferedReader reader = new BufferedReader(new FileReader(POINTS_FILE))) {
            String line;
            while ((line = reader.readLine()) != null) {
                String[] parts = line.split(":");
                if (parts.length == 2) {
                    String playerId = parts[0];
                    int playerPoints = Integer.parseInt(parts[1]);
                    points.put(playerId, playerPoints);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return points;
    }

    private void savePoints(List<Map.Entry<String, Integer>> sortedPlayers) {
        try (PrintWriter writer = new PrintWriter(new FileWriter(POINTS_FILE))) {
            for (Map.Entry<String, Integer> entry : sortedPlayers) {
                String playerId = entry.getKey();
                int playerPoints = entry.getValue();
                writer.println(playerId + ":" + playerPoints);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
