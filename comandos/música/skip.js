const Discord = require("discord.js");

module.exports = {
    name: "skip",
    alias: ["sk"],

    /**
     * Esto para el intellisense (ctrl + espacio)
     * @param {Discord.Client} client
     * @param {import("discord-reply")} message
     * @param {String[]} args
     */
    async execute(client, message, args) {
        let player = await client.manager.get(message.guild.id);

        if (!message.member.voice.channel)
            return message.lineReplyNoMention("Entra a un canal de voz.");

        if (
            message.guild.me.voice.channel &&
            !message.guild.me.voice.channel.equals(message.member.voice.channel)
        )
            return message.lineReplyNoMention(
                `Entra a mi canal de voz: <#${message.guild.me.voice.channel.id}>`
            );

        if (!player) return message.lineReplyNoMention("No se está reproduciendo nada .-.");

        player.stop();

        message.react("👌").catch(() => null);
    }
};
