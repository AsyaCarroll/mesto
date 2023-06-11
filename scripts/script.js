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

function createCard(name, link) {
    let elementAdded = elementTemplate.querySelector('.element').cloneNode(true);
    elementAdded.querySelector('.element__pic').src = link;
    elementAdded.querySelector('.element__pic').alt = name;
    elementAdded.querySelector('.element__name').textContent = name;
    elementAdded.querySelector('.element__like').addEventListener('click', switchLike);
    elementAdded.querySelector('.element__trash').addEventListener('click', deletePlace);
    elementAdded.querySelector('.element__pic').addEventListener('click', function (evt) {
        showPopUp(popUpIll);
        illustration.src = evt.target.src;
        illustrationDesc.textContent = evt.target.parentElement.querySelector('.element__name').textContent;
    });
    return elementAdded;
}

function loadCards() {
    initialCards.forEach((item) => {
        allElements.prepend(createCard(item.name, item.link));
    })
}

function showPopUp(element) {
    element.classList.add('popup_opened');
}

function showPopUpProfile() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDesc.textContent;
    showPopUp(popUpProf);
}

function closePopUp(element) {
    element.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDesc.textContent = jobInput.value;
    closePopUp(popUpProf);
}

function handleAddFormSubmit(evt) {
    evt.preventDefault();
    allElements.prepend(createCard(placeName.value, placeLink.value));
    placeLink.value = '';
    placeName.value = '';
    closePopUp(popUpPlace);
}

function switchLike(evt) {
    evt.target.classList.toggle('element__like_active');
}

function deletePlace(evt) {
    evt.target.parentElement.parentElement.remove();
}

//не до конца поняла, как имеено следует навести порядок в коде. разложить по папкам функции, их вызовы и установку слушателей?

editButton.addEventListener('click', function () { showPopUpProfile() });
addButton.addEventListener('click', function () { showPopUp(popUpPlace) });
popUpProf.querySelector('.popup__close').addEventListener('click', function () { closePopUp(popUpProf) });
popUpPlace.querySelector('.popup__close').addEventListener('click', function () { closePopUp(popUpPlace) });
popUpIll.querySelector('.popup__close').addEventListener('click', function () { closePopUp(popUpIll) });
formEdit.addEventListener('submit', handleFormSubmit);
formAdd.addEventListener('submit', handleAddFormSubmit);
loadCards();