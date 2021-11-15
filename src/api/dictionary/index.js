/*
 * @Author: moxuan
 * @Date: 2021-03-18 17:07:22
 */

import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_BASE_INFO)
const requstSupplier = axios(process.env.VUE_APP_SUPPLIER)
// 数据字典
export function getDictByCode(code) {
  return requst({
    url: `/web/dict?code=${code}`,
    method: 'GET'
  })
}
// 常用数据字典信息列表查询批量查询
export function selectDictByKeys(params) {
  return requst({
    url: `/web/selectDictByKeys?${params}`,
    method: 'GET'
  })
}

// 部门基础信息
export function getDeptByDeptType(type) {
  return requst({
    url: `/web/dept?type=${type}`,
    method: 'GET'
  })
}
//城市信息查询
export function getCityInfo(params) {
  return requst({
    url: `/web/cityInfo`,
    method: 'GET',
    params
  })
}
//是否国外
export function isForeignCountry(params) {
    return requstSupplier({
      url: `/web/supplierInfo/isForeignCountry`,
      method: 'POST',
      data:params
    })
  }
  //是否黑名单
export function isBlack(params) {
    return requstSupplier({
      url: `/web/supplierInfo/isBlack`,
      method: 'POST',
      data:params
    })
  }
  

