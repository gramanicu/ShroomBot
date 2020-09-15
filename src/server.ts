import * as Dotenv from "dotenv";
import * as Discord from "discord.js";
import IBotCommand, { loadAllCommands } from "./iBotCommand";
import fs from "fs";


// Initialise server
Dotenv.config();
const bot: Discord.Client = new Discord.Client();
const cmdPrefix = process.env.PREFIX;
const botToken = process.env.DISCORD_TOKEN;

bot.login(botToken);

// Load Commands
const cmdFolder: fs.PathLike = `${__dirname}/commands/`;
const commands: IBotCommand[] = loadAllCommands(cmdFolder);

// Bot Events
bot.on("ready", () => {
    process.stdout.write("Bot started\n");
    bot.user.setActivity("The most tilting game ever", {type: "PLAYING"});
});

bot.on("message", handleMessage);

/**
 * Check if the command is a valid one and executes it
 * @param message The received message
 */
function handleMessage(message: Discord.Message): void {
    if(message.author.bot || message.channel.type === "dm" || !message.content.startsWith(cmdPrefix)) {
        return;
    }

    // The content of the message
    const msg: string = message.content;
    const cmdText:string = msg.split(" ")[0].replace(cmdPrefix, "").toLowerCase();
    const args: string[] = msg.split(" ").slice(1);

    let executedOne = false;
    commands.forEach(async(cmd: IBotCommand): Promise<void> => {
        // Attempt to execute the command
        try {
            if(!cmd.isCommand(cmdText)) {
                return;
            }

            // Execute the command (pause the execution of the loop)
            await cmd.execute(args, message, bot);
            executedOne = true;
        } catch (err) {
            process.stderr.write(err);
        }
    });

    if(!executedOne) {
        message.channel.send("Invalid command. Use help command to list all available commands");
    }
}
