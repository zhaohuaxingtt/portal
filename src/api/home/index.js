import axios from '@/utils/axios'
const request = axios()
const requestAON = axios(process.env.VUE_APP_AON + '/web')
const requestUSER = axios(process.env.VUE_APP_USER_CENTER)
const requestApproval = axios(process.env.VUE_APP_APPROVAL)
const requestSup = axios(process.env.VUE_APP_SUPPLIER + '/web')
const requestBASE = axios(process.env.VUE_APP_BASE_INFO)
const requesClearMeeting = axios(process.env.VUE_APP_MEETING)
const requestEKL = axios(process.env.VUE_APP_EKL)
const requestRate = axios(process.env.VUE_APP_CHANGEPRICE)
const requestNews = axios(process.env.VUE_APP_NEWS)
export function getApprovalList(params) {
  return requestApproval({
    url: '/web/workflow/statisticsDashboardWf',
    method: 'POST',
    params,
    hideMessage: false
  })
}

export function getModuleList(params) {
  return requestUSER({
    url: '/web/home/module/list',
    method: 'POST',
    data: params
  })
}

export function updateModules(params) {
  return requestUSER({
    url: '/web/home/module/update',
    method: 'POST',
    data: params
  })
}

export function updateBatchModules(data) {
  return requestUSER({
    url: '/web/home/module/updateBatch',
    method: 'POST',
    data
  })
}

export function getVpAnalysisDataList(params) {
  return requestAON({
    url: '/aon/vpAnalysisScheme/selectTopList',
    method: 'POST',
    data: params
  })
}

export function getSponserData(params) {
  return requestSup({
    url: '/initComment/queryTotal',
    method: 'POST',
    data: params
  })
}

export function getKpiCates(params) {
  return requestSup({
    url: '/kpi/totalScore/template/dept',
    method: 'GET',
    param: params
  })
}

// 获取获取状态跟踪报表
export function powerBiService() {
  // return requestRFQ({
  //   url: `/overview/powerBiService`,
  //   method: 'GET'
  // })
  return requestUSER({
    url: `/web/home/module/sourcing`,
    method: 'GET'
  })
}

//Volume Pricing零件分析
export function getAnalysisProcessing(params) {
  return requestAON({
    url: '/aon/vpAnalysisScheme/analysisProcessing',
    method: 'POST',
    data: params
  })
}

export function getModules(params) {
  return request({
    url: '/dashboard/list',
    method: 'POST',
    data: params
  })
}
// export function getSchedule(data,id) {
//   return requesClearMeeting({
//     url: `/rise-meeting/meetingService/findMeetingSchedulesByUser?userId=${id}`,
//     method: 'POST',
//     data,
//   })
// }
export function getSchedule(data, id) {
  return requesClearMeeting({
    url: `/meetingService/findMeetingSchedulesByUser?userId=${id}`,
    method: 'POST',
    data
  })
}
/* 获取周末及法定节假日API */
export function queryCalendar(data) {
  return requestBASE({
    url: '/web/queryCalendar',
    method: 'post',
    data: data
  })
}
/* EKL卡片 */
export function getEkl(data) {
  return requestEKL({
    url: '/spEklreportEntity/getCardAll',
    method: 'post',
    data
  })
}
/* 新闻卡片 */
export function getNewsList(data, id) {
  return requestNews({
    url: `/newsQueryService/getNewList?userId=${id}`,
    method: 'post',
    data
  })
}
/*配件供货率卡片 */
export function getRate() {
  return requestRate({
    url: `/web/edi-web/getSupplyRate`,
    method: 'post'
  })
}
