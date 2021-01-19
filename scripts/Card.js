import { closePopup, hidePopup, showPopup } from './utils.js';

const imagePopup = document.querySelector('.popup_function_open-image');
const imageInImagePopup = document.querySelector('.popup__image');
const closeButtonImagePopup = document.querySelector('.popup_function_open-image .popup__close-button');
const descriptionImagePopup = document.querySelector('.popup__subscription');

export class Card {
    /*constructor(data, cardSelector) {
        this._link = data.link;
        this._name = data.name;
        this._cardSelector = cardSelector;
    }*/

    constructor(name, link, cardSelector) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;

    }

    _getTemplate() {
        const cardElement = document
          .querySelector(this._cardSelector)
          .content
          .querySelector('.elements__element')
          .cloneNode(true);
    
        return cardElement;
    }
    
    generateCard() {
      this._element = this._getTemplate();
      this._setEventListeners();

      this._image = this._element.querySelector('.elements__image');
      this._image.src = this._link;
      this._image.alt = this._name;
      this._element.querySelector('.elements__title').textContent = this._name;
  
      return this._element;
    }

    _handleOpenPopup() {
        showPopup(imagePopup);
        imageInImagePopup.src = this._link;
        imageInImagePopup.alt = this._image.alt;
        descriptionImagePopup.textContent = this._name;
        
    }
    
    _handleClosePopup() {
        hidePopup(imagePopup);
        //imageInImagePopup.src = '';
        //imageInImagePopup.alt = '';
        //descriptionImagePopup.textContent = '';
    }

    _deleteCard() {
        this._element.remove();
    }
    
    _setEventListeners() {
        this._element.addEventListener('click', () => {
          this._handleOpenPopup();
        });
    
        closeButtonImagePopup.addEventListener('click', () => {
          this._handleClosePopup();
        });

        const likeButton = this._element.querySelector('.elements__like-button');
        likeButton.addEventListener('click', () => {
            likeButton.classList.toggle('elements__like-button_status_active');
        });

        const deleteButton = this._element.querySelector('.elements__delete-button');
        deleteButton.addEventListener('click', () => {
            this._deleteCard();
        }); 
    }
}