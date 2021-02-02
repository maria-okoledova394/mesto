import { hidePopup, showPopup } from '../utils/utils.js';

import { imagePopup, imageInImagePopup, descriptionImagePopup } from '../pages/index.js';

export class Card {
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
    }

    _deleteCard() {
        this._element.remove();
    }
    
    _setEventListeners() {
        const likeButton = this._element.querySelector('.elements__like-button');
        const deleteButton = this._element.querySelector('.elements__delete-button');

        this._element.addEventListener('click', (evt) => {
            if (
                evt.target != likeButton &&
                evt.target != deleteButton
            ) {
                this._handleOpenPopup();
            }
        });

        likeButton.addEventListener('click', () => {
            likeButton.classList.toggle('elements__like-button_status_active');
        });

        deleteButton.addEventListener('click', () => {
            this._deleteCard();
        }); 
    }
}