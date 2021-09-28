const Discord = require("discord.js");
const db = require('megadb')
const role = new db.crearDB('rolemute')

module.exports = {
    name: "unmute",
    alias: [],

    /**
     * Esto para el intellisense (ctrl + espacio)
     * @param {Discord.Client} client
     * @param {import("discord-reply")} message
     * @param {String[]} args
     */
    async execute(client, message, args) {

        if(!message.member.hasPermission("MANAGE_CHANNELS"))return message.channel.send("❌ `|` No tienes permisospara ejecutar este comando nesecitas el permiso `MANAGE_CHANNELS`")

        if(!message.guild.me.hasPermission("MANAGE_ROLES"))return message.channel.send("❌ `|` No tengo permisos para ejecutar este comando nesecito los permisos `MANAGE_ROLES`")

        if(!role.tiene(message.guild.id))return message.channel.send("❌ `|` El rol mute no esta establecido usa el comando `-setmuterole <@rol>`")
        let persona = message.mentions.members.first()
        if(!persona)return message.channel.send("❌ `|` Menciona al usuario")

        let razon = args.slice(1).join(" ")
        if(!razon)return message.channel.send("❌ `|` No has mencionado una razon valida")

        let role1 = await role.obtener(message.guild.id)

        if(!persona.roles.cache.has(role1))return message.channel.send("❌ `|` Este miembro no esta muteado")

        persona.roles.remove(role1)
        message.channel.send(`El miembro fue desmuteado ${persona} razon: ${razon}`)
    }
};