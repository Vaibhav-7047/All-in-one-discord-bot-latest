const { MessageEmbed } = require(`discord.js`);
const tord = require('better-tord');


module.exports = {
  name: "truth",
  aliases: [],
  edesc:"truth",
  description: `Sends A Truth Question`,
  userPermissions: [],
  botPermissions: [],
  category: "Games",
  cooldown: 5,
  


  run: async (client, message, args, prefix) => {
    // Code


    message.delete({ timeout: 300 })



    const truth = tord.get_truth();

    let emb = new MessageEmbed()
      .setColor("#343A40")
      .setTitle(`Random Truth`)
      .addFields(
        {
          name:"Challenge :",
          value: truth
        }
      )

    message.channel.send({ embeds: [emb] })


  }

}