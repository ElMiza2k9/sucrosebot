const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require("discord.js");
const clientN = require("nekos.life") 
const neko = new clientN()

module.exports = {
  name: "beso",
  alias: ["kiss"],

execute (client, message, args){

  neko.sfw.kiss().then(neko => {

    if(!message.mentions.users.first()) {
        const embed = new MessageEmbed()
        message.channel.send('¡Menciona a alguien!')
    
    } else {

    let userm = message.mentions.users.first()

    const embed = new MessageEmbed()
    .setDescription("**" + message.author.username + "**" + " le dio un beso a " + "**" + userm.username + "**")//la descipcion si quieres puedes cambiarla
    .setColor("RANDOM")
    .setImage(neko.url)
    
    message.channel.send({embed});    


 }

})
}
}
