export const initialCards = [
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

export const enableValidationData = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

export const openButtonEdit = document.querySelector('.profile__edit-button');
export const openButtonAdd = document.querySelector('.profile__add-button');
export const openButtonUpdateAvatar = document.querySelector('.profile__update-avatar-button');
export const templateSelector = '.elements';
export const popupEditSelector = '.popup_function_edit';
export const popupAddSelector = '.popup_function_add';
export const popupImgSelector = '.popup_function_open-image';
export const popupDeleteSelector = '.popup_function_delete';
export const popupUpdateAvatarSlector = '.popup_function_update-avatar';
export const nameInput = document.querySelector('.popup__input_content_name');
export const aboutInput = document.querySelector('.popup__input_content_about');
export const nameSelector = '.profile__title';
export const descriptionSelector = '.profile__subtitle';
export const avatarSelector = '.profile__avatar';
