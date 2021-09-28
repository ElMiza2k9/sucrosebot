const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "veryficacion",
  alias: [],

execute (client, message, args){

  const embed = new Discord.MessageEmbed()

  .setTitle("Verificación")
  .setDescription('Bienvenido al servidor, antes de tener acceso al servidor debes verificarte.\nTe recomiendo leer mis <#886929809219911686> para evitar problemas.\nPara ser verificado reacciona a <:valid:886946270483185706> y si tienes algún problema contacta con un administrador\n\nEspero que disfrutes de tu estancia <3')
  .setColor("GREEN")

  message.channel.send(embed)

 }

}