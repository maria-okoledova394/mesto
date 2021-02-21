import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popup.querySelector('.popup__form');   
        this._saveButton = this._popupForm.querySelector('.popup__button-save');   
    }

    _getInputValues() {
        this._inputList = this._popup.querySelectorAll('.popup__input');
        
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
        
        return this._formValues;
    }

    renderLoading(isLoading) {
        if (isLoading) {
            this._saveButton.textContent = 'Сохранить...';
        }
        else {
            this._saveButton.textContent = 'Сохранить';
        }
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        })
    }

    close() {
        super.close();
        this._popupForm.reset();
    }
}