const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js");


module.exports = {
    name: "ping",
    alias: ["ping"],

    /**
     * Esto para el intellisense (ctrl + espacio)
     * @param {Discord.Client} client
     * @param {import("discord-reply")} message
     * @param {String[]} args
     */
     async execute(client, message, args) {
        const embed = new MessageEmbed()
            .setTitle("🏓 Pong!")
            .addField(`❤ Latencia de mensajes`, `\\>>> \`${message.createdTimestamp - Date.now()}\`ms`, true)
            .addField(`📡 Latencia de API`, `\\>>> \`${client.ws.ping}\`ms`, true)
            .setThumbnail("https://cdn.discordapp.com/attachments/886929809219911680/893006974642442290/2102a19ea556e1d1c54f40a3eda0d775.gif")

        message.channel.send(embed);
    }
};
