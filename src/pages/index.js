import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import popupWithForm from '../components/PopupWithForm.js';

import {
    initialCards,
    enableValidationData,
    openButtonEdit,
    openButtonAdd,
    templateSelector,
    popupEditSelector,
    popupAddSelector,
    popupImgSelector,
    nameInput,
    jobInput
} from '../utils/constants.js';

const popupImage = new PopupWithImage(popupImgSelector);
popupImage.setEventListeners();

function createCard(item) {
    const card = new Card(item, templateSelector, () => {
        popupImage.open(item); 
    });
    const cardElement = card.generateCard();

    return cardElement;
}

const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        cardList.addItem(createCard(item));
    }
}, '.card-list');

cardList.renderItems();

const user = new UserInfo({ nameSelector: '.profile__title', descriptionSelector: '.profile__subtitle' });

const popupEdit = new popupWithForm(popupEditSelector, (formData) => {
    user.setUserInfo(formData);
    popupEdit.close();
});

popupEdit.setEventListeners();

const popupAdd = new popupWithForm(popupAddSelector, (item) => {
    cardList.addItem(createCard(item));

    popupAdd.close();
});

popupAdd.setEventListeners();

openButtonEdit.addEventListener('click', function () {
    nameInput.value = user.getUserInfo().nameValue;
    jobInput.value = user.getUserInfo().descriptionValue;

    const event = new Event('input', {});
    nameInput.dispatchEvent(event);
    jobInput.dispatchEvent(event);

    popupEdit.open();
});

openButtonAdd.addEventListener('click', function () {
    popupAdd.open();
});

const formList = Array.from(document.querySelectorAll('.popup__form'));
formList.forEach((form) => {
    const formValid = new FormValidator(enableValidationData, form);
    formValid.enableValidation();
})