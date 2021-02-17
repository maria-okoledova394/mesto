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
}