import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(selector, submit) {
        super(selector);
        this.submit = submit;
        this.formSelector = this.selector.querySelector('.popup__form');
        this.formElements = Array.from(this.formSelector.querySelectorAll('input'));
    }

    _getInputValues() {
        // const formData = { name: this.formElements[0].value, info: this.formElements[1].value };
        const formData = {};
        this.formElements.forEach((element) => {
            formData[element.getAttribute('name')] = element.value;
        })
        return formData;
    }

    setEventListeners() {
        super.setEventListeners();
        this.selector.addEventListener('submit', (evt) => this.submit(evt, this._getInputValues()));
    }

    close() {
        super.close();
        this.formSelector.reset();
    }
}