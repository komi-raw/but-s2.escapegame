import { GlobalState, nextStep } from "../../globalState";
import { COLORS, format, STYLE } from "../helpers/formatEcho";

export async function login() {
    const user = await this.read("Your name (whatever you want): ");
    if (user.length < 1 || user.length > 20) {
        this.error("Your name must be between 1 and 20 characters long");
        return
    }

    this.set_mask("*")
    const password = await this.read("Password: ");
    this.set_mask(false);

    if (password == GlobalState.savedState.LOGIN_PASSWORD) {
        this.echo(format(`Good password ${user} ! entering the system...`))
        GlobalState.updateSavedState({ loggedIn: user });
        nextStep(20);
    } else {
        this.echo(format(`Wrong password ${user} !`, STYLE.NONE, COLORS.BAD));
        GlobalState.updateSavedState({ loggedIn: null });
    }
}
