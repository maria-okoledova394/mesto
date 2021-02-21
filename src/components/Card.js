export default class Card {
    constructor({ data, handleCardClick, handleDeleteIconClick, handleLikeClick }, myId, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardOwnerId = data.owner._id;
        this._cardSelector = cardSelector;
        this.likes = data.likes;
        this._handleCardClick = handleCardClick;
        this._handleDeleteIconClick = handleDeleteIconClick;
        this._handleLikeClick = handleLikeClick;
        this._myId = myId;
    }

    _getTemplate() {
        const cardElement = document
          .querySelector(this._cardSelector)
          .content
          .querySelector('.elements__element')
          .cloneNode(true);
    
        return cardElement;
    }
    
    _isLiked() {
        return this.likes.some((item) => {
            return item._id === this._myId;
        })
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._image = this._element.querySelector('.elements__image');
        this._image.src = this._link;
        this._image.alt = this._name;
        this._element.querySelector('.elements__title').textContent = this._name;

        this._likesElement = this._element.querySelector('.elements__like-count');
        this._likesElement.textContent = this.likes.length;

        if (this._cardOwnerId != this._myId) {
            this._element.querySelector('.elements__delete-button').remove();
        }
        
        return this._element;
    }

    deleteCard() {
        this._element.remove();
    }

    updateLikes(newLikes) {
        this.likes = newLikes;
        this._likesElement.textContent = newLikes.length;
    }

    _setEventListeners() {
        const deleteButton = this._element.querySelector('.elements__delete-button');
        const likeButton = this._element.querySelector('.elements__like-button');

        if (this._isLiked()) {
            likeButton.classList.add('elements__like-button_status_active');
        }

        this._element.addEventListener('click', (evt) => {
            if (
                evt.target != likeButton &&
                evt.target != deleteButton
            ) {
                this._handleCardClick(evt);
            }
        });

        likeButton.addEventListener('click', () => {
            this._handleLikeClick();
            likeButton.classList.toggle('elements__like-button_status_active');
        });

        deleteButton.addEventListener('click', () => {
            this._handleDeleteIconClick();
        }); 
    }
}