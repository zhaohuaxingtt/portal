/*
 * @Author: moxuan
 * @Date: 2021-04-26 20:50:00
 * @Description: 初步评级-供应商初评情况
 */
import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')

//初步评级-打分明细表头
export function getMessageBase(params) {
  return requst({
    url: `/initComment/getMessageBase`,
    method: 'POST',
    data: {
      ...params
    }
  })
}

//初步评级-打分明细分页
export function getResultDetail(params) {
  return requst({
    url: `/initComment/getResultDetail`,
    method: 'POST',
    data: {
      ...params
    }
  })
}

//初步评级-风险信号
export function getPageListRiskSignalComment(params) {
  return requst({
    url: `/riskSignal/pageListRiskSignalComment`,
    method: 'POST',
    data: {
      ...params
    }
  })
}
