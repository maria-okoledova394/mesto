import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import popupWithForm from '../components/PopupWithForm.js';
import Api from '../components/Api.js';

import {
    enableValidationData,
    openButtonEdit,
    openButtonAdd,
    templateSelector,
    popupEditSelector,
    popupAddSelector,
    popupImgSelector,
    popupDeleteSelector,
    nameInput,
    jobInput,
    profileTitle,
    profileSubtitle,
    profileAvatar
} from '../utils/constants.js';
import PopupDeleteCard from '../components/popupDeleteCard';

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
    const cardData = data.map(item => {
        return {name: item.name, link: item.link, _id: item._id}
    })
    console.log(cardData);
    cardList.renderItems(cardData);
  })
  .catch(err => {
      console.log(err);
  })

api
  .getProfileInfo()
  .then((data) => {
    profileTitle.textContent = data.name;
    profileSubtitle.textContent = data.about;
    profileAvatar.src = data.avatar;
  })
  .catch(err => {
      console.log(err);
  })

const popupImage = new PopupWithImage(popupImgSelector);
popupImage.setEventListeners();





function createCard(item) {
    const card = new Card(
        {
            data: item, 
            handleCardClick: () => {
                popupImage.open(item); 
            },
            handleDeleteIconClick: () => {
                const PopupDelete = new PopupDeleteCard(popupDeleteSelector, () => {
                    api.removeCard(item._id);
                })
                PopupDelete.setEventListeners();
                PopupDelete.open(item);
            }
        },
        templateSelector
    );

    const cardElement = card.generateCard();
    return cardElement;
}

const user = new UserInfo({ nameSelector: '.profile__title', descriptionSelector: '.profile__subtitle' });

const popupEdit = new popupWithForm(popupEditSelector, (formData) => {
    user.setUserInfo(formData);
    api.changeProfileInfo({ name: formData.name, about: formData.job });
    popupEdit.close();
});

popupEdit.setEventListeners();

const popupAdd = new popupWithForm(popupAddSelector, (item) => {
    api.addCard({name: item.name, link: item.link});
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