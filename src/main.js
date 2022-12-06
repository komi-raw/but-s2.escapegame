import "core-js/actual";
import { GlobalState } from './globalState'
import "./scene0/scene0"
import './styles/style.css'
import "./scene1/scene1"
import './scene2/scene2'
import './sceneYouLost/sceneYouLost'
import './sceneYouWin/sceneYouWin'
import steps from "./steps.json"
import sentences from "./sentences.json"
import { InstructionPopup } from "./common/InstructionPopup"
import { setupTimer as createTimer } from './common/Timer'
import "./styles/fontawesome/all.min.css"
import "./styles/jquery.terminal.min.css"
import { setupCoupDePouce } from './common/CoupDePouce'
import hints from "./hints.json";
import { ConfirmDialog } from "./SweetAlert"
import { getCurrentStepAnswer } from "./cheatCode"
import { setupResetButton } from "./common/ResetButton";


GlobalState.saveOrLoadState()


GlobalState.addStateListener((update) => {
    if (update.loggedIn === null) {
        const phrase = sentences["wrong-password"]
        new InstructionPopup(phrase.title, phrase.message).render();
    }


    if (update.step) {
        const step = steps[`${update.step}`];
        if (step) {
            new InstructionPopup(step.title, step.message).render();
        }
        if (update.step === 40) {
            GlobalState.setupFakeSystemRiddleFiles();
        }
        if (update.step === 50) {
            GlobalState.setupNetworkInfoFiles();
        }
    }


    if (update.scene) {
        if (update.scene === "sceneYouWin") {
            const phrase = sentences["win"];
            new InstructionPopup(phrase.title, phrase.message).render();
        }

        document.querySelectorAll(".scene").forEach(e => e.classList.add("invisible"))
        document.getElementById(update.scene).classList.remove("invisible")
    }
})

const globalTimer = createTimer(() => GlobalState.savedState.START_TIME, () => 60 * 60 * 1000, (timer) => {
    timer.close();
    if (GlobalState.savedState.scene !== "sceneYouWin") {
        GlobalState.updateSavedState({ scene: "sceneYouLost", step: "gameOver" })
    }
});
globalTimer.render({ right: "0.5rem", bottom: "0.5rem" });

const globalCoupDePouce = setupCoupDePouce();
globalCoupDePouce.render({ right: "1rem", top: "0.5rem" });

let clickCounter = 0;
globalTimer.container.addEventListener("click", () => {
    clickCounter += 1;
})

globalTimer.container.addEventListener("contextmenu", () => {
    if (clickCounter === 5) {
        GlobalState.updateSavedState({ START_TIME: new Date().getTime() })
    }
    clickCounter = 0;
})

globalCoupDePouce.container.addEventListener('click', async () => {
    const phrase = hints[GlobalState.savedState.step] || hints["no-hint"];

    const result = await ConfirmDialog.fire({ text: "Tu as vraiment besoin de ce coup de pouce ? Ils sont peut être limités... Ou peut être pas... A toi de voir !" });
    if (result.isConfirmed) {
        new InstructionPopup(phrase.title, phrase.message).render();
    }

})

const globalResetButton = setupResetButton();
globalResetButton.render({ right: "1rem", top: "3.5rem" });

globalResetButton.container.addEventListener('click', async () => {
    const result = await ConfirmDialog.fire({ text: "Tu veux vraiment recommencer ? TU VAS TOUT PERDRE !" });
    if (result.isConfirmed) {
        const secondResult = await ConfirmDialog.fire({ text: "Es-tu vraiment sûr ?" });
        if (secondResult.isConfirmed) {
            GlobalState.resetState()
        }
    }
})


let charactersEntered = "";
const cheatCode = "CCDL?";
document.addEventListener("keydown", (e) => {
    if (e.key.length !== 1) return;

    const tmpCharactersEntered = charactersEntered + e.key;
    if (cheatCode.startsWith(tmpCharactersEntered)) {
        charactersEntered += e.key;
    } else {
        charactersEntered = "";
    }

    if (cheatCode === charactersEntered) {
        const cheatPopup = new InstructionPopup("Voici la réponse", getCurrentStepAnswer());
        cheatPopup.render();
        charactersEntered = ""
        console.log("CheatCode triggered");
    }
})

document.querySelectorAll(".scene").forEach(e => e.classList.add("invisible"))
document.getElementById(GlobalState.savedState.scene).classList.remove("invisible")