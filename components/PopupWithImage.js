import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector, { image, subscription }) {
        super(popupSelector);
        this._imagePopup = this._popup.querySelector(image);
        this._imagePopupSubscription = this._popup.querySelector(subscription);
    }

    open(subscription, link) {
        super.open();
        this._imagePopup.src = link;
        this._imagePopup.alt = subscription;
        subscriptionImagePopup.textContent = subscription;
    }
}