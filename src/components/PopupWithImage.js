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
        illustration.src = link;
        illustrationDesc.textContent = name;
        illustration.alt = name;
    }
}