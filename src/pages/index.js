import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupDelete from '../components/PopupDelete.js';
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
const profileAvatar = document.querySelector(`.${profileAvatarSelector}`);

const allElementsSelector = 'elements';
const templateSelector = 'element';
const popUpIll = page.querySelector('.illustration');
const illustration = page.querySelector('.popup__illustration-img');
const illustrationDesc = page.querySelector('.popup__illustration-desc');

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

const makeCard = (data) => {
    // console.log(data);
    const card = new Card(userId, templateSelector, data, popupDelete,
        handleCardClick,
        handleCardLike,
        handleCardRemoveLike,
    ).createCard();
    return card;
}

const handleCardClick = (name, link) => {
    popupImg.open(name, link);
}

const handleCardLike = (id, card) => {
    api.leaveLike(id).then(res => {
        card._likes = res.likes;
        card._likesLength = card._likes.length;
        card.leaveLike();
    });
}

const handleCardRemoveLike = (id, card) => {
    api.removeLike(id).then(res => {
        card._likes = res.likes;
        card._likesLength = card._likes.length;
        card.removeLike();
    });
}

const setValidation = (placeValid, profileValid) => {
    placeValid.enableValidation();
    profileValid.enableValidation();
}

function loadProfileInfo() {
    api.getUserInfo().then(data => {
        document.querySelector(`.${profileNameSelector}`).textContent = data.name;
        document.querySelector(`.${profileDescSelector}`).textContent = data.about;
        document.querySelector(`.${profileAvatarSelector}`).src = data.avatar;
    })
}

function handleFormSubmit(evt, inputValues) {
    evt.preventDefault();
    api.setUserInfo(inputValues.name, inputValues.description)
        .then(() => {
            profileForm.setSubmitButtonText('Сохранение...');
            loadProfileInfo();
        })
        .finally(() => {
            profileForm.setSubmitButtonText('Сохранить');
            profileForm.close();
        })
}

function handleAddFormSubmit(evt, inputValues) {
    evt.preventDefault();
    api.addCard(inputValues.name, inputValues.link).then((data) => {
        placeForm.setSubmitButtonText('Сохранение...');
        let cardAdded = makeCard(data);
        cards.addItem(cardAdded);
    })
        .finally(() => {
            placeForm.setSubmitButtonText('Создать');
            placeForm.close();
            placeValid.resetValidation();
        })
}

function handleAvatarFormSubmit(evt, inputValues) {
    evt.preventDefault();
    api.changeAvatar(inputValues.link)
        .then(() => {
            avatarForm.setSubmitButtonText('Сохранение...');
            profileAvatar.src = inputValues.link;
        })
        .finally(() => {
            avatarForm.setSubmitButtonText('Сохранить');
            avatarForm.close();
        })
}

function handleDeleteSubmit(evt, card, cardId) {
    evt.preventDefault();
    api.deleteCard(cardId);
    card.remove();
    card = null;
    popupDelete.close();
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

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-77', 'c7903c03-78db-40da-a400-33babc81adf5');
const initialCards = await loadCards();
const dataSection = { items: initialCards, renderer: makeCard };
const popupImg = new PopupWithImage('illustration', 'name', 'link');
const popupDelete = new PopupDelete(popupDeleteSelector, handleDeleteSubmit);
const cards = new Section(dataSection, allElementsSelector);
const profileValid = new FormValidator(classes, formEdit);
const placeValid = new FormValidator(classes, formAdd);
const profileForm = new PopupWithForm(popupProfSelector, handleFormSubmit);
const placeForm = new PopupWithForm(popupPlaceSelector, handleAddFormSubmit);
const avatarForm = new PopupWithForm(popupAvatarSelector, handleAvatarFormSubmit);
const info = new UserInfo({ name: profileNameSelector, info: profileDescSelector, avatar: profileAvatarSelector });
const user = await api.getUserInfo();
const userId = user._id;

cards.renderItems();
popupImg.setEventListeners();
profileForm.setEventListeners();
placeForm.setEventListeners();
avatarForm.setEventListeners();
popupDelete.setEventListeners();
editButton.addEventListener('click', clickEditButton);
addButton.addEventListener('click', clickAddButton);
avatarEditButton.addEventListener('click', clickAvatarEditButton)

setValidation(profileValid, placeValid);
loadProfileInfo();

// api.getLikes('652e96f951c60d1277c4e627').then(res => console.log(res))