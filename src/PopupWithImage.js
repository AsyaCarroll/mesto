import { illustration, illustrationDesc } from "./index.js";
import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(selector, name, link) {
        super(selector);
        this.name = name;
        this.link = link;
    }

    open() {
        super.open();
        illustration.src = this.link;
        illustrationDesc.textContent = this.name;
        illustration.alt = this.name;
    }
}