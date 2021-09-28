const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "userinfo",
  alias: ["ui"],

execute (client, message, args){
  
  const user = message.mentions.members.first()
	
  || message.guild.members.cache.get(args[0])
	|| message.member;

	let status;
	switch (user.presence.status) {
    case 'online':
			status = 'En Línea';
			break;
		case 'dnd':
			status = 'No molestar';
			break;
		case 'idle':
			status = 'Ausente';
			break;
		case 'offline':
			status = 'Desconectado/invisible';
			break;
		default:
			status = 'Desconocido';
  }

	const embed = new MessageEmbed()
  
  .setTitle(`Información de ${user.user.username}`)
	.setColor('RANDOM')
	.setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
	.addFields(
	{
    name: 'Nombre:',
    value: user.user.username,
    inline: true,
  },
  {
    name: 'Hashtag:',
    value: `#${user.user.discriminator}`,
    inline: true,
  },
  {
    name: 'ID:',
    value: user.user.id,
    },
    {
      name: 'Estado:',
      value: status,
      inline: true,
    },
    {
      name: 'Actividad:',
				value: user.presence.activities[0] ? user.presence.activities[0].name : 'El usuario no esta haciendo nada',
					inline: true,
		},
		{
      name: 'Imagen del Avatar:',
      value: `[Link](${user.user.displayAvatarURL()})`,
		},
		{
      name: 'Fecha de Creación: ',
      value: user.user.createdAt.toLocaleDateString('en-us') + `<t:${parseInt(user.user.createdTimestamp / 1000)}>`,
      inline: true,
		},
		{
      name: 'Fecha de Entrada:',
      value: user.joinedAt.toLocaleDateString('en-us') + `<t:${parseInt(user.joinedTimestamp / 1000)}>`, // esta bien la fecha que puse? o la borro?
      inline: true,
		},
		{
      name: 'Roles:',
      value: user.roles.cache.map((role) => role.toString()).join(' ,'),
      inline: true,
		},
	);

	return message.channel.send(embed);
 }
}