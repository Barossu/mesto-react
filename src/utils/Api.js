class Api {
  constructor(options) {
    this._baseURL = options.baseURL;
    this._key = options.headers.authorization;
    this._contentType = options.headers['Content-Type'];
  };
  
  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
 };
  
  getInitialCards() {
    return fetch(`${this._baseURL}/cards`, {
      method: 'GET',
      headers:{
        authorization: this._key
      }
    })
      .then(res => this._getResponseData(res))
  };

  postNewCard(cardValues){
    return fetch(`${this._baseURL}/cards`, {
      method: 'POST',
      headers:{
        authorization: this._key,
        'Content-Type': this._contentType
      },
      body: JSON.stringify({
        name: cardValues.name,
        link: cardValues.link
      })
    })
    .then(res => this._getResponseData(res))
  };


  getProfileInfo(){
    return fetch(`${this._baseURL}/users/me`, {
      method: 'GET',
      headers:{
        authorization: this._key
      }
    })
      .then(res => this._getResponseData(res))
  };

  patchProfileInfo(profileName, profileInfo){
    return fetch(`${this._baseURL}/users/me`, {
      method: 'PATCH',
      headers:{
        authorization: this._key,
        'Content-Type': this._contentType
      },
      body: JSON.stringify({
        name: profileName,
        about: profileInfo
      })
    })
    .then(res => this._getResponseData(res))
  };

  patchProfileAvatar(avatarLink){
    return fetch(`${this._baseURL}/users/me/avatar`, {
      method: 'PATCH',
      headers:{
        authorization: this._key,
        'Content-Type': this._contentType
      },
      body: JSON.stringify({
        avatar: avatarLink.link
      })
    })
    .then(res => this._getResponseData(res))
  };

  toggleLike(cardId, isLiked){
    return fetch(`${this._baseURL}/cards/${cardId}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers:{
        authorization: this._key,
        'Content-Type': this._contentType
      }
    })
    .then(res => this._getResponseData(res))
  };

  deleteCard(cardId){
    return fetch(`${this._baseURL}/cards/${cardId}`, {
      method: 'DELETE',
      headers:{
        authorization: this._key,
        'Content-Type': this._contentType
      }
    })
    .then(res => this._getResponseData(res))
  };
}

const api = new Api({
  baseURL: 'https://mesto.nomoreparties.co/v1/cohort-75',
  headers: {
    authorization: 'c67093b7-30e8-4ad4-90f8-188ef4c56cb8',
    'Content-Type': 'application/json'
  }
})

export default api