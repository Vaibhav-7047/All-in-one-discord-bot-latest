const simplydjs = require("simply-djs")

module.exports = {
  name: "rps",
  aliases: [],
  edesc:"rps @user",
  description: `play rock-paper-scissors`,
  userPermissions: [],
  botPermissions: [],
  category: "Games",
  cooldown: 5,



  run: async (client, message, args, prefix) => {
    // Code

    
    
    await simplydjs.rps(message,{})


 }
}