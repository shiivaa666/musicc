const { MessageEmbed } = require("discord.js");
const lyricsFinder = require("lyrics-finder");

module.exports = {
  name: "sözler",
  aliases: ["lyrics"],
  description: "Oynatılan Müziğin Sözlerini Atar.",
  async execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send(new MessageEmbed().setColor('RED').setDescription("Şuanda Herhangi Bir Müzik Oynatılmıyor.")).catch(console.error);

    let lyrics = null;

    try {
      lyrics = await lyricsFinder(queue.songs[0].title, "");
      if (!lyrics) lyrics = `Bulunamadı ${queue.songs[0].title}.`;
    } catch (error) {
      lyrics = `Bulunamadı ${queue.songs[0].title}.`;
    }

    let lyricsEmbed = new MessageEmbed()
      .setTitle(`${queue.songs[0].title} Adlı Müziğin Sözleri.`)
      .setDescription(lyrics)
      .setColor("#F8AA2A")
      .setTimestamp();

    if (lyricsEmbed.description.length >= 2048)
      lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
    return message.channel.send(lyricsEmbed).catch(console.error);
  }
};
