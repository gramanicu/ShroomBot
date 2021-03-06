import * as Discord from "discord.js";
import fs from "fs";

/**
 * An interface that describes a bot command
 */
interface IBotCommand {
    readonly cmdName: string;

    // Return info about the command
    help(): string;

    /**
     * Check if the message is this type of a command
     * @param msg The message to be checked
     */
    isCommand(msg: string): boolean;

    /**
     * Executes a command that was received
     * @param args The arguments of the command
     * @param msgObject The message (in the discord client) that was received
     * @param client The bot client
     */
    execute(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void>;
}

/**
 * Load all the command (classes) from the commands folder
 * @param cmdFolder The folder in which the commands are stored
 */
export function loadAllCommands(cmdFolder: string): IBotCommand[] {
    const commands: IBotCommand[] = [];

    fs.readdirSync(cmdFolder).forEach((file) => {
        const CmdClass = require(`${cmdFolder}${file}`).default;
        const cmd = new CmdClass() as IBotCommand;
        commands.push(cmd);
    });

    return commands;
}

export default IBotCommand;
