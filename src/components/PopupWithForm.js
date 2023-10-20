import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(selector, submit) {
        super(selector);
        this.submit = submit;
        this.formSelector = this.selector.querySelector('.popup__form');
        this.formElements = Array.from(this.formSelector.querySelectorAll('input'));
        this.submitButton = this.selector.querySelector('.popup__submit');
    }

    _getInputValues() {
        const formData = {};
        this.formElements.forEach((element) => {
            formData[element.getAttribute('name')] = element.value;
        })
        return formData;
    }
    setSubmitButtonText(text) {
        this.submitButton.textContent = text;
    }

    setEventListeners() {
        super.setEventListeners();
        this.formSelector.addEventListener('submit', (evt) => this.submit(evt, this._getInputValues()));
    }

    close() {
        super.close();
        this.formSelector.reset();
    }
}