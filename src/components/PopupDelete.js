class PopupDelete extends Popup {
    constructor(selector, submit) {
        super(selector);
        this.submit = submit;
    }

    setEventListeners() {
        super.setEventListeners();
        this.selector.addEventListener('submit', (evt) => this.submit(evt));
    }
}