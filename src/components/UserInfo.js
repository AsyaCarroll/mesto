export default class UserInfo {
    constructor({ name, about, avatar, api }) {
        this.name = document.querySelector(`.${name}`);
        this.about = document.querySelector(`.${about}`);
        this.avatar = document.querySelector(`.${avatar}`);
        this.api = api;
    }

    getUserInfo() {
        return this.api.getUserInfo();
    }

    setUserInfo(newName, newDesc) {
        this.api.setUserInfo(newName, newDesc);
        this.name = newName;
        this.about = newDesc;
    }
    
    changeAvatar(avatar) {
        this.api.changeAvatar(avatar);
        this.avatar.src = avatar;
    }
}