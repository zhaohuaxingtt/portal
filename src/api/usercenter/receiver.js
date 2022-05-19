import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_USER_CENTER)
// 通过id查询收件人
export function getPageListByParam(data) {
  return requst({
    url: `/api/sapUser/getPageListByParam`,
    method: 'POST',
    data
  })
}
//批量获取用户信息
export function getUsers(params) {
  let str = ''
  let url = `/api/users`
  if (params.userIdList && params.userIdList.length > 0) {
    params.userIdList.filter((item)=>item).forEach((item, index) => {
      if (index === 0) {
        str += `?userIdList=${item}`
      } else {
        str += `&userIdList=${item}`
      }
    })
  }
  return requst({
    url: url + str,
    method: 'GET'
  })
}
//获取单个用户信息
export function getUser(params) {
  return requst({
    url: `/api/user`,
    method: 'POST',
    params
  })
}

export function getListByParam(data) {
  return requst({
    url: `/api/sapUser/getListByParam`,
    method: 'POST',
    data
  })
}
