/*
 * @Author: your name
 * @Date: 2021-11-09 15:26:18
 * @LastEditTime: 2022-01-19 17:38:05
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \front-portal\src\api\frmRating\depthRating\depthReport.js
 */
/**
 * @author: shujie
 * @createTime: 2021-5-26 17:39:32
 * @Description:深评报告
 */
import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')

// 深评报告企业概况查询
export function getCompanyOverview(id, lang) {
  return requst({
    url:
      '/deepCommentReport/companyOverview?deepCommentSupplierId=' +
      id +
      `&lang=${lang ? 'en' : 'zh'}`,
    method: 'GET'
  })
}

// 深评报告企业概况保存
export function postCompanyOverview(parmars) {
  return requst({
    url: '/deepCommentReport/companyOverview',
    method: 'POST',
    data: parmars
  })
}

// 发起审批
export function postExamine(parmars) {
  return requst({
    url: '/deepCommentReport/examine',
    method: 'POST',
    data: parmars
  })
}

// 深评报告财务分析查询
export function getFinancialAnalysis(id, lang) {
  return requst({
    url:
      '/deepCommentReport/financialAnalysis?deepCommentSupplierId=' +
      id +
      `&lang=${lang ? 'en' : 'zh'}`,
    method: 'GET'
  })
}

// 深评报告企业概况保存
export function postFinancialAnalysis(parmars) {
  return requst({
    url: '/deepCommentReport/financialAnalysis',
    method: 'POST',
    data: parmars
  })
}

// 深评报告综述查询
export function getSummarize(id, lang) {
  return requst({
    url:
      '/deepCommentReport/summarize?deepCommentSupplierId=' +
      id +
      `&lang=`+lang,
    method: 'GET'
  })
}

// 深评报告综述保存
export function postSummarize(parmars) {
  return requst({
    url: '/deepCommentReport/summarize',
    method: 'POST',
    data: parmars
  })
}
