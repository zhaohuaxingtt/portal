import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_APPROVAL)

export function queryFinishedApprovals(params, data) {
  return requst({
    url: `/web/taskInfo/findFinishedTask`,
    method: 'POST',
    params,
    data
  })
}

export function queryUndoApprovals(params, data) {
  return requst({
    url: `/web/taskInfo/findUndoTask`,
    method: 'POST',
    params,
    data
  })
}

export function completeApproval(data) {
  return requst({
    url: `/web/taskInfo/complete`,
    method: 'POST',
    data
  })
}

export function queryTaskOverview(data) {
  return requst({
    url: `web/taskInfo/statisticsWf`,
    method: 'POST',
    data
  })
}

export function queryModelTemplate(data) {
  return requst({
    url: `/web/dic/dictionary/findPage`,
    method: 'POST',
    data
  })
}

export function stageCompleteApproval(data) {
  return requst({
    url: `/web/taskInfo/stageComplete`,
    method: 'POST',
    data
  })
}

export function queryPanoramaLists(params) {
  return requst({
    url: '/web/history/getPanoramasByBusinessId',
    method: 'POST',
    params
  })
}
