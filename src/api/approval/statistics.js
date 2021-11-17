import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_APPROVAL)

export function queryApprovalOverview(data) {
  return requst({
    url: `/web/workflow/statisticsTodoWf`,
    method: 'POST',
    data,
    hideMessage: false,
    params: data
  })
}

export function queryApplyOverview(data) {
  return requst({
    url: `/web/workflow/statisticsLaunchWf`,
    method: 'POST',
    data,
    hideMessage: false,
    params: data
  })
}
