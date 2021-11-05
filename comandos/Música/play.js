const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "play",
  aliases : ['p'],
  usage: '<Canción/Playlist>',
  description : 'Reproduce una canción o una playlist.',
  run: async (client, message, args) => {

    console.log("Comando hecho por Sammy.#3359")
    if(!message.member.voice.channel) return message.reply(':x: `|` Debes estar a un canal de voz para usar este comando')
      
    if(message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(":x: `|` Debes estar en el mismo canal de voz que yo.")

    const music = args.join(" ")
    if(!music) return message.channel.send(':x: `|` Ingresa el título de una canción')
    client.distube.play(message, music)
  },
};
