export default class UserInfo {
    constructor({ name, info }) {
        this.name = document.querySelector(`.${name}`);
        this.info = document.querySelector(`.${info}`);
    }

    getUserInfo() {
        return {
            name: this.name.textContent,
            info: this.info.textContent,
        };
    }

    setUserInfo(newName, newDesc) {
        // console.log(this.name)
        this.name.textContent = newName;
        this.info.textContent = newDesc;
    }
}