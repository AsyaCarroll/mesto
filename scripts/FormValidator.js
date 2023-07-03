export default class FormValidator {
    constructor(settings, form) {
        this._settings = settings;
        this._form = form;
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

    _hasInvalidInput(inputList) {
        return inputList.some((input) => {
            return !input.validity.valid;
        });
    }

    _switchButtonState(inputList, button) {
        if (this._hasInvalidInput(inputList)) {
            button.classList.add(this._settings.inactiveButtonClass);
            button.setAttribute('disabled', true);
        } else {
            button.classList.remove(this._settings.inactiveButtonClass);
            button.removeAttribute('disabled');
        }
    }

    _setEventListeners() {
        const inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
        const button = this._form.querySelector(this._settings.submitButtonSelector);
        this._switchButtonState(inputList, button);
        inputList.forEach((item) => {
            item.addEventListener('input', () => {
                this._checkInputValidity(item);
                this._switchButtonState(inputList, button);
            });
        });
    };

    enableValidation() {
        this._form.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        this._setEventListeners();
    };
}