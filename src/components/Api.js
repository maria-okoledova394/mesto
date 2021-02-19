const onResult = (res) =>{
  if(res.ok){
    return res.json();
  }
  return Promise.reject('Упс... Ошибочка :(')
}
  
export default class Api{
    constructor(config) {
      this._url = config.url;
      this._headers = config.headers;
    }
  
    getInitialCards() {
      return fetch(`${this._url}cards`, {
          method: "GET",
          headers: this._headers
        }).then(onResult)
    }

    addCard(data){
      return fetch(`${this._url}cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify(data)
      })
      .then(onResult)
    }
}

  
  /*
    removeTask(id) {
      return fetch(`${this._url}${id}`, {
        method: "DELETE",
        headers: this._headers,
      })
      .then(onError)
    }  */
