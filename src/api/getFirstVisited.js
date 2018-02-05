import $api from './api'

// 判断是否是首次访问
export function getFirstVisited(page) {
  const url = `/visit/getFirstVisited?url=${page}`

  return $api.get(url)
}
