import { nameInput, infoInput, profileName, profileDesc } from "./index.js";

export default class UserInfo {
    constructor(name, info) {
        this.name = name;
        this.info = info;
    }

    getUserInfo() {
        return {
            name: this.name,
            info: this.info,
        };
    }

    setUserInfo() {
        this.name = nameInput.value;
        this.info = infoInput.value;
        profileName.textContent = nameInput.value;
        profileDesc.textContent = infoInput.value;
    }
}