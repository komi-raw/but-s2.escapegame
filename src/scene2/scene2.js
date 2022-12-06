import jQueryTerminal from "jquery.terminal"
import { shrek } from "./commands/easterEggs";
import { marionnet } from "./commands/marionnet";
import { ls } from "./commands/ls"
import "./scene2.scss"
import { GlobalState } from "../globalState";
import { cd } from "./commands/cd";
import { cat } from "./commands/cat";
import { rm } from "./commands/rm";
import { pwd } from "./commands/pwd";
import { touch } from "./commands/touch";
import { ascii } from "./commands/ascii";
import { rmdir } from "./commands/rmdir";
import { mkdir } from "./commands/mkdir";
import { mv } from "./commands/mv";
import { cp } from "./commands/cp";
import $ from "jquery";
import { login } from "./commands/login";
import jQueryMouseWheel from "jquery-mousewheel"
import { format } from "./helpers/formatEcho";
import { man } from "./commands/man";
import { IPConvert } from "./commands/ipconvert"
import { tsharkPrint } from "./commands/tshark"
import { addRoute, showRoute } from "./commands/traceroute"
import { conflict, setEquipment } from "./commands/switchhub"
import { ping } from "./commands/ping"
import { InstructionPopup } from "../common/InstructionPopup";
import sentences from "./../sentences.json"
// Setup

jQueryTerminal($)
jQueryMouseWheel($)

const networkCommands = {
    marionnet: marionnet,
    ls: ls,
    cd: cd,
    cat: cat,
    shrek: shrek,
    rm: rm,
    pwd: pwd,
    touch: touch,
    ascii: ascii,
    mv: mv,
    mkdir: mkdir,
    rmdir: rmdir,
    cp: cp,
    man: man,
    ipconvert: IPConvert,
    tshark: tsharkPrint,
    route: addRoute,
    showroute: showRoute,
    conflictresolve: conflict,
    setequipment: setEquipment,
    ping: ping
}

const loggedCommands = {
    marionnet: marionnet,
    ls: ls,
    cd: cd,
    cat: cat,
    shrek: shrek,
    rm: rm,
    pwd: pwd,
    touch: touch,
    ascii: ascii,
    mv: mv,
    mkdir: mkdir,
    rmdir: rmdir,
    cp: cp,
    man: man,
}

const notLoggedCommands = {
    shrek: shrek,
    ascii: ascii,
    login: login,
}

export function getValidCommands() {
    if (!GlobalState.savedState.loggedIn) {
        return notLoggedCommands;
    } else if (GlobalState.savedState.step > 89) {
        return networkCommands;
    } else if (GlobalState.savedState.loggedIn) {
        return loggedCommands;
    }

}

const terminal = $('#terminal').terminal(getValidCommands(),
    {
        greetings: false,
        name: 'biohazard',
        prompt: function () {
            if (!GlobalState.savedState.loggedIn) {
                return "> "
            }
            return `┌──(${GlobalState.savedState.loggedIn}@biohazard)-[${GlobalState.savedState.currentLocation.join("/")}/]
└──${format("{{ biohazard }}")} `;
        },
        keymap: {
            "CTRL+C": function () {
                GlobalState.updateSavedState({ scene: "scene1" })
                const popup = new InstructionPopup(sentences.copy.title, sentences.copy.message)
                popup.render()
            }
        },
        checkArity: false,
        completion: true,
        completionEscape: true,
        exceptionHandler(e) {
            console.log(e);
        },
        onInit: function () {
            this.echo(format('Bio Hazard Computer, press _CTRL + C_ to exit \nPress _TAB x2_ to see available commands'), { typing: true, delay: 35 })
        },
        onAfterCommand: function () {
            this.set_interpreter(getValidCommands());
        },
        onAfterEcho: function () {
            this.scrollTop(this[0].scrollHeight);
        },
        onFlush: function () {
            this.scrollTop(this[0].scrollHeight);
        },
        scrollOnEcho: true,
        tabs: 3,
        caseSensitiveAutocomplete: false,
        caseSensitiveSearch: false,
        onPaste: async function ({ text }) {
            const lines = text.split("\n");
            const lastLine = lines[lines.length - 1];
            for (let i = 0; i < lines.length - 1; i++) {
                this.exec(lines[i]);
            }
            if (lastLine !== "") {
                this.insert(lastLine);
            }
            return "";
        }
    })

$(".terminal-scroller").on("mousewheel", function (e) {
    terminal.scrollTop(terminal.scrollTop() - e.deltaY * 30);
});

export { terminal }
