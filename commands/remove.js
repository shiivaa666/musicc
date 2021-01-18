const { canModifyQueue } = require("../util/EvobotUtil");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "remove",
  description: "Listeden Müzik Kaldırmanızı Sağlar.",
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send(new MessageEmbed().setColor('RED').setDescription("Şuanda Herhangi Bir Müzik Oynatılmıyor.")).catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (!args.length) return message.reply(new MessageEmbed().setColor('RED').setDescription(`Kullanımı: ${message.client.prefix}remove <Liste Numarası>`));
    if (isNaN(args[0])) return message.reply(new MessageEmbed().setColor('RED').setDescription(`Kullanımı: ${message.client.prefix}remove <Liste Numarası>`));

    const song = queue.songs.splice(args[0] - 1, 1);
    queue.textChannel.send(new MessageEmbed().setColor('RED').setDescription(`❌ ${message.author} adlı kullanıcı listeden **${song[0].title}** adlı müziği kaldırdı.`));
  }
};
