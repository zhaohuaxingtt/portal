import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_APPROVAL)

export function queryApprovalOverview(params) {
  return requst({
    url: `web/workflow/statisticsTodoWf`,
    method: 'POST',
    params,
    hideMessage: false
  })
}

export function queryApplyOverview(params) {
  return requst({
    url: `web/workflow/statisticsLaunchWf`,
    method: 'POST',
    params,
    hideMessage: false
  })
}
