import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(selector, submit) {
        super(selector);
        this.submit = submit;
        this.formSelector = this.selector.querySelector('.popup__form');
    }

    _getInputValues() {
        const formData = {};
        const formElements = Array.from(this.formSelector.querySelectorAll('input'));
        formElements.forEach((element, index) => {
            formData[index] = element.value;
        })
    }

    setEventListeners() {
        super.setEventListeners();
        this.selector.addEventListener('submit', this.submit);
    }

    close() {
        super.close();
        this.formSelector.reset();
    }
}