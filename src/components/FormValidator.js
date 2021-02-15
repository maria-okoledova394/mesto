export default class FormValidator {

    constructor(data, formElement) {
        this._formSelector = data.formSelector;
        this._inputSelector = data.inputSelector;
        this._submitButtonSelector = data.submitButtonSelector;
        this._inactiveButtonClass = data.inactiveButtonClass;
        this._inputErrorClass = data.inputErrorClass;
        this._errorClass = data.errorClass;
        this._formElement = formElement;
        this._button = this._formElement.querySelector(this._submitButtonSelector);

        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    }

    _hasInValidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _showInputError() {
        const errorElement = this._formElement.querySelector(`.${this._inputElement.id}-error`);
        errorElement.textContent = this._inputElement.validationMessage;
        errorElement.classList.add(this._errorClass);
        this._inputElement.classList.add(this._inputErrorClass);
    }

    _hideInputError() {
        const errorElement = this._formElement.querySelector(`.${this._inputElement.id}-error`);
        errorElement.textContent = '';
        errorElement.classList.remove(this._errorClass);
        this._inputElement.classList.remove(this._inputErrorClass);
    }

    _checkInputValidity(inputElement) {
        this._inputElement = inputElement;

        if (this._inputElement.validity.valid) {
            this._hideInputError();
            return true;
        }
        else {
            this._showInputError();
            return false;
        }
    }

    _toggleButtonState(isNotValid) {
        if (!isNotValid) {
            this._button.classList.remove(this._inactiveButtonClass);
            this._button.disabled = false;
        }
        else {
            this._button.classList.add(this._inactiveButtonClass);
            this._button.disabled = true;
        }
    }

    _setEventListeners() {

        this._toggleButtonState(this._hasInValidInput(this._inputList));

        this._inputList.forEach(inputElement => {

            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(this._hasInValidInput(this._inputList));
            })

        })
    }

    enableValidation() {
        this._formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        this._setEventListeners();
    }
}