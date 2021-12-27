/*
 * @Author: your name
 * @Date: 2021-08-19 14:17:51
 * @LastEditTime: 2021-08-19 14:18:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\api\search\index.js
 */
import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_SEARCH)

export function elasticSearch(data) {
  return requst({
    url: '/elastic/search',
    method: 'POST',
    data
  })
}

//搜索下拉
export function selectionSearch(data){
  return requst({
    url:'/searchService/listSearchType',
    method:'POST',
    data
  })
}

//全文检索
export function fullTextSearch(data){
  return requst({
    url:'/searchService/search',
    method:'POST',
    data
  })
}
