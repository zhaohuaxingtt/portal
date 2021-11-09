import axios from '@/utils/axios'
import axiosDownload from '@/utils/axios.download'

const requst = axios(process.env.VUE_APP_MAIL)
const requestDownload = axiosDownload(process.env.VUE_APP_MAIL)

//获取消息列表数据
export function getMsgList(data) {
  return requst({
    url: '/template/getPage',
    method: 'POST',
    data: data
  })
}

//通过id查询列表
export function getMsgById(data) {
  return requst({
    url: '/template/getById',
    method: 'GET',
    params: data
  })
}

//通过code查询
export function getMsgByCode(data) {
  return requst({
    url: '/template/getTlpByCode',
    method: 'GET',
    params: data
  })
}
//单个删除
export function deleteItem(data) {
  return requst({
    url: '/template/delById',
    method: 'DELETE',
    params: data
  })
}

//批量删除
export function batchDeleteMsg(data) {
  return requst({
    url: '/template/batchDelById',
    method: 'POST',
    data: data
  })
}

//导出
export function exportMsg(data) {
  return requestDownload({
    url: '/template/export',
    method: 'POST',
    data: data
  })
}

//创建或更新Msg
export function createInforMgmt(data) {
  return requst({
    url: '/template/saveOrUpdate',
    method: 'POST',
    data: data
  })
}

//发布
export function publishInforMgmt(data) {
  return requst({
    url: '',
    method: 'POST',
    data: data
  })
}
