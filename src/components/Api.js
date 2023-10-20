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
            .then(res => this._getResponseData(res))
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
            .then(res => this._getResponseData(res))
    }

    deleteCard(card_id) {
        return fetch(`${this.url}/cards/${card_id}`, {
            method: 'DELETE',
            headers: {
                authorization: `${this.token}`
            }
        })
            .then(res => this._getResponseData(res))
    }

    getUserInfo() {
        return fetch(`${this.url}/users/me`, {
            headers: {
                authorization: `${this.token}`
            }
        })
            .then(res => this._getResponseData(res))
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
            .then(res => this._getResponseData(res))
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
            .then(res => this._getResponseData(res))
    }

    leaveLike(card_id) {
        return fetch(`${this.url}/cards/${card_id}/likes`, {
            method: 'PUT',
            headers: {
                authorization: `${this.token}`
            }
        })
            .then(res => this._getResponseData(res))
    }

    removeLike(card_id) {
        return fetch(`${this.url}/cards/${card_id}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: `${this.token}`
            }
        })
            .then(res => this._getResponseData(res))
    }
}