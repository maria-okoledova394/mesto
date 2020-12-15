let openButtonElement = document.querySelector('.profile__edit-button');
let inputNameElement = document.querySelector('.popup__input_name');
let subtitleElement = document.querySelector('.profile__subtitle');
let inputDescriprionElement = document.querySelector('.popup__input_descriprion');
let titleElement = document.querySelector('.profile__title');
let popup = document.querySelector('.popup');
let closeButtonElement = document.querySelector('.popup__close-button');
let saveButtonElement = document.querySelector('.popup__button-save');

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

   document.onkeyup = function(e){
    if(e){
        var key = window.event ? e.keyCode : e.which;
    }else{
        var key = window.event ? event.keyCode : event.which;
    }
    if (key == '13') {
        saveInfo();
    }
}