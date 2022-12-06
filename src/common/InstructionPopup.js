import './InstructionPopup.css';
import { parseIconToHtml } from '../icons';

export class InstructionPopup {
    static popups = [];

    constructor(title, text, element) {
        this.title = parseIconToHtml(title)
        this.text = parseIconToHtml(text)
        this.root = element || document.body
        this.container = undefined
        InstructionPopup.popups.push(this);
    }


    onClose = () => {
        this.root.removeChild(this.container);
        InstructionPopup.popups = InstructionPopup.popups.filter((popup) => popup !== this);

    }

    render = () => {
        if (InstructionPopup.popups.length > 10) {
            InstructionPopup.popups[0].onClose();
        }
        this.container = document.createElement("div")
        this.container.classList.add("instruction-popup");
        this.closeButton = document.createElement("button")
        this.closeButton.classList.add("instruction-popup__close-button");
        this.counterBadge = document.createElement("span")
        this.counterBadge.classList.add("instruction-popup__counter-badge");

        const titleEl = document.createElement("p")
        titleEl.classList.add("instruction-popup__title");
        titleEl.innerHTML = this.title
        const textEl = document.createElement("p")
        textEl.classList.add("instruction-popup__text");
        textEl.innerHTML = this.text

        this.closeButton.textContent = "X"
        this.closeButton.addEventListener("click", this.onClose)

        this.counterBadge.innerText = `${InstructionPopup.popups.length}`

        this.container.appendChild(this.closeButton);
        this.container.appendChild(this.counterBadge);
        this.container.appendChild(titleEl);
        this.container.appendChild(textEl);


        this.root.appendChild(this.container);

        return this;
    }
}