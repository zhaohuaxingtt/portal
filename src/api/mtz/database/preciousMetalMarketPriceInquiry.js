/*
 * @Author: your name
 * @Date: 2021-11-09 15:26:19
 * @LastEditTime: 2021-12-09 21:02:57
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \front-portal\src\api\mtz\database\preciousMetalMarketPriceInquiry.js
 */
/*
 * @Author: 莫旋
 * @Description: 贵金属市场价查询
 */
import axios from '@/utils/axios'
import axiosDownload from '@/utils/axios.download'

const request = axios(process.env.VUE_APP_MTZ + '/web/mtz')
const requestDownload = axiosDownload(process.env.VUE_APP_MTZ + '/web/mtz')
const requestDownFile = axios(process.env.VUE_APP_FILEAPI + '/fileud')

//贵金属市场价分页查询
export function getTableList(params) {
  return request({
    url: '/preciousMetalsPrice/page',
    method: 'POST',
    data: params
  })
}

//根据id下载模板
export function fileudUdDown(params) {
  return requestDownFile({
    url: `/udDown?fileIds=${params}`,
    method: 'POST',
    // data: params,
    responseType: 'blob'
  })
}

//下载模板id
export function getTemplateUrl() {
  return request({
    url: '/preciousMetalsPrice/templateUrl',
    method: 'GET'
  })
}

//导出
export function handleExport(params) {
  return requestDownload({
    url: '/preciousMetalsPrice/export',
    method: 'POST',
    data: params
  })
}

//删除附件
export function deleteAttach(params) {
  return request({
    url: '/preciousMetalsPrice/deleteAttach',
    method: 'POST',
    data: params
  })
}

//保存贵金属市场价
export function saveAndUpdate(params) {
  return request({
    url: '/preciousMetalsPrice/saveAndUpdate',
    method: 'POST',
    data: params
  })
}

//上传附件
export function uploadAttach(params) {
  return request({
    url: '/preciousMetalsPrice/uploadAttach',
    method: 'POST',
    data: params
  })
}

//上传点价单
export function uploadOrder(params) {
  return request({
    url: '/preciousMetalsPrice/upload',
    method: 'POST',
    data: params
  })
}
