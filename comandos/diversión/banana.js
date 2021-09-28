const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "banana",
  alias: [],

execute (client, message, args){

 let bananas = ["1cm", "1.4cm", "12.1cm", "0cm?", "14cm", "23.12cm", "50cm", "1.000.000.000", "21.32cm", "más de 40cm?!"]

 const embed = new Discord.MessageEmbed() 

 .setTitle("🍌 ┇ Medidor de Bananas.")
 .setDescription(`**Resultado:** Te mide ${bananas[( Math.floor(Math.random() * bananas.length))]}`)
 .setImage("https://i.pinimg.com/originals/03/2c/44/032c442770f6413f3ad74189a3f130f4.gif")
 .setColor("RANDOM")
 .setTimestamp()

 message.channel.send(embed)

 }

}