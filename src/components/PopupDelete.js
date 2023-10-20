import Popup from "./Popup.js";

export default class PopupDelete extends Popup {
    constructor(selector, formSelector, submit) {
        super(selector);
        this.submit = submit;
        this.formSelector = formSelector;
    }

    open(card, cardId, cardElement) {
        super.open();
        this.card = card;
        this.cardId = cardId;
        this.cardElement = cardElement;
    }

    setEventListeners() {
        super.setEventListeners();
        this.formSelector.addEventListener('submit', (evt) => this.submit(evt, this.card, this.cardId, this.cardElement));
    }
}