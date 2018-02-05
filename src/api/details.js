import $api from './api'

// 获取详细信息
export function getRoomDetails(data) {
  const url = '/secondhand/getroomdetails'

  return $api.get(url, data)
}

// 停止项目
export function updateClientSourceStatus (data) {
  const url = `/secondhand/updateClientSourceStatus?id=${data.id}&status=${data.status}&operate=${data.operate}`

  return $api.post(url)
}
