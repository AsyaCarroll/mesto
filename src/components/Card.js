export default class Card {
    constructor(userId, template, data, popupDelete, handleCardClick, handleCardLike, handleCardRemoveLike) {
        this.name = data.name;
        this.link = data.link;
        this.ownerId = data.owner._id;
        this.userId = userId;
        this.template = template;
        this.data = data;
        this._likes = data.likes;
        this._likesLength = this._likes.length;
        this.cardId = data._id;
        this._popupDelete = popupDelete;
        this.handleCardClick = handleCardClick;
        this.handleCardLike = handleCardLike;
        this.handleCardRemoveLike = handleCardRemoveLike;
        this._elementAdded = document.querySelector(`#${this.template}`).content.querySelector('.element').cloneNode(true);
        this._likeButton = this._elementAdded.querySelector('.element__like');
        this._likeCounter = this._elementAdded.querySelector('.element__count');
        this._deleteButton = this._elementAdded.querySelector('.element__trash');
    }

    checkLike() {
        let liked = false;
        this._likes.forEach(like => {
            if (like._id === this.userId) {
                liked = true;
            }
        })
        return liked;
    }

    _switchLike() {
        if (!this.checkLike()) {
            this.handleCardLike(this.cardId, this);
            // this._likesLength = this._likes.length;
            // this.leaveLike();
        } else {
            this.handleCardRemoveLike(this.cardId, this);
            // this._likesLength = this._likes.length;
            // this.removeLike();
        }
    }

    leaveLike() {
        this._likeButton.classList.add('element__like_active');
        this.countLikes();
    }

    removeLike() {
        this._likeButton.classList.remove('element__like_active');
        this.countLikes();
    }

    countLikes() {
        this._likeCounter.textContent = this._likesLength;
    }

    _deletePlace() {
        this._popupDelete.open(this._elementAdded, this.cardId);
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', () => this._switchLike());
        this._elementAdded.querySelector('.element__trash').addEventListener('click', () => this._deletePlace());
        this._elementAdded.querySelector('.element__pic').addEventListener('click', () => this.handleCardClick(this.name, this.link));

    }

    createCard() {
        const picElement = this._elementAdded.querySelector('.element__pic');
        picElement.src = this.link;
        picElement.alt = this.name;
        this._elementAdded.querySelector('.element__name').textContent = this.name;
        this._setEventListeners();
        if (this.ownerId !== this.userId) {
            this._deleteButton.remove();
            this._deleteButton = null;
        }
        if (!this.checkLike()) {
            this.removeLike()
        } else { this.leaveLike() }
        return this._elementAdded;
    }

    prepareCard() {
        if (!this.checkLike()) {
            this.removeLike()
        } else { this.leaveLike() }
    }
}