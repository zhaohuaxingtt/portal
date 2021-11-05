import axios from '@/utils/axios'
import axiosDownload from '@/utils/axios.download'

const requst = axios(process.env.VUE_APP_MAIL)
const requestDownload = axiosDownload(process.env.VUE_APP_MAIL)

//获取消息列表数据
export function fetchTemplates(data) {
  return requst({
    url: '/template/getPage',
    method: 'POST',
    data: data
  })
}

//通过id查询列表
export function fetchTemplateById(data) {
  return requst({
    url: '/template/getById',
    method: 'GET',
    params: data
  })
}

//通过code查询
export function fetchTemplateByCode(data) {
  return requst({
    url: '/template/getTlpByCode',
    method: 'GET',
    params: data
  })
}
//单个删除
export function deleteTemplate(params) {
  return requst({
    url: '/template/delById',
    method: 'DELETE',
    params
  })
}

//批量删除
export function batchDeleteTemplate(data) {
  return requst({
    url: '/template/batchDelById',
    method: 'POST',
    data
  })
}

//导出
export function exportTemplate(data) {
  return requestDownload({
    url: '/template/export',
    method: 'POST',
    data: data
  })
}

//创建或更新Msg
export function saveTemplate(data) {
  return requst({
    url: '/template/saveOrUpdate',
    method: 'POST',
    data: data
  })
}
