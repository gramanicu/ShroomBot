import * as Discord from "discord.js"
import IBotCommand, { loadAllCommands } from '../iBotCommand'

class CmdTemplate implements IBotCommand {
    readonly cmdName = 'getinfo';

    public help(): string {
        return 'This command returns info about a summoner';
    }

    public isCommand(command: string): boolean {
        return command == this.cmdName;
    }

    public async execute(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
    }
}

export default CmdTemplate;