import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import './index.css';

export { popUpIll, illustration, illustrationDesc, infoInput, nameInput };

const page = document.querySelector('.page');
const editButton = page.querySelector('.profile__edit-button'); //кнопка изменения профиля
const addButton = page.querySelector('.profile__add-button'); //кнопка добавления места
const avatarEditButton = page.querySelector('.profile__avatar-edit');
const popupProfSelector = 'edit-prof';
const popupPlaceSelector = 'add-place';
const popupDeleteSelector = 'delete-place';
const popupAvatarSelector = 'patch-avatar';
const formEdit = page.querySelector('.popup__edit-form'); //форма редактирования
const formAdd = page.querySelector('.popup__add-form'); //форма добавления

const nameInput = formEdit.querySelector('.popup__input_type_name'); //имя пользователя
const infoInput = formEdit.querySelector('.popup__input_type_description'); //описание
const profileNameSelector = 'profile__name';
const profileDescSelector = 'profile__description';
const profileAvatarSelector = 'profile__avatar';
const profileName = document.querySelector(`.${profileNameSelector}`);
const profileDesc = document.querySelector(`.${profileDescSelector}`);

const allElementsSelector = 'elements';
const templateSelector = 'element';
const popUpIll = page.querySelector('.illustration');
const illustration = page.querySelector('.popup__illustration-img');
const illustrationDesc = page.querySelector('.popup__illustration-desc');

// const initialCards = [
//     {
//         name: 'Архыз',
//         link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
//     },
//     {
//         name: 'Челябинская область',
//         link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
//     },
//     {
//         name: 'Иваново',
//         link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
//     },
//     {
//         name: 'Камчатка',
//         link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
//     },
//     {
//         name: 'Холмогорский район',
//         link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
//     },
//     {
//         name: 'Байкал',
//         link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
//     }
// ];
const classes = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__input-error_active',
};

function loadCards() {
    return api.getCards();
}

const makeCard = (name, link) => {
    return new Card(name, link, templateSelector,
        () => { popupImg.open(name, link) }, popupDelete).createCard();
}

const setValidation = (placeValid, profileValid) => {
    placeValid.enableValidation();
    profileValid.enableValidation();
}

function loadProfileInfo() {
    info.getUserInfo().then(data => {
        document.querySelector(`.${profileNameSelector}`).textContent = data.name;
        document.querySelector(`.${profileDescSelector}`).textContent = data.about;
        document.querySelector(`.${profileAvatarSelector}`).src = data.avatar;
    })
}

function handleFormSubmit(evt, inputValues) {
    evt.preventDefault();
    info.setUserInfo(inputValues.name, inputValues.description);
    loadProfileInfo();
    profileForm.close();
}

function handleAddFormSubmit(evt, inputValues) {
    evt.preventDefault();
    const cardAdded = makeCard(inputValues.place, inputValues.link);
    api.addCard(inputValues.place, inputValues.link);
    cards.addItem(cardAdded);
    placeForm.close();
    placeValid.resetValidation();
}

function handleAvatarFormSubmit(evt, inputValues) {
    evt.preventDefault();
    info.changeAvatar(inputValues.link);
    avatarForm.close();
}

function clickEditButton() {
    nameInput.value = profileName.textContent;
    infoInput.value = profileDesc.textContent;
    profileValid.resetValidation();
    profileForm.open();
}

function clickAddButton() {
    placeForm.open();
}

function clickAvatarEditButton() {
    avatarForm.open();
}

const api = new Api('options');
const initialCards = await loadCards();
const dataSection = { items: initialCards, renderer: makeCard };
const popupImg = new PopupWithImage('illustration', 'name', 'link');
const popupDelete = new Popup(popupDeleteSelector);
const cards = new Section(dataSection, allElementsSelector);
const profileValid = new FormValidator(classes, formEdit);
const placeValid = new FormValidator(classes, formAdd);
const profileForm = new PopupWithForm(popupProfSelector, handleFormSubmit);
const placeForm = new PopupWithForm(popupPlaceSelector, handleAddFormSubmit);
const avatarForm = new PopupWithForm(popupAvatarSelector, handleAvatarFormSubmit);
const info = new UserInfo({ name: profileNameSelector, info: profileDescSelector, avatar: profileAvatarSelector, api: api });

cards.renderItems();
popupImg.setEventListeners();
profileForm.setEventListeners();
placeForm.setEventListeners();
avatarForm.setEventListeners();
editButton.addEventListener('click', clickEditButton);
addButton.addEventListener('click', clickAddButton);
avatarEditButton.addEventListener('click', clickAvatarEditButton)

setValidation(profileValid, placeValid);
loadProfileInfo();

