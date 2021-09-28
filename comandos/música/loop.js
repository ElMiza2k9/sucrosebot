const Discord = require("discord.js");

module.exports = {
    name: "loop",
    alias: ["bucle"],

    /**
     * Esto para el intellisense (ctrl + espacio)
     * @param {Discord.Client} client
     * @param {import("discord-reply")} message
     * @param {String[]} args
     */
    async execute(client, message, [type]) {
        /**
         * @type {import("erela.js").Player}
         */
        let player = await client.manager.get(message.guild.id);

        if (!message.member.voice.channel)
            return message.lineReplyNoMention(":x: Entra a un canal de voz.");

        if (message.guild.me.voice.channel && !message.guild.me.voice.channel.equals(message.member.voice.channel))
            return message.lineReplyNoMention(`:x: Entra a mi canal de voz: <#${message.guild.me.voice.channel.id}>`);

        if (!player) return message.lineReplyNoMention(":x: No se está reproduciendo nada .-.");

        if (!["no", "cola", "cancion"].includes(type)) return message.lineReplyNoMention(":x: Elige el tipo de bucle: \`no\` | \`cancion\` | \`cola\`")

        if (type === "no") {
            player.setTrackRepeat(false);
            player.setQueueRepeat(false);

            return message.lineReplyNoMention("✅ Se ha desactivado el bucle.")
        }

        if (type === "cola") {
            player.setTrackRepeat(false);
            player.setQueueRepeat(true);

            return message.lineReplyNoMention("✅ Se repetirá toda la cola.")
        }

        if (type === "cancion") {
            player.setTrackRepeat(true);
            player.setQueueRepeat(false);

            return message.lineReplyNoMention("✅ Se repetirá la canción actual.")
        }
    }
};