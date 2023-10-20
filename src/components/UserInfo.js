export default class UserInfo {
    constructor({ name, about, avatar }) {
        this.name = document.querySelector(`.${name}`);
        this.about = document.querySelector(`.${about}`);
        this.avatar = document.querySelector(`.${avatar}`);
    }

    getUserInfo() {
        return { name: this.name.textContent, about: this.about.textContent, avatar: this.avatar.textContent }
    }

    setUserInfo(data) {
        this.name.textContent = data.name;
        this.about.textContent = data.about;
    }

    setAvatar(data) {
        this.avatar.src = data.avatar;
    }
}