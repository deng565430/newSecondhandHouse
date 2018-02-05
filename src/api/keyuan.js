import $api from './api'

// 获取所有经纪人
export function getsourceitem (data) {
  const list = Object.assign({}, {
    start: 0,
    length: 20
  }, data)
  const url = '/secondhand/getsourceitem'
  console.log(list)
  return $api.get(url, list)
}
