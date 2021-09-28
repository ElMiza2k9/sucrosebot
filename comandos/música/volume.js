const Discord = require("discord.js");

module.exports = {
    name: "volume",
    alias: [""],

    /**
     * Esto para el intellisense (ctrl + espacio)
     * @param {Discord.Client} client
     * @param {import("discord-reply")} message
     * @param {String[]} args
     */
    async execute(client, message, [volume = "a"]) {
        let player = await client.manager.get(message.guild.id);

        if (!message.member.voice.channel)
            return message.lineReplyNoMention(":x: Entra a un canal de voz.");

        if (message.guild.me.voice.channel && !message.guild.me.voice.channel.equals(message.member.voice.channel))
            return message.lineReplyNoMention(`:x: Entra a mi canal de voz: <#${message.guild.me.voice.channel.id}>`);

        if (!player) return message.lineReplyNoMention(":x: No se está reproduciendo nada .-.");

        if (!parseInt(volume)) return message.lineReplyNoMention(":x: Elige un número entre \`0 - 100\`");

        const vol = parseInt(volume);

        player.setVolume(vol);
        message.lineReplyNoMention("✅ Volumen establecido en " + vol + "%")
    }
};