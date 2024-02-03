const { Message } = require("discord.js");
const BOT = require("../../../handlers/Client");
const { Queue } = require("distube");

module.exports = {
  name: "removedupes",
  aliases: ["rmdupes", "rmd"],
  description: `remove duplicate songs from queue`,
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
    let tracks = queue.songs;
    const newtracks = [];
    for (let i = 0; i < tracks.length; i++) {
      let exists = false;
      for (j = 0; j < newtracks.length; j++) {
        if (tracks[i].url === newtracks[j].url) {
          exists = true;
          break;
        }
      }
      if (!exists) {
        newtracks.push(tracks[i]);
      }
    }
    //clear the Queue
    queue.delete();
    //now add every not dupe song again
    await newtracks.map((song, index) => {
      queue.addToQueue(song, index);
    });

    client.embed(
      message,
      `** ${client.config.emoji.SUCCESS} Removed 🎧 \`${newtracks.length}\` Duplicate Songs From Queue **`
    );
  },
};
