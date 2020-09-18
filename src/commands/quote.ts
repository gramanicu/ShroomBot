import * as Discord from "discord.js";
import IBotCommand from "../iBotCommand";


/**
 * Randomises with a probability
 * @param probability The probability to have a positive result
 */
const chance = (probability: number): boolean => {
    const res = Math.random() * 100;
    return res <= probability;
};

/**
 * Return a random element from an array
 * @param array The array to be used
 */
const randomArrayElement = (array: any[]): any => {
    return array[Math.floor(Math.random() * array.length)];
};

class FYou implements IBotCommand {
    public readonly cmdName: string = "quote";
    
    private quotes: string[] = [
        "Captain Teemo on duty.",
        "Yes, sir!",
        "Hut, two, three, four.",
        "I'll scout ahead!",
        "Armed and ready.",
        "That's gotta sting.",
        "Reporting in.",
        "Swiftly!",
        "Never underestimate the power of the Scout's code.",
        "Size doesn't mean everything.",
    ];

    private omegaQuotes: string[] = [
        "The war never ends, the battlefield just changes.",
        "Survive here a week, then you get a name.",
        "There's a mushroom out there with your name on it.",
        "I've done things I'm not proud of.",
        "I'm the last scout standing.",
        "You don't know about war.",
        "You'd be surprised how quick fur ignites.",
        "My ears are always ringing.",
        "One day there'll be a reckoning.",
        "War didn't change me, I changed war!",
        "Tall folk don't last long round here.",
        "Never. Get. Attached.",
        "Good men die. I choose to live.",
        "We ain't all makin' it out of here.",
        "Peace is a fairy tale.",
        "Reinforcements ain't comin'.",
        "Size is a liability.",
        "Nobody's innocent any more.",
        "I used to live by a code.",
        "They been looking for yours truly.",
        "Survival ain't pretty.",
        "Lots to do before I punch out.",
        "A part of you never leaves the jungle.",
        "I forget what started the fighting...",
        "You can't tell but, uh, I've grown quite the beard under here.",
        "You want Teemo? Come and get him!",
        "Take a long walk through the jungle!a",
        "Here you go, little guy. You're my only friend left.",
        "You and I are survivors, buddy. They can never kill us.",
        "They won't make the mistake of thinking you're harmless again.",
        "We'll make them pay for what they did to your family little guy.",
    ];

    public help(): string {
        return "Returns a random teemo quote";
    }

    public isCommand(command: string): boolean {
        return command === this.cmdName;
    }

    public async execute(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {

        msgObject.delete().catch(process.stderr.write);

        const isSpecial = chance(25); // 25% chance for a omega squad quote

        const quote = isSpecial ? randomArrayElement(this.omegaQuotes) : randomArrayElement(this.quotes);

        const embed = new Discord.MessageEmbed()
            .setColor("#0099ff")
            .setTitle("Teemo Says:")
            .setURL("https://github.com/gramanicu/ShroomBot#readme")
            .setDescription(quote)
            .setThumbnail("https://cdn.discordapp.com/app-icons/755011946654335034/5f1aed402fe3b8fb61df8e397510e858.png");

        msgObject.channel.send(embed).catch(process.stderr.write);
    }
}

export default FYou;
