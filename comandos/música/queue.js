const { MessageEmbed } = require("discord.js")
const prettyms = require("pretty-ms");
const _ = require("lodash");

module.exports = {
    name: "queue",
    alias: ["cola"],

    /**
     * @param {Discord.Client} client
     * @param {Discord.Message} message
     * @param {String[]} search
     */
    async execute(client, message, args) {
        let player = await client.manager.get(message.guild.id);

        if (!player)
            return message.reply("No se está reproduciendo nada.");

        if (!player.queue || !player.queue.length || player.queue === 0) {
            const embed = new MessageEmbed()
                .setAuthor("Reproduciendo ahora", message.guild.iconURL({ dynamic: true }))
                .setTitle(`${player.queue.current.title}`)
                .setURL(player.current.uri)
                .addFields([
                    {
                        name: "Solicitado por",
                        value: player.queue.current.requester,
                        inline: true
                    },
                    {
                        name: "Duración",
                        value: player.queue.current.isStream 
                            ? "En vivo" 
                            : `${prettyms(player.position, { 
                                    colonNotation: true, 
                                    secondsDecimalDigits: 0 
                                })} ${prettyms(player.queue.current.duration, { 
                                    colonNotation: true, 
                                    secondsDecimalDigits: 0 
                                })}`,
                        inline: true
                    }
                ])
        }


        let songs = player.queue.map((t, index) => {
            t.index = index;
            return t
        });
        
        let chunkedsongs = _.chunk(songs, 10);

        let paginas = chunkedsongs.map((tracks) => {
            let descripcion = tracks.map((t) => {
                `\`${t.index + 1}.\` [${t.title}](${t.uri}) | \`${prettyms(t.duration, { colonNotation: true, secondsDecimalDigits: 0 })}`
            });

            let queueEmbed = new MessageEmbed()
                .setAuthor(`Cola del servidor ${message.guild.name}`, message.guild.iconURL({ dynamic: true }))
                .setDescription([
                    `**Canción actual:**`,
                    `[${player.queue.current.title}](${player.queue.current.uri})\n`,
                    `**Siguiente:**`,
                    descripcion
                ].join("\n"))
                .setThumbnail(player.queue.current.thumbnail)

            return queueEmbed
        });

        if (!paginas.length) {
            // despues lo acabo, comando en construcción xddd
            console.log("♥")
        }
    }
}

