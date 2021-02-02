import { hidePopup, showPopup } from '../utils/utils.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';

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

export const cards = document.querySelector('.elements');


const imagePopup = document.querySelector('.popup_function_open-image');
const imageInImagePopup = document.querySelector('.popup__image');
const closeButtonImagePopup = document.querySelector('.popup_function_open-image .popup__close-button');
const descriptionImagePopup = document.querySelector('.popup__subscription');

export { imagePopup, imageInImagePopup, descriptionImagePopup };

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

const enableValidationData = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

function createCard(name, link, cardSelector) {
    const card = new Card(name, link, cardSelector);
    const cardElement = card.generateCard();

    return cardElement;
}

function addCard(container, cardElement) {
    container.prepend(cardElement);
}

// To force check validation
function sendInputEvent(element) {
    var event = new Event('input', {});
    
    element.dispatchEvent(event);
}

function handleFormSubmitEdit (evt) {
    evt.preventDefault(); 
    title.textContent = nameInputEdit.value;
    subtitle.textContent = jobInputEdit.value;
    hidePopup(popupEdit);
}

function handleFormSubmitAdd (evt) {
    evt.preventDefault();
    addCard(cards, createCard(placeInputAdd.value, imageUrlInputAdd.value, '.elements'));
    hidePopup(popupAdd);
    document.querySelector('.popup__container_function_add').reset();
    sendInputEvent(placeInputAdd);
    sendInputEvent(imageUrlInputAdd);
}

initialCards.forEach((item) => {
    const name = item.name;
    const link = item.link;

    const cardElement = createCard(name, link, '.elements');

    addCard(cards, cardElement);
});

formEdit.addEventListener('submit', handleFormSubmitEdit);

formAdd.addEventListener('submit', handleFormSubmitAdd);

openButtonEdit.addEventListener('click', function () {
    showPopup(popupEdit);
    nameInputEdit.value = title.textContent;
    sendInputEvent(nameInputEdit);
    jobInputEdit.value = subtitle.textContent;
    sendInputEvent(jobInputEdit);
});

openButtonAdd.addEventListener('click', function () {
    showPopup(popupAdd);
}); 

closeButtonEdit.addEventListener('click', function () {
    hidePopup(popupEdit);
});

closeButtonAdd.addEventListener('click', function () {
    hidePopup(popupAdd);
});

closeButtonImagePopup.addEventListener('click', () => {
    hidePopup(imagePopup);
  }); 

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

const formList = Array.from(document.querySelectorAll('.popup__form'));
formList.forEach((form) => {
    const formValid = new FormValidator(enableValidationData, form);
    formValid.enableValidation();
})

/*const CardList = new Section({
    data: initialCards,
    renderer: (item) => {
      const card = new Card(item.name, item.link, cards);
      const cardElement = card.generateCard();
      CardList.setItem(cardElement);
    }
}, cardListSelector);*/

setPopupEventListener();