package fr.neobile.cryptofr;

import fr.neobile.cryptofr.commands.FindCommand;
import net.dv8tion.jda.api.JDA;
import net.dv8tion.jda.api.JDABuilder;
import net.dv8tion.jda.api.Permission;
import net.dv8tion.jda.api.entities.Activity;
import net.dv8tion.jda.api.hooks.ListenerAdapter;
import net.dv8tion.jda.api.interactions.commands.DefaultMemberPermissions;
import net.dv8tion.jda.api.interactions.commands.OptionType;
import net.dv8tion.jda.api.interactions.commands.build.Commands;
import net.dv8tion.jda.api.requests.GatewayIntent;

public class Main extends ListenerAdapter {
    public static void main(String[] args) {
        JDA jda = JDABuilder.createDefault("MTEyOTg4OTQyMDIyOTczODUxOQ.GH7LZt.sAlJ0leq2nxT3orbi6SrLRwZ18gK1SypXBAXk8")
                .enableIntents(GatewayIntent.MESSAGE_CONTENT)
                .addEventListeners(new Main(), new FindCommand())
                .setActivity(Activity.watching("CryptoFR"))
                .build();

        jda.updateCommands().addCommands(
                Commands.slash("find", "Faire deviner un mot")
                        .addOption(OptionType.STRING, "mot", "Mot à faire deviner", true)
                        .addOption(OptionType.ATTACHMENT, "image", "Lien de l'image", true)
                        .addOption(OptionType.STRING, "auteur", "Auteur du mot", true)
                        .setDefaultPermissions(DefaultMemberPermissions.enabledFor(Permission.ADMINISTRATOR)).setGuildOnly(true)
        ).queue();
    }
}