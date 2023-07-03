import Card from './Card.js';
import FormValidator from './FormValidator.js';

export { showPopUp, switchLike, deletePlace, popUpIll, illustration, illustrationDesc };

const page = document.querySelector('.page');
const popups = document.querySelectorAll('.popup')
const editButton = page.querySelector('.profile__edit-button'); //кнопка изменения профиля
const addButton = page.querySelector('.profile__add-button'); //кнопка добавления места
const popUpProf = page.querySelector('.edit-prof'); //попап профиля
const popUpPlace = page.querySelector('.add-place'); //попап добавления места
const formEdit = page.querySelector('.popup__edit-form'); //форма редактирования
const formAdd = page.querySelector('.popup__add-form'); //форма добавления

const nameInput = formEdit.querySelector('.popup__input_type_name'); //имя пользователя
const jobInput = formEdit.querySelector('.popup__input_type_description'); //описание
const profileName = page.querySelector('.profile__name');
const profileDesc = page.querySelector('.profile__description');
const placeName = page.querySelector('.popup__input_type_pic-name'); //инпут попапа - название места
const placeLink = page.querySelector('.popup__input_type_link'); // инпут ссылка на картинку места

const allElements = page.querySelector('.elements');
const elementTemplate = page.querySelector('#element').content; //шаблон элемента
const popUpIll = page.querySelector('.illustration');
const illustration = page.querySelector('.popup__illustration-img');
const illustrationDesc = page.querySelector('.popup__illustration-desc');

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
const classes = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__input-error_active',
};

const loadCards = () => {
    initialCards.forEach((item) => {
        const cardElement = new Card(item.name, item.link, elementTemplate);
        allElements.prepend(cardElement.createCard());
    })
}

const setValidation = () => {
    const formList = Array.from(document.querySelectorAll(classes.formSelector));
    formList.forEach(form => {
        const formElement = new FormValidator(classes, form);
        formElement.enableValidation();
    })
}

function showPopUp(element) {
    element.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
}

function showPopUpProfile(obj) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDesc.textContent;

    nameInput.dispatchEvent(new Event('input'));
    jobInput.dispatchEvent(new Event('input'));
    // nameInput.dispatchEvent('change')
    // jobInput.dispatchEvent('change')
    // const inputList = Array.from(popUpProf.querySelectorAll(obj.inputSelector));
    // inputList.forEach(item => {
    //     hideInputError(popUpProf.querySelector(obj.formSelector), item, obj)
    // });
    // switchButtonState(inputList, popUpProf.querySelector(obj.submitButtonSelector), obj)
    showPopUp(popUpProf);
}

function closePopUp(element) {
    element.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape);
}

function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopUp(openedPopup);
    }
}

function setCloseEventListeners(popups) {
    popups.forEach((popup) => {
        popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_opened')) {
                closePopUp(popup);
            }
            if (evt.target.classList.contains('popup__close')) {
                closePopUp(popup)
            }
        })
    })
}

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDesc.textContent = jobInput.value;
    closePopUp(popUpProf);
}

function handleAddFormSubmit(evt) {
    evt.preventDefault();
    const cardAdded = new Card(placeName.value, placeLink.value, elementTemplate);
    allElements.prepend(cardAdded.createCard());
    evt.target.reset();
    closePopUp(popUpPlace);
    const submitButton = popUpPlace.querySelector('.popup__submit');
    submitButton.classList.add('popup__submit_disabled');
    submitButton.setAttribute('disabled', true);
}

function switchLike(evt) {
    evt.target.classList.toggle('element__like_active');
}

function deletePlace(evt) {
    evt.target.parentElement.parentElement.remove();
}

editButton.addEventListener('click', function () { showPopUpProfile(classes) });
addButton.addEventListener('click', function () { showPopUp(popUpPlace) });
setCloseEventListeners(popups);
formEdit.addEventListener('submit', handleFormSubmit);
formAdd.addEventListener('submit', handleAddFormSubmit);

loadCards();
setValidation();