const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "guidesucrose-2",
  alias: [],

execute (client, message, args){

  const embed = new Discord.MessageEmbed()

  .setTitle("Canales")
  .setDescription(`<#886929809219911686> - Canal de reglas / normas.\n<#886931080232456203> - Canal donde se anunciaran las cosas mas importantes del servidor.\n<#886929809219911687> - Canal donde llegaran todas las sugerencias.\n<#886929809219911689> - Canal de roles por reacción gratuitos.\n<#886929809219911688> - Canal donde se anunciaran cuando los usuarios que mejoraron el servidor.
  \n📊｜encuestas - Canal de encuestas para que la comunidad decida.
  \n🏆｜eventos - Canal de eventos. Mayormente hay sorteos.
  \n🏦｜banco - Canal de banco para que te diviertas ganando dinero.
  \n🎰｜casino - Canal de casino para que te diviertas apostando dinero.
  \n#🏪｜tienda - Canal de tienda para que compres roles y objetos.
  \n#💎｜casino-plus - Canal privado que se consigue comprando un rol de la tienda. Se puede utilizar cualquier comando de UnbelievaBoat.
  \n💬｜general - Canal en el cual puedes hablar con los usuarios.
  \n📝｜comandos - Canal donde puedes utilizar comandos de bots que no tienen su propio canal.
  \n🤫｜confesiones - Canal de confesiones anónimas.
  \n📷｜multimedia - Canal donde puedes enviar imágenes.
  \n🔈｜sin-micro - Canal donde puedes escribir si no tienes micrófono.
  \n🎧｜música - Canal donde puedes ejecutar comandos de música.
  \n#deleted-channel - Canal donde puedes pedir una película o anunciar que vas a transmitir una.
  \n🔧｜soporte - Canal donde puedes abrir un ticket.
  \n📰｜demandas - Canal donde puedes demandar a usuarios.
  \n🌐｜interchat - Canal de chat global, donde puedes hablar con gente que no esta en el servidor.`)
  .setImage("https://cdn.discordapp.com/attachments/859060261687656449/864105154278064139/standard_7.gif")
  .setColor("RED")

  message.channel.send(embed)

 }

}