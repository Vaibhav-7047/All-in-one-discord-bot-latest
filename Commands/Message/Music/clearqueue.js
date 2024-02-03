const { Message } = require("discord.js");
const BOT = require("../../../handlers/Client");
const { Queue } = require("distube");

module.exports = {
  name: "clearqueue",
  aliases : ['clq','clearq'],
  description: `clear current queue of server`,
  userPermissions: ["CONNECT"],
  botPermissions: ["CONNECT"],
  category: "Music",
  cooldown: 5,
  inVoiceChannel: true,
  inSameVoiceChannel: true,
  Player: true,
  djOnly: true,

 
  run: async (client, message, args, prefix, queue) => {
    // Code
    queue.delete();
    client.embed(message, `${client.config.emoji.SUCCESS} Queue Cleared !!`);
  },
};