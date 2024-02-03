const { Message } = require("discord.js");
const BOT = require("../../../handlers/Client");
const { Queue } = require("distube");

module.exports = {
  name: "resume",
  aliases: ["rsume"],
  description: `resume paused song in queue`,
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
    if (queue.paused) {
      queue.resume();
      client.embed(message, `${client.config.emoji.SUCCESS} Queue Resumed !!`);
    } else {
      client.embed(
        message,
        `${client.config.emoji.ERROR} Queue already Resumed !!`
      );
    }
  },
};
