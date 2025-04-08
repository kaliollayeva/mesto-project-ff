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
    .then((res) => res.json())
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
