import * as Discord from "discord.js";
import IBotCommand from '../iBotCommand';

class FYou implements IBotCommand {
    readonly cmdName = "fuckyou";

    public help(): string {
        return "Don't do it";
    }

    public isCommand(command: string): boolean {
        return command === this.cmdName;
    }

    public async execute(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        
        msgObject.delete().catch(process.stderr.write);
        
        let embed = new Discord.MessageEmbed()
            .setColor("#0099ff")
            .setTitle("Fuck You Too!")
            .setURL("https://github.com/gramanicu/ShroomBot#readme")
            .setThumbnail("https://cdn.discordapp.com/app-icons/755011946654335034/5f1aed402fe3b8fb61df8e397510e858.png");

        msgObject.channel.send(embed).catch(process.stderr.write);
    }
}

export default FYou;
