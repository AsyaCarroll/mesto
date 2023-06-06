const page = document.querySelector('.page');
const editButton = page.querySelector('.profile__edit-button'); //кнопка изменения профиля
const addButton = page.querySelector('.profile__add-button'); //кнопка добавления места
let popUpProf = page.querySelector('.edit-prof'); //попап профиля
let popUpPlace = page.querySelector('.add-place'); //попап добавления места
//let popUpCloseButton = page.querySelectorAll('.popup__close'); кнопка закрытия попапа
const formEdit = page.querySelector('.popup__edit-form'); //форма редактирования
const formAdd = page.querySelector('.popup__add-form'); //форма добавления

let nameInput = formEdit.querySelector('.popup__input_type_name'); //имя пользователя
let jobInput = formEdit.querySelector('.popup__input_type_description'); //описание
let profileName = page.querySelector('.profile__name');
let profileDesc = page.querySelector('.profile__description');
let placeName = page.querySelector('.popup__input_type_pic-name'); //инпут попапа - название места
let placeLink = page.querySelector('.popup__input_type_link'); // инпут ссылка на картинку места

let allElements = page.querySelector('.elements');
let elements = page.querySelectorAll('.element');
let elName = page.querySelectorAll('.element__name');
let elImg = page.querySelectorAll('.element__pic');

const elementTemplate = page.querySelector('#element').content; //шаблон элемента

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

const likeElements = Array.from(allElements.querySelectorAll('.element__like'));
const deleteElements = Array.from(allElements.querySelectorAll('.element__trash'));

let popUpIll = page.querySelector('.illustration');
const popUpPic = Array.from(allElements.querySelectorAll('.element__pic'));

function loadCards() {
    elements.forEach((item, index) => {
        elName[index].textContent = initialCards[index].name;
        elImg[index].setAttribute('src', initialCards[index].link);
        elImg[index].setAttribute('alt', initialCards[index].name);
    })
}

function showPopUpProf() {
    popUpProf.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileDesc.textContent;
}

function showPopUpPlace() {
    popUpPlace.classList.add('popup_opened');
}

function showPopUpCard(evt) {
    popUpIll.classList.add('popup_opened');
    page.querySelector('.popup__illustration-img').src = evt.target.src;
    page.querySelector('.popup__illustration-desc').textContent = evt.target.parentElement.querySelector('.element__name').textContent;
}

function closePopUp() {
    popUpProf.classList.remove('popup_opened');
    popUpPlace.classList.remove('popup_opened');
    popUpIll.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDesc.textContent = jobInput.value;
    closePopUp();
}

function handleAddFormSubmit(evt) {
    evt.preventDefault();
    let elementAdded = elementTemplate.querySelector('.element').cloneNode(true);
    elementAdded.querySelector('.element__pic').src = placeLink.value;
    elementAdded.querySelector('.element__pic').alt = placeName.value;
    elementAdded.querySelector('.element__name').textContent = placeName.value;
    allElements.prepend(elementAdded);
    closePopUp();
}

function switchLike(evt) {
    evt.target.classList.toggle('element__like_active');
}

function deletePlace(evt) {
    evt.target.parentElement.parentElement.remove();
}

loadCards();
editButton.addEventListener('click', showPopUpProf);
addButton.addEventListener('click', showPopUpPlace);
popUpPic.forEach(item => item.addEventListener('click', showPopUpCard));
popUpProf.querySelector('.popup__close').addEventListener('click', closePopUp);
popUpPlace.querySelector('.popup__close').addEventListener('click', closePopUp);
popUpIll.querySelector('.popup__close').addEventListener('click', closePopUp);
formEdit.addEventListener('submit', handleFormSubmit);
formAdd.addEventListener('submit', handleAddFormSubmit);
likeElements.forEach(item => item.addEventListener('click', switchLike));
deleteElements.forEach(item => item.addEventListener('click', deletePlace));