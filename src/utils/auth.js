import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
const RefreshTokenKey = 'vue_admin_template_refresh_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getRefreshToken() {
  return Cookies.get(RefreshTokenKey)
}

export function setRefreshToken(refresh_token) {
  return Cookies.set(RefreshTokenKey, refresh_token)
}

export function removeRefreshToken() {
  return Cookies.remove(RefreshTokenKey)
}
