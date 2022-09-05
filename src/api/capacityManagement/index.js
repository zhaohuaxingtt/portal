import axios from '@/utils/axios'
const request = axios(process.env.VUE_APP_BKM)

// 产能维护任务查询
export function getUnfinishTaskList(data) {
  return request({
    url: '/web/maintain/getUnfinishTaskList',
    method: 'post',
    data
  })
}

// 单个供应商产能维护任务明细查询
export function getUnfinishTaskListBySupplier(data) {
  return request({
    url: '/web/maintain/getUnfinishTaskListBySupplier',
    method: 'post',
    data
  })
}

// 查询未发送报警信列表
export function pageNotSendAlarmLetter(data) {
  return request({
    url: '/web/alarm/pageNotSendAlarmLetter',
    method: 'post',
    data
  })
}