import { faker } from "@faker-js/faker"
import { generateFakeFiles } from "./fakeData";
import { createFile, createFileWithRights, createDirectory } from "./scene2/helpers/files";
import filesContent from "./scene2/helpers/filesContent";
import { STYLE, format } from "./scene2/helpers/formatEcho"
import { generateIP, maxSize } from "./scene2/commands/generateIP";


class GlobalState {
    static listeners = []

    static savedState = {
        LOGIN_PASSWORD: faker.random.alphaNumeric(4),
        loggedIn: null,
        currentLocation: [],
        START_TIME: new Date().getTime(),
        step: 0,
        scene: "scene0",
        isRightHandFree: false,
        isLeftHandFree: false,
        rightHandCode: null,
        leftHandCode: null,
        isGuardLeft: false,
        IP: generateIP(),
        MASK_SIZE: maxSize(),
        IP_GOV: faker.internet.ip(),
        ROUTES: `${format("SourceIp | DestinationIp | SubnetMask | Effectiveness\n", STYLE.BOLD, "yellow")}`,
        CAN_PING: 0,
        filesTree: generateFakeFiles({}, 2),
    };

    static state = {

    };


    static {
        this.setupInitialFiles();
        this.saveOrLoadState();
    }

    static addStateListener(fn) {
        this.listeners.push(fn);
    }

    static removeStateListener(fn) {
        this.listeners = this.listeners.splice(this.listeners.indexOf(fn), 1)
    }

    static updateState(stateUpdates = {}, isSaved = false) {
        if (isSaved) {
            this.savedState = { ...this.savedState, ...stateUpdates }
        } else {
            this.state = { ...this.state, ...stateUpdates }
        }

        this.listeners.forEach(listener => {
            listener(stateUpdates, this.state, this.savedState);
        });

        this.saveAndOverwriteState()
    }

    static updateSavedState(stateUpdates) {
        this.updateState(stateUpdates, true)
    }

    static saveAndOverwriteState() {
        localStorage.setItem("SAVED_STATE", JSON.stringify(this.savedState));
    }

    static saveOrLoadState() {
        const savedState = localStorage.getItem("SAVED_STATE")

        if (!savedState) {
            this.saveAndOverwriteState();
        } else {
            this.savedState = JSON.parse(savedState);
        }
    }

    static setupFakeSystemRiddleFiles() {
        if (!this.savedState.filesTree["mountains"]) {
            this.savedState.filesTree["mountains"] = createDirectory("mountains");

            this.savedState.filesTree["mountains"].children["kilimandjaro"] = createDirectory("kilimandjaro")
            this.savedState.filesTree["mountains"].children["everest"] = createDirectory("everest");

            this.savedState.filesTree["mountains"].children["python"] = createDirectory("python");

            this.savedState.filesTree["mountains"].children["cerbere"] = createDirectory("cerbere");
            this.savedState.filesTree["mountains"].children["cerbere"].children["tête1"] = createFile("tête1", "tête1");
            this.savedState.filesTree["mountains"].children["cerbere"].children["tête2"] = createFile("tête2", "tête2");
            this.savedState.filesTree["mountains"].children["cerbere"].children["tête3"] = createFile("tête3", "tête3");

            this.savedState.filesTree["mountains"].children["kraken"] = createFile("kraken", "kraken");

            this.savedState.filesTree["mountains"].children["minotaure"] = createDirectory("minotaure");

            this.savedState.filesTree["mountains"].children["nyarlathotep"] = createFile("nyarlathotep", "nyarlathotep");
        }
    }

    static setupNetworkInfoFiles() {
        //Create racine's dir
        this.savedState.filesTree["network-info"] = createDirectory("network-info");
        //Create network-info's files
        this.savedState.filesTree["network-info"].children["MacAddresses"] = createFileWithRights("---r--r--", "MacAddresses", "044", filesContent.MacAddresses());
        this.savedState.filesTree["network-info"].children["ARP"] = createFileWithRights("-wxr--r--", "ARP", "344", filesContent.ARP());
        this.savedState.filesTree["network-info"].children["PortsAndFirewall"] = createFileWithRights("-w-rw-r-x", "PortsAndFirewall", "265", filesContent.PortsAndFirewall());
        this.savedState.filesTree["network-info"].children["OSI"] = createFileWithRights("------r--", "OSI", "004", filesContent.OSI());
        this.savedState.filesTree["network-info"].children["Antivirus"] = createFileWithRights("--xr---w-", "Antivirus", "142", filesContent.Antivirus());
        this.savedState.filesTree["network-info"].children["VPN"] = createFileWithRights("-wxrwxrwx", "VPN", "377", filesContent.VPN());
    }

    static setupInitialFiles() {
        //Create racine's file
        this.savedState.filesTree["broken_mouse"] = createFile("broken_mouse", filesContent.brokenMouse());
    }

    static resetState() {
        localStorage.clear();
        window.location.reload();
    }
}

export function nextStep(step) {
    if (GlobalState.savedState.step < step) {
        GlobalState.updateSavedState({ step: step });
    }
}




export { GlobalState }