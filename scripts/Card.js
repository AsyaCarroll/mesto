import { showPopUp, switchLike, deletePlace, popUpIll, illustration, illustrationDesc } from "./index.js";

export default class Card {
    constructor(name, link, template) {
        this.name = name;
        this.link = link;
        this.template = template; //const elementTemplate шаблон
    }

    _setEventListeners(element) {
        element.querySelector('.element__like').addEventListener('click', switchLike);
        element.querySelector('.element__trash').addEventListener('click', deletePlace);
        element.querySelector('.element__pic').addEventListener('click', function (evt) {
            showPopUp(popUpIll);
            illustration.src = evt.target.src;
            illustrationDesc.textContent = evt.target.parentElement.querySelector('.element__name').textContent;
            illustration.alt = illustrationDesc.textContent;
        });
    }

    createCard() {
        const elementAdded = this.template.querySelector('.element').cloneNode(true);
        elementAdded.querySelector('.element__pic').src = this.link;
        elementAdded.querySelector('.element__pic').alt = this.name;
        elementAdded.querySelector('.element__name').textContent = this.name;
        this._setEventListeners(elementAdded);
        return elementAdded;
    }
}