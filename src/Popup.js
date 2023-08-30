export default class Popup {
    constructor(selector) {
        this.selector = selector;
    }

    open() {
        this.selector.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this.selector.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            const openedPopup = document.querySelector('.popup_opened');
            openedPopup.classList.remove('popup_opened');
            document.removeEventListener('keydown', this._handleEscClose);
        }
    }

    setEventListeners() {
        this.selector.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_opened')) {
                this.close();
            }
            if (evt.target.classList.contains('popup__close')) {
                this.close();
            }
        })
    }
}