const { canModifyQueue } = require("../util/EvobotUtil");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "geç",
  aliases: ["s"],
  description: "Oynatılan Şarkıyı Geçer.",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send(new MessageEmbed().setColor('RED').setDescription("Şuanda Herhangi Bir Müzik Oynatılmıyor.")).catch(console.error);
    if (!canModifyQueue(message.member)) return;

    queue.playing = true;
    queue.connection.dispatcher.end();
    queue.textChannel.send(new MessageEmbed().setColor('GREEN').setDescription(`⏩ ${message.uthor} adlı kullanıcı müziği geçti`)).catch(console.error);
  }
};
