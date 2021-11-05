const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "skip",
  aliases : ['s'],
  usage: '<Canción/Playlist>',
  description : 'salta la cancion.',
  run: async (client, message, args) => {

    if(!message.member.voice.channel) return message.reply(':x: `|` Debes estar a un canal de voz para usar este comando')
      
    if(message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(":x: `|` Debes estar en el mismo canal de voz que yo.")

    client.distube.skip(message)
  },
};
