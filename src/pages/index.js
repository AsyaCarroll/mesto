import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';

export { popUpIll, illustration, illustrationDesc, infoInput, nameInput };

const page = document.querySelector('.page');
const editButton = page.querySelector('.profile__edit-button'); //кнопка изменения профиля
const addButton = page.querySelector('.profile__add-button'); //кнопка добавления места
const popUpProf = page.querySelector('.edit-prof'); //попап профиля
const popupProfSelector = 'edit-prof';
const popUpPlace = page.querySelector('.add-place'); //попап добавления места
const popupPlaceSelector = 'add-place';
const formEdit = page.querySelector('.popup__edit-form'); //форма редактирования
const formAdd = page.querySelector('.popup__add-form'); //форма добавления

const nameInput = formEdit.querySelector('.popup__input_type_name'); //имя пользователя
const infoInput = formEdit.querySelector('.popup__input_type_description'); //описание
const profileNameSelector = 'profile__name';
const profileDescSelector = 'profile__description';
const placeName = page.querySelector('.popup__input_type_pic-name'); //инпут попапа - название места
const placeLink = page.querySelector('.popup__input_type_link'); // инпут ссылка на картинку места

const allElements = page.querySelector('.elements');
const allElementsSelector = 'elements';
const templateSelector = 'element';
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

const makeCard = (name, link) => {
    return new Card(name, link, templateSelector,
        () => {
            popupImg.name = name;
            popupImg.link = link;
            popupImg.open();
        }).createCard();
}


const setValidation = (placeValid, profileValid) => {
    placeValid.enableValidation();
    profileValid.enableValidation();
}

function handleFormSubmit(evt, inputValues) {
    evt.preventDefault();
    // console.log('inputvalues', inputValues)
    // console.log(inputValues.name)
    info.setUserInfo(inputValues.name, inputValues.info);
    profileForm.close();
}

function handleAddFormSubmit(evt, inputValues) {
    evt.preventDefault();
    const cardAdded = makeCard(inputValues.name, inputValues.info);
    cards.addItem(cardAdded);
    placeForm.close();
    placeValid.resetValidation();
}

function clickEditButton() {
    const value = info.getUserInfo();
    nameInput.value = value.name;
    infoInput.value = value.info;
    profileValid.resetValidation();
    const popupProfile = new Popup(popupProfSelector);
    popupProfile.open();
    popupProfile.setEventListeners();
}

function clickAddButton() {
    const popupPlace = new Popup(popupPlaceSelector);
    popupPlace.open();
    popupPlace.setEventListeners();
}

const dataSection = { items: initialCards, renderer: makeCard };
const popupImg = new PopupWithImage('illustration', 'name', 'link');
const cards = new Section(dataSection, allElementsSelector);
const profileValid = new FormValidator(classes, formEdit);
const placeValid = new FormValidator(classes, formAdd);
const profileForm = new PopupWithForm(popupProfSelector, handleFormSubmit);
const placeForm = new PopupWithForm(popupPlaceSelector, handleAddFormSubmit);
const info = new UserInfo({ name: profileNameSelector, info: profileDescSelector });

cards.renderItems();
popupImg.setEventListeners();
profileForm.setEventListeners();
placeForm.setEventListeners();
editButton.addEventListener('click', clickEditButton);
addButton.addEventListener('click', clickAddButton);

setValidation(profileValid, placeValid);