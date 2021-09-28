const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "rps",
  alias: [],

async execute (client, message, args){

  if(!args[0]) return message.channel.send("Opciones: `piedra`, `papel` o `tijera`").then(m => m.delete({timeout: 10000}))
   
   let Options = ["piedra", "papel", "tijera"]

   if(!Options.includes(args[0].toLowerCase())) return message.channel.send(":x: Opcion incorrecta!")

  if(args[0] == "piedra") {
    let random1 = ["He ganado! Elegi papel. El papel cubre a la roca.", // Perdedor
                   "Has ganado! Elegi tijera. Las tijeras no pueden cortar rocas.",  // Ganaste
                   "Empate. Piedra vs piedra, gana... La piedra!"] // Empate
    message.reply(" "+random1[Math.floor(Math.random() * random1.length)]+"")

  } else if(args[0] == "papel") {

    let random2 = ["He ganado! Elegi tijera. Las tijeras cortan el papel.", // Perdedor
                   "Has ganado! Elegi piedra. El papel cubre a la roca.",  // Ganastes
                   "Empate."] // Empate
    message.reply(" "+random2[Math.floor(Math.random() * random2.length)]+"")
  
  } else if(args[0] == "tijera") {

    let random3 = ["He ganado! Elegi piedra. Las piedras rompen las tijeras.", // Perdedor
                   "Has ganado! Elegi papel. Las tijeras rompen el papel.",  // Ganastes
                   "Empate."] // Empate
    message.reply(" "+random3[Math.floor(Math.random() * random3.length)]+"")
  }

 }

}