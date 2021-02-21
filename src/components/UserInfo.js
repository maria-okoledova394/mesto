export default class UserInfo {
    constructor({ nameSelector, descriptionSelector, avatarSelector }) {
        this._nameValue = document.querySelector(nameSelector);
        this._descriptionValue = document.querySelector(descriptionSelector);
        this._avatar = document.querySelector(avatarSelector);
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
        this._nameValue.textContent = formData.name;
        this._descriptionValue.textContent = formData.about;
        this._avatar.src = formData.avatar;
    }
}