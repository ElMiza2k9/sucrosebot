const Discord = require("discord.js");
const db = require("megadb");
const antispam = new db.crearDB("anti-spam");

/**
 * @param {Discord.Client} client
 */
module.exports = async (client) => {
    client.on("message", async (message) => {
        if (message.member.hasPermission("ADMINISTRATOR")) return; //ponemos la condicional de que si es admin el antispam no le hará nada
        if (message.author.bot) return; //y esta condicional para que elbot no se afecte automaticamente
        if (!antispam.tiene(`${message.guild.id}`)) return; //Si en el archivo de db no esta la id del servidor no la tiene, el evento no tendrá efecto
        if (!antispam.tiene(`${message.channel.id}`)) return;

        if (antispam.tiene(message.guild.id)) {
            if (message.content.toLowerCase("discord.gg", ".gg", "discord.com/invite")) {
                message.delete();
                return message.channel.send("No hagas spam en este canal");
            }
        }
    });
};
