const Discord = require("discord.js");
const fclient = require("fortnite");
const fortnite = new fclient("2220b2dd-5014-4365-a37c-a626d14a1301");

module.exports = {
  name: "fortnite",
  alias: [],

  execute(client, message, args) {
    let jugadorstr = args[0];
    let plataforma = args[1];
    if (!jugadorstr)
      return message.channel.send("ingresa el nombre de un jugador");
    if (!plataforma)
      return message.channel.send(
        "ingresa una plataforma, puede ser pc o gamepad"
      );

    fortnite
      .user(jugadorstr, plataforma)
      .then((jugador) => {
        const embed = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setDescription(`Estadisticas de [${jugadorstr}](${jugador.url})`)
          .addField(
            "Victorias: ",
            `Solo: ${jugador.stats.solo.wins}, Duo: ${jugador.stats.duo.wins}, Squad: ${jugador.stats.squad.wins}`
          )
          .addField(
            "Eliminaciones: ",
            `Solo: ${jugador.stats.solo.kills}, Duo: ${jugador.stats.duo.kills}, Squad: ${jugador.stats.squad.kills}`
          )
          .addField(
            "Partidas: ",
            `Solo: ${jugador.stats.solo.matches}, Duo: ${jugador.stats.duo.matches}, Squad: ${jugador.stats.squad.matches}`
          );
        message.channel.send(embed);
      })
      .catch((e) => message.reply("El jugador mencionado no existe"));
  },
};
