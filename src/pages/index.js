import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import popupWithForm from '../components/PopupWithForm.js';
import Api from '../components/Api.js';

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

const cardList = new Section({
    renderer: (item) => {
        cardList.addItem(createCard(item));
    }},
    '.card-list');

const api = new Api({
    url: "https://mesto.nomoreparties.co/v1/cohort-20/",
    headers: {
      "content-type": "application/json",
      "Authorization": "d9c7d5d0-8d7b-4c75-89cd-3f307d29d79f"
    }
})

api
  .getInitialCards()
  //Отрисовка карточек
  .then((data) => {
    console.log(data);
    const newData = data.map(item=>{
        return {name: item.name, link: item.link, _id: item._id}
    })
    console.log(newData);
    cardList.renderItems(newData);
  })
  .catch(err => {
      console.log(err);
  })

const popupImage = new PopupWithImage(popupImgSelector);
popupImage.setEventListeners();

function createCard(item) {
    const card = new Card(item, templateSelector, () => {
        popupImage.open(item); 
    });
    const cardElement = card.generateCard();

    return cardElement;
}

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