export default class UserInfo {
    constructor({ nameSelector, descriptionSelector }) {
        this._nameValue = document.querySelector(nameSelector);
        this._descriptionValue = document.querySelector(descriptionSelector);
    }

    getUserInfo() {
        this._userInformation = {
            nameValue: '',
            descriptionValue: ''
        };
        this._userInformation.nameValue = this._nameValue.textContent;
        this._userInformation.descriptionValue = this._descriptionValue.textContent;

        return this._userInformation;
    }

    setUserInfo(formData) {
        //const nameInput = document.querySelector('.popup__input_content_name');
        //const jobInput = document.querySelector('.popup__input_content_job');
        this._nameValue.textContent = formData.name;
        this._descriptionValue.textContent = formData.job;
        console.log(this._nameValue);
    }
}