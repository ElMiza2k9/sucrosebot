const Discord = require("discord.js");
const { TrackUtils } = require("erela.js");

module.exports = {
    name: "play",
    alias: ["p"],

    /**
     * @param {Discord.Client} client
     * @param {Discord.Message} message
     * @param {String[]} search
     */
    async execute(client, message, search) {
        if (!message.member.voice.channel)
            return message.lineReplyNoMention("🔊 Tienes que unirte a un canal de voz.");

        if (message.guild.me.voice.channel && !message.guild.me.voice.channel.equals(message.member.voice.channel))
            return message.lineReplyNoMention(`Entra a mi canal de voz: <#${message.guild.me.voice.channel.id}>`)
        
        if (!search[0]) return message.lineReplyNoMention("Realiza una búsqueda o introduce una URL.");
        search = search.join(" ");

        let checkNode = client.manager.nodes.get("localhost");

        if (!checkNode || !checkNode.connected)
            return message.lineReplyNoMention("Lavalink aún no está conectado.");

        const player = client.manager.create({
            guild: message.guild.id,
            voiceChannel: message.member.voice.channel.id,
            textChannel: message.channel.id,
            selfDeafen: true
        });

        if (!player) return message.lineReplyNoMention("No estoy reproduciendo nada .-.");
        if (!player.state != "CONNECTED") await player.connect();

        try {
            if (search.match(client.lavasfy.spotifyPattern)) {
                client.lavasfy.requestToken();

                let node = client.lavasfy.nodes.get("Main");
                let searched = await node.load(search);

                if (searched.loadType === "PLAYLIST_LOADED") {
                    let songs = [];

                    for (let i = 0; i < searched.tracks.length; i++)
                        songs.push(TrackUtils.build(searched.tracks[i], message.author));

                    player.queue.add(songs);

                    if (!player.playing && !player.paused && player.queue.totalSize === searched.tracks.length)
                        player.play();

                    message.channel.send("<:spotify:884800485486379038> Se agregaron " + searched.tracks.length + " canciones.");
                } else if (searched.loadType.startsWith("TRACK")) {
                    const cancion = searched.tracks[0];
                    player.queue.add(TrackUtils.build(searched.tracks[0], message.author));

                    if (!player.playing && !player.paused && !player.queue.size)
                        player.play(searched.tracks[0]);

                    message.channel.send("<:sp:892074109972922479> Se agregó " + cancion.info.title)
                } else {
                    console.log(searched)
                    return message.reply("no encontré resultados para tu petición.");
                }
            } else {
                let searched = await player.search(search, message.author);

                if (searched.loadType === "NO_MATCHES")
                    return message.reply("no encontré resultados para tu petición.");
                    
                if (searched.loadType === "PLAYLIST_LOADED") {
                    player.queue.add(searched.tracks);

                    if (!player.playing && !player.paused && player.queue.totalSize === searched.tracks.length)
                        player.play();

                    message.channel.send("<:youtube:892073553120333874> Se agregaron " + searched.tracks.length + " canciones.");
                } else {
                    const cancion = searched.tracks[0]
                    player.queue.add(searched.tracks[0]);

                    if (!player.playing && !player.paused && !player.queue.size)
                        player.play();

                    message.channel.send("<:youtube:892073553120333874> Se agregó " + cancion.title)
                }
            }
        } catch (err) {
            console.log(err);
            return message.reply("no encontré resultados para tu petición.");
        }
    }
};
