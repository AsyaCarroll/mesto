export default class Api {
    constructor(url, token) {
        this.url = url;
        this.token = token;
    }

    _getResponseData(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    } 

    getCards() {
        return fetch(`${this.url}/cards`, {
            headers: {
                authorization: `${this.token}`
            }
        })
            .then(res => {
                // this._getResponseData(res) //когда пытаюсь заменить на эту функцию, карточки и информация не загружаются
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(`Ошибка: ${res.status}`);
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
    }

    deleteCard(card_id) {
        return fetch(`${this.url}/cards/${card_id}`, {
            method: 'DELETE',
            headers: {
                authorization: `${this.token}`
            }
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
    }

    setAvatar(avatar) {
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
    }

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
    }
}