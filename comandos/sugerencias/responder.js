const Discord = require("discord.js");
const { crearDB } = require("megadb");
const sugChannel = new crearDB("canalsug");

module.exports = {
    name: "respond",
    alias: ["responder"],

    /**
     * Esto para el intellisense (ctrl + espacio)
     * @param {Discord.Client} client
     * @param {import("discord-reply")} message
     * @param {String[]} args
     */
    async execute(client, message, args) {
        if (!message.member.permissions.has("MANAGE_MESSAGES"))
            return message.lineReplyNoMention(
                new Discord.MessageEmbed()
                    .setColor(0xed4245)
                    .setDescription("No tienes permiso para ejecutar esta acción")
            );

        const chId = await sugChannel.get(message.guild.id);
        if (!chId)
            return message.lineReplyNoMention(
                new Discord.MessageEmbed()
                    .setColor(0xed4245)
                    .setDescription("El canal de sugerencias no ha sido establecido.")
            );

        const channel = client.channels.cache.get(chId);
        if (!channel)
            return message.lineReplyNoMention(
                new Discord.MessageEmbed()
                    .setColor(0xed4245)
                    .setDescription("No veo el canal de sugerencias. ¿Lo eliminaron?")
            );

        const msg = args[0];
        const action = args[1];
        const reason = args.slice(2).join(" ") || "Sin razón";

        const sug = await channel.messages.fetch(msg);
        if (!sug || sug.author.id !== client.user.id)
            return message.lineReplyNoMention(
                new Discord.MessageEmbed()
                    .setColor(0xed4245)
                    .setDescription(`No he podido encontrar la sugerencia en el canal ${channel}`)
            );

        const sugEmbed = sug.embeds[0];

        if (!sugEmbed || sugEmbed.footer.text !== `${client.user.username} | Sugerencias`)
            return message.lineReplyNoMention(
                new Discord.MessageEmbed()
                    .setColor(0xed4245)
                    .setDescription(`No he podido encontrar la sugerencia en el canal ${channel}`)
            );

        if (sugEmbed.fields[0])
            return message.lineReplyNoMention(
                new Discord.MessageEmbed()
                    .setColor(0xed4245)
                    .setDescription("Esta sugerencia ya ha sido aceptada/rechazada.")
            );

        if (!["aceptar", "rechazar"].includes(action))
            return message.lineReplyNoMention(
                new Discord.MessageEmbed()
                    .setColor(0xed4245)
                    .setDescription("Indica si quieres **aceptar** o **rechazar** la sugerencia.")
            );

        if (!sug.editable)
            return message.lineReplyNoMention(
                new Discord.MessageEmbed()
                    .setColor(0xed4245)
                    .setDescription("No puedo editar la sugerencia .-.")
            );

        await sug
            .edit(
                new Discord.MessageEmbed(sugEmbed)
                    .addField(
                        `Sugerencia ${action === "aceptar" ? "aceptada" : "rechazada"}`,
                        reason
                    )
                    .setColor(action === "aceptar" ? "GREEN" : "RED")
            )
            .then(() => {
                message.lineReplyNoMention(
                    new Discord.MessageEmbed()
                        .setColor("GREEN")
                        .setDescription("La sugerencia ha sido editada")
                );
            })
            .catch((err) => {
                console.log(err);
                message.lineReplyNoMention(
                    new Discord.MessageEmbed()
                        .setColor(0xed4245)
                        .setDescription("No pude editar la sugerencia .-.")
                );
            });
    }
};
