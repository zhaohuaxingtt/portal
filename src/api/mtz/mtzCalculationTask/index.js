import axios from '@/utils/axios'
const request = axios(process.env.VUE_APP_MTZ + '/web/mtz')

//分页查询MTZ补差计算离线任务
export function pageMtzCalcuLateTasks(data) {
    return request({
      url: '/calculation/pageMtzCalcuLateTasks',
      method: 'POST',
      data: data
    })
}

//采购员
export function getBuyers(data) {
    return request({
      url: '/calculation/getBuyers',
      method: 'POST',
      data: data
    })
}

//MTZ发起补差查询-全部冲销按钮
export function changeAll(data) {
  return request({
    url: '/mtzBalanceDetails/changeAll',
    method: 'POST',
    data: data
  })
}