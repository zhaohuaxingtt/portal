/*
 * @Author: moxuan
 * @Date: 2021-05-04 17:50:00
 * @LastEditors: moxuan
 * @Description: 任务
 */
import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')

// 任务详情
export function getTaskDetails(parmars) {
  return requst({
    url: `/task/details`,
    method: 'POST',
    data: {
      ...parmars
    }
  })
}

// 任务处理
export function handleTaskInfo(parmars) {
  return requst({
    url: `/task/info`,
    method: 'POST',
    data: {
      ...parmars
    }
  })
}

// 任务处理
export function gpAdminRegularAppro(parmars) {
  return requst({
    url: `/task/gpAdminRegularAppro`,
    method: 'POST',
    data: {
      ...parmars
    }
  })
}

//变更申请任务详情
export function getTaskDetailsChangeInfo(parmars) {
  return requst({
    url: `/task/detailsChange`,
    method: 'POST',
    data: {
      ...parmars
    }
  })
}
