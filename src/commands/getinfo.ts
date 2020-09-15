import * as Discord from "discord.js";
import IBotCommand from "../iBotCommand";
import * as LolApi from "../lolApi";
import axios from "axios";

class CmdTemplate implements IBotCommand {
    readonly cmdName = "getinfo";

    public help(): string {
        return "This command returns info about a summoner";
    }

    public isCommand(command: string): boolean {
        return command === this.cmdName;
    }

    public async execute(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        msgObject.delete().catch(process.stderr.write);

        const regServer = LolApi.checkRegion(args[1]);

        if (regServer) {
            const baseServer = `${regServer}${LolApi.apiRoute}`;
            const route = `https://${baseServer}${LolApi.summonerDataRoute}${args[0]}?api_key=${process.env.RIOT_TOKEN}`;
            axios.get(route).then((res) => {
                const encrySumm = res.data["id"];
                const summLevel = res.data["summonerLevel"];

                let embed = new Discord.MessageEmbed()
                    .setColor("#0099ff")
                    .setTitle(`Here is some info about ${res.data["name"]} (${args[1].toUpperCase()})`)
                    .setURL("https://github.com/gramanicu/ShroomBot#readme")
                    .setThumbnail("https://cdn.discordapp.com/app-icons/755011946654335034/5f1aed402fe3b8fb61df8e397510e858.png");

                const route2 = `https://${baseServer}${LolApi.champMasteryRoute}${encrySumm}?api_key=${process.env.RIOT_TOKEN}`;
                axios.get(route2).then((res) => {
                    const champId: number[] = res.data.slice(0, 5).map((data: any) => parseInt(data["championId"]));
                    const champMastery: number[] = res.data.slice(0, 5).map((data: any) => parseInt(data["championPoints"]));
                    const champLevel: number[] = res.data.slice(0, 5).map((data: any) => parseInt(data["championLevel"]));

                    const champName: string[] = champId.map((id) => LolApi.getChampName(id));
                    var champs = champName.map((name, i: number) => {
                        return {
                            name,
                            mastery: champMastery[i],
                            level: champLevel[i],
                        };
                    });

                    const route3 = `https://${baseServer}${LolApi.summonerLeagues}${encrySumm}?api_key=${process.env.RIOT_TOKEN}`;
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
                        process.stderr.write(`Couldn't find ranked data for ${args[0]}`);
                        msgObject.channel.send(`Couldn't find ranked data for ${args[0]}`);
                    });
                }).catch(() => {
                    process.stderr.write("Couldn't access mastery data");
                    msgObject.channel.send("Couldn't access mastery data");
                });
            }).catch(() => {
                process.stderr.write(`Couldn't find summoner ${args[0]}`);
                msgObject.channel.send(`Couldn't find summoner ${args[0]}`);
            });
        } else {
            msgObject.channel.send(`The region does not exist - ${args[1]}`);
        }
    };
}

export default CmdTemplate;
