// 获取指标信息数据
import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')

export function getIndicator(id) {
    return requst({
      url: '/indicatorLibrary/getIndicator/?indicatorId='+ id,
      method: 'GET',
    })
  }
  // 获取指标集合
export function getIndicatorList() {
    return requst({
      url: '/indicatorLibrary/getIndicatorList',
      method: 'GET',
    })
  }
  // 添加手工指标
  export function addIndicator(parmars) {
    return requst({
      url: '/indicatorLibrary/addIndicator',
      method: 'POST',
      data: parmars
    })
  }
   // 删除手工指标
   export function delIndicator(parmars) {
    return requst({
      url: '/indicatorLibrary/delIndicator',
      method: 'POST',
      data: parmars
    })
  }
   // 修改手工指标
   export function updateIndicator(parmars) {
    return requst({
      url: '/indicatorLibrary/updateIndicator',
      method: 'POST',
      data: parmars
    })
  }