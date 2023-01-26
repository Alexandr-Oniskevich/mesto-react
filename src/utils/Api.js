import apiConfig from './utils'

class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _getResponseData(response) {
    if(response.ok){
      return response.json()
     }else{
       Promise.reject(`Ошибка: ${response.status} ${response.statusText}`);
     }
  }

  takeUserInfo(){
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    })
    .then((response) => {
      return this._getResponseData(response)
    });
    
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers
    })
    .then((response) => {
      return this._getResponseData(response)
    });
  }

  addNewCard(name, link) {
    console.log(name, link)
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({name, link})
    })
    .then((response) => {
      return this._getResponseData(response)
    });
  }

  deleteCard(id){
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
      //body: JSON.stringify(id)
    })
    .then((response) => {
      return this._getResponseData(response)
    });
  }

  deleteLike(id){
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
      //body: JSON.stringify(id)
    })
    .then((response) => {
      return this._getResponseData(response)
    });
  }

  addLike(id){
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
      //body: JSON.stringify(id)
    })
    .then((response) => {
      return this._getResponseData(response)
    });
  }

  editUserInfo(userName, userDescription) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userName,
        about: userDescription,
      }),
    })
    .then((response) => {
      return this._getResponseData(response)
    });
  }

  editUserAvatar(userAvatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: userAvatar

      }),
    })
    .then((response) => {
     return this._getResponseData(response)
    });
  }
}

 const api = new Api(apiConfig); 
 export default api