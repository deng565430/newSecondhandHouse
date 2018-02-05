import $api from './api'

export function getprojectList (start, length, fabu, status) {
  const url = '/secondhand/getClientSource?start=' + start + '&length=' + length + '&fabu=' + fabu + '&status=' + status

  return $api.get(url)
}

export function getfabuNum (fabu) {
  const url = '/secondhand/getClientSourceCount?fabu=' + fabu

  return $api.get(url)
}

/* export function getxiangyingList (start, length) {
  const url = '/secondhand/getClientSourceResponsing?start=' + start + '&length=' + length

  return $api.get(url)
} */

/* export function getstopList (start, length) {
  const url = '/secondhand/getClientSourceStoped?start=' + start + '&length=' + length

  return $api.get(url)
} */

export function huifuList (id, flag, operate) {
  const url = '/secondhand/updateClientSourceStatus?id=' + id + '&status=' + flag + '&operate=' + operate

  return $api.post(url)
}
