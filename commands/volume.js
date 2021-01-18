const { canModifyQueue } = require("../util/EvobotUtil");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ses",
  aliases: ["v"],
  description: "Oynatılan müziğin ses seviyesini değiştirir",
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);

    if (!queue) return message.channel.send(new MessageEmbed().setColor('RED').setDescription("Şuanda Herhangi Bir Müzik Oynatılmıyor.")).catch(console.error);
    if (!canModifyQueue(message.member))
      return message.reply(new MessageEmbed().setColor('RED').setDescription("Öncelikle Bir Ses Kanalına Katılman Gerekiyor!")).catch(console.error);

    if (!args[0]) return message.reply(new MessageEmbed().setColor('BLUE').setDescription(`🔊 Mevcut Ses: **${queue.volume}%**`)).catch(console.error);
    if (isNaN(args[0])) return message.reply(new MessageEmbed().setColor('RED').setDescription("Kullanım: /ses <rakam veya sayı>")).catch(console.error);
    if (Number(args[0]) > 100 || Number(args[0]) < 0 )
      return message.reply(new MessageEmbed().setColor('RED').setDescription("Lütfen 0 - 100 Arasında Bir Sayı Kullanın.")).catch(console.error);

    queue.volume = args[0];
    queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);

    return queue.textChannel.send(new MessageEmbed().setColor('GREEN').setDescription(`Ses seviyesi **${args[0]}%** Olarak Ayarlandı!`)).catch(console.error);
  }
};
