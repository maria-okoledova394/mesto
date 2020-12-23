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

function showPopup(popup) {
    popup.classList.add('popup_opened');
}

function hidePopup(popup) {
    popup.classList.remove('popup_opened');
}

function createCard(name, link) { 
    //создается DOM элемент карточки 
    const cardElement = cardTemplate.cloneNode(true);

    //в карточку вставляются данные и навешиваются обработчики 
    cardElement.querySelector('.elements__title').textContent = name; 

    const image = cardElement.querySelector('.elements__image');
    image.src = link;
    image.alt = name;
    image.addEventListener('click', function() {
        const imageElement = event.target;
        imageInImagePopup.src = imageElement.src;
        descriptionImagePopup.textContent = event.target.nextElementSibling.textContent;
        imageInImagePopup.alt = descriptionImagePopup.textContent;
        showPopup(imagePopup);
    });

    const likeButton = cardElement.querySelector('.elements__like-button');
    likeButton.addEventListener('click', function () {
        likeButton.classList.toggle('elements__like-button_status_active');
        //likeButton.classList.toggle('elements__like-button_status_notactive');
    });

    const deleteButton = cardElement.querySelector('.elements__delete-button');
    deleteButton.addEventListener('click', function () {
        const cardToDelete = deleteButton.closest('.elements__element');
        cardToDelete.remove();
    }); 
    //возвращается созданная карточка 
    return cardElement; 
} 

function addCard(container, cardElement) {
    container.prepend(cardElement); //cardElement добавляется в container 
}

initialCards.forEach(function (el) {
    addCard(cards, createCard(el.name, el.link));
});

function handleFormSubmitEdit (evt) {
    evt.preventDefault(); 
    title.textContent = nameInputEdit.value;
    subtitle.textContent = jobInputEdit.value;
    hidePopup(popupEdit);
}

function handleFormSubmitAdd (evt) {
    evt.preventDefault();
    addCard(cards, createCard(placeInputAdd.value, imageUrlInputAdd.value));
    hidePopup(popupAdd);
    document.querySelector('.popup__container_function_add').reset();
}

// --------------------

formEdit.addEventListener('submit', handleFormSubmitEdit); 

openButtonEdit.addEventListener('click', function () {
    showPopup(popupEdit);
    nameInputEdit.value = title.textContent;
    jobInputEdit.value = subtitle.textContent;
});

closeButtonEdit.addEventListener('click', function () {
    hidePopup(popupEdit);
});

formAdd.addEventListener('submit', handleFormSubmitAdd);

openButtonAdd.addEventListener('click', function () {
    showPopup(popupAdd);
    placeInputAdd.placeholder = 'Название';
    imageUrlInputAdd.placeholder = 'Ссылка на картинку';
}); 

closeButtonAdd.addEventListener('click', function () {
    hidePopup(popupAdd);
});

closeButtonImagePopup.addEventListener('click', function () {
    hidePopup(imagePopup);
});