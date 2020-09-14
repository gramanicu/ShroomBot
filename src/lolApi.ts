import { LolApi, Constants as LolConstants } from 'twisted'
import { Regions } from 'twisted/dist/constants';
import { ChampionsDataDragon, ChampionsDataDragonDetails, ChampionsDataDragonDetailsSolo, SummonerV4DTO } from 'twisted/dist/models-dto';

const api = new LolApi(process.env.RIOT_TOKEN);
let allChampInfo: ChampionsDataDragonDetails[];
api.DataDragon.getChampion().then(data => {
    allChampInfo = [];
    for(let elem of Object.keys(data.data)) {
        allChampInfo.push(data.data[elem]);
    }
});

export interface SummonerData {
    summName: string;
    playedChamps: string[];
}

/**
 * Converts a region name to a region object
 * @param region A string representing a region (ex. euw, eune, na, kr)
 */
async function parseRegion(region: string): Promise<Regions> {
    switch(region.toLowerCase()) {
        case 'euw': return Regions.EU_WEST;
        case 'eune': return Regions.EU_EAST;
        case 'na': return Regions.AMERICA_NORTH;
        case 'kr': return Regions.KOREA;
        default: return Regions.PBE;
    }
};

/**
 * Search data about a champion with the specified id
 * @param champId The id of the champion to be searched
 */
function getChampionData(champId: number): ChampionsDataDragonDetails {
    const champ = allChampInfo.filter(champData => champData.key === champId.toString())[0];
    return champ;
}

/**
 * Returns data about a particular summoner
 * @param summName The name of the summoner
 * @param regionString The region in which the summoner plays
 */
export async function summonerByName(summName: string, regionString: string): Promise<SummonerData> {
    let region;
    await parseRegion(regionString)
        .then((data) => {
            region = data;
        })
        .catch(process.stderr.write);
    let summoner: SummonerV4DTO;

    await api.Summoner.getByName(summName, region)
        .then((data) => {
            summoner = data.response;
        })
        .catch(() => {
            process.stderr.write("Couldn't find summoner");
            // Maybe returns something
        });
    
    await api.Champion.masteryBySummoner(summoner.id, region)
        .then((data) => {
            for(let i = 0; i < 1; ++i) {
                const nm = allChampInfo.filter(champData => {
                    champData.key === data.response[i].championId.toString();
                })[0].id;
                console.log(nm);
            }
        })
        .catch(process.stderr.write)

    var summData: SummonerData;
    summData.summName = summoner.name;

    return summData;
}