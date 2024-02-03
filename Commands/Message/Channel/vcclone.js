const { MessageEmbed } = require(`discord.js`);

module.exports = {
  name: "vcclone",
  aliases: [],
  edesc:"join a vc -> .vcclone",
  description: `clone voice channel`,
  userPermissions: ["MANAGE_CHANNELS"],
  botPermissions: ["MANAGE_CHANNELS"],
  category: "Channel",
  cooldown: 5,



  run: async (client, message, args, prefix) => {
    // Code



    if (message.member.permissions.has('MANAGE_CHANNELS')) {

      message.delete()

      if(!message.member.voice.channel)return message.channel.send(":x: Join a Vc first").then((msg)=>{setTimeout(()=>{msg.delete()},5000)})
      message.member.voice.channel.clone().catch(console.error);
    
    } else {
      message.react("🚫")
      message.channel.send("You are not worthy to use that ! You PEASANT!").then(msg => {
        setTimeout(() => msg.delete(), 1000)
      })
    }

  }
}