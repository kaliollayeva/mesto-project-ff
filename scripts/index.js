// @todo: Темплейт карточки
  const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(card, deleteCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__title").textContent = card.name;
  cardElement.querySelector(".card__image").src = card.link;

  const buttonDelete = cardElement.querySelector(".card__delete-button");
  buttonDelete.addEventListener("click", function () {
    deleteCard(cardElement);
  });

  return cardElement;
}
// @todo: Функция удаления карточки
function deleteCard(card) {
  card.remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach(function (card) {
  const resultCard = createCard(card, deleteCard);
  cardList.append(resultCard);
});