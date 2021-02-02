export default class Popup {
    constructor(popupSelector) {
      this._popup = document.querySelector(popupSelector);
      this._closeButton = this._popup.querySelector('.popup__close-button');
    }

    open() {
      this._popup.classList.add('popup_opened');
      document.addEventListener('keydown', this._handleEscClose.bind(this));
    }

    close() {
      this._popup.classList.remove('popup_opened');
      document.removeEventListener('keydown', this._handleEscClose.bind(this));
    }

    _handleEscClose(event) {
      const key = event.key;
      if (key === "Escape") { 
        this.close.bind(this);
      }
    }

    _setEventListeners() {
      this._closeButton.addEventListener('click', this.close.bind(this));
    }
}