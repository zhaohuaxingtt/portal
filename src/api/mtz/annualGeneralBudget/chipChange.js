import axios from '@/utils/axios'
const requestChip = axios(process.env.VUE_APP_MTZ + '/web/chip')

//申请状态下拉
export function getLocationApplyStatus(params) {
  return requestChip({
    url: '/change/getLocationApplyStatus',
    method: 'POST',
    data: params
  })
}
// 删除审批附件
export function deleteFile(data) {
  return requestChip({
    url: '/change/approval/deleteFile',
    method: 'POST',
    data
  })
}

// 查询审批附件
export function getApprovalByChangeId(changeId) {
  return requestChip({
    url: `/change/approval/list/${changeId}`,
    method: 'POST',
  })
}

// 上传审批附件
export function uploadApproval(changeId, fileId) {
  return requestChip({
    url: `/change/approval/upload/${changeId}/${fileId}`,
    method: 'POST',
  })
}

// 删除变更单
export function deleteApproval(data) {
  return requestChip({
    url: `/change/delete`,
    method: 'POST',
    data
  })
}

// 获取单个定点申请单
export function getDetailById(id) {
  return requestChip({
    url: `/change/detail/${id}`,
    method: 'POST',
  })
}

// 新增变更规则
export function addRule(params,data) {
  return requestChip({
    url: '/change/detail/add',
    method: 'POST',
    params,
    data
  })
}
// 删除变更规则
export function deleteDetail(data) {
  return requestChip({
    url: `/change/detail/delete`,
    method: 'POST',
    data
  })
}

// 导出变更规则附件
export function exportDetail(changeId) {
  return requestChip({
    url: `/change/detail/export/${changeId}`,
    method: 'POST',
    responseType: 'blob'
  })
}
// 上传变更单附件
export function uploadDetail(changeId, data) {
  return requestChip({
    url: `/change/detail/upload/${changeId}`,
    method: 'POST',
    data
  })
}
// 新增变更申请单初始化
export function initData(data) {
  return requestChip({
    url: '/change/init',
    method: 'POST',
    data
  })
}

// 查询变更单
export function getPageList(data) {
  return requestChip({
    url: '/change/getChangeList',
    method: 'POST',
    data: data
  })
}

// 撤回
export function recall(data, params) {
  return requestChip({
    url: '/change/recall',
    method: 'POST',
    data,
    params,
  })
}
// 保存变更单
export function save(data) {
  return requestChip({
    url: '/change/save',
    method: 'POST',
    data
  })
}
// 提价变更单
export function submit(params) {
  return requestChip({
    url: '/change/submit',
    method: 'POST',
    params
  })
}

// 查询审批记录
export function approvalRecordList(params) {
  return requestChip({
    url: '/approvalRecordList',
    method: 'POST',
    params
  })
}