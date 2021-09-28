const rb = require("radio-browser");


module.exports = {
    name: "radio",
    alias: [],

    /**
     * @param {require("discord.js").Client} client
     * @param {require("discord.js").Message} message
     * @param {String[]} args
     */
    async execute (client, message, args) {
        if (!args[0])
            return message.reply("Busca una estación");

        const voiceChannel = client.voice.connections.find(v => v.channel.guild.id === message.member.guild.id);

        if (!message.member.voice.channel) 
            return message.channel.send('Entra a un canal de voz')

        if (!message.member.voice.channel.joinable) 
            return message.channel.send('No puedo entrar a tu canal de voz.');

        if (voiceChannel && voiceChannel.channel.id !== message.member.voice.channel.id) 
            return message.channel.send(`Tienes que estar en mi mismo canal. ${voiceChannel.channel}`)

        const filter = { 
            limit: 1, 
            by: "tag", 
            searchterm: args.join(" ")
        }

        rb.getStations(filter)
            .then((data) => {
                data = data[0];
                message.member.voice.channel.join()
                    .then((c) => {
                        c.play(data.url_resolved)
                        message.reply("Reproduciendo estación: " + data.name)
                    })
            })
            .catch((err) => {
                console.log(err);
                return message.reply("No encontré ninguna estación .-.")
            })
    }
}