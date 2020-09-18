import * as Discord from 'discord.js';
import IBotCommand from '../iBotCommand';
import * as LolApi from '../lolApi';
import axios from 'axios';

class Rotation implements IBotCommand {
    public readonly cmdName: string = 'rotation';

    public help(): string {
        return 'This is a command that returns the current champion rotation';
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
            .setTitle('ShroomBot')
            .setURL('https://github.com/gramanicu/ShroomBot#readme')
            .setThumbnail(
                'https://cdn.discordapp.com/app-icons/755011946654335034/5f1aed402fe3b8fb61df8e397510e858.png'
            );

        const baseServer = `euw1${LolApi.apiRoute}`;
        const route = `https://${baseServer}${LolApi.champRotationRoute}?api_key=${process.env.RIOT_TOKEN}`;

        axios
            .get(route)
            .then((res) => {
                embed.setTimestamp();

                const champs: number[] = res.data['freeChampionIds'];
                let rot = '';

                champs.forEach((id, i) => {
                    const key = LolApi.getChampName(id);
                    rot += key;
                    if (i !== champs.length - 1) {
                        rot += ', ';
                    }
                });

                embed.setDescription(`**Current champion rotation**:\n${rot}`);

                msgObject.channel.send(embed).catch(process.stderr.write);
            })
            .catch(() => {
                process.stderr.write('Api key may have expired\n');
                msgObject.channel.send(
                    'Teemo may have his shrooms on cooldown!'
                );
            });
    }
}

export default Rotation;
