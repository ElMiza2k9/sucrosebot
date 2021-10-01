const Discord = require("discord.js");
const { crearDB } = require("megadb");
const ecoDB = new crearDB("economia");

module.exports = {
    name: "work",
    alias: ["trabajar"],

    /**
     * Esto para el intellisense (ctrl + espacio)
     * @param {Discord.Client} client
     * @param {import("discord-reply")} message
     * @param {String[]} args
     */
    async execute(client, message, args) {   
        const randomplata = Math.floor(Math.random() * (300 - 100 + 1) + 100);

        if (!ecoDB.has(`${message.author.id}.eco.cooldown`)) {
            ecoDB.set(`${message.author.id}.eco.cooldown`, Date.now() + (30 * 60000))
        } else {
            const enfriamiento = await ecoDB.get(`${message.author.id}.eco.cooldown`);

            if (enfriamiento > Date.now())
                return message.lineReplyNoMention(`¡Más despacio! Regresa el <t:${Math.floor(enfriamiento/1000)}:f>`)
            else ecoDB.set(`${message.author.id}.eco.cooldown`, Date.now() + (30 * 60000))
        }

        if (!ecoDB.has(`${message.author.id}.eco.cash`)) 
            ecoDB.set(`${message.author.id}.eco.cash`, randomplata)
        else ecoDB.add(`${message.author.id}.eco.cash`, randomplata);

        return message.lineReplyNoMention("Trabajaste y te pagaron S/" + randomplata)
    }
};