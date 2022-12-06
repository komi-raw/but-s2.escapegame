import marionnetImg from "../images/marionnet.png"
import mapBomb from "../images/mapBomb.png"
import $ from "jquery"
import { checkFakeSystemRiddleFiles } from "../riddles/systemCommandRiddle";
import { GlobalState, nextStep } from "../../globalState";
import { InstructionPopup } from "../../common/InstructionPopup";
import sentences from "./../../sentences.json"

export async function marionnet() {
    const img = $(`<img src="${marionnetImg}"/>`);
    this.echo(img);
    const status = checkFakeSystemRiddleFiles(GlobalState.savedState.filesTree);

    const message = status ? "Invocation réussie" : "Invocation échouée";

    await this.echo(`Invocation du saint marionnet...\n${message}`, { typing: true });
    if (status) {
        nextStep(50);
        const imgBomb = $(`<img src="${mapBomb}"/>`);
        this.echo(imgBomb)
        const phrase = sentences["map"];
        new InstructionPopup(phrase.title, phrase.message).render();
    }
}
