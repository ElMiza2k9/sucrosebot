const Discord = require("discord.js");
const client = new Discord.Client();
const { Client, MessageEmbed } = require("discord.js");
const megadb = require("megadb");
const conf = new megadb.crearDB("canalfesion");

module.exports = {
    name: "setcf",
    alias: [""],

    /**
     * Esto para el intellisense (ctrl + espacio)
     * @param {Discord.Client} client
     * @param {import("discord-reply")} message
     * @param {String[]} args
     */
    execute(client, message, args) {
        message.delete();
        let channel = message.mentions.channels.first();
        if (!channel) {
            return message.channel
                .send("Menciona el canal de confesiones.")
                .then((m) => m.delete({ timeout: 5000 }).catch(() => null));
        }
        conf.establecer(`Co-${message.guild.id}`, channel.id);
        message.channel
            .send("Se ha establecido el canal de confesiones en <#" + channel + ">")
            .then((m) => m.delete({ timeout: 10000 }).catch(() => null));
    }
};
