const classes = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__input-error_active',
};

function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopUp(openedPopup);
    }
}

const showInputError = (form, input, error, obj) => {
    const errorElem = form.querySelector(`.${input.id}-error`);
    input.classList.add(obj.inputErrorClass);
    errorElem.textContent = error;
    errorElem.classList.add(obj.errorClass);
};

const hideInputError = (form, input, obj) => {
    const errorElem = form.querySelector(`.${input.id}-error`);
    input.classList.remove(obj.inputErrorClass);
    errorElem.classList.remove(obj.errorClass);
    errorElem.textContent = '';
};

const checkInputValidity = (form, input, obj) => {
    if (!input.validity.valid) {
        showInputError(form, input, input.validationMessage, obj);
    } else {
        hideInputError(form, input, obj);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((input) => {
        return !input.validity.valid;
    });
}

const switchButtonState = (inputList, button, obj) => {
    if (hasInvalidInput(inputList)) {
        button.classList.add(obj.inactiveButtonClass);
        button.setAttribute('disabled', true);
    } else {
        button.classList.remove(obj.inactiveButtonClass);
        button.removeAttribute('disabled');
    }
}

const setEventListeners = (form, obj) => {
    const inputList = Array.from(form.querySelectorAll(obj.inputSelector));
    const button = form.querySelector(obj.submitButtonSelector);
    switchButtonState(inputList, button, obj);
    inputList.forEach((item) => {
        item.addEventListener('input', function () {
            checkInputValidity(form, item, obj);
            switchButtonState(inputList, button, obj);
        });
    });
};

const enableValidation = (obj) => {
    const formList = Array.from(document.querySelectorAll(obj.formSelector));
    formList.forEach((form) => {
        form.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        setEventListeners(form, obj);
    });
};

enableValidation(classes);