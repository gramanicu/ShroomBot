import * as Discord from "discord.js"
import IBotCommand from '../iBotCommand'
import { LolApi as TwistedAPI, Constants as LolConstants } from 'twisted'
import * as lolApi from '../lolApi'

class CmdTemplate implements IBotCommand {
    readonly cmdName = 'getinfo';

    public help(): string {
        return 'This command returns info about a summoner';
    }

    public isCommand(command: string): boolean {
        return command == this.cmdName;
    }

    public async execute(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        msgObject.delete().catch(process.stderr.write);
        let summData: lolApi.SummonerData;

        await lolApi.summonerByName(args[0], args[1])
            .then(data => {
                summData = data;
            })
            .catch(err => {
                process.stderr.write(err);
            });


        console.log(`${summData.summName} top 5 champions\n`);

        let embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`${summData.summName} top 5 champions`)
            .setURL('https://github.com/gramanicu/ShroomBot#readme')
            .setThumbnail('https://cdn.discordapp.com/app-icons/755011946654335034/5f1aed402fe3b8fb61df8e397510e858.png');
        
        // embed.addField(summData.playedChamps[0], '');
        // embed.addField(summData.playedChamps[1], '');
        // embed.addField(summData.playedChamps[2], '');
        // embed.addField(summData.playedChamps[3], '');
        // embed.addField(summData.playedChamps[4], '');
        
        embed.setTimestamp();

        msgObject.channel.send(embed).catch(process.stderr.write);
    }
}

export default CmdTemplate;