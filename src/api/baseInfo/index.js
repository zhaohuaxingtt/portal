/*
 * @Author: your name
 * @Date: 2021-08-10 14:33:59
 * @LastEditTime: 2021-08-19 14:41:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\api\baseInfo\index.js
 */
import axios from '@/utils/axios'
const request = axios(process.env.VUE_APP_BASE_INFO)

/***
 * @description 常用数据字典批量查询
 * @param {[string]} codes
 */
export function fetchSelectDicts(codes) {
  const data = codes.map((e) => {
    return { code: e, parentId: -1 }
  })
  return request({
    url: '/web/exactSelectDict',
    method: 'post',
    data
  })
}

/**
 * 投产工厂
 */
export function fetchProcureFactorySelectVo(params) {
  return request({
    url: '/web/queryProductionFactorySelectVo',
    params
  })
}

// 字典
export function fetchDict(data) {
  return request({
    url: '/web/exactSelectDict',
    method: 'post',
    data
  })
}
