import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import './pages/index.css';

export { popUpIll, illustration, illustrationDesc, infoInput, nameInput, profileName, profileDesc };

const page = document.querySelector('.page');
// const popups = document.querySelectorAll('.popup');
const editButton = page.querySelector('.profile__edit-button'); //кнопка изменения профиля
const addButton = page.querySelector('.profile__add-button'); //кнопка добавления места
const popUpProf = page.querySelector('.edit-prof'); //попап профиля
const popUpPlace = page.querySelector('.add-place'); //попап добавления места
const formEdit = page.querySelector('.popup__edit-form'); //форма редактирования
const formAdd = page.querySelector('.popup__add-form'); //форма добавления

const nameInput = formEdit.querySelector('.popup__input_type_name'); //имя пользователя
const infoInput = formEdit.querySelector('.popup__input_type_description'); //описание
const profileName = page.querySelector('.profile__name');
const profileDesc = page.querySelector('.profile__description');
const placeName = page.querySelector('.popup__input_type_pic-name'); //инпут попапа - название места
const placeLink = page.querySelector('.popup__input_type_link'); // инпут ссылка на картинку места

const allElements = page.querySelector('.elements');
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
            const popupIll = new PopupWithImage(popUpIll, name, link);
            popupIll.open();
            popupIll.setEventListeners();
        }).createCard();
}


const setValidation = (PlaceValid, ProfileValid) => {
    PlaceValid.enableValidation();
    ProfileValid.enableValidation();
}

function handleFormSubmit(evt) {
    evt.preventDefault();
    Info.setUserInfo(nameInput, infoInput);
    ProfileForm.close();
}

function handleAddFormSubmit(evt) {
    evt.preventDefault();
    const cardAdded = makeCard(placeName.value, placeLink.value);
    allElements.prepend(cardAdded);
    PlaceForm.close();
    PlaceValid.resetValidation();
}


const Cards = new Section(initialCards, makeCard, allElements).addItem();
const ProfileValid = new FormValidator(classes, formEdit);
const PlaceValid = new FormValidator(classes, formAdd);
setValidation(ProfileValid, PlaceValid);
const ProfileForm = new PopupWithForm(popUpProf, handleFormSubmit);
const PlaceForm = new PopupWithForm(popUpPlace, handleAddFormSubmit);
ProfileForm.setEventListeners();
PlaceForm.setEventListeners();
const Info = new UserInfo(profileName.textContent, profileDesc.textContent);


editButton.addEventListener('click', function () {
    nameInput.value = Info.getUserInfo().name;
    infoInput.value = Info.getUserInfo().info;
    ProfileValid.resetValidation();
    const popupProfile = new Popup(popUpProf);
    popupProfile.open();
    popupProfile.setEventListeners();
});
addButton.addEventListener('click', function () {
    const popupPlace = new Popup(popUpPlace);
    popupPlace.open();
    popupPlace.setEventListeners();
});