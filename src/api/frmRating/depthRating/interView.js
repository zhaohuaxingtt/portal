/**
 * @author: shujie
 * @createTime: 2021-5-26 17:39:32
 * @Description:访谈清单
 */
import axios from '@/utils/axios'
import download from '@/utils/axios.download'
const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')
const requstDownload = download(process.env.VUE_APP_SUPPLIER)
// 获取访谈清单
export function interviewMessage(parmars) {
  return requst({
    url: '/interview/message',
    method: 'POST',
    data: parmars
  })
}

// 保存访谈清单-基本信息
export function interviewInfo(parmars) {
  return requst({
    url: '/interview/info',
    method: 'POST',
    data: parmars
  })
}

// 访谈清单-导入
export function interviewExcel(parmars) {
  return requst({
    url: '/interview/excel',
    method: 'POST',
    data: parmars
  })
}

// 获取访谈清单-业务上下游
export function interviewUpDownMessage(parmars) {
  return requst({
    url: '/interviewUpDown/message',
    method: 'POST',
    data: parmars
  })
}

// 保存访谈清单-业务上下游
export function interviewUpDownInfo(parmars) {
  return requst({
    url: '/interviewUpDown/info',
    method: 'POST',
    data: parmars
  })
}
// 获取访谈清单-财务
export function interviewFinanceMessage(parmars) {
  return requst({
    url: '/interviewFinance/message',
    method: 'POST',
    data: parmars
  })
}

// 保存访谈清单-财务
export function interviewFinanceInfo(parmars) {
  return requst({
    url: '/interviewFinance/info',
    method: 'POST',
    data: parmars
  })
}

// 获取访谈清单-其他
export function interviewOtherMessage(parmars) {
  return requst({
    url: '/interviewOther/message',
    method: 'POST',
    data: parmars
  })
}

// 保存访谈清单-其他
export function interviewOtherInfo(parmars) {
  return requst({
    url: '/interviewOther/info',
    method: 'POST',
    data: parmars
  })
}

// 会议纪要生成并导出
export function meetingExport(parmars) {
  return requstDownload({
    url: '/meeting/export',
    method: 'POST',
    data: parmars
  })
}

// 下载访谈清单模板
export function interviewGlobal() {
  return requst({
    url: '/interview/global',
    method: 'GET'
  })
}
