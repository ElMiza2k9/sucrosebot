const Discord = require("discord.js");
require("discord-reply")
const client = new Discord.Client();
require("dotenv").config();
require("discord-buttons")(client);

const fs = require("fs");
let { readdirSync } = require("fs");

//------------------------ LavaLink ------------------------//

const { Manager } = require("erela.js");
const { LavasfyClient } = require("lavasfy");
require("./estructuras/Player");

const prettyms = require("pretty-ms");

client.lavasfy = new LavasfyClient(
    {
        clientID: "5f573c9620494bae87890c0f08a60293",
        clientSecret: "212476d9b0f3472eaa762d90b19b0ba8", // este es mi token de spotify .-.
        audioOnlyResults: true,
        useSpotifyMetadata: true,
        autoResolve: true
    },
    [
        {
            id: "Main",
            host: "localhost",
            port: 8080,
            password: "drgatoxd"
        }
    ]
);

client.manager = new Manager({
    nodes: [
        {
            id: "Main",
            host: "localhost",
            port: 8080,
            password: "drgatoxd"
        }
    ],
    send(id, payload) {
        const guild = client.guilds.cache.get(id);
        if (guild) guild.shard.send(payload);
    }
});

client.manager
    .on("nodeConnect", (node) => console.log(`[LAVALINK] ${node.options.host} conectado`))
    .on("nodeDisconnect", (node) => console.log(`[LAVALINK] ${node.options.host} desconectado`))
    .on("nodeError", (node, error) =>
        console.log(`[LAVALINK] Error ${node.options.host}: ${error.message}`)
    );

client.manager
    .on("trackStart", async (player, track) => {
        const embed = new Discord.MessageEmbed()
            .setColor("NOT_QUITE_BLACK")
            .setAuthor("♪ Reproduciendo ahora", track.requester.displayAvatarURL({ dynamic: true }))
            .setTitle(track.title)
            .setURL(track.uri)
            .addFields([
                {
                    name: "Canal",
                    value: track.author,
                    inline: true
                },
                {
                    name: "Duración",
                    value: track.isStream
                        ? "En vivo"
                        : prettyms(track.duration, {
                              colonNotation: true,
                              secondsDecimalDigits: 0
                          }),
                    inline: true
                },
                {
                    name: "Duración de la cola",
                    value: prettyms(player.queue.duration, {
                        colonNotation: true,
                        secondsDecimalDigits: 0
                    }),
                    inline: true
                },
                {
                    name: "Solicitante",
                    value: track.requester
                }
            ])
            .setTimestamp()
            .setThumbnail(track.thumbnail);

        let nowplaying = await client.channels.cache.get(player.textChannel).send(embed);
        player.setNowplayingMessage(nowplaying);
    })
    .on("queueEnd", (player) => {
        const queueEmbed = new Discord.MessageEmbed()
            .setColor("NOT_QUITE_BLACK")
            .setDescription("La cola ha terminado");

        client.channels.cache.get(player.textChannel).send(queueEmbed);
        player.destroy();
    });

client.on("ready", async () => {
    client.manager.init(client.user.id)
})

//------------------------ Handler ------------------------//

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync("./comandos").filter((file) => file.endsWith(".js"));

const actividades = fs.readdirSync("./comandos/actividades").filter((file) => file.endsWith(".js"));

const diversión = fs.readdirSync("./comandos/diversión").filter((file) => file.endsWith(".js"));

const info = fs.readdirSync("./comandos/info").filter((file) => file.endsWith(".js"));

const moderación = fs.readdirSync("./comandos/moderación").filter((file) => file.endsWith(".js"));

const música = fs.readdirSync("./comandos/música").filter((file) => file.endsWith(".js"));

const otros = fs.readdirSync("./comandos/otros").filter((file) => file.endsWith(".js"));

const sugerencias = fs.readdirSync("./comandos/sugerencias").filter((file) => file.endsWith(".js"));

const confesiones = fs.readdirSync("./comandos/confesiones").filter((file) => file.endsWith(".js"));


for (const file of commandFiles) {
    const command = require(`./comandos/${file}`);
    client.commands.set(command.name, command);
}
for (const file of actividades) {
    const command = require(`./comandos/actividades/${file}`);
    client.commands.set(command.name, command);
}
for (const file of diversión) {
    const command = require(`./comandos/diversión/${file}`);
    client.commands.set(command.name, command);
}
for (const file of info) {
    const command = require(`./comandos/info/${file}`);
    client.commands.set(command.name, command);
}
for (const file of moderación) {
    const command = require(`./comandos/moderación/${file}`);
    client.commands.set(command.name, command);
}
for (const file of música) {
    const command = require(`./comandos/música/${file}`);
    client.commands.set(command.name, command);
}
for (const file of otros) {
    const command = require(`./comandos/otros/${file}`);
    client.commands.set(command.name, command);
}
for (const file of sugerencias) {
    const command = require(`./comandos/sugerencias/${file}`);
    client.commands.set(command.name, command);
}
for (const file of confesiones) {
    const command = require(`./comandos/confesiones/${file}`);
    client.commands.set(command.name, command);
}

//------------------------ Handler E ------------------------//

for (const file of readdirSync("./eventos")) {
    if (file.endsWith(".js")) {
        let fileName = file.substring(0, file.length - 3);

        let fileContents = require(`./eventos/${file}`)(client);

        //client.on(fileName, fileContents.bind(null, client))
    }
}

//--------------------- Discord Together ---------------------//

const { DiscordTogether } = require("discord-together");

client.discordTogether = new DiscordTogether(client);

//------------------------ Token ------------------------//

client.login("ODg3NzA2NzIzMjMyNjY5NzE3.YUIDTw.UytaA-Q4vq6lUOoRotpKqe1UCw8");
