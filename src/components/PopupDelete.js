import Popup from "./Popup.js";

export default class PopupDelete extends Popup {
    constructor(selector, submit) {
        super(selector);
        this.submit = submit;
    }

    open(card, cardId, cardElement) {
        super.open();
        this.card = card;
        this.cardId = cardId;
        this.cardElement = cardElement;
    }

    setEventListeners() {
        super.setEventListeners();
        this.selector.addEventListener('submit', (evt) => this.submit(evt, this.card, this.cardId, this.cardElement));
        //не согласна с тем, что надо заменить this.selector на this.form. в конструкторе и open наследуются selector и связанные с ним действия
        //если менять название здесь, то поменять его придется и в Popup, а в наследуемых класах selector не всегда является названием селектора
        //формы, но еще и просто попапа
    }
}