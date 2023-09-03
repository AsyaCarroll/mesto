export default class FormValidator {
    constructor(settings, form) {
        this._settings = settings;
        this._form = form;
        this._button = this._form.querySelector(this._settings.submitButtonSelector);
        this._inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
    }

    _showInputError = (input, error) => {
        const errorElem = this._form.querySelector(`.${input.id}-error`);
        input.classList.add(this._settings.inputErrorClass);
        errorElem.textContent = error;
        errorElem.classList.add(this._settings.errorClass);
    };

    _hideInputError = (input) => {
        const errorElem = this._form.querySelector(`.${input.id}-error`);
        input.classList.remove(this._settings.inputErrorClass);
        errorElem.classList.remove(this._settings.errorClass);
        errorElem.textContent = '';
    };

    _checkInputValidity(input) {
        if (!input.validity.valid) {
            this._showInputError(input, input.validationMessage);
        } else {
            this._hideInputError(input);
        }
    };

    _hasInvalidInput() {
        return this._inputList.some((input) => {
            return !input.validity.valid;
        });
    }

    _switchButtonState() {
        if (this._hasInvalidInput()) {
            this._button.classList.add(this._settings.inactiveButtonClass);
            this._button.setAttribute('disabled', true);
        } else {
            this._button.classList.remove(this._settings.inactiveButtonClass);
            this._button.removeAttribute('disabled');
        }
    }

    _setEventListeners() {
        this._switchButtonState();
        this._inputList.forEach((item) => {
            item.addEventListener('input', () => {
                this._checkInputValidity(item);
                this._switchButtonState();
            });
        });
    };

    resetValidation() {
        this._switchButtonState();
        this._inputList.forEach(item => {
            this._hideInputError(item);
        })
    }

    enableValidation() {
        this._setEventListeners();
    };
}