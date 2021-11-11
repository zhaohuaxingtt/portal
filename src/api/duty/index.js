import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_RISEDASHBOARD)
// 任务中心
export function getDutyStatistics(data) {
  return requst({
    url: `/taskCenterCount`,
    method: 'POST',
    data
  })
}
// 任务管理列表
export function findUndoTask(data) {
  return requst({
    url: `/web/duty/findUndoTask`,
    method: 'POST',
    data
  })
}
// 任务转派
export function transferTask(targetUserId, taskId) {
  return requst({
    url: `/web/duty/transfer?targetUserId=${targetUserId}&taskId=${taskId}`,
    method: 'PUT',
    // data
  })
}
// 提交任务
export function submitTask(data) {
  return requst({
    url: `/web/duty/submit`,
    method: 'POST',
    data
  })
}
// 完成任务
export function completeTask(taskId) {
  return requst({
    url: `/web/duty/complete/${taskId}`,
    method: 'POST'
  })
}