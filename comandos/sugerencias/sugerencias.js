const Discord = require("discord.js");
const db = require("megadb");
const canalsug = new db.crearDB("canalsug");

module.exports = {
    name: "sugerencia",
    alias: [],

    async execute(client, message, args) {
        let suger = args.join(" ");

        if (!canalsug.tiene(`${message.guild.id}`))
            return message.channel.send(
                "No has establecido el canal de sugerencias lo puedes establecer con el comando `setsugerencias <menciona el canal>`"
            );

        if (!suger) return message.channel.send("Escribe que vas a sugerir");

        const canal = await canalsug.obtener(`${message.guild.id}`, `${message.channel.id}`);
        const canalfinal = client.channels.cache.get(canal);

        message.reply("La sugerencia ha sido enviada correctamente");

        const sugembed = new Discord.MessageEmbed()

            .setDescription(`${suger}`)
            .setThumbnail(
                "https://pa1.narvii.com/7424/9a6d4f8eee15adb262017f81572605e3fba6fbacr1-588-440_hq.gif"
            )
            .setColor("BLURPLE")
            .setFooter(`${client.user.username} | Sugerencias`)
            .setAuthor(
                "Sugerencia de " + message.author.tag,
                message.author.displayAvatarURL({ dynamic: true })
            )
            .setTimestamp();

        await canalfinal.send(sugembed).then((m) => {
            try {
                m.react("✅");
                m.react("🤷‍♂️");
                m.react("❌");
            } catch (error) {
                null;
            }
        });
    }
};
