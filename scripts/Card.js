import { showPopUp, popUpIll, illustration, illustrationDesc } from "./index.js";

export default class Card {
    constructor(name, link, template) {
        this.name = name;
        this.link = link;
        this.template = template; //const elementTemplate шаблон
    }

    _switchLike(evt) {
        evt.target.classList.toggle('element__like_active');
    }

    _deletePlace(evt) {
        evt.target.closest('.element').remove();
    }

    _setEventListeners(element) {
        element.querySelector('.element__like').addEventListener('click', this._switchLike);
        element.querySelector('.element__trash').addEventListener('click', this._deletePlace);
        element.querySelector('.element__pic').addEventListener('click', function () {
            showPopUp(popUpIll);
            illustration.src = element.querySelector('.element__pic').src;
            illustrationDesc.textContent = element.querySelector('.element__name').textContent;
            illustration.alt = illustrationDesc.textContent;
        });
    }

    createCard() {
        const elementAdded = document.querySelector(`#${this.template}`).content.querySelector('.element').cloneNode(true);
        elementAdded.querySelector('.element__pic').src = this.link;
        elementAdded.querySelector('.element__pic').alt = this.name;
        elementAdded.querySelector('.element__name').textContent = this.name;
        this._setEventListeners(elementAdded);
        return elementAdded;
    }
}