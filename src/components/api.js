const baseUrl = "https://mesto.nomoreparties.co/v1/wff-cohort-35";

export function getUserInfo() {
  return fetch(`${baseUrl}/users/me`, {
    headers: {
      authorization: "b7eb7c88-fe66-4468-9d6c-1ce676097241",
    },
  })
    .then((res) => res.json())
    .then((result) => {
      return result;
    })
    .catch((error) => console.log(error));
}

export function getCards() {
  return fetch(`${baseUrl}/cards`, {
    headers: {
      authorization: "b7eb7c88-fe66-4468-9d6c-1ce676097241",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
      return result;
    })
    .catch((error) => console.log(error));
}

export function updateProfileInfo(updatedName, updatedJob) {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: "b7eb7c88-fe66-4468-9d6c-1ce676097241",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: updatedName,
      about: updatedJob,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    })
    .then((userInfo) => {
      return userInfo;
    });
}

export function addNewCard(newCardName, newCardLink) {
  return fetch(`${baseUrl}/cards`, {
    method: "POST",
    headers: {
      authorization: "b7eb7c88-fe66-4468-9d6c-1ce676097241",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: newCardName,
      link: newCardLink,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    })
    .then((cards) => {
      return cards;
    });
}

export function putLike(cardId) {
  return fetch(`${baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: {
      authorization: "b7eb7c88-fe66-4468-9d6c-1ce676097241",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    })
    .then((card) => {
      console.log(card);
      return card;
    })
    .catch((error) => console.log(error));
}

export function deleteLike(cardId) {
  return fetch(`${baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: "b7eb7c88-fe66-4468-9d6c-1ce676097241",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка в удалении: ${res.status}`);
      }
      return res.json();
    })
    .then((card) => {
      return card;
    })
    .catch((error) => console.log(error));
}

export function deleteCardApi(cardId) {
  return fetch(`${baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: "b7eb7c88-fe66-4468-9d6c-1ce676097241",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка в удалении: ${res.status}`);
      }
      return res.json();
    })
    .then((card) => {
      return card;
    })
    .catch((error) => console.log(error));
}

export function updateProfileAvatar(updatedAvatar) {
  return fetch(`${baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: "b7eb7c88-fe66-4468-9d6c-1ce676097241",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: updatedAvatar,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    })
    .then((userInfo) => {
      return userInfo;
    })
    .catch((error) => console.log(error));
}
