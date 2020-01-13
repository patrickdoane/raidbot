/* eslint-disable indent */
const Discord = require('discord.js');
const client = new Discord.Client();
const meme = require('./memes.js');
const dotenv = require('dotenv');
const memes = require('./memes.json');
dotenv.config();
const messages = require('./messages');
const bot = require('./bot')

const bot_token = process.env.DISCORD_TOKEN;

client.once('ready', () => {
    console.log('Ready!');
});

client.login(bot_token);

let roster = [];
const commands = ['roster', 'signup', 'status', 'memes'];

client.on('message', message => {
    if (messages.isValidChannel(message.channel.name, 'raid-signups') &&
        messages.containsPrefix(message.content, '!') && !messages.isMessageSentByBot(message.author)) {
        if (messages.isValidBotCommand(message.content, commands)) { bot.handleCommand(message); }
        else { message.channel.send(`${message.author}, ${message.content} is not a valid command.`); }
    }
})
