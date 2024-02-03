const { MessageEmbed } = require(`discord.js`);

module.exports = {
  name: "clrchnl",
  aliases: [],
  edesc:"clrchnl",
  description: `clones and deletes message.channel`,
  userPermissions: ["MANAGE_CHANNELS"],
  botPermissions: ["MANAGE_CHANNELS"],
  category: "Channel",
  cooldown: 5,



  run: async (client, message, args, prefix) => {
    // Code



    if (message.member.permissions.has('MANAGE_CHANNELS')) {

      message.delete()

      await message.channel.clone().catch(console.error).then((ch)=>{ch.send("Purged everything !")});
      await message.channel.delete().catch(console.error);
    
    } else {
      message.react("🚫")
      message.channel.send("You are not worthy to use that ! You PEASANT!").then(msg => {
        setTimeout(() => msg.delete(), 1000)
      })
    }

  }
}