const Discord = require('discord.js');
const db = require('megadb')
const prefix_db = new db.crearDB('prefix')

module.exports = {
  name: "setprefix",
  alias: [],

execute (client, message, args){

  var perms = message.member.hasPermission("ADMINISTRATOR")
  if(!perms) return message.channel.send("No tienes suficientes permisos para cambiar mi prefijo!")

  if(!args[0]) return message.channel.send("Debes decir un prefix nuevo!")

  prefix_db.establecer(message.guild.id, args[0])

  message.channel.send(`El prefix se a cambiado a **${args[0]}**`)



 }

}