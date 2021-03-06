const Command = require("./command.js")
const Discord = require("discord.js");
const config = require("../config.json");
const commandJson = require("../command.json");

module.exports = new Command("help", function(receivedMessage, primaryCommand, argumentsCommand) {
    var embed = new Discord.MessageEmbed();
    let res = '';
    let res1 = '';
    for (let i=0; i < commandJson.length; i++) {
        if (commandJson[i].permission == '') {
            res += '- ' + commandJson[i].name + ': ' + commandJson[i].usage + ' -- ' + commandJson[i].description + ' \n';
        }
    }
    for (let i=0; i < commandJson.length; i++) {
        if (commandJson[i].permission == 'botCommander') {
            res1 += '- ' + commandJson[i].name + ': ' + commandJson[i].usage + ' -- ' + commandJson[i].description + ' \n';
        }
    }

    embed.setColor(config.embedColor)
        .setAuthor(receivedMessage.author.username, receivedMessage.author.avatarURL)
        .addField("Command for everyone:", res)
        .addField("Command for the elite:", res1)
        .addField("Information of a command", "Usage: `<command> -help` -- Return usage, information about the command");
    receivedMessage.author.send(embed).catch(error => Command.logError(error, receivedMessage));
    return 0;
});
