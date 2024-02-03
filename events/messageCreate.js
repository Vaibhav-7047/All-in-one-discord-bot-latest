const { cooldown, check_dj, databasing } = require("../handlers/functions");
const client = require("..");
const { PREFIX: botPrefix, emoji } = require("../settings/config");
const { Permissions, MessageEmbed } = require("discord.js");
const np = require("../settings/np") //no prefix


client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.guild || !message.id) return;
  await databasing(message.guildId, message.author.id);
  let settings = await client.music.get(message.guild.id);
  let prefix = settings?.prefix || botPrefix;
  if (np.np.includes(message.author.id) && !message.content.startsWith(prefix) && !message.content.includes(client.user.id)) prefix = ""
  let mentionprefix = new RegExp(
    `^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`
  );
  if (!mentionprefix.test(message.content)) return;
  const [, nprefix] = message.content.match(mentionprefix);
  const args = message.content.slice(nprefix.length).trim().split(/ +/);
  const cmd = args.shift().toLowerCase();
  if (cmd.length === 0) {
    if (nprefix.includes(client.user.id)) {
      return message.reply({
      embeds: [
        new MessageEmbed()
          .setTitle(`${client.user.username} , \nA multi-purpose Bot`)
          .setThumbnail(client.user.displayAvatarURL({dynamic:true}))
          .addFields(
            {
              name: `•  My prefix is \`${prefix}\``,
              value: `•  To get started : Type  \`${prefix}help\``
            }
          )
      ]
    }
    )
  }
      
    
  }
  const command =
    client.mcommands.get(cmd) ||
    client.mcommands.find((cmds) => cmds.aliases && cmds.aliases.includes(cmd));
  if (!command) return;
  if (command) {
    let queue = client.distube.getQueue(message.guild.id);
    let voiceChannel = message.member.voice.channel;
    let botChannel = message.guild.me.voice.channel;
    let checkDJ = await check_dj(client, message.member, queue?.songs[0]);

    if (
      !message.member.permissions.has(
        Permissions.FLAGS[command.userPermissions] || []
      )
    ) {
      return client.embed(
        message,
        `You Don't Have \`${command.userPermissions}\` Permission to Use \`${command.name}\` Command!!`
      );
    } else if (
      !message.guild.me.permissions.has(
        Permissions.FLAGS[command.botPermissions] || []
      )
    ) {
      return client.embed(
        message,
        `I Don't Have \`${command.botPermissions}\` Permission to Use \`${command.name}\` Command!!`
      );
    } else if (cooldown(message, command)) {
      return client.embed(
        message,
        ` You are On Cooldown , wait \`${cooldown(
          message,
          command
        ).toFixed()}\` Seconds`
      );
    } else if (command.inVoiceChannel && !voiceChannel) {
      return client.embed(
        message,
        `${emoji.ERROR} You Need to Join Voice Channel`
      );
    } else if (
      command.inSameVoiceChannel &&
      botChannel &&
      !botChannel?.equals(voiceChannel)
    ) {
      return client.embed(
        message,
        `${emoji.ERROR} You Need to Join ${botChannel} Voice Channel`
      );
    } else if (command.Player && !queue) {
      return client.embed(message, `${emoji.ERROR} Music Not Playing`);
    } else if (command.djOnly && checkDJ) {
      return client.embed(
        message,
        `${emoji.ERROR} You are not DJ and also you are not song requester..`
      );
    } else {
      command.run(client, message, args, nprefix, queue);
    }
  }
});

function escapeRegex(newprefix) {
  return newprefix.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
}