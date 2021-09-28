const Discord = require("discord.js");
const { DiscordTogether } = require("discord-together");
const { MessageButton, MessageActionRow } = require("discord-buttons");

module.exports = {
  name: "poker",
  alias: ["pk"],

execute(client, message, args) {
  const channelID = message.member.voice.channelID;
  if (!channelID) return message.reply("Tienes que estar en un canal de voz para poder usar este comando");

  client.discordTogether.createTogetherCode(channelID, "poker").then(async (invite) => {
    const btn = new MessageButton().setStyle("url").setLabel("Iniciar Poker Night").setURL(invite.code);
    return message.channel.send({
      embed: {
        thumbnail: {
          url: "https://i.imgur.com/TPSmwxv.png"
        },
        title: "Poker Night",
        description: "👇 Presiona el botón de abajo para iniciar la actividad.",
        fields: [
          {
            name: "¿No puedes entrar?",
            value: "Asegurate de que tenga el permiso para crear invitaciones, y de que estás ejecutando el comando desde una PC (en móviles aún no está disponible)."
          }
        ],
        color: "DARK_BUT_NOT_BLACK",
        footer: {
          iconURL: message.author.displayAvatarURL({ dynamic: true }),
          text: `Ejecutado por ${message.author.tag}`
        }
        },
        component: new MessageActionRow().addComponent(btn)
    });
  });
 }
};