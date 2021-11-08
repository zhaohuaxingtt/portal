import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_APPROVAL)
export function getApproval(params, data) {
  return requst({
    url: `/web/task/findTodoTask/${params.pageNum}/${params.pageSize}`,
    method: 'POST',
    data: data
  })
}

export function complete(data) {
  return requst({
    url: `/web/task/complate`,
    method: 'POST',
    data
  })
}

export function getInstImg(instanceId) {
  return requst({
    url: `/web/procInst/getInstImg/${instanceId}`,
    method: 'GET',
    responseType: 'blob'
  })
}

/**
 * 我的申请
 * @param {*} params
 * @param {*} data
 * @returns promise
 */
export function getMyApplication(params, data) {
  // /${params.pageNum}/${params.pageSize}
  return requst({
    url: `/web/procInst/getLaunchInstList/${params.pageNum}/${params.pageSize}`,
    method: 'POST',
    data
  })
}

/**
 * 撤销我的申请
 * @param {*} data
 * @returns promise
 */
export function recall(params) {
  // /${params.pageNum}/${params.pageSize}
  return requst({
    url: `/web/procInst/cancel`,
    method: 'Put',
    params
  })
}
/**
 * 审批详情
 * @param {*} params
 * @returns promise
 */
export function getApprovalDetail(instanceID) {
  return requst({
    url: `/web/procInst/getInstDetail/${instanceID}`
  })
}

export function getTaskDetail(taskId) {
  return requst({
    url: `/web/task/detail/${taskId}`
  })
}

/**
 * 流程模板
 */
export function queryTemplates(data) {
  return requst({
    url: `/web/activiti/service/modelList`,
    method: 'post',
    data
  })
}

export function queryTemplate(params) {
  return requst({
    url: `/web/activiti/service/model/${params.id}`
  })
}

export function deleteTemplate(data) {
  return requst({
    url: `/web/activiti/service`,
    method: 'delete',
    data
  })
}

export function createTemplate(data) {
  return requst({
    url: `/web/activiti/service`,
    method: 'post',
    data
  })
}

export function updateTemplate(formData) {
  return requst({
    url: `/web/activiti/service/model/updateModel`,
    method: 'put',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: formData
  })
}

export function queryFormUrls(data) {
  return requst({
    url: `/web/dic/dictionary/findPage`,
    data,
    method: 'post'
  })
}
