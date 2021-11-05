/*
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-27 15:58:15
 * @LastEditors: zbin
 * @Descripttion:风险信号
 */
import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')

//查询
export function getRiskSignal(parmars) {
  return requst({
    url: `/riskSignal/page`,
    method: 'POST',
    data: {
      ...parmars
    }
  })
}
//查询
export function getDetail(parmars) {
  return requst({
    url: `/riskSignal/detail`,
    method: 'POST',
    data: {
      ...parmars
    }
  })
}
//查询弹框
export function getPageRiskSupplier(parmars) {
  return requst({
    url: `/riskSignal/pageRiskSupplier`,
    method: 'POST',
    data: {
      ...parmars
    }
  })
}
//提交
export function submit(parmars) {
  return requst({
    url: `/riskSignal/submit`,
    method: 'POST',
    data: {
      ...parmars
    }
  })
}
//暂存
export function temporaryStorage(parmars) {
  return requst({
    url: `/riskSignal/temporaryStorage`,
    method: 'POST',
    data: {
      ...parmars
    }
  })
}
//删除
export function riskDelete(parmars) {
  return requst({
    url: `/riskSignal/delete`,
    method: 'POST',
    data: {
      ...parmars
    }
  })
}
