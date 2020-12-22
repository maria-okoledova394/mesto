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
    placeInputAdd.placeholder = 'Название';
    imageUrlInputAdd.placeholder = 'Ссылка на картинку';
}

function hidePopupAdd() {
    popupAdd.classList.remove('popup_opened');
}

function showImagePopup(event) {
    event.preventDefault();
    const imageElement = event.target;
    imageInImagePopup.src = imageElement.src;
    descriptionImagePopup.textContent = event.target.nextElementSibling.textContent;
    imagePopup.classList.add('popup_opened');
}

function hideImagePopup() {
    imagePopup.classList.remove('popup_opened');
}

function addCard(imageUrl, title) {
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.elements__title').textContent = title;

    const image = cardElement.querySelector('.elements__image');
    image.src = imageUrl;
    image.addEventListener('click', showImagePopup);

    const likeButton = cardElement.querySelector('.elements__like-button');
    likeButton.addEventListener('click', function () {
        likeButton.classList.toggle('elements__like-button_status_active');
        likeButton.classList.toggle('elements__like-button_status_notactive');
    });

    const deleteButton = cardElement.querySelector('.elements__delete-button');
    deleteButton.addEventListener('click', function () {
        const cardToDelete = deleteButton.closest('.elements__element');
        cardToDelete.remove();
    });

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