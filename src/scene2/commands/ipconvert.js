import { COLORS, format, STYLE } from "../helpers/formatEcho"
import { GlobalState, nextStep } from "../../globalState";

import { solveIP } from "./generateIP";

export async function IPConvert() {
    this.echo(format(`The following IP is your local IP.`));
    this.echo(format(GlobalState.savedState.IP + "/" + GlobalState.savedState.MASK_SIZE));

    const mask = await this.read("Enter the mask: ");

    // need a further treatment in order to continue the project
    if (mask.includes(solveIP(GlobalState.savedState.IP))) {
        this.echo(format(mask, STYLE.NONE, COLORS.GOOD, COLORS.NONE));
        this.echo(format(`The calculated mask is correct but
The system has an issue concerning the n̸͐̈́͟͟͝e̵̡̫̫͍͕̎ͭ̐͟͟͝͞t҉̷҉̢͖͔̹͛̌͊͘͜͢͠͡͡w҉̢̡̹̮͌̄ͦ͜͟͟͞͠͞o҉̢̡̲͇̌͗̀͢͝r҉̵҉̛̠̩̥̋ͦ̆͆͟͞͡͞͠k҉̴̶̬͈̫̹͖̾̎ͭ́̍̐͜͜͝͠ c̷̶҉̵̢͚̣̻̲̬͑̑͛͐̀͜͜͜͝͡͝͠o҉̢̡̲͇̌͗̀͢͝n̸͐̈́͟͟͝f҉̴̥͎̰̰̒͌͛͐ͧ̕͜͝͡͞i҉̧̯̤̙͔̑ͧ̅̔ͦ́͜͟͢͝͠g̷̵̸̡̼̱͎͎̞ͤͬ̅͢͟͞u̶͖̖͆̊̈́͡͡r҉̵҉̛̠̩̥̋ͦ̆͆͟͞͡͞͠a҉͖̟̜̞̂̃̑̽͢͢͠͡t҉̷҉̢͖͔̹͛̌͊͘͜͢͠͡͡i҉̧̯̤̙͔̑ͧ̅̔ͦ́͜͟͢͝͠o҉̢̡̲͇̌͗̀͢͝n̸͐̈́͟͟͝  use the  _conflictresolve_ tool.`));
        nextStep(100);
    } else {
        this.echo(format(mask, STYLE.NONE, COLORS.BAD, COLORS.NONE));
    }
}