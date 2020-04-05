const discord = require("discord.js");
const bot = new discord.Client();

require("dotenv").config();
const prefix = "_!";

bot.on('message', message => {
    const args = message.content.substring(prefix.length).split(" ");

    switch (args[0]) {
        case "twitch":
            const twitch = new discord.RichEmbed({
                author: {
                    name: "Big QT Tyler",
                    icon_url: "https://cdn.discordapp.com/avatars/470976449654816768/aa7bb510d3ed04fe8fcc4fd32e375e63.png"
                },
                title: "Check Out My Twitch Channel",
                description: "https://www.twitch.tv/yourlocalgenji/",
                footer: {
                    text: new Date().toLocaleString()
                }
            })
            message.channel.send(twitch);
            break;

        case "ban":
            try {
                // this system is working
                const banuserGuild = message.mentions.members.first();
                const author = message.author;

                if (!userGuild) {
                    message.channel.send("⛔ Please Mention A user ⛔");
                    return;
                }

                if (message.member.roles.some(role => role.name === "Admin")) {
                    /// ban system working
                    const banEmbed = new discord.RichEmbed({
                        author: {
                            name: "genji",
                            icon_url: "https://cdn.discordapp.com/app-icons/696026003243532339/d0546391d381dd56956d3cd3e93cf931.png"
                        },
                        title: "A user was banned",
                        description: `${message.author.username} Banned test user`,
                        color: 25500,
                        footer: {
                            text: new Date().toLocaleString()
                        }
                    });
                    banuserGuild.ban("You were banned by an Admin").then(function() {
                        message.channel.send(banEmbed);
                    }).catch((err) => {
                        message.channel.send(`Error Banning ${banuserGuild.user.username}`);
                        console.log(err);
                    })
                } else {
                    message.channel.send(`Sorry ${author.username} Your Not a Mod`);
                }
            } catch (err) {
                message.channel.send("⛔ Sorry an Occurred! ⛔");
                console.log(err);
            }
            break;


        case "kick":
            const userGuild = message.mentions.members.first();

            if (!userGuild) {
                message.channel.send("⛔ Please Mention A user ⛔");
                return;
            }

            if (message.member.roles.some(role => role.name === "Admin")) {
                if (userGuild.kickable) {
                    userGuild.kick("You were kicked by an admin.").then(() => {
                        const kickEmbed = new discord.RichEmbed({
                            author: {
                                name: "genji",
                                icon_url: "https://cdn.discordapp.com/app-icons/696026003243532339/d0546391d381dd56956d3cd3e93cf931.png"
                            },
                            title: "A user was kicked",
                            description: `${message.author.username} Kicked ${userGuild.user.user} user`,
                            color: 25500,
                            footer: {
                                text: new Date().toLocaleString()
                            }
                        });
                        message.channel.send(kickEmbed);
                    }).catch((err) => {
                        message.channel.send("⛔ Sorry an Occurred! ⛔");
                        console.log(err);
                    })
                } else {
                    message.channel.send("Sorry that user is not bannable");
                }
            } else {
                message.channel.send("Im Sorry your not an admin");
            }

            break;

        case "test":
            const banEmbedtest = new discord.RichEmbed({
                author: {
                    name: "genji",
                    icon_url: "https://cdn.discordapp.com/app-icons/696026003243532339/d0546391d381dd56956d3cd3e93cf931.png"
                },
                title: "A user was banned",
                description: `${message.author.username} Banned test user`,
                color: 25500,
                footer: {
                    text: new Date().toLocaleString()
                }
            });
            message.channel.send(banEmbedtest);
            break;

        case "help":
            const helpEmbed = new discord.RichEmbed({
                title: "List of Commands",
                description: "_!twitch, _!ban for mods, _!kick for mods"
            })
            message.channel.send(helpEmbed);
            break;
    }
})

bot.login(process.env.TK);

bot.on("ready", () => {
    console.log("Bot Ready!!");
    bot.user.setPresence({
        game: {
            name: "_!",
            type: 2
        }
    })
})