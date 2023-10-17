export default class Api {
    constructor(url, token) {
        this.url = url;
        this.token = token;
    }

    getCards() {
        return fetch(`${this.url}/cards`, {
            headers: {
                authorization: `${this.token}`
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
        return fetch(`${this.url}/cards`, {
            method: 'POST',
            headers: {
                authorization: `${this.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                link: link,
            })
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

    deleteCard(card_id) {
        return fetch(`${this.url}/cards/${card_id}`, {
            method: 'DELETE',
            headers: {
                authorization: `${this.token}`
            }
        })
            .catch((err) => {
                console.log(err);
            })
    }

    getUserInfo() {
        return fetch(`${this.url}/users/me`, {
            headers: {
                authorization: `${this.token}`
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

    setUserInfo(newName, newDesc) {
        return fetch(`${this.url}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `${this.token}`,
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
        return fetch(`${this.url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: `${this.token}`,
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

    // getLikes(card_id) {
    //     return fetch(`https://mesto.nomoreparties.co/v1/cohort-77/cards/${card_id}`, {
    //         headers: {
    //             authorization: 'c7903c03-78db-40da-a400-33babc81adf5'
    //         }
    //     })
    //         .then(res => {
    //             if (res.ok) {
    //                 return res.json()
    //             }
    //             return Promise.reject(`Ошибка: ${res.status}`);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    // }

    leaveLike(card_id) {
        return fetch(`${this.url}/cards/${card_id}/likes`, {
            method: 'PUT',
            headers: {
                authorization: `${this.token}`
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

    removeLike(card_id) {
        return fetch(`${this.url}/cards/${card_id}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: `${this.token}`
            }
        })
            .then(res => {
                if (res.ok) {
                    // console.log(res.json(), 'deleted like')
                    return res.json()
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch((err) => {
                console.log(err);
            })
    }
}