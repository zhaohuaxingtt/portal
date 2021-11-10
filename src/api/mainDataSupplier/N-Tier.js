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

//获取详情列表信息
export function getDetailTableList(data) {
  return request({
    url: '',
    method: '',
    data
  })
}

//删除详情列表Item
export function delDetailListItem(data) {
  return request({
    url: '',
    method: '',
    data
  })
}

//详情页根据ID查询Dialog信息
export function getDetailDialogById(data) {
  return request({
    url: '',
    method: '',
    data
  })
}
