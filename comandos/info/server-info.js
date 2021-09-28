const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "serverinfo",
  alias: ["si"],

execute (client, message, args){

let embed = new MessageEmbed()
      .setColor("#5780cd")
      .setTitle("Server Info")
      .setThumbnail(message.guild.iconURL())
      .setAuthor(`${message.guild.name}`, message.guild.iconURL())
      .addField("**Creador:**", `${message.guild.owner}`, true)
      .addField("**Miembros:**", `${message.guild.memberCount}`, true)
      .addField("**Miembros Reales**", message.guild.members.cache.filter(member => !member.user.bot).size, true)
      .addField("**Bots**", message.guild.members.cache.filter(member => member.user.bot).size, true)
      .addField("**Canales**", message.guild.channels.cache.size, true)
      .addField("**Canales de Texto**", message.guild.channels.cache.filter(ch => ch.type === 'text').size, true)
      .addField("**Canales de Voz**", message.guild.channels.cache.filter(ch => ch.type === 'voice').size, true)
      .addField("**Creado el:**", message.guild.createdAt.toLocaleString(), true)
      .setDescription(`${message.guild.roles.cache.map(role => role.toString()).join(' ')}`)
      .setFooter(`© ${message.guild.me.displayName}`, client.user.displayAvatarURL());
    
    message.channel.send(embed);

 }

}