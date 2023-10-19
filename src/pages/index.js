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
const formAvatar = page.querySelector('.popup__avatar-form')

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

// function loadCards() {
//     return api.getCards()
//         .catch((err) => {
//             console.log(err);
//         });
// }

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
    })
        .catch((err) => {
            console.log(err);
        })
}

const handleCardRemoveLike = (id, card) => {
    api.removeLike(id).then(res => {
        card._likes = res.likes;
        card._likesLength = card._likes.length;
        card.removeLike();
    })
        .catch((err) => {
            console.log(err);
        })
}

const setValidation = () => {
    placeValid.enableValidation();
    profileValid.enableValidation();
    avatarValid.enableValidation();
}

function handleEditFormSubmit(evt, inputValues) {
    evt.preventDefault();
    api.setUserInfo(inputValues.name, inputValues.about)
        .then((res) => {
            if (res.ok) {
                profileForm.setSubmitButtonText('Сохранение...');
                info.setUserInfo(inputValues)
            }
        })
        .then(() => {
            profileForm.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            profileForm.setSubmitButtonText('Сохранить');
        })
}

function handleAddFormSubmit(evt, inputValues) {
    evt.preventDefault();
    api.addCard(inputValues.name, inputValues.link)
        .then((data) => {
            placeForm.setSubmitButtonText('Сохранение...');
            const cardAdded = makeCard(data);
            cards.addItem(cardAdded);
        })
        .then(() => {
            placeForm.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            placeForm.setSubmitButtonText('Создать');
            placeValid.resetValidation();
        })
}

function handleAvatarFormSubmit(evt, inputValues) {
    evt.preventDefault();
    api.setAvatar(inputValues.avatar)
        .then(() => {
            avatarForm.setSubmitButtonText('Сохранение...');
            info.setAvatar(inputValues);
        })
        .then(() => {
            avatarForm.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            avatarForm.setSubmitButtonText('Сохранить');
        })
}

function handleDeleteSubmit(evt, card, cardId, cardElement) {
    evt.preventDefault();
    api.deleteCard(cardId)
        .then(() => {
            card.deleteCard(cardElement);
        })
        .then(() => {
            popupDelete.close();
        })
        .catch((err) => {
            console.log(err);
        })
}

function clickEditButton() {
    const user = info.getUserInfo();
    nameInput.value = user.name;
    infoInput.value = user.about;
    profileValid.resetValidation();
    profileForm.open();
}

function clickAddButton() {
    placeValid.resetValidation();
    placeForm.open();
}

function clickAvatarEditButton() {
    avatarValid.resetValidation();
    avatarForm.open();
}

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-77', 'c7903c03-78db-40da-a400-33babc81adf5');
// const initialCards = await loadCards();
// const dataSection = { items: initialCards, renderer: makeCard };
const popupImg = new PopupWithImage('illustration', 'name', 'link');
const popupDelete = new PopupDelete(popupDeleteSelector, handleDeleteSubmit);
// const cards = new Section(dataSection, allElementsSelector);
const profileValid = new FormValidator(classes, formEdit);
const placeValid = new FormValidator(classes, formAdd);
const avatarValid = new FormValidator(classes, formAvatar);
const profileForm = new PopupWithForm(popupProfSelector, handleEditFormSubmit);
const placeForm = new PopupWithForm(popupPlaceSelector, handleAddFormSubmit);
const avatarForm = new PopupWithForm(popupAvatarSelector, handleAvatarFormSubmit);
const info = new UserInfo({ name: profileNameSelector, about: profileDescSelector, avatar: profileAvatarSelector });
// const user = await api.getUserInfo();
let userId;

// cards.renderItems();
popupImg.setEventListeners();
profileForm.setEventListeners();
placeForm.setEventListeners();
avatarForm.setEventListeners();
popupDelete.setEventListeners();
editButton.addEventListener('click', clickEditButton);
addButton.addEventListener('click', clickAddButton);
avatarEditButton.addEventListener('click', clickAvatarEditButton)
setValidation();
let cards;

Promise.all([api.getUserInfo(), api.getCards()])
    .then(([item, data]) => {
        userId = item._id;
        info.setUserInfo(item);
        info.setAvatar(item);
        const dataSection = { items: data, renderer: makeCard };
        cards = new Section(dataSection, allElementsSelector);
        cards.renderItems();

    })
    .catch((err) => {
        console.log(err);
    });