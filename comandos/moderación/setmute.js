const Discord = require("discord.js");
const db = require('megadb')
const role = new db.crearDB('rolemute')

module.exports = {
    name: "setmuterol",
    alias: ["smr"],

    /**
     * Esto para el intellisense (ctrl + espacio)
     * @param {Discord.Client} client
     * @param {import("discord-reply")} message
     * @param {String[]} args
     */
    async execute(client, message, args) {

        if(!message.member.hasPermission('ADMINISTRATOR')){
            return message.channel.send("❌ `|` No tienes permisos para ejecutar este comando  nesecitas el permiso `ADMINISTRATOR`")
        }

        if (!message.guild.me.hasPermission('MANAGE_GUILD')) {
            return message.channel.send("❌ `|` Necesito los permisos de `MANAGE_ROLES`")
          }

          let rolfinal = message.mentions.roles.first();
          if(!rolfinal)return message.channel.send("❌ `|` Menciona el rol que quieres establecer")

          role.establecer(`${message.guild.id}` , `${rolfinal.id}`)

          message.channel.send(`<:white_check_mark:888700380018540614> \`|\` El rol ${rolfinal} ah sido establecido como el rol para mutear `)
    }
};