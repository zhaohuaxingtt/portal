import axios from '@/utils/axios'

// 供应商管理网络请求模块
const requst = axios(process.env.VUE_APP_USER_CENTER)

//通过ID获取供应商系统信息
export function sysDetail(data) {
  return requst({
    url: `/web/supplierUser/application/getDetailByParam`,
    method: 'POST',
    data: data
  })
}

//根据供应商用户id获取详情
export function userApplicationList(data) {
  return requst({
    url: `/web/supplierUser/getUserApplicationList`,
    method: 'GET',
    params: data
  })
}
