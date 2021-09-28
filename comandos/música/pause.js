module.exports = {
    name: "pause",
    alias: ["pausar"],

    /**
     * @param {Discord.Client} client
     * @param {Discord.Message} message
     * @param {String[]} search
     */
    async execute(client, message, args) {
        let player = await client.manager.get(message.guild.id);

        if (!message.member.voice.channel)
            return message.reply("Necesitas estar en un canal de voz para ejecutar este comando.")
        if (!player)
            return message.reply("No se está reproduciendo nada.")
        if (message.guild.me && !message.guild.me.voice.channel.equals(message.member.voice.channel))
            return message.reply("Tienes que entrar a mi canal de voz.")

        if (player.paused)
            return message.reply("El reproductor está pausado.")

        player.pause(true);
        message.react("✅")
    }
}