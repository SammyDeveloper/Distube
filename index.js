const Discord = require("discord.js");
const { Client, Intents } = require("discord.js");
const colors = require("colors");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_WEBHOOKS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGE_TYPING] });
const fs = require("fs");

process.on('unhandledRejection', error => {
	console.error(error);
});

client.on('shardError', error => {
	console.error(error);
});


client.comandos = new Discord.Collection();
client.slashs = new Discord.Collection();

["comandos"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.login(process.env['token'])//agrega tu token a secres con el nombre token
.then(() => {
  console.log(`Estoy listo, soy ${client.user.tag}`);
})
.catch(err => {
  console.error('Error al iniciar sesión: ' + err);
});

const { DisTube } = require ('distube')
const SoundCloudPlugin = require('@distube/soundcloud')
const SpotifyPlugin = require('@distube/spotify')

client.distube = new DisTube(client, {
    searchSongs: 10,
    searchCooldown: 10000,
    leaveOnEmpty: true,
    emptyCooldown: 0,
    leaveOnFinish: true,
    leaveOnStop: true,
    plugins: [new SoundCloudPlugin.default(), new SpotifyPlugin.default()],
})
const status = queue => `Volumen: **${queue.volume}%** | Filtro: **${queue.filter || "Apagado"}** | Loop: **${queue.repeatMode ? queue.repeatMode === 2 ? "Toda la cola:" : "Esta sonando" : "Apagado"}** | Autoplay: **${queue.autoplay ? "Encendido" : "Apagado"}**`
client.distube
    .on("playSong", (queue, song) => {
      const playSong = new Discord.MessageEmbed()
      .setTitle("Música Reproduciéndose")
      .setDescription(`Reproduciendo \`${song.name}\` - \`${song.formattedDuration}\`\nPedida por: ${song.user}`)
      .setImage(song.thumbnail)
      .setColor("GREEN")
      queue.textChannel.send({ embeds: [playSong] })
    })
    .on("addSong", (queue, song) => queue.textChannel.send(
        `${song.user} agrego ${song.name} - \`${song.formattedDuration}\` a la cola`
    ))
    .on("playList", (message, queue, playlist, song) => {
         const addSong = new Discord.MessageEmbed()
        .setDescription(`\`${playlist.title}\` playlist (${playlist.total_items} canciones).\nPedido Por: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`)
        .setTimestamp()
        .setColor("GREEN")
        message.channel.send({ embeds: [addSong] })
            })
    .on("addList", (queue, playlist) => queue.textChannel.send(
        `Añadido \`${playlist.name}\` playlist (${playlist.songs.length} canciones) en la lista`
    ))

    // DisTubeOptions.searchSongs = true
    .on("searchResult", (message, result) => {
        let i = 0
        const searchResult = new Discord.MessageEmbed()
          .setTitle(`Escoja una canción según su número:`)
          .setDescription(`${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}`)
          .setFooter(`Tienes 60 segundos o se cancela.`)
          .setColor("RANDOM")
          message.channel.send({ embeds: [searchResult] })
        
    })

    // DisTubeOptions.searchSongs = true
    .on("searchCancel", message => message.channel.send(NoEm+" `|` Busqueda cancelada."))
    .on("searchNoResult", message => message.textChannel.send(`No hay resultados!`))

    .on("searchInvalidAnswer", (message) => message.channel.send(`¡Respondiste un número inválido!`))

  .on("searchDone", (message, answer, query) => answer.channel.send(`${query}`))
