import Popup from "./Popup.js";

export default class PopupDelete extends Popup {
    constructor(selector, submit) {
        super(selector);
        this.submit = submit;
    }

    open(card) {
        this.selector.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
        this.card = card;
    }

    setEventListeners() {
        super.setEventListeners();
        this.selector.addEventListener('submit', (evt) => this.submit(evt, this.card));
    }
}