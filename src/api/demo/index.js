import axios from '@/utils/axios'
const requst = axios()

export function queryUserList(data) {
  return requst({
    url: `/ntier/api/ntier/eventInformation/getFeedBackInfoById/${data}`,
    method: 'GET'
  })
}

export function queryCitiesByPCode(data) {
  return requst({
    url: '/select/cities',
    method: 'POST',
    data: data
  })
}

export function getCityInfo(data) {
  return requst({
    url: '/baseInfo/api/cityInfo',
    method: 'GET',
    params: data
  })
}

export function getTableHeader(data) {
  return requst({
    url: '/tableHeader/getTableHeader',
    method: 'POST',
    data: data
  })
}

export function updateTableHeader(data) {
  return requst({
    url: '/tableHeader/updateTableHeader',
    method: 'POST',
    data: data
  })
}
