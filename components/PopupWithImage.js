import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector, { name, link }) {
        super(popupSelector);
        this.link = link;
        this.name = name;
        this._imagePopup = this._popup.querySelector('.popup__image');
        this._imagePopupSubscription = this._popup.querySelector('.popup__subscription');
    }

    open() {
        super.open();
        this._imagePopup.src = this.link;
        this._imagePopup.alt = this.name;
        this._imagePopupSubscription.textContent = this.name;
    }

    setEventListeners() {
        super.setEventListeners();
        const popupFuncOpenImg = document.querySelector('.popup_function_open-image');
           
        popupFuncOpenImg.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup')) { // to ignore clicks on popup content
                this.close();
            }
        })
    }
}