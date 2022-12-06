import { GlobalState, nextStep } from '../globalState';
import './scene0.css';
import sentences from '../sentences.json';
import { InstructionPopup } from '../common/InstructionPopup';
import { ConfirmDialog } from '../SweetAlert';

const btNextStep = document.querySelector('#nextStep');
const music = document.querySelector('#play');
music.volume = 0.8;

btNextStep.addEventListener('click', async () => {
    await sendMessageGoToNextStep();
})

if (GlobalState.savedState.scene === "scene0") {
    music.pause();
    const phrase = sentences["video"];
    new InstructionPopup(phrase.title, phrase.message).render();
}

async function sendMessageGoToNextStep() {
    const result = await ConfirmDialog.fire({ text: "Nous conseillons de regarder le trailer vidéo en entier avant de commencer l'escape game, il pourrait aider à comprendre !", cancelButtonText: "Ok je regarde !", confirmButtonText: "Je l'ai deja vu !" });

    if (result.isConfirmed) {
        document.getElementById("video").setAttribute("src", '');
        nextStep(1)
        GlobalState.updateSavedState({ scene: "scene1" });
        music.play();
    }

}