const { MessageEmbed } = require(`discord.js`);

module.exports = {
  name: "ban",
  aliases: ["hackban","fuck","fuckban"],
  edesc:"ban @user reason(optional)",
  description: `bans mentioned user`,
  userPermissions: ["BAN_MEMBERS"],
  botPermissions: ["BAN_MEMBERS"],
  category: "Moderation",
  cooldown: 10,
  


  run: async (client, message, args, prefix) => {
    // Code

    message.delete({ timeout: 300 })

    const victim = message.mentions.members.first();
    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No reasons specified";

    if (!victim) {

      emb = (new MessageEmbed()
        .setColor("#343A40")
        .setTitle("❌ Operation Unsuccessful !  ")
        .addFields({name:`ㅤ`,value: "\n **Can't BAN user !!" +
          "\n**REASON → : **" + "No users mentioned !"})
        .setTimestamp());

      message.channel.send({ embeds: [emb] })
    } else {

      if (message.member.roles.highest.position < victim.roles.highest.position && message.author.id != message.guild.ownerId) {

        emb = (new MessageEmbed()
          .setColor("#343A40")
          .setTitle("❌ Operation Unsuccessful !  ")
          .addFields({name:`ㅤ`,value: "\n **Can't BAN user !!" +
            "\n**REASON → : **" + "Member is superior to you !"})
          .setTimestamp());

        message.channel.send({ embeds: [emb] })

      } else {

        if (!victim.bannable) {
          emb = (new MessageEmbed()
            .setColor("#343A40")
            .setTitle("❌ Operation Unsuccessful !  ")
            .addFields({name:`ㅤ`,value: "\n **Can't BAN user !!" +
              "\n**REASON → : **" + "Member is superior to me !"})
            .setTimestamp());

          message.channel.send({ embeds: [emb] })


        }
        else {

          message.react("✅")


          emb = (new MessageEmbed()
            .setColor("#343A40")
            .setTitle("✅ Operation Successful !  ")
            .addField(`ㅤ`, "\n**BANNED → : **" + '<@' + victim + '> ' +
              "\n**SERVER → : **" + `${message.guild}` +
              "\n**REASON → : **" + reason +
              "\n**MODERATOR → : **" + '<@' + message.author.id + '> ')                       .setThumbnail(victim.displayAvatarURL({ dynamic: true }))
            .setTimestamp());

          await message.channel.send({ embeds: [emb] })

          emb2 = (new MessageEmbed()
            .setColor("#343A40")
            .setTitle("⚠️ YOU GOT BANNED !  ")
            .addField(`ㅤ`,"\n**SERVER → : **" + `${message.guild}` +
              "\n**REASON → : **" + reason +
              "\n**MODERATOR → : **" + '<@' + message.author.id + '> ')
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setTimestamp());

          victim.send({ embeds: [emb2] })

          victim.ban();

        }
      }
    }













  }
}
