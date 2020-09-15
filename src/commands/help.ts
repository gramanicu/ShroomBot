import * as Discord from "discord.js";
import IBotCommand, { loadAllCommands } from '../iBotCommand';

class Help implements IBotCommand {
    private commands: IBotCommand[] = [];

    readonly cmdName = "help";

    public help(): string {
        return "This is a command that returns all the available commands";
    }

    public isCommand(command: string): boolean {
        return command === this.cmdName;
    }

    public async execute(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        if(this.commands.length === 0) {
            this.commands = loadAllCommands(`${__dirname}/`);
        }
        
        msgObject.delete().catch(process.stderr.write);
        
        let embed = new Discord.MessageEmbed()
            .setColor("#0099ff")
            .setTitle("ShroomBot")
            .setURL("https://github.com/gramanicu/ShroomBot#readme")
            .setDescription("A discord bot that uses the Riot API")
            .setThumbnail("https://cdn.discordapp.com/app-icons/755011946654335034/5f1aed402fe3b8fb61df8e397510e858.png");

        this.commands.forEach((cmd) => {
            const key = `"${cmd.cmdName}"`;
            const value = cmd.help();
            embed.addField(key, value, false);
        });
        
        embed.setTimestamp();

        msgObject.channel.send(embed).catch(process.stderr.write);
    }
}

export default Help;
