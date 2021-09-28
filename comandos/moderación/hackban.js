//Aclaro, esto sirve para banear gente que no esta dentro del servidor, codigo desarrollado por ! [G]abymanw#0159 ;)
const Discord = require("discord.js");
const client = new Discord.Client();
const { Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "hackban",
  alias: ["banid"],

async execute (client, message, args){

  var perms = message.member.hasPermission("BAN_MEMBERS")
  if(!perms) return message.channel.send("No tienes permisos para usar este comando.")

  if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("No tengo los permisos.")
  
  const id = args.join(' ')
  if(!id) return message.channel.send("Debes poner una ID.")

  const member = await client.users.fetch(id)
  message.guild.members.ban(member.id)

  message.channel.send(`El usuario **${user}** fue baneado por el staff: **${message.author}** por: **${razon}**`)
  
  }

}