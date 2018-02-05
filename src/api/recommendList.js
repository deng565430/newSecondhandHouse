import $api from './api'

// 筛选列表 总价和户型
export function getfilter () {
  const url = '/secondhand/getfilter'

  return $api.get(url)
}

// 获取所有经纪人
export function getbroker (data) {
  const list = Object.assign({}, {
    start: 0,
    length: 20,
    logo: 0
  }, data)
  const url = '/secondhand/getbroker'
  return $api.get(url, list)
}

// 某个经纪人的详情
export function getroomListbyphone (data) {
  const list = Object.assign({}, {
    start: 0,
    length: 20
  }, data)
  const url = '/secondhand/getroomListbyphone'

  return $api.get(url, list)
}
