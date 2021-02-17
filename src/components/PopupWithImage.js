import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open({ name, link }) {
        super.open();

        this._imagePopup = this._popup.querySelector('.popup__image');
        this._imagePopupSubscription = this._popup.querySelector('.popup__subscription');

        this._imagePopup.src = link;
        this._imagePopup.alt = name;
        this._imagePopupSubscription.textContent = name;
    }
}