//codigo desarrollado por ! [G]abymanw#0159 ;)
const Discord = require("discord.js");
const client = new Discord.Client();
const { Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "kick",
  alias: ["expulsar"],

  execute (client, message, args){

    var perms = message.member.hasPermission("KICK_MEMBERS")
    if(!perms) return message.channel.send("No tienes permisos para usar este comando.")
  
  const user = message.mentions.members.first()
  if(!user) return message.channel.send("Debes mencionar a un miembro del servidor.")

  if(user === message.author) return message.channel.send("No te puedes expulsar a ti mismo.")

  var razon = args.slice(1).join(' ')
  if(!razon){
    razon = 'No especificado.'
  }

  message.guild.member(user).kick(razon);

  message.channel.send(`El usuario **${user}** fue expulsado por el staff: **${message.author}** por: **${razon}**`)

 }

}