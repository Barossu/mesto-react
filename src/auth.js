export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
    .then((responce) => {
      return responce.json();
    })
    .then((res) => {
      return res;
    })
    .catch(console.error)
}

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
    .then((responce) => {
      return responce.json();
    })
    .then((data) => {
      localStorage.setItem('token', data.token);
      return data;
    })
    .catch(console.error)
}

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'get',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    return data;
  })
}