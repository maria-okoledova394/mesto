let openButtonElement = document.querySelector('.profile__edit-button');
let titleElement = document.querySelector('.profile__title');
let subtitleElement = document.querySelector('.profile__subtitle');
let popup = document.querySelector('.popup');
let closeButtonElement = document.querySelector('.popup__close-button');
let nameInput = document.querySelector('.popup__input_content_name');
let jobInput = document.querySelector('.popup__input_content_job');
let formElement = document.querySelector('.popup__container');

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
}

formElement.addEventListener('submit', handleFormSubmit); 
openButtonElement.addEventListener('click', showPopup); 
closeButtonElement.addEventListener('click', hidePopup);