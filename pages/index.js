import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import popupWithForm from '../components/PopupWithForm.js';
import popup from '../components/Popup.js';

import {
    initialCards,
    enableValidationData,
    openButtonEdit,
    openButtonAdd,
    placeInputAdd,
    imageUrlInputAdd,
    cards
} from '../utils/constants.js';

const containerSelector = '.elements';

const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item, '.elements', () => {
            const popupImage = new PopupWithImage('.popup_function_open-image', item);
            popupImage.open();
        });

        const cardElement = card.generateCard();
        cardList.addItem(cardElement);
    }
}, '.card-list');

cardList.renderItems();

const popupEdit = new popupWithForm('.popup_function_edit', (formData) => {
    //evt.preventDefault();
    const user = new UserInfo({ nameSelector: '.profile__title', descriptionSelector: '.profile__subtitle' });
    user.setUserInfo(formData);
    popupEdit.close();
});

popupEdit.setEventListeners();

const popupAdd = new popupWithForm('.popup_function_add', (evt, formData) => {
    evt.preventDefault();
    const card = new Card(formData, '.elements', (name, link) => {
        const poppImage = new PopupWithImage('.popup_function_open-image', formData)
        //PopupWithImage.open(placeInputAdd, imageUrlInputAdd);
        console.log('click on card');
    });
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
    popupAdd.close();
    //popupAdd.reset();
});

openButtonEdit.addEventListener('click', function () {
    const nameInput = document.querySelector('.popup__input_content_name');
    const jobInput = document.querySelector('.popup__input_content_job');
    const user = new UserInfo({ nameSelector: '.profile__title', descriptionSelector: '.profile__subtitle' });
    nameInput.value = user.getUserInfo().nameValue;
    jobInput.value = user.getUserInfo().descriptionValue;

    popupEdit.open();
});

openButtonAdd.addEventListener('click', function () {
    popupAdd.open();
}); 

function setPopupEventListener(event) {
    const popupFuncEdit = document.querySelector('.popup_function_edit');
    const popupFuncAdd = document.querySelector('.popup_function_add');

    popupFuncEdit.addEventListener('click', (event) => {
        if (event.target.classList.contains('popup')) { // to ignore clicks on popup content
            popupEdit.close();
        }
    });
    popupFuncAdd.addEventListener('click', (event) => {
        if (event.target.classList.contains('popup')) { // to ignore clicks on popup content
            popupAdd.close();
        }
    })
};

setPopupEventListener();

const formList = Array.from(document.querySelectorAll('.popup__form'));
formList.forEach((form) => {
    const formValid = new FormValidator(enableValidationData, form);
    formValid.enableValidation();
})

// To force check validation
function sendInputEvent(element) {
    var event = new Event('input', {});
    
    element.dispatchEvent(event);
}



/*const openButtonEdit = document.querySelector('.profile__edit-button');
//const title = document.querySelector('.profile__title');
//const subtitle = document.querySelector('.profile__subtitle');
//const popupEdit = document.querySelector('.popup_function_edit');
//const closeButtonEdit = document.querySelector('.popup_function_edit .popup__close-button');
//const nameInputEdit = document.querySelector('.popup_function_edit .popup__input_content_name');
//const jobInputEdit = document.querySelector('.popup_function_edit .popup__input_content_job');
//const formEdit = document.querySelector('.popup_function_edit .popup__container');

const openButtonAdd = document.querySelector('.profile__add-button');
//const popupAdd = document.querySelector('.popup_function_add');
//const closeButtonAdd = document.querySelector('.popup_function_add .popup__close-button');
const placeInputAdd = document.querySelector('.popup_function_add .popup__input_content_place');
const imageUrlInputAdd = document.querySelector('.popup_function_add .popup__input_content_picture');
//const formAdd = document.querySelector('.popup_function_add .popup__container');

export const cards = document.querySelector('.elements');


/*const imagePopup = document.querySelector('.popup_function_open-image');
const imageInImagePopup = document.querySelector('.popup__image');
//const closeButtonImagePopup = document.querySelector('.popup_function_open-image .popup__close-button');
const descriptionImagePopup = document.querySelector('.popup__subscription');

export { imagePopup, imageInImagePopup, descriptionImagePopup };*/

/*const enableValidationData = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};*/
//----------------------------------------------
/*const openPopup = document.querySelector('.popup_opened');

openPopup.addEventListener('click', function (event) {
    if (event.target.classList.contains('popup_function_edit')) { // to ignore clicks on popup content
        popupEdit.close();
    }
    if (event.target.classList.contains('popup_function_add')) { // to ignore clicks on popup content
        popupAdd.close();
    }
});*/



    /*const popupList = Array.from(document.querySelectorAll('.popup'));
    popupList.forEach((popupElement) => {
        popupElement.addEventListener('click', function (event) {
            if (event.target.classList.contains('popup')) { // to ignore clicks on popup content
                hidePopup(event.target);
            }
        });
    })
}*/



//setPopupEventListener();

/*showPopup(imagePopup);
imageInImagePopup.src = this._link;
imageInImagePopup.alt = this._image.alt;
descriptionImagePopup.textContent = this._name;

function createCard(name, link, cardSelector) {
    const card = new Card(name, link, cardSelector);
    const cardElement = card.generateCard();

    return cardElement;
}*/

/*function addCard(container, cardElement) {
    container.prepend(cardElement);
}*/



/*function handleFormSubmitEdit (evt) {
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
}*/

/*initialCards.forEach((item) => {
    const name = item.name;
    const link = item.link;

    const cardElement = createCard(name, link, '.elements');

    addCard(cards, cardElement);
});*/

/*formEdit.addEventListener('submit', handleFormSubmitEdit);

formAdd.addEventListener('submit', handleFormSubmitAdd);*/



/*openButtonEdit.addEventListener('click', function () {
    showPopup(popupEdit);
    nameInputEdit.value = title.textContent;
    sendInputEvent(nameInputEdit);
    jobInputEdit.value = subtitle.textContent;
    sendInputEvent(jobInputEdit);
});*/



/*openButtonAdd.addEventListener('click', function () {
    showPopup(popupAdd);
}); */

/*closeButtonEdit.addEventListener('click', function () {
    hidePopup(popupEdit);
});

closeButtonAdd.addEventListener('click', function () {
    hidePopup(popupAdd);
});

closeButtonImagePopup.addEventListener('click', () => {
    hidePopup(imagePopup);
  }); */