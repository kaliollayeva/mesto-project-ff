import "./index.css";
import { createCard, toggleLike } from "./components/card";
import { closeModal, openModal, closeByOverlayClick } from "./components/modal";
import { enableValidation } from "./components/validation";
import {
  getUserInfo,
  getCards,
  updateProfileInfo,
  addNewCard,
  deleteCardApi,
  updateProfileAvatar,
} from "./components/api";

const formEditProfile = document.querySelector('form[name="edit-profile"]');
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(
  ".popup__input_type_description"
);
const profileSaveButton = formEditProfile.querySelector("#profilesave-button");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");

const cardList = document.querySelector(".places__list");
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");

const formNewPlace = document.querySelector('form[name="new-place"]');
const cardNameInput = formNewPlace.querySelector(
  ".popup__input_type_card-name"
);
const newCardSaveButton = formNewPlace.querySelector("#newcard-save-button");
const urlInput = formNewPlace.querySelector(".popup__input_type_url");

const formNewAvatar = document.querySelector('form[name="new-avatar"]');
const renewAvatar = document.querySelector(".profile__image-container");
const newAvatarSaveButton = formNewAvatar.querySelector(
  "#newavatar-save-button"
);

const popUps = document.querySelectorAll(".popup");
const popUpNewCard = document.querySelector(".popup_type_new-card");
const popUpEdit = document.querySelector(".popup_type_edit");
const popUpDeleteCard = document.querySelector(".popup_type_delete");
const popUpRenewAvatar = document.querySelector(".popup_type_renew-avatar");

const formDeleteYes = document.querySelector('form[name="delete-card"]');

const buttonsClose = document.querySelectorAll(".popup__close");

const popUpTypeImage = document.querySelector(".popup_type_image");
const popUpImage = document.querySelector(".popup__image");
const popUpCaption = document.querySelector(".popup__caption");

const popUpButton = document.querySelectorAll(".popup__button");

let currentUser = null;
let cardToDelete = null;
let cardIdToDelete = null;

const promises = [getUserInfo(), getCards()];

const renderCards = (cards, userInfo) => {
  cards.forEach(function (card) {
    const resultCard = createCard(
      card,
      userInfo,
      openPopupImage,
      toggleLike,
      handleDeleteCard
    );
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

    currentUser = userInfo;

    updateProfileData(userInfo); // обновляем информацию о профиле
    renderCards(cards, userInfo); // рендерим карточки
    // console.log(userInfo._id);
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

function openPopupImage(cardImage) {
  popUpImage.src = cardImage.src;
  popUpImage.alt = cardImage.alt;
  popUpCaption.textContent = cardImage.alt;
  openModal(popUpTypeImage);
}

function submitFormEditProfile(evt) {
  evt.preventDefault();

  let updatedName = nameInput.value;
  let updatedJob = jobInput.value;
  saveLoading(true, profileSaveButton, "Сохранить");

  updateProfileInfo(updatedName, updatedJob, saveLoading)
    .then((userInfo) => {
      updateProfileData(userInfo);
      closeModal(popUpEdit);
    })
    .catch((err) => console.log(err))
    .finally(() => saveLoading(false, profileSaveButton, "Сохранить"));
}

formEditProfile.addEventListener("submit", submitFormEditProfile);

formNewPlace.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const newCardName = cardNameInput.value;
  const newCardLink = urlInput.value;
  saveLoading(true, newCardSaveButton, "Создать");

  addNewCard(newCardName, newCardLink, saveLoading)
    .then((card) => {
      const newCard = createCard(
        card,
        currentUser,
        openPopupImage,
        toggleLike,
        handleDeleteCard
      );
      cardList.prepend(newCard);

      closeModal(popUpNewCard);
      formNewPlace.reset();
    })
    .catch((err) => console.log(err))
    .finally(() => saveLoading(false, newCardSaveButton, "Создать"));
});

function handleDeleteCard(cardElement, cardId) {
  cardToDelete = cardElement;
  cardIdToDelete = cardId;
  openModal(popUpDeleteCard);
}

formDeleteYes.addEventListener("submit", (evt) => {
  evt.preventDefault();
  deleteCardApi(cardIdToDelete)
    .then(() => {
      cardToDelete.remove();
      closeModal(popUpDeleteCard);
    })
    .catch((err) => console.log(err));
});

renewAvatar.addEventListener("click", function () {
  openModal(popUpRenewAvatar);
});

const newAvatarUrlInput = formNewAvatar.querySelector(".popup__input_type_url");

formNewAvatar.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const updatedAvatar = newAvatarUrlInput.value;
  saveLoading(true, newAvatarSaveButton, "Сохранить");

  updateProfileAvatar(updatedAvatar, saveLoading)
    .then((userInfo) => {
      profileAvatar.src = userInfo.avatar;
      closeModal(popUpRenewAvatar);
      formNewAvatar.reset();
    })
    .catch((err) => console.log(err))
    .finally(() => saveLoading(false, newAvatarSaveButton, "Сохранить"));
});

enableValidation(validationConfig);

function saveLoading(
  isLoading,
  button,
  defaultText,
  loadingText = "Сохранение..."
) {
  button.textContent = isLoading ? loadingText : defaultText;
}
