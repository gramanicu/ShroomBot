import * as Discord from "discord.js";
import IBotCommand from "../iBotCommand";
import * as LolApi from "../lolApi";
import axios from "axios";

class GetInfo implements IBotCommand {
    public readonly cmdName: string = "getinfo";

    public help(): string {
        return "This is a command that requires the summoner name and the region that returns some info about the summoner.\n Example: '-getinfo the inescapable euw'";
    }

    public isCommand(command: string): boolean {
        return command === this.cmdName;
    }

    public async execute(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        msgObject.delete().catch(process.stderr.write);

        const regServer = LolApi.checkRegion(args[args.length-1]);
        let summonerName = "";
        for(let i = 0; i < args.length - 1; ++i) {
            summonerName += args[i];
            if(i !== args.length - 2) {
                summonerName += " ";
            }
        }

        if (regServer) {
            const baseServer = `${regServer}${LolApi.apiRoute}`;
            const route = `https://${baseServer}${LolApi.summonerDataRoute}${summonerName}?api_key=${process.env.RIOT_TOKEN}`;
            axios.get(route).then((res) => {
                const encrySumm = res.data["id"];
                const summLevel = res.data["summonerLevel"];

<<<<<<< HEAD
                    const embed = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle(
                            `Here is some info about __**${
                                res.data['name']
                            }**__ (${args[args.length - 1].toUpperCase()})`
                        )
                        .setURL('https://github.com/gramanicu/ShroomBot#readme')
                        .setThumbnail(
                            'https://cdn.discordapp.com/app-icons/755011946654335034/330c69e8919d78bf3ee8ca4efa028bb9.png'
                        );
=======
                const embed = new Discord.MessageEmbed()
                    .setColor("#0099ff")
                    .setTitle(`Here is some info about __**${res.data["name"]}**__ (${args[args.length - 1].toUpperCase()})`)
                    .setURL("https://github.com/gramanicu/ShroomBot#readme")
                    .setThumbnail("https://cdn.discordapp.com/app-icons/755011946654335034/5f1aed402fe3b8fb61df8e397510e858.png");
>>>>>>> parent of b70c451... Added eslint

                const route2 = `https://${baseServer}${LolApi.champMasteryRoute}${encrySumm}?api_key=${process.env.RIOT_TOKEN}`;
                axios.get(route2).then((res) => {
                    const champNum = 5;
                    const champId: number[] = res.data.slice(0, champNum).map((data: any) => parseInt(data["championId"]));
                    const champMastery: number[] = res.data.slice(0, champNum).map((data: any) => parseInt(data["championPoints"]));
                    const champLevel: number[] = res.data.slice(0, champNum).map((data: any) => parseInt(data["championLevel"]));

                    const champName: string[] = champId.map((id) => LolApi.getChampName(id));
                    const champs = champName.map((name, i: number) => {
                        return {
                            level: champLevel[i],
                            mastery: champMastery[i],
                            name,
                        };
                    });

                    const route3 = `https://${baseServer}${LolApi.summonerLeaguesRoute}${encrySumm}?api_key=${process.env.RIOT_TOKEN}`;
                    axios.get(route3).then((res) => {
                        const soloqData = res.data.filter((queue: any) => {
                            return queue["queueType"] === "RANKED_SOLO_5x5";
                        })[0];

                        if (soloqData) {
                            const tier = soloqData["tier"].toLowerCase();
                            const rank = soloqData["rank"].toUpperCase();
                            const lp = soloqData["leaguePoints"];
                            const wins = soloqData["wins"];
                            const loses = soloqData["losses"];
                            const winrate = Math.floor((100 * wins) / (wins + loses));

                            embed.setDescription(`He is level ${summLevel}.\n His rank is ${tier} ${rank} ${lp} LP, with ${wins}W ${loses}L - ${(winrate)}%`);
                        } else {
                            embed.setDescription(`He is level ${summLevel}.\n`);
                        }

                        champs.forEach((champion) => {
                            embed.addField(`${champion.name}`, `${(Math.floor(champion.mastery / 1000))} k mastery points, Level ${champion.level}`, false);
                        });
                        embed.setTimestamp();
                        msgObject.channel.send(embed).catch(process.stderr.write);
                    }).catch(() => {
                        process.stderr.write(`Couldn't find ranked data for ${summonerName}`);
                        msgObject.channel.send(`Couldn't find ranked data for ${summonerName}`);
                    });
                }).catch(() => {
                    process.stderr.write("Couldn't access mastery data");
                    msgObject.channel.send("Couldn't access mastery data");
                });
            }).catch(() => {
                process.stderr.write(`Couldn't find summoner ${summonerName}`);
                msgObject.channel.send(`Couldn't find summoner ${summonerName}`);
            });
        } else {
            msgObject.channel.send(`The region does not exist - ${args[1]}`);
        }
    }
}

export default GetInfo;
