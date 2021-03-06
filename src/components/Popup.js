export default class Popup {
    constructor(popupSelector) {
      this._popup = document.querySelector(popupSelector);
      this._closeButton = this._popup.querySelector('.popup__close-button');
      this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
      this._popup.classList.add('popup_opened');
      document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
      this._popup.classList.remove('popup_opened');
      document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(event) {
      const key = event.key;
      if (key === "Escape") { 
        this.close();
      }
    }

    setEventListeners() {
      this._closeButton.addEventListener('click', this.close.bind(this));

      this._popup.addEventListener('click', (event) => {
        if (event.target.classList.contains('popup')) { // to ignore clicks on popup content
          this.close();
        }
      })
    }
}