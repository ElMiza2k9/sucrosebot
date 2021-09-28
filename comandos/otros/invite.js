const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
  name: "invite",
  alias: ["invitacion"],

execute (client, message, args){

  let embed = new Discord.MessageEmbed()

.setTitle(`Aqui tienes mi invitacion`)
.setDescription(`Puedes **invitarme** [Aqui]()\n\nTambien puedes unirte al **servidor oficial** [Aqui](https://discord.gg/z8zQJ2a8xj)`)
.setColor('RANDOM')
.setFooter(`Gracias por formar parte de nuestra comunidad`)

message.channel.send(embed)


 }

}