import { illustration, illustrationDesc } from "../pages/index.js";
import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(selector, name, link) {
        super(selector);
        this.name = name;
        this.link = link;
    }

    open(name, link) {
        super.open();
        this.name = name;
        this.link = link;
        illustration.src = this.link;
        illustrationDesc.textContent = this.name;
        illustration.alt = this.name;
    }
}