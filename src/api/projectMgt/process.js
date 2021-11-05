/*
 * @Author: haojiang
 * @Date: 2021-08-26 11:06:24
 * @LastEditTime: 2021-08-27 09:07:56
 * @LastEditors: Please set LastEditors
 * @Description: 项目管理-项目进度监控接口
 * @FilePath: /front-web/src/api/project/process.js
 */

import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_PROJECT)

// 项目进度监控-获取
export function getDelayGradeConfig(params) {
  return requst({
    url: '/web/delay-grade-config',
    method: 'GET',
    params
  })
}

// 项目进度监控-获取
export function saveDelayGradeConfig(data) {
  return requst({
    url: '/web/delay-grade-config/delayGrade',
    method: 'POST',
    data
  })
}
