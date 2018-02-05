import axios from 'axios'
import { baseUrl } from '../config/env.js'

export default {
  get: function(url, data = null) {
    console.log(baseUrl + url)
    var result = axios({
      method: 'get',
      params: data,
      url: baseUrl + url,
      withCredentials: true
    })
    return result
  },
  post: function(url, data) {
    var result = axios({
      method: 'post',
      url: baseUrl + url,
      data: data,
      withCredentials: true
    })
    return result
  },
  url: function(url) {
    return baseUrl + url
  },
  formData: function (url, data) {
    var result = axios({
      method: 'post',
      url: baseUrl + url,
      data: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      transformRequest: [function (data) {
        // Do whatever you want to transform the data
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
      withCredentials: true
    })
    return result
  }
}
