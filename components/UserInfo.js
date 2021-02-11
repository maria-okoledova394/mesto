export default class UserInfo {
    constructor({ nameSelector, descriptionSelector }) {
        this._nameValue = document.querySelector(nameSelector).textContent;
        this._descriptionValue = document.querySelector(descriptionSelector).textContent;
    }

    getUserInfo() {
        this._userInformation = {
            nameValue: '',
            descriptionValue: ''
        };
        this._userInformation.nameValue = this._nameValue;
        this._userInformation.descriptionValue = this._descriptionValue;

        return this._userInformation;
    }

    setUserInfo(formData) {
        //const nameInput = document.querySelector('.popup__input_content_name');
        //const jobInput = document.querySelector('.popup__input_content_job');
        this._nameValue = formData.name;
        this._descriptionValue = formData.job;
    }
}