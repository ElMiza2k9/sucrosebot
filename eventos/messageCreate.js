const Discord = require("discord.js");
const db = require("megadb");
const prefix_db = new db.crearDB("prefix");
const cooldowns = new Discord.Collection();
const canalsug = new db.crearDB("canalsug");

/**
 * @param {Discord.Client} client
 */
module.exports = async (client) => {
    client.on("message", async (message) => {
        const inGame = [];

        let prefix;
        if (prefix_db.tiene(message.guild.id)) {
            prefix = await prefix_db.obtener(message.guild.id);
        } else {
            prefix = "a!";
        }

        if (message.author.bot || message.channel.type === "dm") return;
        if (message.channel.type === "dm") return;

        /**
         * @type {String}
         */
        const suggestChId = await canalsug.get(message.guild.id);

        if (suggestChId) {
            const sugCh = message.guild.channels.cache.get(suggestChId);
            if (sugCh) {
                if (suggestChId === message.channel.id) {
                    if (message.content.length > 1000) return;
                    if (
                        !message.content ||
                        message.content === "** **" ||
                        message.content === "_ _"
                    )
                        return;

                    return message.channel
                        .send(
                            new Discord.MessageEmbed()
                                .setColor("BLURPLE")
                                .setAuthor(
                                    "Sugerencia de " + message.author.tag,
                                    message.author.displayAvatarURL({ dynamic: true })
                                )
                                .setDescription(message.content)
                                .setTimestamp()
                                .setFooter(`${client.user.username} | Sugerencias`)
                                .setThumbnail(
                                    "https://pa1.narvii.com/7424/9a6d4f8eee15adb262017f81572605e3fba6fbacr1-588-440_hq.gif"
                                )
                        )
                        .then((m) => {
                            try {
                                m.react("✅");
                                m.react("🤷‍♂️");
                                m.react("❌");

                                message.delete();
                            } catch (e) {
                                null;
                            }
                        });
                }
            }
        }

        if (!message.content.startsWith(prefix)) return;

        let usuario = message.mentions.members.first() || message.member;
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        if (command.length < 1) return;

        const options = {
            args,
            commands: client.commands
        };

        let cmd = client.commands.find(
            (c) => c.name === command || (c.alias && c.alias.includes(command))
        );

        if (cmd) {
            if (!cooldowns.has(command.name)) {
                cooldowns.set(command.name, new Discord.Collection());
            }
            let now = Date.now();
            let timestamps = cooldowns.get(command.name);
            let cooldownAmount = (command.cooldown || 3) * 1000;
            if (timestamps.has(message.author.id)) {
                let expirationTime = timestamps.get(message.author.id) + cooldownAmount;
                if (now < expirationTime) {
                    let timeleft = (expirationTime - now) / 1000;
                    return message.channel.send(
                        `Hey **${message.author.tag}**, espera **${timeleft.toFixed(
                            0
                        )} segundos** antes de usar el comando`
                    );
                }
            }
            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
            cmd.execute(client, message, args);
        }
        if (!cmd) {
            const embed = new Discord.MessageEmbed()
                .setTitle("Comando invalido")
                .setDescription(`No encuentro el comando **${command}** en mi base de datos.`)
                .setColor("RED")
                .setTimestamp();
            message.channel.send(embed);
            return;
        }
    });
};
