import { putLike, deleteLike } from "./api";

export function createCard(
  card,
  userInfo,
  openPopupImage,
  toggleLike,
  handleDeleteCard
) {
  const cardElement = getCardTemplate();
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likesNumber = cardElement.querySelector(".card__like-number");
  const buttonDelete = cardElement.querySelector(".card__delete-button");

  cardTitle.textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;
  likesNumber.textContent = card.likes.length;

  if (card.owner._id === userInfo._id) {
    buttonDelete.addEventListener("click", function () {
      handleDeleteCard(cardElement, card._id);
    });
  } else {
    buttonDelete.classList.add("card__delete-button-hidden");
  }

  cardImage.addEventListener("click", function () {
    openPopupImage(cardImage);
  });

  if (card.likes.some((like) => like._id === userInfo._id)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  likeButton.addEventListener("click", function () {
    toggleLike(likeButton, likesNumber, card._id);
  });

  return cardElement;
}

export function toggleLike(el, likesNumber, cardId) {
  if (el.classList.contains("card__like-button_is-active")) {
    deleteLike(cardId).then((card) => {
      likesNumber.textContent = card.likes.length;
      console.log(card.likes.length);
      el.classList.remove("card__like-button_is-active");
    });
  } else {
    putLike(cardId).then((card) => {
      console.log(card.likes.length);
      el.classList.add("card__like-button_is-active");

      likesNumber.textContent = card.likes.length;
    });
  }
}

function getCardTemplate() {
  const cardTemplate = document.querySelector("#card-template").content;
  return cardTemplate.querySelector(".card").cloneNode(true);
}
