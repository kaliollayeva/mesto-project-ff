import "./index.css";
import { createCard, deleteCard, activeLike, initialCards } from "./components/cards";
import { closeModal, openModal, openPopupImage } from "./components/modal";

export const cardTemplate = document.querySelector("#card-template").content;
const cardList = document.querySelector(".places__list");
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");

initialCards.forEach(function (card) {
  const resultCard = createCard(card, deleteCard, openPopupImage, activeLike);
  cardList.append(resultCard);
});

export const popUps = document.querySelectorAll(".popup");
export const popUpNewCard = document.querySelector(".popup_type_new-card");
export const popUpEdit = document.querySelector(".popup_type_edit");
const buttonsClose = document.querySelectorAll(".popup__close");

buttonEdit.addEventListener("click", function () {
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
  popup.addEventListener("click", (event) => {
    if (event.target === popup) {
      closeModal(popup);
    }
  });
});

const formElement = document.querySelector('form[name="edit-profile"]');
export const nameInput = formElement.querySelector(".popup__input_type_name");
export const jobInput = formElement.querySelector(
  ".popup__input_type_description"
);
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);

function handleFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closeModal(popUpEdit);
}

formElement.addEventListener("submit", handleFormSubmit);

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

  const newCard = createCard(cardData, deleteCard, openPopupImage, activeLike);
  cardList.prepend(newCard);

  closeModal(popUpNewCard);
  formNewPlace.reset();
});
