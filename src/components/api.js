const base = {
  url: "https://mesto.nomoreparties.co/v1/wff-cohort-35",
  id: "b7eb7c88-fe66-4468-9d6c-1ce676097241",
};

function getResponseData(res) {
  if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`); 
  }
  return res.json();
}

export function getUserInfo() {
  return fetch(`${base.url}/users/me`, {
    headers: {
      authorization: base.id,
    },
  })
    .then(getResponseData);
}

export function getCards() {
  return fetch(`${base.url}/cards`, {
    headers: {
      authorization: base.id,
    },
  })
  .then(getResponseData);
}

export function updateProfileInfo(updatedName, updatedJob) {
  return fetch(`${base.url}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: base.id,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: updatedName,
      about: updatedJob,
    }),
  })
  .then(getResponseData);
}

export function addNewCard(newCardName, newCardLink) {
  return fetch(`${base.url}/cards`, {
    method: "POST",
    headers: {
      authorization: base.id,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: newCardName,
      link: newCardLink,
    }),
  })
  .then(getResponseData);
}

export function putLike(cardId) {
  return fetch(`${base.url}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: {
      authorization: base.id,
      "Content-Type": "application/json",
    },
  })
    .then(getResponseData);
}

export function deleteLike(cardId) {
  return fetch(`${base.url}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: base.id,
      "Content-Type": "application/json",
    },
  })
  .then(getResponseData);
}

export function deleteCardApi(cardId) {
  return fetch(`${base.url}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: base.id,
      "Content-Type": "application/json",
    },
  })
  .then(getResponseData);
}

export function updateProfileAvatar(updatedAvatar) {
  return fetch(`${base.url}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: base.id,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: updatedAvatar,
    }),
  })
  .then(getResponseData);
}
