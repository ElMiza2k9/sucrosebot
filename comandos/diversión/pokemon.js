const Discord = require("discord.js");
const over = require('poke-over') 
const {MessageEmbed} = require('discord.js')

module.exports = {
    name: "pokemon",
    alias: ["wtp"],

    /**
     * Esto para el intellisense (ctrl + espacio)
     * @param {Discord.Client} client
     * @param {import("discord-reply")} message
     * @param {String[]} args
     */
    execute(client, message, args) {

        over.randomPokemon().then(pokemon => {
            
            const embed = new MessageEmbed() 
            .setColor("RANDOM")
            .setTitle("Who's that Pokemon?")
            .setDescription("Tienes 15 Segundos para responder")
            .setImage(pokemon.imageURL)
            message.channel.send(embed).then(msj => { 

        message.channel.awaitMessages(x => x.content.toLowerCase() === pokemon.name.toLowerCase() && x.author.id === message.author.id, { max: 1, time: 15000, errors: ['time'] }).then(col => {

            const embed2 = new MessageEmbed()
            .setColor("GREEN")
            .setTitle("ACERTASTE!")
            .setDescription("El Pokemon era "+pokemon.name)
            .setImage(pokemon.imageURL)
            msj.edit(embed2)

        }).catch(col => { 

            const embed3 = new MessageEmbed() 
            .setColor("RED")
            .setTitle("MAL!")
            .setDescription("El Pokemon era "+pokemon.name)
            .setImage(pokemon.imageURL)
            msj.edit(embed3) 
       })
     })
   })
  }
}