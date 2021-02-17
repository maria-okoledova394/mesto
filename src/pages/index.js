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
} from '../utils/constants.js';

const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item, templateSelector, () => {
            const popupImage = new PopupWithImage(popupImgSelector);
            popupImage.open(item);
            popupImage.setEventListeners();
        });
        const cardElement = card.generateCard();
        cardList.addItem(cardElement);
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

    const card = new Card(item, templateSelector, () => {
        const popupImage = new PopupWithImage(popupImgSelector);
        popupImage.open(item);
        popupImage.setEventListeners();
    });
    const cardElement = card.generateCard();

    
    cardList.addItem(cardElement);

    popupAdd.close();
});

popupAdd.setEventListeners();

openButtonEdit.addEventListener('click', function () {
    const nameInput = document.querySelector('.popup__input_content_name');
    const jobInput = document.querySelector('.popup__input_content_job');
    nameInput.value = user.getUserInfo().nameValue;
    jobInput.value = user.getUserInfo().descriptionValue;

    var event = new Event('input', {});
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