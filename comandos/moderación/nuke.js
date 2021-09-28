const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
  name: "nuke",
  alias: [],

execute (client, message, args){

 if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Necesitas el permiso **Administrador** para poder usar este comando")
  
  let link = "https://cdn.discordapp.com/attachments/786627691267751976/787745289523691541/6c485efad8b910e5289fc7968ea1d22f.gif"

  const nuke = new Discord.MessageAttachment(link, "nuke.gif")

  var posicion = message.channel.position

  message.channel.clone().then((canal) =>{
    message.channel.delete()

    canal.setPosition(posicion)

    canal.send("**El canal a sido Nukeado :boom::exploding_head:  **", nuke)
  })

 }

}