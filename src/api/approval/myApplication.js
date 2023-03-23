import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_APPROVAL)
const requst_sourcing = axios(process.env.VUE_APP_SOURCING)
export function queryApplications(params, data) {
  return requst({
    url: `/web/taskInfo/findLaunchInstList`,
    method: 'POST',
    params,
    data,
  })
}

export function queryWorkflowDetail(params) {
  return requst({
    url: `/web/taskInfo/getInstDetail`,
    params,
  })
}

export function getApprovalLoiFile(loinum) {
  return requst_sourcing({
    url: `/loi/getApprovalLoiFile/${loinum}`,
    method: 'POST',
  })
}

export function recall(params) {
  return requst({
    url: `/web/workflow/cancel`,
    method: 'Put',
    params,
  })
}
