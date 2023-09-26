function setToken (token) {
  sessionStorage.setItem('authToken', token)
}

function getToken () {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem('authToken')
  }
}

function deleteToken () {
  sessionStorage.removeItem('authToken')
}

export {
  setToken,
  getToken,
  deleteToken
}
