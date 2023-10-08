export default class Api {
    constructor(options) {
        this.options = options;
    }

    getCards() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-77/cards', {
            headers: {
                authorization: 'c7903c03-78db-40da-a400-33babc81adf5'
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    addCard(name, link) {
        fetch('https://mesto.nomoreparties.co/v1/cohort-77/cards', {
            method: 'POST',
            headers: {
                authorization: 'c7903c03-78db-40da-a400-33babc81adf5',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                link: link,
            })
        })
            .catch((err) => {
                console.log(err);
            })
    }

    deleteCard(card_id) {
        fetch(`https://mesto.nomoreparties.co/v1/cohortId/cards/${card_id}`, {
            method: 'DELETE',
            headers: {
                authorization: 'c7903c03-78db-40da-a400-33babc81adf5'
            }
        })
            .catch((err) => {
                console.log(err);
            })
    }

    getUserInfo() {
        return fetch('https://nomoreparties.co/v1/cohort-77/users/me', {
            headers: {
                authorization: 'c7903c03-78db-40da-a400-33babc81adf5'
            }
        })
            .then(res => {
                if (res.ok) {
                    console.log(res)
                    return res.json()
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    setUserInfo(newName, newDesc) {
        fetch('https://mesto.nomoreparties.co/v1/cohort-77/users/me', {
            method: 'PATCH',
            headers: {
                authorization: 'c7903c03-78db-40da-a400-33babc81adf5',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: newName,
                about: newDesc,
            })
        })
            .catch((err) => {
                console.log(err);
            })
    }

    changeAvatar(avatar) {
        fetch('https://mesto.nomoreparties.co/v1/cohort-77/users/me/avatar', {
            method: 'PATCH',
            headers: {
                authorization: 'c7903c03-78db-40da-a400-33babc81adf5',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: avatar,
            })
        })
            .catch((err) => {
                console.log(err);
            })
    }

    leaveLike() {

    }

    removeLike() {

    }
}