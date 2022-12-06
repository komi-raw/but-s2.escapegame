import { GlobalState } from "../../globalState";
import { format } from "../helpers/formatEcho";

export function ping(dest) {
    if (GlobalState.savedState.CAN_PING == 1 && GlobalState.savedState.IP_GOV === dest) {
        this.echo(format(`PING ` + dest + `.
64 bytes from `+ dest + `: icmp_seq=1 ttl=64 time=326ms.
--- ` + dest + `ping statistics ---
1 packet transmitted, 1 received, 0% packet loss.
Successfully sent an ICMP request`))

        setTimeout(async () => {
            await this.echo(`On t'a retrouvé, on vient te chercher ! Grâce à toi, on va pouvoir déjouer l'attaque, bien joué ${GlobalState.savedState.loggedIn} !`, { typing: true, delay: 50 })
            setTimeout(() => {
                GlobalState.updateSavedState({ scene: "sceneYouWin" });
            }, 3000);
        }, 1000)

    } else {
        this.error(`PING failed, there is no effective routes concerning this IP.`);
    }
}