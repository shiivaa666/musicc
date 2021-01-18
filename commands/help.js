const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "yardım",
  aliases: ["help"],
  description: "Botun yardım menüsünü atar.",
  execute(message) {
    let commands = message.client.commands.array();

    let helpEmbed = new MessageEmbed()
      .setTitle(`AceBots Müzik Botunun Yardım Menüsü`)
      .setColor("#F8AA2A")
    .setDescription(`[------------------------> Botu Davet Etmek için Bana Tıkla <------------------------](https://discord.com/oauth2/authorize?client_id=788752566166224906&scope=bot&permissions=8)`)
    commands.forEach((cmd) => {helpEmbed.addField(`**${message.client.prefix}${cmd.name}  ${cmd.aliases ? `(${cmd.aliases})` : ""}**`,`${cmd.description}`,true);
    });

    helpEmbed.setTimestamp();

    return message.channel.send(helpEmbed).catch(console.error);
  }
};
