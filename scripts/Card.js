import { showPopUp, popUpIll, illustration, illustrationDesc } from "./index.js";

export default class Card {
    constructor(name, link, template) {
        this.name = name;
        this.link = link;
        this.template = template;
        this._elementAdded = document.querySelector(`#${this.template}`).content.querySelector('.element').cloneNode(true);
        this._likeButton = this._elementAdded.querySelector('.element__like');
    }

    _switchLike() {
        this.classList.toggle('element__like_active');
    }

    _deletePlace() {
        this.closest('.element').remove(); //здесь не обойтись без closest, т.к. в данном контексте this является кнопкой удаления, а не карточкой
    }

    _setEventListeners() {
        this._elementAdded.querySelector('.element__like').addEventListener('click', this._switchLike);
        this._elementAdded.querySelector('.element__trash').addEventListener('click', this._deletePlace);
        this._elementAdded.querySelector('.element__pic').addEventListener('click', () => {
            showPopUp(popUpIll);
            illustration.src = this.link;
            illustrationDesc.textContent = this.name;
            illustration.alt = this.name;
        });
    }

    createCard() {
        this._elementAdded.querySelector('.element__pic').src = this.link;
        this._elementAdded.querySelector('.element__pic').alt = this.name;
        this._elementAdded.querySelector('.element__name').textContent = this.name;
        this._setEventListeners();
        return this._elementAdded;
    }
}