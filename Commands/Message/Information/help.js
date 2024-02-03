const {
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
} = require("discord.js");

module.exports = {
  name: "help",
  aliases: ["h", "cmds", "commands"],
  edesc: "help",
  description: `need help ? see my all commands`,
  userPermissions: [],
  botPermissions: [],
  category: "Information",
  cooldown: 5,

  run: async (client, message, args, prefix) => {
    // Code

    message.delete({ timeout: 1000 });

    const emoji = {
      Channel: "📺",
      Fun: "😄",
      Games: "🎮",
      Information: "ℹ️",
      Level: "🆙",
      Moderation: "🛠️",
      Music: "🎵",
      Settings: "⚙️",
      Utility: "🔧",
    };

    const desc = {
      Channel: "View commands related to channels",
      Fun: "View commands that are fun related",
      Games: "View commands that can be used to play games",
      Information: "View commands to get info about the bot",
      Level: "View commands that can be used for the level system",
      Moderation: "View commands that can be used for moderation",
      Music: "View music-related commands",
      Settings: "View setup and settings-related commands",
      Utility: "View utility-related commands",
    };

    let raw = new MessageActionRow().addComponents([
      new MessageSelectMenu()
        .setCustomId("help-menu")
        .setPlaceholder(`Help Menu . . .`)
        .addOptions([
          {
            label: `Home`,
            value: "home",
            emoji: "🏠",
            description: `Click to go to Homepage`,
          },
          ...client.mcategories.map((cat) => {
            return {
              label: `${cat.toLocaleUpperCase()}`,
              value: cat,
              emoji: emoji[cat],
              description: desc[cat],
            };
          }),
        ]),
    ]);

    let help_embed = new MessageEmbed()
      .setColor("#343A40")
      .setAuthor({
        name: client.user.username + ` Help Menu`,
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      })
      .setFooter("This Command Will Be Deactivated After 60sec.")
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
      .setDescription(" • Prefix for this server is `.`\n• Total commands: 78\n• [Invite](https://discord.com/api/oauth2/authorize?client_id=1093113690548621332&permissions=84992&scope=bot%20applications.commands) | [Join](https://discord.gg/codersplanet)\n > 🤴 **__My Categories are__** :\n\n >>>   🏠  Home\n📺  Channel\n😄  Fun\n🎮   Games\nℹ️   Information\n🆙  Level\n🛠️  Moderation\n🎵  Music\n⚙️  Settings\n🔧  Utility")
      .addField("🤴 **__STATS:__**",
        `>>> 📊 on **${client.guilds.cache.size} Servers**\n📶  **\`${Math.floor(client.ws.ping)}ms\` Ping**`);


    let main_msg = await message.channel.send({
      embeds: [help_embed],
      components: [raw],
    });

    let filter = (i) => i.user.id === message.author.id;
    let colector = await main_msg.createMessageComponentCollector({
      filter: filter,
      time: 60000,
    });
    colector.on("collect", async (i) => {
      if (i.isSelectMenu()) {
        await i.deferUpdate().catch((e) => { });
        if (i.customId === "help-menu") {
          let [directory] = i.values;
          if (directory == "home") {
            main_msg.edit({ embeds: [help_embed] }).catch((e) => { });
          } else {
            main_msg
              .edit({
                embeds: [
                  new MessageEmbed()
                    .setColor("#0B666A")
                    .setTitle(
                      `${emoji[directory]} ${directory} Commands ${emoji[directory]}`
                    )
                    .setThumbnail(message.guild.iconURL({ dynamic: true }))
                    .setDescription(
                      `>>> ${client.mcommands
                        .filter((cmd) => cmd.category === directory)
                        .map((cmd) => {
                          return `• ** ${cmd.name}** → ${cmd.description} \n`;
                        })
                        .join("")}`
                    )
                    .setFooter(client.getFooter(message.author)),
                ],
              })
              .catch((e) => null);
          }
        }
      }
    });

    colector.on("end", async (c, i) => {
      raw.components.forEach((c) => c.setDisabled(true));
      main_msg.edit({ components: [raw] }).catch((e) => { }).then(msg => {
        setTimeout(() => msg.delete(), 1000)
      })
    });
  },
};
