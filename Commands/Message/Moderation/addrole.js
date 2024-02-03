const { MessageEmbed } = require(`discord.js`);

module.exports = {
  name: "addrole",
  aliases: ["roleadd"],
  edesc:"addrole @user @role reason(optional)",
  description: `adds role to mentioned user`,
  userPermissions: ["MANAGE_ROLES"],
  botPermissions: ["MANAGE_ROLES"],
  category: "Moderation",
  cooldown: 10,


  run: async (client, message, args, prefix, queue) => {
    // Code

    message.delete({ timeout: 300 })

    const victim = message.mentions.members.first();
    const role = message.mentions.roles.first();
    let reason = args.slice(2).join(" ");
    if (!reason) reason = "No reasons specified";


    if (!victim) {

      emb = (new MessageEmbed()
        .setColor("#343A40")
        .setTitle("❌ Operation Unsuccessful !  ")
        .addFields(
          {
            name:`ㅤ`,
            value: "\n **Can't add role to user !!" +
          "\n**REASON → : **" + "No users mentioned ! \n\`If you are using user id use it as <@& USER_ID >\`"
          }
        )
        .setTimestamp());

      message.channel.send({ embeds: [emb] })
    } else {
      if (!role) {

        emb = (new MessageEmbed()
          .setColor("#343A40")
          .setTitle("❌ Operation Unsuccessful !  ")
          .addFields(
            {
              name:`ㅤ`,
              value: "\n **Can't add role to user !!" +
            "\n**REASON → : **" + "No role mentioned ! \n\`If you are using role id use it as <@& ROLE_ID >\`"
            }
          )
          .setTimestamp());

        message.channel.send({ embeds: [emb] })
      } else {

        if (message.member.id != (process.env.DEVELOPER) &&message.member.roles.highest.position < role.position && message.author.id != message.guild.ownerId) {

          emb = (new MessageEmbed()
            .setColor("#343A40")
            .setTitle("❌ Operation Unsuccessful !  ")
            .addFields(
              {
                name:`ㅤ`,
                value: "\n **Can't add role to user !!" +
              "\n**REASON → : **" + "Role is superior to your highest role !"
              }
            )
            .setTimestamp());

          message.channel.send({ embeds: [emb] })

        } else {

          if (role.position > message.guild.me.roles.highest.position) {
            emb = (new MessageEmbed()
              .setColor("#343A40")
              .setTitle("❌ Operation Unsuccessful !  ")
              .addFields(
                {
                  name:`ㅤ`,
                  value: "\n **Can't add role to user !!" +
                "\n**REASON → : **" + "Role is superior to my highest role !"
                }
              )
              .setTimestamp());

            message.channel.send({ embeds: [emb] })


          }
          else {


            message.react("✅")

            victim.roles.add(role);

            emb = (new MessageEmbed()
              .setColor("#343A40")
              .setTitle("✅ Operation Successful !  ")
              .addFields(
                {
                  name:`ㅤ`,
                  value: "\n**ADDED : **" + '<@&' + role + '> ' +
                "\n**SERVER → : **" + `${message.guild}` +
                "\n**MEMBER → : **" + `${victim}` +
                "\n**REASON → : **" + reason +
                "\n**MODERATOR → : **" + '<@' + message.author.id + '> '
                }
              )
              .setThumbnail(victim.displayAvatarURL({ dynamic: true }))

              .setTimestamp());

            message.channel.send({ embeds: [emb] })


          }
        }
      }
    }




  }
}

