import { PersistentNotification } from "./PersistentNotification";
import imgCoupDePouce from "./images/CoupDePouce.png";
import "./CoupDePouce.css";

export function setupCoupDePouce() {
    const coupDePouce = new PersistentNotification(() => `<div class="coup-de-pouce">
        <img src="${imgCoupDePouce}"/>
        </div>`)
    return coupDePouce;
}