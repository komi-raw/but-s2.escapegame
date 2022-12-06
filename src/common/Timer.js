import { PersistentNotification } from "./PersistentNotification";

import "./Timer.css"


export function setupTimer(startTime, countdownDelay, endCallback) {
    const timer = new PersistentNotification((time) => `<div class="timer">
        <p>${time}</p>
        </div>`)

    const interval = setInterval(() => {
        const startDate = new Date();
        const endDate = new Date(startTime() + countdownDelay());

        const hours = parseInt((endDate - startDate) / (1000 * 60 * 60) % 24);
        const minutes = parseInt((endDate.getTime() - startDate.getTime()) / (1000 * 60) % 60);
        const seconds = parseInt((endDate.getTime() - startDate.getTime()) / (1000) % 60);

        timer.refresh(`${hours}h ${minutes}m ${seconds}s`)

        if (hours + minutes + seconds < 0) {
            endCallback(timer);
            clearInterval(interval);
        }

    }, 1000);


    return timer;
}