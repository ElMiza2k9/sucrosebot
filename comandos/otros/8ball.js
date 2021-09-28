const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "8ball",
  alias: [],

execute (client, message, args){

    let respuesta = ["Si", "No", "Tal vez", "Obvio", "Yo digo que si", "Yo digo que no", "Probablemente"]
    var random = respuesta[Math.floor(Math.random() * respuesta.length)]

    const embed = new MessageEmbed()
    .addField("A su pregunta", `${args.join(" ")}`)
    .setThumbnail('http://tusimagenesde.com/wp-content/uploads/2016/07/bola-8-2.jpg')
    .addField("Mi respuesta", `${random}`)
    .setColor("RANDOM")
    .setFooter(`© ${message.guild.me.displayName}`, client.user.displayAvatarURL())
    message.channel.send(embed)

 }

}