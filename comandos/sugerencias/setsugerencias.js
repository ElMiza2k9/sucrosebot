const Discord = require("discord.js");
const db = require("megadb");
const channel = new db.crearDB("canalsug");

module.exports = {
    name: "setsugerencias",
    alias: [],

    /**
     * @param {Discord.Client} client
     * @param {Discord.Message} message
     * @param {String[]} args
     */
    async execute(client, message, args) {
        if (!message.member.permissions.has("MANAGE_CHANNELS"))
            return message.channel.send("Nesecitas permisos");

        const canalestablecer = message.mentions.channels
            .filter((c) => c.guild.id === message.guild.id && c.type === "text")
            .first();

        if (!canalestablecer)
            return message.channel.send("Menciona el canal donde se mandaran las sugerencias");

        message.channel.send(
            `El canal ${canalestablecer} se ah establecido como el canal de sugerencias `
        );

        try {
            canalestablecer.setRateLimitPerUser(50);
            canalestablecer.setTopic("Escribe una sugerencia sin usar comandos :)");
        } catch (e) {
            null;
        }

        channel.establecer(`${message.guild.id}`, `${canalestablecer.id}`);
    }
};
