const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "morse",
  alias: [],

async execute (client, message, args){
		let alpha = " ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split(""),
			morse = "/,.-,-...,-.-.,-..,.,..-.,--.,....,..,.---,-.-,.-..,--,-.,---,.--.,--.-,.-.,...,-,..-,...-,.--,-..-,-.--,--..,.----,..---,...--,....-,.....,-....,--...,---..,----.,-----".split(","),
			text = args.slice(1).join(" ").toUpperCase();

		while (text.includes("Ä") || text.includes("Ö") || text.includes("Ü")) {
			text = text.replace("Ä", "AE").replace("Ö", "OE").replace("Ü", "UE");
		}

		if (text.startsWith(".") || text.startsWith("-")) {
			text = text.split(" ");
			let length = text.length;
			for (let i = 0; i < length; i++) {
				text[i] = alpha[morse.indexOf(text[i])];
			}
			text = text.join("");
		} else {
			text = text.split("");
			let length = text.length;
			for (let i = 0; i < length; i++) {
				text[i] = morse[alpha.indexOf(text[i])];
			}
			text = text.join(" ");
		}
		message.channel.send("```" + text + "```");
	}
}