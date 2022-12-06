import { COLORS, format, STYLE } from "../helpers/formatEcho";
import { GlobalState, nextStep } from "../../globalState";
import { solveIP } from "./generateIP";

export function addRoute(oIp, dIp, sMask) {
    this.echo(format(`The _route_ tool help you link two IPs by specifying them.
Type man route if you want to access the man page about the route command.`));
    if (oIp === GlobalState.savedState.IP && dIp === GlobalState.savedState.IP_GOV && sMask.includes(solveIP(GlobalState.savedState.IP))) {
        this.echo(format("Route added successfully.\n", STYLE.NONE, COLORS.GOOD, COLORS.NONE));
        GlobalState.savedState.CAN_PING = 1;
        if (!GlobalState.savedState.ROUTES.includes(format(`${oIp} ${dIp} ${sMask} Effective\n`, STYLE.BOLD, COLORS.GOOD))) {
            GlobalState.savedState.ROUTES += format(`${oIp} ${dIp} ${sMask} Effective\n`, STYLE.BOLD, COLORS.GOOD);
        }
        nextStep(130);
    } else if (oIp === undefined || dIp === undefined || sMask === undefined) {
        this.error(`ERR -> Cannot add the route.`)
    } else {
        this.echo(format(`The _route_ utility cannot add any routes between the two specified IPs.`));
        this.error(`ERR -> Route added, but not effective yet.`);
        if (!GlobalState.savedState.ROUTES.includes(format(`${oIp} ${dIp} ${sMask} Uneffective\n`, STYLE.BOLD, COLORS.BAD))) {
            GlobalState.savedState.ROUTES += format(`${oIp} ${dIp} ${sMask} Uneffective\n`, STYLE.BOLD, COLORS.BAD);
        }

    }
    this.echo(format(`Use _showroute_ to display all routes.
Use _ping <ip>_ to contact the specified IP.`));
}

export function showRoute() {
    this.echo(format(GlobalState.savedState.ROUTES));
}


