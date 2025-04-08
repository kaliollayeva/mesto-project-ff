import "./index.css";
import { createCard, deleteCard, toggleLike } from "./components/card";
import { closeModal, openModal, closeByOverlayClick } from "./components/modal";
import { initialCards } from "./components/cards";
import { enableValidation } from "./components/validation";
import { getUserInfo, getCards, updateProfileInfo } from "./components/api";



const formEditProfile = document.querySelector('form[name="edit-profile"]');
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(
  ".popup__input_type_description"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");

const promises = [getUserInfo(), getCards()];

const renderCards = (cards) => {
  cards.forEach(function (card) {
    const resultCard = createCard(card, deleteCard, openPopupImage, toggleLike);
    cardList.append(resultCard);
  });
};

const updateProfileData = (userInfo) => {
  profileTitle.textContent = userInfo.name;
  profileDescription.textContent = userInfo.about;
  profileAvatar.src = userInfo.avatar;
};

Promise.all(promises)
  .then((data) => {
    console.log(data);
    const userInfo = data[0];
    const cards = data[1];

    updateProfileData(userInfo); // обновляем информацию о профиле
    renderCards(cards); // рендерим карточки
  })
  .catch((error) => console.log(error.message));

export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const cardList = document.querySelector(".places__list");
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");

const popUps = document.querySelectorAll(".popup");
const popUpNewCard = document.querySelector(".popup_type_new-card");
const popUpEdit = document.querySelector(".popup_type_edit");
const buttonsClose = document.querySelectorAll(".popup__close");

function fillProfileEditForm() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

buttonEdit.addEventListener("click", function () {
  fillProfileEditForm();
  openModal(popUpEdit);
});

buttonAdd.addEventListener("click", function () {
  openModal(popUpNewCard);
});

buttonsClose.forEach((buttonClose) => {
  const parentModal = buttonClose.closest(".popup");

  buttonClose.addEventListener("click", function () {
    if (parentModal) {
      closeModal(parentModal);
    }
  });
});

popUps.forEach((popup) => {
  popup.addEventListener("click", function (event) {
    closeByOverlayClick(event, popup);
  });
});

const popUpTypeImage = document.querySelector(".popup_type_image");
const popUpImage = document.querySelector(".popup__image");
const popUpCaption = document.querySelector(".popup__caption");

function openPopupImage(cardImage) {
  popUpImage.src = cardImage.src;
  popUpImage.alt = cardImage.alt;
  popUpCaption.textContent = cardImage.alt;
  openModal(popUpTypeImage);
}

function submitFormEditProfile(evt) {
  evt.preventDefault();

  const updatedName = nameInput.value;
  const updatedJob = jobInput.value;

  updateProfileInfo(updatedName, updatedJob).then((userInfo) => {
    updateProfileData(userInfo);
    closeModal(popUpEdit);
  });
}

formEditProfile.addEventListener("submit", submitFormEditProfile);

const formNewPlace = document.querySelector('form[name="new-place"]');
const cardNameInput = formNewPlace.querySelector(
  ".popup__input_type_card-name"
);
const urlInput = formNewPlace.querySelector(".popup__input_type_url");

formNewPlace.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const cardData = {
    name: cardNameInput.value,
    link: urlInput.value,
  };

  const newCard = createCard(cardData, deleteCard, openPopupImage, toggleLike);
  cardList.prepend(newCard);

  closeModal(popUpNewCard);
  formNewPlace.reset();
});

enableValidation(validationConfig);

updateProfileInfo(nameInput, jobInput);