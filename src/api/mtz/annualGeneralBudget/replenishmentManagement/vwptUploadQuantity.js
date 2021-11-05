/*
 * @Author: 莫旋
 * @Description: VWPT上传数量
 */
import axios from '@/utils/axios'

const request = axios(process.env.VUE_APP_MTZ + '/web/mtz')

//贵金属市场价分页查询
export function getTableList(params) {
  return request({
    url: '/mtzVwpt/page',
    method: 'POST',
    data: params
  })
}

//下载模板
export function getTemplateUrl() {
  return request({
    url: '/mtzVwpt/templateUrl',
    method: 'GET'
  })
}

//上传附件
export function uploadAttach(params) {
  return request({
    url: '/mtzVwpt/readExcel',
    method: 'POST',
    data: params
  })
}
