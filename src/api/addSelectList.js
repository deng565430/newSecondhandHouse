import $api from './api'

// 获取用户信息
export function getUserbyid() {
  const url = '/user/getUserbyid'

  return $api.get(url)
}

// 发布客源
export function addClientRoom(data) {
  const url = '/secondhand/addclientroom'

  return $api.post(url, data)
}

// 获取发布客源需求列表
export function getoption() {
  const url = '/secondhand/getoption'

  return $api.get(url)
}

// 发布房源API
export function sendProject(data) {
  const url = '/secondhand/addclientsource'

  return $api.post(url, data)
}

// 获取发布房源需求列表
export function getaddoptions() {
  const url = '/secondhand/getaddoptions'

  return $api.get(url)
}
