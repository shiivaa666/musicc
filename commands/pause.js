const { canModifyQueue } = require("../util/EvobotUtil");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "durdur",
      aliases: ["pause"],
  description: "Oynatılan Müziğin Durdurulmasını Sağlar.",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send(new MessageEmbed().setColor('RED').setDescription("Şuanda Herhangi Bir Müzik Oynatılmıyor.")).catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (queue.playing) {
      queue.playing = false;
      queue.connection.dispatcher.pause(true);
      return queue.textChannel.send(`${message.author} Tarafından Müzik Durduruldu.`).catch(console.error);
    }
  }
};
