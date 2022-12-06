import faker from "@faker-js/faker";
import { GlobalState } from "../../globalState";

export function generateIP() {
    var ip = faker.internet.ip();
    return ip;
}

export function maxSize() {
    return faker.datatype.number({
        min: 24,
        max: 31
    });
}

export function solveIP() {
    let resultingIp = new String();
    let last = 255;

    for (let y = 0; y < (GlobalState.savedState.MASK_SIZE - GlobalState.savedState.MASK_SIZE % 8) / 8; y++) {
        resultingIp += "255.";
    }

    for (let i = 0; i < 32 - GlobalState.savedState.MASK_SIZE; i++) {
        last -= Math.pow(2, i);
    }

    return resultingIp + last;
}