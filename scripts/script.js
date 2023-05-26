let page = document.querySelector('.page');
let editButton = page.querySelector('.profile__edit-button'); //кнопка изменения профиля
let popUp = page.querySelector('.popup'); //попап
let closeButton = page.querySelector('.popup__close'); //кнопка закрытия попапа
let formElement = page.querySelector('.popup__form'); //форма
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__input_type_name'); //имя пользователя
let jobInput = formElement.querySelector('.popup__input_type_description'); //описание
let profileName = page.querySelector('.profile__name');
let profileDesc = page.querySelector('.profile__description');

function showPopUp() {
    popUp.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileDesc.textContent;
}

function closePopUp() {
    popUp.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileDesc.textContent = jobInput.value;

    popUp.classList.remove('popup_opened');
}


editButton.addEventListener('click', showPopUp);
closeButton.addEventListener('click', closePopUp);
formElement.addEventListener('submit', handleFormSubmit);