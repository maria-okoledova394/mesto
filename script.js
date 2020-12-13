let openButtonElement = document.querySelector('.profile__edit-button');
let inputNameElement = document.querySelector('.popup__input_name');
let subtitleElement = document.querySelector('.profile__subtitle');
let inputDescriprionElement = document.querySelector('.popup__input_descriprion');
let titleElement = document.querySelector('.profile__title');
let popup = document.querySelector('.popup');
let closeButtonElement = document.querySelector('.popup__close-icon');
let saveButtonElement = document.querySelector('.popup__button-save');
var likeButtons = document.querySelectorAll('.elements__like-button');

function showPopup() {
    popup.classList.add('popup_opened');
    inputNameElement.value = titleElement.textContent;
    inputDescriprionElement.value = subtitleElement.textContent;
}

function hidePopup() {
    popup.classList.remove('popup_opened');
}

function saveInfo () {
    popup.classList.remove('popup_opened');
    titleElement.textContent = inputNameElement.value;
    subtitleElement.textContent = inputDescriprionElement.value;
}

openButtonElement.addEventListener('click', showPopup); 

closeButtonElement.addEventListener('click', hidePopup); 

saveButtonElement.addEventListener('click', saveInfo); 

for (var i = 0; i < likeButtons.length; i++) {
    likeButtons[i].onclick = function(e) {
    e.target.classList.toggle('elements__like-button_active');
    e.target.classList.toggle('elements__like-button');
  }
}