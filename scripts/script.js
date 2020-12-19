const openButtonElement = document.querySelector('.profile__edit-button');
const titleElement = document.querySelector('.profile__title');
const subtitleElement = document.querySelector('.profile__subtitle');
const popup = document.querySelector('.popup');
const closeButtonElement = document.querySelector('.popup__close-button');
const nameInput = document.querySelector('.popup__input_content_name');
const jobInput = document.querySelector('.popup__input_content_job');
const formElement = document.querySelector('.popup__container');
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


function showPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = titleElement.textContent;
    jobInput.value = subtitleElement.textContent;
}

function hidePopup() {
    popup.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
    evt.preventDefault(); 
    titleElement.textContent = nameInput.value;
    subtitleElement.textContent = jobInput.value;
    hidePopup();
}

initialCards.forEach(function (el) {
    const cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.elements__image').src = el.link;
    cardElement.querySelector('.elements__title').textContent = el.name;

    cards.prepend(cardElement); 
});

formElement.addEventListener('submit', handleFormSubmit); 
openButtonElement.addEventListener('click', showPopup); 
closeButtonElement.addEventListener('click', hidePopup);