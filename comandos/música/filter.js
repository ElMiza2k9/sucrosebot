const Discord = require("discord.js");

module.exports = {
    name: "filter",
    alias: ["filtro"],

    /**
     * Esto para el intellisense (ctrl + espacio)
     * @param {Discord.Client} client
     * @param {import("discord-reply")} message
     * @param {String[]} args
     */
    async execute(client, message, args) {
        /**
         * @type {import("../../estructuras/Player")}
         */
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

        const filters = [
            "speed",
            "pitch",
            "nightcore",
            "vaporwave",
            "bassboost",
            "distorsion",
            "8d",
            "karaoke",
            "vibrato",
            "tremolo"
        ];

        if (!args[0] || !filters.includes(args[0]))
            return message.lineReplyNoMention({
                embed: {
                    description: `Elige un filtro de esta lista:\n\n${filters
                        .map((f) => `\`- ${f}\``)
                        .join("\n")}\n\`- clear\` - este reinicia todos los efectos`
                }
            });

        switch (args[0]) {
            case "speed":
                const speed = args[1];
                if (isNaN(Number(args[1])) || (Number(args[1])) > 5 || (Number(args[1])) < 0.05)
                    return message.lineReplyNoMention("Elige una velocidad del `0.05` al `5`")

                player.setSpeed(speed);
                return message.lineReplyNoMention(`Se ha aplicado velocidad \`${speed}x\``)

            case "pitch":
                const pitch = args[1];
                if (isNaN(Number(pitch))| (Number(pitch)) > 5 || (Number(pitch)) < 0.05)
                    return message.lineReplyNoMention("Elige un pitch del `0.05` al `5`")

                player.setPitch(pitch)
                return message.lineReplyNoMention(`Se ha aplicado pitch \`${pitch}x\``)

            case "vaporwave":
                const vw = args[1];
                if (!["on", "off"].includes(vw))
                    return message.lineReplyNoMention("Escribe `on` para activar, y `off` para desactivar vaporwave")

                player.setVaporwave(vw === "on" ? true : false)
                return message.lineReplyNoMention(`Se ha ${vw === "on" ? "activado" : "desactivado"} el ｖａｐｏｒｗａｖｅ.`)

            case "nightcore":
                const noche = args[1];
                if (!["on", "off"].includes(noche))
                    return message.lineReplyNoMention("Escribe `on` para activar, y `off` para desactivar nightcore")

                player.setNightcore(noche === "on" ? true : false)
                return message.lineReplyNoMention(`Se ha ${noche === "on" ? "activado" : "desactivado"} el *nightcore*.`)

            case "bassboost":
                const bb = args[1];
                if (!["on", "off"].includes(bb))
                    return message.lineReplyNoMention("Escribe `on` para activar, y `off` para desactivar bassboost")

                player.setBassboost(bb === "on" ? true : false)
                return message.lineReplyNoMention(`Se ha ${bb === "on" ? "activado" : "desactivado"} el **bassboost**.`)

            case "distorsion":
                const dis = args[1];
                if (!["on", "off"].includes(dis))
                    return message.lineReplyNoMention("Escribe `on` para activar, y `off` para desactivar distosión")

                player.setDistortion(dis === "on" ? true : false)
                return message.lineReplyNoMention(`Se ha ${dis === "on" ? "activado" : "desactivado"} la ~~distosión~~.`)

            case "8d":
                const ocho = args[1];
                if (!["on", "off"].includes(ocho))
                    return message.lineReplyNoMention("Escribe `on` para activar, y `off` para desactivar 8D")

                player.setEightD(ocho === "on" ? true : false)
                return message.lineReplyNoMention(`Se ha ${ocho === "on" ? "activado" : "desactivado"} el __8D__.`)

            case "karaoke":
                const karaoke = args[1];
                if (!["on", "off"].includes(karaoke))
                    return message.lineReplyNoMention("Escribe `on` para activar, y `off` para desactivar karaoke")

                player.setKaraoke(karaoke === "on" ? true : false)
                return message.lineReplyNoMention(`Se ha ${karaoke === "on" ? "activado" : "desactivado"} el karaoke.`)

            case "vibrato":
                const vibrato = args[1];
                if (!["on", "off"].includes(vibrato))
                    return message.lineReplyNoMention("Escribe `on` para activar, y `off` para desactivar vibrato")

                player.setVibrato(vibrato === "on" ? true : false)
                return message.lineReplyNoMention(`Se ha ${vibrato === "on" ? "activado" : "desactivado"} el ~~vibrato~~.`)

            case "tremolo":
                const tremolo = args[1];
                if (!["on", "off"].includes(tremolo))
                    return message.lineReplyNoMention("Escribe `on` para activar, y `off` para desactivar tremolo")

                player.setTremolo(tremolo === "on" ? true : false)
                return message.lineReplyNoMention(`Se ha ${tremolo === "on" ? "activado" : "desactivado"} el tremolo.`)

            case "clear":
                player.clearEffects()
                return message.lineReplyNoMention(`Se han desactivado los efectos.`)

            default:
                break;
        }
    }
};
