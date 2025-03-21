export function createCard(card, deleteCard, openPopupImage, toggleLike) {
  const cardElement = getCardTemplate();
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
    toggleLike(likeButton);
  });

  return cardElement;
}

export function deleteCard(card) {
  card.remove();
}

export function toggleLike(el) {
  el.classList.toggle("card__like-button_is-active");
}

function getCardTemplate() {
  const cardTemplate = document.querySelector("#card-template").content;
  return cardTemplate.querySelector(".card").cloneNode(true);
}
