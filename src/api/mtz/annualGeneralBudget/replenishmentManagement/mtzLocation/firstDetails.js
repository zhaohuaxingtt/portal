/*
 * @Author: your name
 * @Date: 2021-11-08 10:29:55
 * @LastEditTime: 2021-11-08 15:25:30
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \front-portal\src\api\mtz\annualGeneralBudget\replenishmentManagement\mtzLocation\firstDetails.js
 */
import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_RFQ + '/web/mtz')
const requstDict = axios(process.env.VUE_APP_BASE_INFO + '/web/mtz')

export function page(parmars) {
  //定点申请单分页查询
  return requst({
    url: '/nominate-apps/page',
    method: 'POST',
    data: parmars
  })
}

export function selectDictByKeys(data) {
  //字典
  return requstDict({
    url: '/web/selectDictByKeys',
    method: 'GET',
    params: data
  })
}

export function getRfqPartList(parmars) {
  //引用RFQ中零件查询列表
  return requst({
    url: '/mtz/getRfqPartList',
    method: 'POST',
    data: parmars
  })
}

export function getRfqListsByRfqId(parmars) {
  //根据RFQ编号模糊查询RFQ分页列表
  return requst({
    url: '/mtz/getRfqListsByRfqId',
    method: 'POST',
    data: parmars
  })
}

export function getNomiAppPageList(parmars) {
  //根据RFQ编号模糊查询RFQ分页列表
  return requst({
    url: '/mtz/getNomiAppPageList',
    method: 'POST',
    data: parmars
  })
}

export function getApplicationPartPagedList(parmars) {
  //查询定点申请零件列表
  return requst({
    url: '/mtz/getApplicationPartPagedList',
    method: 'POST',
    data: parmars
  })
}
