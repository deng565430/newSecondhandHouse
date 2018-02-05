import $api from './api'

export function getTypeList () {
  const url = '/pro/getwuye'

  return $api.get(url)
}

export function secondHandRoom (data) {
  const url = '/secondhand/addclientroom'

  return $api.post(url, data)
}

export function secondHandSource (data) {
  const url = '/secondhand/addclientsource'

  return $api.post(url, data)
}

// 添加到一手房
export function sendProject (data) {
  const url = `/needs/add`

  return $api.post(url, data)
}
