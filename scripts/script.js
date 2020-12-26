const openButtonEdit = document.querySelector('.profile__edit-button');
const title = document.querySelector('.profile__title');
const subtitle = document.querySelector('.profile__subtitle');
const popupEdit = document.querySelector('.popup_function_edit');
const closeButtonEdit = document.querySelector('.popup_function_edit .popup__close-button');
const nameInputEdit = document.querySelector('.popup_function_edit .popup__input_content_name');
const jobInputEdit = document.querySelector('.popup_function_edit .popup__input_content_job');
const formEdit = document.querySelector('.popup_function_edit .popup__container');

const openButtonAdd = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup_function_add');
const closeButtonAdd = document.querySelector('.popup_function_add .popup__close-button');
const placeInputAdd = document.querySelector('.popup_function_add .popup__input_content_place');
const imageUrlInputAdd = document.querySelector('.popup_function_add .popup__input_content_picture');
const formAdd = document.querySelector('.popup_function_add .popup__container');

const imagePopup = document.querySelector('.popup_function_open-image');
const imageInImagePopup = document.querySelector('.popup__image');
const descriptionImagePopup = document.querySelector('.popup__subscription');
const closeButtonImagePopup = document.querySelector('.popup_function_open-image .popup__close-button');


const cardTemplate = document.querySelector('#elements').content;
const cards = document.querySelector('.elements');

const popup = document.querySelector('.popup');

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

function showPopup(popup) {
    popup.classList.add('popup_opened');
}

function hidePopup(popup) {
    popup.classList.remove('popup_opened');
}

function createCard(name, link) { 
    //создается DOM элемент карточки 
    const cardElement = cardTemplate.cloneNode(true);

    //в карточку вставляются данные и навешиваются обработчики 
    cardElement.querySelector('.elements__title').textContent = name; 

    const image = cardElement.querySelector('.elements__image');
    image.src = link;
    image.alt = name;
    image.addEventListener('click', function(event) {
        const imageElement = event.target;
        imageInImagePopup.src = imageElement.src;
        descriptionImagePopup.textContent = event.target.nextElementSibling.textContent;
        imageInImagePopup.alt = descriptionImagePopup.textContent;
        showPopup(imagePopup);
    });

    const likeButton = cardElement.querySelector('.elements__like-button');
    likeButton.addEventListener('click', function () {
        likeButton.classList.toggle('elements__like-button_status_active');
    });

    const deleteButton = cardElement.querySelector('.elements__delete-button');
    deleteButton.addEventListener('click', function () {
        const cardToDelete = deleteButton.closest('.elements__element');
        cardToDelete.remove();
    }); 
    //возвращается созданная карточка 
    return cardElement; 
} 

function addCard(container, cardElement) {
    container.prepend(cardElement); //cardElement добавляется в container 
}

initialCards.forEach(function (el) {
    addCard(cards, createCard(el.name, el.link));
});

function handleFormSubmitEdit (evt) {
    evt.preventDefault(); 
    title.textContent = nameInputEdit.value;
    subtitle.textContent = jobInputEdit.value;
    hidePopup(popupEdit);
}

function handleFormSubmitAdd (evt) {
    evt.preventDefault();
    addCard(cards, createCard(placeInputAdd.value, imageUrlInputAdd.value));
    hidePopup(popupAdd);
    document.querySelector('.popup__container_function_add').reset();
}

// --------------------

formEdit.addEventListener('submit', handleFormSubmitEdit);

// To force check validation
function sendInputEvent(element) {
    var event = new Event('input', {});
    
    element.dispatchEvent(event);
}

openButtonEdit.addEventListener('click', function () {
    showPopup(popupEdit);
    nameInputEdit.value = title.textContent;
    sendInputEvent(nameInputEdit);
    jobInputEdit.value = subtitle.textContent;
    sendInputEvent(jobInputEdit);
});

closeButtonEdit.addEventListener('click', function () {
    hidePopup(popupEdit);
});

formAdd.addEventListener('submit', handleFormSubmitAdd);

openButtonAdd.addEventListener('click', function () {
    showPopup(popupAdd);
}); 

closeButtonAdd.addEventListener('click', function () {
    hidePopup(popupAdd);
});

closeButtonImagePopup.addEventListener('click', function () {
    hidePopup(imagePopup);
});

document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (key === "Escape") {
        hidePopup(popupEdit);
        hidePopup(popupAdd);
        hidePopup(imagePopup);
    }
});

//-------VALIDATION---------------------------------------------

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    }); 
}

const toggleButtonState  = (inputList, buttonElement, params) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(params.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(params.inactiveButtonClass);
      buttonElement.disabled = false;
    } 
}

const showInputError = (formElement, inputElement, errorMessage, params) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(params.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(params.errorClass);
};

const hideInputError = (formElement, inputElement, params) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(params.inputErrorClass);
    errorElement.classList.remove(params.errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, params) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, params);
  } else {
    hideInputError(formElement, inputElement, params);
  }
};

const setEventListeners = (formElement, params) => {
    const inputList = Array.from(formElement.querySelectorAll(params.inputSelector));
    const buttonElement = formElement.querySelector(params.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, params);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        toggleButtonState(inputList, buttonElement, params);
        checkInputValidity(formElement, inputElement, params);
      });
    });
};

const enableValidation = (params) => {
    const formList = Array.from(document.querySelectorAll(params.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      setEventListeners(formElement, params); 
    });
};

const setPopupEventListener = () => {
    const popupList = Array.from(document.querySelectorAll('.popup'));
    popupList.forEach((popupElement) => {
        popupElement.addEventListener('click', function (event) {
            if (event.target.classList.contains('popup')) { // to ignore clicks on popup content
                hidePopup(event.target);
            }
        });
    })
}

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });
setPopupEventListener();