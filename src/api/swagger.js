import axios from 'axios'
export function getSwaggerInfo(apiurl) {
  return axios({
    method: 'GET',
    url: apiurl
  })
}
