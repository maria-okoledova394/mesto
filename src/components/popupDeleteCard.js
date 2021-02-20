import Popup from './Popup.js';

export default class PopupDeleteCard extends Popup {
    constructor(popupSelector/*, handleFormSubmit*/) {
        super(popupSelector);
        this._handleFormSubmit = null;//handleFormSubmit;
        this._popupForm = this._popup.querySelector('.popup__form');   
    }

    setHandleSubmitForm(handleFormSubmit) {
        this._handleFormSubmit = handleFormSubmit;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit();
            this.close();
        })
    }
}