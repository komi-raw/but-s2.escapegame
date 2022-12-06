import { nextStep } from "../../globalState";
import { format } from "../helpers/formatEcho";

export function conflict() {
    this.echo(format(`There is a total of : 2 Conflicts to handle
First conflict : Missing one element in the OSI model:
7.Application
6.Presentation
5.Session
4. --?-- 
3.Network
2.DataLink
1.Physical
Second conflict : The connection can not be established with the router.
The _conflictresolve_ tool awaits for you to choose the best equipment to connect to the router:
Use the command setequipment switch <name-of-the-missing-OSI-info> OR setequipment hub <name-of-the-missing-OSI-info>
Use 'man osi' or 'man equipment' if you are not sure about what to do.`));
}

export function setEquipment(material, osi) {
    if (material.toLowerCase() == "switch" && osi.toLowerCase() == "transport") {
        this.echo(format(`The switch permits the easy use of the _tshark_ command.
The configuration of the OSI model ended well.
Use man tshark in order to know how to properly use tshark.`));
        nextStep(110);
    } else {
        this.error(`Error during the configuration. Please review the manual pages or try again.\n`);
    }
}