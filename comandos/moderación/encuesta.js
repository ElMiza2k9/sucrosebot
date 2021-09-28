const Discord = require('discord.js');
const discord = require('discord-reply')

module.exports = {
  name: "encuesta",
  alias: ["survey"],

execute (client, message, args){

    console.log(message.author.tag)

    const user = message.member;

		const embedp = new Discord.MessageEmbed()

			.setDescription(`Lo sentimos ${user}, debes tener los permisos **gestionar canales y gestionar mensajes** para realizar este comando!`)
			.setColor('RANDOM');

		const embedf = new Discord.MessageEmbed()

			.setDescription('Debes mencionar un canal donde se enviará el mensaje')
			.setColor('RANDOM');

		const embedw = new Discord.MessageEmbed()

			.setDescription('Tienes que decirme de qué tratará tu encuesta')
			.setColor('RANDOM');

		if (!message.member.hasPermission('MANAGE_CHANNELS', 'SEND_MESSAGES'))
			return message.channel.send(embedp);

		let pollChannel = message.mentions.channels.first();
		if (!pollChannel) return message.channel.send(embedf);

    let a = message.guild.channels.resolve(pollChannel.id)
    if(!a) return message.channel.send("El canal debe estar en este servidor!")

		let pollDescription = args.slice(1).join(' ');
		if (!pollDescription) return message.channel.send(embedw);

		let embedPoll = new Discord.MessageEmbed()
			.setTitle('Encuesta!')
			.setDescription(pollDescription)
			.setColor('RANDOM');
		pollChannel.send(embedPoll).then(async msg => {
			await msg.react('<:valid:886946270483185706>');
			await msg.react('<:invalid:886946313894252564>');
		});

  }

} 
