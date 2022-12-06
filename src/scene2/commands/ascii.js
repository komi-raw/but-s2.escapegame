import $ from "jquery";
import { InstructionPopup } from "../../common/InstructionPopup";
import asciiImg from "../images/ascii.png"
import sentences from "./../../sentences.json"


export function ascii() {
    const img = $(`<img src="${asciiImg}"/>`);
    this.echo(img);

    const popup = new InstructionPopup(sentences["aide-ascii"].title, sentences["aide-ascii"].message);
    popup.render();
}