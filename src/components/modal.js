import { toggleButtonState, clearValidation } from "./validation";
import { validationConfig } from "../index";

export function openModal(el) {
  el.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeWithEsc);

  const form = el.querySelector(validationConfig.formSelector);

  if (form) {
    const inputList = Array.from(
      form.querySelectorAll(validationConfig.inputSelector)
    );
    const buttonElement = form.querySelector(
      validationConfig.submitButtonSelector
    );

    toggleButtonState(inputList, buttonElement, validationConfig);
    clearValidation(form, validationConfig);
  }
}

export function closeModal(el) {
  el.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeWithEsc);
}

export function closeWithEsc(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

export function closeByOverlayClick(event, popup) {
  if (event.target === popup) {
    closeModal(popup);
  }
}
