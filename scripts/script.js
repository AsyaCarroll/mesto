const page = document.querySelector('.page');
const editButton = page.querySelector('.profile__edit-button'); //кнопка изменения профиля
const addButton = page.querySelector('.profile__add-button'); //кнопка добавления места
const popUpProf = page.querySelector('.edit-prof'); //попап профиля
const popUpPlace = page.querySelector('.add-place'); //попап добавления места
//let popUpCloseButton = page.querySelectorAll('.popup__close'); кнопка закрытия попапа
const formEdit = page.querySelector('.popup__edit-form'); //форма редактирования
const formAdd = page.querySelector('.popup__add-form'); //форма добавления

const nameInput = formEdit.querySelector('.popup__input_type_name'); //имя пользователя
const jobInput = formEdit.querySelector('.popup__input_type_description'); //описание
const profileName = page.querySelector('.profile__name');
const profileDesc = page.querySelector('.profile__description');
const placeName = page.querySelector('.popup__input_type_pic-name'); //инпут попапа - название места
const placeLink = page.querySelector('.popup__input_type_link'); // инпут ссылка на картинку места

let allElements = page.querySelector('.elements');
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

function createCard(name, link) {
    let elementAdded = elementTemplate.querySelector('.element').cloneNode(true);
    elementAdded.querySelector('.element__pic').src = link;
    elementAdded.querySelector('.element__pic').alt = name;
    elementAdded.querySelector('.element__name').textContent = name;
    return elementAdded;
}

function loadCards() {
    initialCards.forEach((item) => {
        allElements.prepend(createCard(item.name, item.link));
    })
}

function showPopUp(element) {
    element.classList.add('popup_opened');
    if (element == popUpProf) {
        nameInput.value = profileName.textContent;
        jobInput.value = profileDesc.textContent;
    }
}

function closePopUp(element) {
    element.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDesc.textContent = jobInput.value;
    closePopUp();
}

function handleAddFormSubmit(evt) {
    evt.preventDefault();
    allElements.prepend(createCard(placeName.value, placeLink.value));
    allElements = page.querySelector('.elements');
    likeElements = Array.from(allElements.querySelectorAll('.element__like'));
    likeElements[0].addEventListener('click', switchLike);
    deleteElements = Array.from(allElements.querySelectorAll('.element__trash'));
    deleteElements[0].addEventListener('click', deletePlace);
    popUpPic = Array.from(allElements.querySelectorAll('.element__pic'));
    popUpPic[0].addEventListener('click', function (evt) {
        showPopUp(popUpIll);
        page.querySelector('.popup__illustration-img').src = evt.target.src;
        page.querySelector('.popup__illustration-desc').textContent = evt.target.parentElement.querySelector('.element__name').textContent;
    });
    placeLink.value = '';
    placeName.value = '';
    closePopUp(evt.target.parentElement.parentElement);
}

function switchLike(evt) {
    evt.target.classList.toggle('element__like_active');
}

function deletePlace(evt) {
    evt.target.parentElement.parentElement.remove();
}

//не до конца поняла, как имеено следует навести порядок в коде. разложить по папкам функции, их вызовы и установку слушателей?

loadCards();

let likeElements = Array.from(allElements.querySelectorAll('.element__like'));
let deleteElements = Array.from(allElements.querySelectorAll('.element__trash'));
let popUpPic = Array.from(allElements.querySelectorAll('.element__pic'));
const popUpIll = page.querySelector('.illustration');

editButton.addEventListener('click', function () { showPopUp(popUpProf) });
addButton.addEventListener('click', function () { showPopUp(popUpPlace) });
popUpPic.forEach(item => item.addEventListener('click', function (evt) {
    showPopUp(popUpIll);
    page.querySelector('.popup__illustration-img').src = evt.target.src;
    page.querySelector('.popup__illustration-desc').textContent = evt.target.parentElement.querySelector('.element__name').textContent;
}));
popUpProf.querySelector('.popup__close').addEventListener('click', function () { closePopUp(popUpProf) });
popUpPlace.querySelector('.popup__close').addEventListener('click', function () { closePopUp(popUpPlace) });
popUpIll.querySelector('.popup__close').addEventListener('click', function () { closePopUp(popUpIll) });
formEdit.addEventListener('submit', handleFormSubmit);
formAdd.addEventListener('submit', handleAddFormSubmit);
likeElements.forEach(item => item.addEventListener('click', switchLike));
deleteElements.forEach(item => item.addEventListener('click', deletePlace));