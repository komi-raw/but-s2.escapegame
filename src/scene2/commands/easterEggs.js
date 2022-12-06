import { InstructionPopup } from "../../common/InstructionPopup";
import shrekImg from "./../../scene1/images/shrek.jpg"
import sentences from "../../sentences.json"
import $ from "jquery";

export function shrek() {
    const img = $(`<img src="${shrekImg}"/> `)
    this.echo(img)

    const popup = new InstructionPopup(sentences["easter-egg"].title, sentences["easter-egg"].message);
    popup.render();
}