const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "avatar",
  alias: ["av"],

execute (client, message, args){

  let user = message.mentions.users.first()
  if(!user) user = message.author;

  const avatar = new MessageEmbed()

  .setFooter(`Ejecutado por: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
  .setTitle(`Avatar de ${user.username}`)
  .setImage(user.displayAvatarURL({ size: 1024, dynamic: true }))
  .setColor("RANDOM")
  .setTimestamp()

  message.channel.send(avatar)


 }
}