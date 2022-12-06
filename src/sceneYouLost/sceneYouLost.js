import { ConfirmDialog } from '../SweetAlert';
import { GlobalState } from '../globalState';
import './sceneYouLost.scss'

const btRetry = document.querySelector('#retry');

btRetry.addEventListener('click', async () => {
    await sendMessageRetry();
})

async function sendMessageRetry() {
    const result = await ConfirmDialog.fire({ text: "Veux-tu recommencer une partie ?" });
    if (result.isConfirmed) {
        GlobalState.resetState()
    }
}