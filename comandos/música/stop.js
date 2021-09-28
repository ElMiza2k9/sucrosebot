module.exports = {
    name: "stop",
    alias: ["leave", "exit"],

    /**
     * @param {require("discord.js").Client} client
     * @param {require("discord.js").Message} message
     */
    async execute (client, message) {
        let player = await client.manager.get(message.guild.id);

        if (!message.member.voice.channel)
            return message.reply("entra al canal de voz.");

        if (message.guild.me.voice.channel && !message.guild.me.voice.channel.equals(message.member.voice.channel))
            return message.reply(`entra a mi canal de voz: <#${message.guild.me.voice.channel.id}>`);

        if (!player) return message.reply("no se está reproduciendo nada .-.")

        player.destroy();
        message.react("👋").catch(() => { return })
    }
}