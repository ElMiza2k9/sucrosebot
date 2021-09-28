const Discord = require('discord.js');
const { Client, MessageEmbed } = require("discord.js");
const db = require("megadb");
const antispam = new db.crearDB("anti-spam")

module.exports = {
  name: "antispam",
  alias: ["spam"],

execute (client, message, args){

    if(!message.member.permissions.has("ADMINISTRATOR"))return message.channel.send("¡Necesitas permisos de `ADMINISTRATOR` para usar este comando!")
    if(!args[0]) return message.channel.send("``` <on/off> || <ignore/ignorequit>```")

    let Options = ["off", "on", "ignore", "ignorequit"]

    if(!Options.includes(args[0].toLowerCase())) return message.channel.send("¡Opcion incorrecta!")

    if(args[0] == "on") { 
        if(antispam.tiene(`${message.guild.id}`)) return message.channel.send("El sistema de antispam ya estaba activo")
        
        antispam.establecer(message.guild.id, message.guild.name) 
        
        message.channel.send("AntiSpam activado").catch()
        
          } else if(args[0] == 'off') { 
        if(!antispam.tiene(`${message.guild.id}`)) return message.channel.send("El antispam no estaba activo")
        
        
        antispam.eliminar(message.guild.id, message.guild.name) 
        
        message.channel.send("AntiSpam desactivado").catch()
          }else if(args[0] == 'ignore'){ 
            let channel = message.mentions.channels.first() || message.channel;
            if(antispam.tiene(`${channel.id}`))return message.channel.send("Este canal ya esa en la lista de canales ignorados por AntiSpam")
        
            antiflood.establecer(channel.id, channel.name) 
            message.channel.send("Canal añadido en la lista de ignorados por AntiSpam")
          }else if(args[0] == 'ignorequit'){
              let channel = message.mentions.channels.first() || message.channel; 
        
                  if(!antiflood.tiene(`${channel.id}`))return message.channel.send("Este canal no esta en la lista de ignorados por AntiSpam")
                  
                    antiflood.eliminar(channel.id, channel.name)
                    message.channel.send("Canal eliminado de la lista de ignorados por AntiSpam")
          }
        }      
 }