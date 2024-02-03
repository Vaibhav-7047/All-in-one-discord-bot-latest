const simplydjs = require("simply-djs")

module.exports = {
  name: "ttt",
  aliases: [],
  edesc:"ttt @user",
  description: `play tic-tac-toe`,
  userPermissions: [],
  botPermissions: [],
  category: "Games",
  cooldown: 5,



  run: async (client, message, args, prefix) => {
    // Code

    
    await simplydjs.tictactoe(message,{})



 }
}