export default class Card {
    constructor(name, link, template, handleCardClick, popupDelete) {
        this.name = name;
        this.link = link;
        this.template = template;
        this.handleCardClick = handleCardClick;
        this._elementAdded = document.querySelector(`#${this.template}`).content.querySelector('.element').cloneNode(true);
        this._likeButton = this._elementAdded.querySelector('.element__like');
        this._popupDelete = popupDelete;
    }

    _switchLike() {
        this._likeButton.classList.toggle('element__like_active');
    }

    _deletePlace() {
        this._elementAdded.remove();
        this._elementAdded = null;
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', () => this._switchLike());
        this._elementAdded.querySelector('.element__trash').addEventListener('click', () => this._deletePlace());
        this._elementAdded.querySelector('.element__pic').addEventListener('click', this.handleCardClick);
    }

    createCard() {
        const picElement = this._elementAdded.querySelector('.element__pic');
        picElement.src = this.link;
        picElement.alt = this.name;
        this._elementAdded.querySelector('.element__name').textContent = this.name;
        this._setEventListeners();
        return this._elementAdded;
    }
}