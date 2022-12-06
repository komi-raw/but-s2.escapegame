import { PersistentNotification } from "./PersistentNotification";
import imgResetButton from "./images/ResetButton.png";
import "./ResetButton.css";

export function setupResetButton() {
    const resetButton = new PersistentNotification(() => `<div class="reset-button">
        <img src="${imgResetButton}"/>
        </div>`)
    return resetButton;
}