import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popup.querySelector('.popup__form')
    }

    _getInputValues() {
        this._inputList = this._popup.querySelectorAll('.popup__input');
        
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
        
        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            //evt.preventDefault();
            //console.log(this._getInputValues());
            this._handleFormSubmit(evt, this._getInputValues());
            this.close();
            //this._popup.reset();
        })
    }

    close() {
        super.close();
        //this._popup.reset();
    }
}