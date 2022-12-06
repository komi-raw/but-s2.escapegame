import { COLORS, format, STYLE } from "../helpers/formatEcho"
import { GlobalState, nextStep } from "../../globalState";
import faker from "@faker-js/faker";

export async function tsharkPrint() {
    let fakeIP;
    let lines = faker.datatype.number({
        min: 16,
        max: 32
    });

    let IPs = "";
    let govLine = faker.datatype.number({
        min: 0,
        max: lines
    })
    for (let i = 0; i < lines; i++) {
        setTimeout(() => {
            if (i == govLine) {
                this.echo(format(`${faker.random.alphaNumeric(faker.datatype.number({ min: 5, max: 32 }))}.government -> comesFrom -> ${GlobalState.savedState.IP_GOV} -> subject -> "-!- Gov message locate lost subject gov <-> Contact-us -!-"`, STYLE.NONE, COLORS.BAD, COLORS.NONE));
            }
            fakeIP = "";
            fakeIP += `${faker.random.alphaNumeric(faker.datatype.number({
                min: 5,
                max: 32
            }))} -> comesFrom -> ${faker.internet.ip()} -> subject -> "${faker.hacker.phrase()}"`;
            if (faker.random.numeric() == 1) {
                this.echo(format(fakeIP, STYLE.NONE, COLORS.BAD, COLORS.NONE))
            } else {
                this.echo(format(fakeIP, STYLE.NONE, COLORS.WARNING, COLORS.NONE))
            }
            IPs += fakeIP + "\n";
        }, 1000 + i * 100);
    }
    this.echo(format(`Red means :
${format("IP coming from unknown networks.\n", STYLE.NONE, COLORS.BAD, COLORS.NONE)}
Orange means :
${format("IP coming from known networks.\n", STYLE.NONE, COLORS.WARNING, COLORS.NONE)}`));

    setTimeout(() => {
        this.echo(format(`No routes were found registered in the routing table.
In order to contact an ip, you have to register a route in the routing table using the route command and use ping to send an ICMP request. 
You will need to use your local IP, your destination IP and the subnetMask.`));
    }, 5000);
    nextStep(120);
}