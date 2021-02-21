export default class Card {
    constructor({ data, handleCardClick, handleDeleteIconClick/*, handleLikeClick*/ }, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._likeCount = data.likes.length;
        this._handleCardClick = handleCardClick;
        this._handleDeleteIconClick = handleDeleteIconClick;
        //todo: add owner
        //todo: add me???
        //this._handleLikeClick = handleLikeClick;
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
      
      this._likes = this._element.querySelector('.elements__like-count');
      this._likes.textContent = this._likeCount;
  
      return this._element;
    }

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
            //this._handleLikeClick();
            likeButton.classList.toggle('elements__like-button_status_active');
        });

        deleteButton.addEventListener('click', () => {
            this._handleDeleteIconClick();

        }); 
    }
}