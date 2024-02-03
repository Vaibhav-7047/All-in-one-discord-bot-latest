const { Message } = require("discord.js");
const BOT = require("../../../handlers/Client");
const { Queue } = require("distube");

module.exports = {
  name: "volume",
  aliases: ["vol"],
  description: `change volume of current queue`,
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
    let volume = Number(args[0]);
    if (!volume) {
      return client.embed(message, `${client.config.emoji.ERROR} Please Provide Volume %`);
    } else if (volume > 250) {
      return client.embed(
        message,
        `${client.config.emoji.ERROR} Provide Volume Amount Between 1 - 250  !!`
      );
    } else {
      await queue.setVolume(volume);
      client.embed(
        message,
        `${client.config.emoji.SUCCESS} Volume Set to ${queue.volume}% !!`
      );
    }
  },
};
