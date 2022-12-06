import "./PersistentNotification.css";

export class PersistentNotification {
    constructor(template, ...args) {
        this.template = template
        this.root = document.body
        this.container = null;
        this.args = args
    }


    close = () => {
        this.root.removeChild(this.container);
    }

    refresh = (...args) => {
        this.args = args
        this.container.innerHTML = this.template(this.args);
    }

    render = (positions = {}) => {
        this.container = document.createElement("div")
        this.container.classList.add("persistent-notification");
        for(const position of Object.keys(positions)){
            this.container.style[position] = positions[position];
        }


        this.root.appendChild(this.container);

        this.refresh();
        
        return this;
    }
}