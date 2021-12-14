import axios from '@/utils/axios'
import axiosDownload from '@/utils/axios.download'

const request = axios(process.env.VUE_APP_NTIER + '/web/ntier')
const requestDownload = axiosDownload(process.env.VUE_APP_NTIER + '/web/ntier')

//分页查询
export function getTablePage(data) {
  return request({
    url: '/ntierSupplier/list/page',
    method: 'POST',
    data
  })
}

//删除N-TierItem
export function delNTierItems(data) {
  return request({
    url: `/ntierSupplier/del/${data}`,
    method: 'POST'
  })
}

//导出N-Tier的EXCEL
export function exportNTExcel(data) {
  return requestDownload({
    url: '/ntierSupplier/list/export',
    method: 'POST',
    data
  })
}

//获取详情基本信息
export function getBasicDetailById(data) {
  return request({
    url: `/ntierSupplier/detail/${data}`,
    method: 'GET'
  })
}

//保存详情基本信息
export function saveBasicDetail(data) {
  return request({
    url: `/ntierSupplier/update/${data.id}`,
    method: 'POST',
    data
  })
}

// 获取供应商工厂信息
export function queryFactoryById(params) {
  return request({
    url: `/web/ntier/ntierPlant/getBySupplierId/${params.supplierId}`
  })
}

// 报错供应商工厂信息
export function saveFactoryById(data) {
  return request({
    url: `/web/ntier/ntierPlant/save`,
    method: 'post',
    data
  })
}
