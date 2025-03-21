import { cardTemplate } from "../index";

export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export function createCard(card, deleteCard, openPopupImage, activeLike) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardTitle.textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;

  const buttonDelete = cardElement.querySelector(".card__delete-button");
  buttonDelete.addEventListener("click", function () {
    deleteCard(cardElement);
  });

  cardImage.addEventListener("click", function () {
    openPopupImage(cardImage);
  });

  likeButton.addEventListener("click", function () {
    activeLike(likeButton);
  });

  return cardElement;
}

export function deleteCard(card) {
  card.remove();
}

export function activeLike(el) {
  el.classList.toggle("card__like-button_is-active");
}
