import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_APPROVAL)
const requstUpload = axios(process.env.VUE_APP_FILEAPI+ '/fileud')

export function queryHistoryTask(params) {
  return requst({
    url: `/web/task/task/${params.instanceId}`,
    method: 'get'
  })
}

export function queryApprovalAttaches(data) {
  return requst({
    url: `/web/task/task/findAttaList`,
    method: 'POST',
    data: data
  })
}

export function saveApprovalAttach(data) {
  return requst({
    url: `/web/materials/saveAtta`,
    method: 'POST',
    data
  })
}

export function uploadApprovalAttach(data) {
  return requstUpload({
    url: `/udSingleFile`,
    method: 'POST',
    data
  })
}

export function deleteApprovalAttach(data) {
  return requst({
    url: `/web/task/task/attachment`,
    method: 'delete',
    data
  })
}

export function fetchTaskNodes(params) {
  return requst({
    url: `/web/materials/getAllUserTaskIds`,
    params
  })
}
