const { Discord, MessageEmbed, version } = require("discord.js");
const moment = require("moment");
const m = require("moment-duration-format");
let os = require('os');
let cpuStat = require("cpu-stat");
const ms = require("ms");

module.exports = {
  name: "botinfo",
  alias: ["bi"],

async execute (client, message, args){

  let cpuLol;
        cpuStat.usagePercent(async function (err, percent, seconds) {
            if (err) {
                return console.log(err);
            }
            const duration = moment.duration(message.client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
            const botinfo = new MessageEmbed()
                .setTitle("__**Estadisticas del Bot:**__")
                .setColor("RANDOM")
                .addField("`⏳`Memoria Usada", `${(process.memoryUsage().heapUsed / 4096 / 4096).toFixed(2)} / ${(os.totalmem() / 4096 / 4096).toFixed(2)} MB`, true)
                .addField("`📁` Usuarios", `${message.client.users.cache.size}`, true)
                .addField("`📁` Servidores", `${message.client.guilds.cache.size}`, true)
                .addField("`📁` Canales ", `${message.client.channels.cache.size}`, true)
                .addField("`👾` Discord.js", `v${version}`, true)
                .addField("`🤖` Node", `${process.version}`, true)
                .addField("`🤖` CPU", `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
                .addField("`🤖` CPU Usada", `\`${percent.toFixed(2)}%\``, true)
                .addField("`⌚️` Tiempo Activo ", `${duration}`, true)
                .addField("`💻` Sistema Operativo", `\`\`${os.platform()}\`\``, true)
                .addField("Latencia de API", `${(message.client.ws.ping)}ms`)
                .setFooter(`© ${message.guild.me.displayName}`, client.user.displayAvatarURL());
                 message.channel.send(botinfo)
        });
    }
}