export default class Section {
    constructor(items, renderer, selector) {
        this.items = items;
        this.renderer = renderer;
        this.selector = selector;
    }

    createElement(name, link) {
        return this.renderer(name, link);
    }

    addItem() {
        this.items.forEach((item) => {
            this.selector.prepend(this.createElement(item.name, item.link));
        })
    }
}