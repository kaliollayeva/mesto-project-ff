import "./index.css";
import { createCard, deleteCard, toggleLike } from "./components/card";
import { closeModal, openModal, closeByOverlayClick } from "./components/modal";
import { initialCards } from "./components/cards";

const cardList = document.querySelector(".places__list");
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");

initialCards.forEach(function (card) {
  const resultCard = createCard(card, deleteCard, openPopupImage, toggleLike);
  cardList.append(resultCard);
});

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

const formEditProfile = document.querySelector('form[name="edit-profile"]');
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(
  ".popup__input_type_description"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

function submitFormEditProfile(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closeModal(popUpEdit);
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
