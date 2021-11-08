/*
 * @Author: 舒杰
 * @Date: 2021-05-27 13:57:03
 * @LastEditTime: 2021-07-16 16:56:53
 * @LastEditors: 舒杰
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\api\frmRating\depthRating\industryAverage.js
 */
import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')

// 深评列表
export function depSupplierList(parmars) {
  return requst({
    url: '/depSupplier/page',
    method: 'POST',
    data: parmars
  })
}

// 均值行业类型数据
export function postAverageTypeList(parmars) {
  return requst({
    url: '/average/averageTypeList',
    method: 'POST',
    data: parmars
  })
}

// 各年度行业均值数据
export function postAverageData(parmars) {
  return requst({
    url: '/average/averageData',
    method: 'POST',
    data: parmars
  })
}

// 新建行业均值数据
export function postAddAverageData(parmars) {
  return requst({
    url: '/average/addAverageData',
    method: 'POST',
    data: parmars
  })
}

// 新建行业类型
export function postAddIndustryType(parmars) {
  return requst({
    url: '/average/addIndustryType',
    method: 'POST',
    data: parmars
  })
}
// 删除行业
export function postDelType(parmars) {
  return requst({
    url: `/average/industryType/${parmars}`,
    method: 'DELETE'
  })
}
