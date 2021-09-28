const Discord = require("discord.js");
const client = new Discord.Client();
const { Client, MessageEmbed } = require("discord.js");
const megadb = require('megadb');   //requerimos megadb
const conf = new megadb.crearDB('canalfesion'); 
const fs = require("fs")

module.exports = {
  name: "confesiones",
  alias: ["cff"],

async execute (client, message, args){
    const member = message.member 
       
        let fs = await conf.get(`Co-${message.guild.id}`);

        
        if(!fs) { 
            return message.channel.send("No hay canal establecido.").then(m => m.delete({timeout: 10000})) 
          }

          
        let texto = args.slice(0).join(" ") 
        if(!texto) return message.channel.send("No has escrito un mensaje").then(m => m.delete({timeout: 10000})) 
        
        const embed = new Discord.MessageEmbed()
        .setTitle('**Confesiones**')
        .setDescription(texto) 
        .setColor('RANDOM') 
        .setFooter('De: Anónimo') 

        client.channels.cache.get(fs).send(embed) 
        message.delete() 

        
    }

}