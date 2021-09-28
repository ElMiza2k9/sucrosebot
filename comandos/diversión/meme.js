const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require("discord.js");
const YeloApi = require("yeloapi");

module.exports = {
  name: "meme",
  alias: [""],

async execute (client, message, args){
    const randomeme = await YeloApi.rmeme()
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription('Meme')
    .setImage(randomeme.url)
  
    message.channel.send(embed)

 }

}
