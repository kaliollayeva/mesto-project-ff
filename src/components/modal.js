export function openModal(el) {
  el.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeWithEsc);
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
