import {
  popUpNewCard,
  popUpEdit,
  nameInput,
  jobInput,
  profileTitle,
  profileDescription,
} from "./../index";

export const popUpTypeImage = document.querySelector(".popup_type_image");
export const popUpImage = document.querySelector(".popup__image");
export const popUpCaption = document.querySelector(".popup__caption");

export function openModal(el) {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  el.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeWithEsc);
}

export function closeModal(el) {
  el.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeWithEsc);
}

export function closeWithEsc(event) {
  if (event.key === "Escape") {
    closeModal(popUpNewCard);
    closeModal(popUpEdit);
    closeModal(popUpTypeImage);
  }
}

export function openPopupImage(cardImage) {
  popUpImage.src = cardImage.src;
  popUpImage.alt = cardImage.alt;
  popUpCaption.textContent = cardImage.alt;
  openModal(popUpTypeImage);
}
