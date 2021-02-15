export const closePopup = (event) => {
    const key = event.key;
    if (key === "Escape") { 
        hidePopup(document.querySelector('.popup_opened'));
    }
}

export function hidePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopup);
}

export function showPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopup);
}