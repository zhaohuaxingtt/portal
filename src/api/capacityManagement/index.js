import axios from '@/utils/axios'
const request = axios(process.env.VUE_APP_BKM)
const ntier = axios(process.env.VUE_APP_NTIER)

// 产能维护任务科室查询
export function getTaskDepartmentList() {
  return request({
    url: '/web/maintain/getTaskDepartmentList',
    method: 'post',
  })
}

// 产能维护任务查询
export function getUnfinishTaskList(data) {
  return request({
    url: '/web/maintain/getUnfinishTaskList',
    method: 'post',
    data
  })
}

// 产能维护任务批量导出
export function exportTaskList(data) {
  return request({
    url: '/web/maintain/exportTaskList',
    method: 'post',
    responseType: 'blob',
    data
  })
}

// 获取加密bkaNo
export function encodeBkaId(params) {
  return request({
    url: '/web/maintain/encodeBkaId',
    method: 'post',
    params
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

// 查询待反馈报警信列表
export function pageNotSendAlarmLetter(data) {
  return request({
    url: '/web/alarm/pageNotSendAlarmLetter',
    method: 'post',
    data
  })
}

// 待反馈报警信列表排序
export function setAlarmLetterOrder(data) {
  return request({
    url: '/web/alarm/setAlarmLetterOrder',
    method: 'post',
    data
  })
}

// 查询已发送报警信列表
export function getWarningLetterInfoPage(data) {
  return ntier({
    url: '/web/warningLetterInfo/page',
    method: 'post',
    data
  })
}

// 查询报警信详情
export function getWarningLetterInfoDetail(id) {
  return ntier({
    url: `/web/warningLetterInfo/detail/${id}`,
    method: 'get',
  })
}

// 关闭报警信
export function closeAlarmLetter(data) {
  return ntier({
    url: '/web/warningLetterInfo/closeAlarmLetter',
    method: 'post',
    data
  })
}

// 提交报警信
export function submitAlarmLetter(data) {
  return ntier({
    url: '/web/warningLetterInfo/submit',
    method: 'post',
    data
  })
}

// 设置报警信任务排序
export function setWarningLetterInfoAlarmLetterOrder(data) {
  return ntier({
    url: '/web/warningLetterInfo/setAlarmLetterOrder',
    method: 'post',
    data
  })
}


