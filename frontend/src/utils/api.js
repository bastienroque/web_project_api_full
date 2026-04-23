export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers || {};
  }

  _getHeaders() {
    const token = localStorage.getItem("jwt");

    return {
      ...this._headers,
      Authorization: token ? `Bearer ${token}` : undefined,
    };
  }

  _checkResponse(res) {
    if (res.ok) return res.json();
    return res.text().then((text) => {
      console.error("API response error", res.status, text);
      const message = text ? `${res.status} - ${text}` : `${res.status}`;
      return Promise.reject(new Error(`API error: ${message}`));
    });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  getCards() {
    return this.getInitialCards();
  }

  updateUser(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: Object.assign({}, this._getHeaders(), {
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  updateAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: Object.assign({}, this._getHeaders(), {
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  addCard(data) {
    console.log("Headers:", this._headers);
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: Object.assign({}, this._getHeaders(), {
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  unlikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  getAppInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  // Signup user
  signup(email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: Object.assign({}, this._getHeaders(), {
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({ email, password }),
    }).then(this._checkResponse);
  }

  // Signin user
  signin(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: Object.assign({}, this._getHeaders(), {
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({ email, password }),
    }).then(this._checkResponse);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/me`, {
      method: "GET",
      headers: Object.assign({}, this._getHeaders(), {
        "Content-Type": "application/json",
      }),
    }).then(this._checkResponse);
  }
}

export const api = new Api({
  baseUrl: "http://localhost:3001",
  // http://api.webprojectapifull.mooo.com
});
