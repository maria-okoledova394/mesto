//import { hidePopup, showPopup } from '../utils/utils.js';

//import { imagePopup, imageInImagePopup, descriptionImagePopup } from '../pages/index.js';

export default class Card {
    constructor({ data, handleCardClick, handleDeleteIconClick }, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._likeCount = data.likes.length;
        this._handleCardClick = handleCardClick;
        this._handleDeleteIconClick = handleDeleteIconClick;
    }

   /* _getTemplate() {
        const cardElement = document
          .querySelector(this._cardSelector)
          .content
          .querySelector('.elements__element')
          .cloneNode(true);
    
        return cardElement;
    }*/

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

      this._likes = this._element.querySelector('.elements__like-count');
      this._likes.textContent = this._likeCount;
  
      return this._element;
    }

    /*_handleOpenPopup() {
        showPopup(imagePopup);
        imageInImagePopup.src = this._link;
        imageInImagePopup.alt = this._image.alt;
        descriptionImagePopup.textContent = this._name;
    }*/
    
    /*_handleClosePopup() {
        hidePopup(imagePopup);
    }*/

    deleteCard() {
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
                //this._name, this._link
                this._handleCardClick(evt);
            }
        });

        likeButton.addEventListener('click', () => {
            likeButton.classList.toggle('elements__like-button_status_active');
        });

        deleteButton.addEventListener('click', () => {
            this._handleDeleteIconClick();
            //this._deleteCard();
        }); 
    }
}