import Cookies from 'js-cookie'

/**
 * 设置用户信息
 * @param {*} info 
 */
export function setUserCookie(info) {
  const arr = Object.entries(info)
  for (let i = 0; i < arr.length; i++) {
    Cookies.set(arr[i][0], arr[i][1])
  }
  return true
}

/**
 * 获取用户信息
 */
export function getUserCookie() {
  return {
    username: Cookies.get('username'),
    appkey: Cookies.get('appkey'),
    role: Cookies.get('role'),
    email: Cookies.get('email')
  }
}

export function removeUserCookie() {
  Cookies.remove('username')
  Cookies.remove('appkey')
  Cookies.remove('role')
  Cookies.remove('email')
  return true
}
