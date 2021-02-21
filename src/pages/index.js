import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupDeleteCard from '../components/PopupDeleteCard.js';
import Api from '../components/Api.js';

import {
    enableValidationData,
    openButtonEdit,
    openButtonAdd,
    openButtonUpdateAvatar,
    templateSelector,
    popupEditSelector,
    popupAddSelector,
    popupImgSelector,
    popupDeleteSelector,
    popupUpdateAvatarSlector,
    nameInput,
    aboutInput,
    nameSelector,
    descriptionSelector,
    avatarSelector
} from '../utils/constants.js';

const api = new Api({
    url: "https://mesto.nomoreparties.co/v1/cohort-20/",
    headers: {
      "content-type": "application/json",
      "Authorization": "d9c7d5d0-8d7b-4c75-89cd-3f307d29d79f"
    }
})

Promise.all([api.getProfileInfo(), api.getInitialCards()])
    .then(([userInfo, cards]) => {

        //Заполнение профиля
        const user = new UserInfo({ nameSelector: nameSelector, descriptionSelector: descriptionSelector, avatarSelector: avatarSelector });
        user.setUserInfo(userInfo);

        const myID = userInfo._id;

        //Для отрисовки карточек
        function createCard(item) {
            const card = new Card(
                {
                    data: item, 
                    handleCardClick: () => {
                        popupImage.open(item); 
                    },
                    handleDeleteIconClick: () => {
                        popupDelete.open(item);
                        popupDelete.setHandleSubmitForm(() => {
                            api
                            .removeCard(item._id)
                            .then(() => {
                                card.deleteCard();
                            })
                            .catch(err => {
                                console.log(err);
                            })
                        });
                    },
                    handleLikeClick: () => {                        
                        if (card.likes.some((item) => {
                            return item._id === myID;
                        })) {                
                            api.removeLike(item._id)
                            .then((data) => {
                                card.updateLikes(data.likes);                                
                            })
                            .catch(err => {
                                console.log(err);
                            })
                        }
                        else {
                            api.likeCard(item._id)
                            .then((data) => {
                                card.updateLikes(data.likes);
                            })
                            .catch(err => {
                                console.log(err);
                            })
                        }                        
                    }
                },
                myID,
                templateSelector
            );
            const cardElement = card.generateCard();
            return cardElement;
        }
        
        const cardList = new Section(
            {
                renderer: (item) => {
                    cardList.addItem(createCard(item));
                }
            },
            '.card-list'
        );

        //Отрисовка карточек
        const cardData = cards.map(item => {
            return {name: item.name, link: item.link, likes: item.likes, _id: item._id, owner: item.owner}
        })
        cardList.renderItems(cardData);

        //Создание экземпляров классов

        const popupImage = new PopupWithImage(popupImgSelector);

        const popupDelete = new PopupDeleteCard(popupDeleteSelector);

        const popupUpdateAvatar = new PopupWithForm(popupUpdateAvatarSlector, (formData) => {
            popupUpdateAvatar.renderLoading(true);
            api
            .updateAvatar({avatar: formData.avatar})
            .then((res) => {
                user.setUserInfo(res);
                popupUpdateAvatar.close();
                popupUpdateAvatar.renderLoading(false);
            })
            .catch(err => {
                console.log(err);
            })
        });

        const popupEdit = new PopupWithForm(popupEditSelector, (formData) => {
            popupEdit.renderLoading(true);
            api
                .changeProfileInfo({ name: formData.name, about: formData.about })
                .then((res) => {
                    user.setUserInfo(res);
                    popupEdit.close();
                    popupEdit.renderLoading(false);
                })
                .catch(err => {
                    console.log(err);
                })
        });

        const popupAdd = new PopupWithForm(popupAddSelector, (item) => {
            popupAdd.renderLoading(true);
            api
                .addCard({name: item.name, link: item.link})
                .then((cardData) => {
                    cardList.addItem(createCard(cardData));
                })
                .then(() => {
                    popupAdd.close();
                    popupAdd.renderLoading(false);
                })
                .catch(err => {
                    console.log(err);
                })
        });

        return [user, popupImage, popupDelete, popupUpdateAvatar, popupEdit, popupAdd];
    })
    .then(([user, popupImage, popupDelete, popupUpdateAvatar, popupEdit, popupAdd]) => {
        //Добавление обработиков
        popupDelete.setEventListeners();
        popupImage.setEventListeners();
        popupEdit.setEventListeners();
        popupAdd.setEventListeners();
        popupUpdateAvatar.setEventListeners();

        openButtonEdit.addEventListener('click', function () {
            nameInput.value = user.getUserInfo().nameValue;
            aboutInput.value = user.getUserInfo().descriptionValue;
        
            const event = new Event('input', {});
            nameInput.dispatchEvent(event);
            aboutInput.dispatchEvent(event);
        
            popupEdit.open();
        });
        
        openButtonAdd.addEventListener('click', function () {
            popupAdd.open();
        });
        
        openButtonUpdateAvatar.addEventListener('click', function () {
            popupUpdateAvatar.open();
        });
    })
    .finally(() => {
        const formList = Array.from(document.querySelectorAll('.popup__form'));
        formList.forEach((form) => {
            const formValid = new FormValidator(enableValidationData, form);
            formValid.enableValidation();
        })
    })
    .catch(err => {
        console.log(err);
    })