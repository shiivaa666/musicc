const { canModifyQueue } = require("../util/EvobotUtil");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "bitir",
    aliases: ["stop"],
  description: "Çalma Listesini Bitirir",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);

    if (!queue) return message.channel.send(new MessageEmbed().setColor('RED').setDescription("Şuanda Herhangi Bir Müzik Oynatılmıyor.")).catch(console.error);
    if (!canModifyQueue(message.member)) return;

    queue.songs = [];
    queue.connection.dispatcher.end();
    queue.textChannel.send(new MessageEmbed().setColor('GREEN').setDescription(` ⏹ ${message.author} Bottaki Tüm Liste Bitirildi.`)).catch(console.error);
  }
};
