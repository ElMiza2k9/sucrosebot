//codigo desarrollado por ! [G]abymanw#0159 ;)
const Discord = require("discord.js");
const client = new Discord.Client();
const { Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "ban",
  alias: ["banear"],

  execute (client, message, args){
  
  if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("No tengo suficientes permisos..")

  let user = message.mentions.members.first();

  let banReason = args.join(' ').slice(22);

  if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("No tienes permisos para usar este comando.")

  if(!user) return message.channel.send("Debes mencionar a alguien.")

  if(message.member.roles.highest.comparePositionTo(user.roles.highest) <= 0) return message.channel.send("No puedes banear a una persona igual o mayor rango que tú.")

if(user === message.author) return message.channel.send("No te puedes banear a ti mismo.")

if(!banReason) return message.channel.send("Debes escribir una razón.")

user.ban({ reason: banReason})

mmessage.channel.send(`El usuario **${user}** fue baneado por el staff: **${message.author}** por: **${razon}**`)

 }

}