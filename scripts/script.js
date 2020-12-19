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

const imagePopup = document.querySelector('.image-popup');
const imageInImagePopup = document.querySelector('.image-popup__image');
const descriptionImagePopup = document.querySelector('.image-popup__subscription');
const closeButtonImagePopup = document.querySelector('.image-popup__close-button');


const cardTemplate = document.querySelector('#elements__element').content;
const cards = document.querySelector('.elements');

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

// For edit popup
function showPopupEdit() {
    popupEdit.classList.add('popup_opened');
    nameInputEdit.value = title.textContent;
    jobInputEdit.value = subtitle.textContent;
}

function hidePopupEdit() {
    popupEdit.classList.remove('popup_opened');
}

function handleFormSubmitEdit (evt) {
    evt.preventDefault(); 
    title.textContent = nameInputEdit.value;
    subtitle.textContent = jobInputEdit.value;
    hidePopupEdit();
}

// For add popup
function showPopupAdd() {
    popupAdd.classList.add('popup_opened');
    placeInputAdd.value = 'Название';
    imageUrlInputAdd.value = 'Ссылка на картинку';
}

function hidePopupAdd() {
    popupAdd.classList.remove('popup_opened');
}

function showImagePopup(event) {
    event.preventDefault();
    const imageElement = event.target;
    imageInImagePopup.src = imageElement.src;
    descriptionImagePopup.textContent = event.target.nextElementSibling.textContent;
    imagePopup.classList.add('image-popup_opened');
}

function hideImagePopup() {
    imagePopup.classList.remove('image-popup_opened');
}

function addCard(imageUrl, title) {
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.elements__title').textContent = title;

    const image = cardElement.querySelector('.elements__image');
    image.src = imageUrl;
    image.addEventListener('click', showImagePopup);

    cards.prepend(cardElement);  
}

function handleFormSubmitAdd (evt) {
    evt.preventDefault(); 
    addCard(imageUrlInputAdd.value, placeInputAdd.value);
    hidePopupAdd();
}

initialCards.forEach(function (el) {
    addCard(el.link, el.name);
});

// --------------------

formEdit.addEventListener('submit', handleFormSubmitEdit); 
openButtonEdit.addEventListener('click', showPopupEdit); 
closeButtonEdit.addEventListener('click', hidePopupEdit);

formAdd.addEventListener('submit', handleFormSubmitAdd); 
openButtonAdd.addEventListener('click', showPopupAdd); 
closeButtonAdd.addEventListener('click', hidePopupAdd);

closeButtonImagePopup.addEventListener('click', hideImagePopup);