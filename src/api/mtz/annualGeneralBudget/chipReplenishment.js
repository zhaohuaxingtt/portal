/*
 * @Author: youyuan
 * @Date: 2021-09-09 14:02:54
 * @LastEditTime: 2023-01-16 17:32:38
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: 年度预算编辑
 * @FilePath: \front-portal\src\api\mtz\annualGeneralBudget\chipReplenishmentOverview.js
 */
import axios from '@/utils/axios'
const request = axios(process.env.VUE_APP_MTZ + '/web/chip')
const requestChip = axios(process.env.VUE_APP_MTZ + '/web/balance')
// 获取一次件供应商
export function getSupplierByuser(params) {
  return request({
    url: '/common/getSupplierByUser',
    method: 'POST',
    data: params
  })
}

// 计算补差
export function calculate(params) {
  return requestChip({
    url: '/calculate',
    method: 'POST',
    params
  })
}

// 芯片一次性补差定时任务-调试
export function chipBalanceJob(params) {
  return requestChip({
    url: '/chipBalanceJob',
    method: 'POST',
    data: params
  })
}

// 获取单个补差单
export function findBalanceById(params) {
  return requestChip({
    url: '/findBalanceById',
    method: 'POST',
    data: params
  })
}

// 初始化补差单
export function initbalance(params) {
  return requestChip({
    url: '/initbalance',
    method: 'POST',
    data: params
  })
}

// 保存补差单
export function saveBalance(params) {
  return requestChip({
    url: '/saveBalance',
    method: 'POST',
    data: params
  })
}

// 更新补差单
export function updateBalance(params) {
  return requestChip({
    url: '/updateBalance',
    method: 'POST',
    data: params
  })
}

// 补差任务分页查询
export function findCalculateTaskByPage(params) {
  return requestChip({
    url: '/findCalculateTaskByPage',
    method: 'POST',
    data: params
  })
}
