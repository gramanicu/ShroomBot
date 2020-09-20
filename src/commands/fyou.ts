import * as Discord from 'discord.js';
import IBotCommand from '../iBotCommand';

class FYou implements IBotCommand {
    public readonly cmdName: string = 'fuckyou';

    public help(): string {
        return "Don't do it";
    }

    public isCommand(command: string): boolean {
        return command === this.cmdName;
    }

    public async execute(
        args: string[],
        msgObject: Discord.Message
    ): Promise<void> {
        msgObject.delete().catch(process.stderr.write);

        const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Teemo Says:')
            .setURL('https://github.com/gramanicu/ShroomBot#readme')
            .setDescription('Fuck You Too!')
            .setThumbnail(
                'https://cdn.discordapp.com/app-icons/755011946654335034/330c69e8919d78bf3ee8ca4efa028bb9.png'
            );

        msgObject.channel.send(embed).catch(process.stderr.write);
    }
}

export default FYou;
