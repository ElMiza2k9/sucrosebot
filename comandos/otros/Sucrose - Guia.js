const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "guidesucrose",
  alias: [],

execute (client, message, args){

  const embed = new Discord.MessageEmbed()

  .setTitle("Sucrose Discord - Guía")
  .setDescription(`Bienvenido al servidor de soporte **Sucrose Support**. ¡Esperamos que disfrutes tu estancia dentro del servidor!\n> A continuación te dare una guía completa de mi servidor de soporte.`)
  .setImage("https://cdn.discordapp.com/attachments/886929809219911680/886953275792953374/216y5zn1r9u51.png")
  .setColor("BLUE")

  message.channel.send(embed)

 }

}