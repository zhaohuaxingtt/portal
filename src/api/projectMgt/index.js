/*
 * @Author: Luoshuang
 * @Date: 2021-07-28 17:00:37
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-08-03 11:21:56
 * @Description: 项目管理相关接口
 * @FilePath: \front-portal\src\api\projectMgt\index.js
 */

import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_PROJECT)

// 获取默认配置
export function getDefaultConfig() {
  return requst({
    url: `/web/project-group-config/sys`,
    method: 'GET'
  })
}

// 保存默认配置
export function saveUpdateConfig(params) {
  return requst({
    url: `/web/project-group-config/sys`,
    method: 'POST',
    data: params
  })
}
