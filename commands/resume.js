const { canModifyQueue } = require("../util/EvobotUtil");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "devam",
  aliases: ["resume"],
  description: "Durdurulan Müziğin Devam Ettirilmesini Sağlar.",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send(new MessageEmbed().setColor('RED').setDescription("Şuanda Herhangi Bir Müzik Oynatılmıyor.")).catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (!queue.playing) {
      queue.playing = true;
      queue.connection.dispatcher.resume();
      return queue.textChannel.send(new MessageEmbed().setColor('RED').setDescription(`▶ ${message.author} Adlı Kullanıcı Müziği Devam Ettirdi!`)).catch(console.error);
    }

    return message.reply(new MessageEmbed().setColor('RED').setDescription("Listede Müzik Kalmamış.")).catch(console.error);
  }
};
