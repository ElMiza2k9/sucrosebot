const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js");
const weather = require('weather-js');

module.exports = {
  name: "tiempo",
  alias: ["weather"],

execute (client, message, args){

  let degree;
      
  if(args[0]){

    if(args[0] === "C" || args[0] === "c" || args[0] === "F" || args[0] === "f"){
      degree = args[0].toUpperCase();
    } else{
      return message.channel.send("Inserta un tipo de medida (C (Grados) | F (Grados Fahrenheit)).");
      }
    } else{
      return message.channel.send("Inserta un tipo de medida (C (Grados) | F (Grados Fahrenheit)).");
    }
  
  if(!args[1]) return message.channel.send("Inserta un lugar para buscar el tiempo meteorologico.");

  weather.find({search: args[1], degreeType: degree}, function(err, result) {
    try{
      
      let embed = new MessageEmbed()

      .setColor("#6a006a")
      .setTitle(`El tiempo`)
      .setThumbnail(`https://cdn.icon-icons.com/icons2/1448/PNG/512/42664sunbehindsmallcloud_99027.png`)
      .setDescription(`El tiempo de ${result[0].location.name}`)
      .addField("**Temperatura:**", `${result[0].current.temperature}°${result[0].location.degreetype}`, true)
      .addField("**Clima:**", `${result[0].current.skytext}`, true)
      .addField("**Día:**", `${result[0].current.shortday}`, true)
      .addField("**Como lo sentimos:**", `${result[0].current.feelslike}°${result[0].location.degreetype}`, true)
      .addField("**Humedad:**", `${result[0].current.humidity}%`, true)
      .addField("**Viento:**", `${result[0].current.winddisplay}`, true)
      .setFooter(`© ${message.guild.me.displayName}`, client.user.displayAvatarURL());

      message.channel.send(embed); 
  } catch(err){
    console.log(err);
    
    return message.channel.send("Estas seguro que ese sitio existe??");
  } 
  });
 }
}