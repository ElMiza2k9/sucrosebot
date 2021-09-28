const Discord = require("discord.js");
const clientN = require("nekos.life") 
const neko = new clientN()

module.exports = {
    name: "bofetada",
    alias: ["splad"],

    /**
     * Esto para el intellisense (ctrl + espacio)
     * @param {Discord.Client} client
     * @param {import("discord-reply")} message
     * @param {String[]} args
     */
    async execute(client, message, args) {

    let mention = message.mentions.members.first() 

    if(!mention) return message.channel.send("Menciona a alguien") 

  neko.sfw.slap().then(neko => {

const embed = new Discord.MessageEmbed()
.setColor("RED")
.setTitle(`${message.member.displayName} cacheteo a ${mention.displayName}`)
.setImage(neko.url) 
message.channel.send(embed) 

 })
 }
}