import axios from '@/utils/axios'
import axiosDownload from '@/utils/axios.download'

// 供应商管理网络请求模块
const requst = axios(process.env.VUE_APP_MATERIEL)
const requestDownload = axiosDownload(process.env.VUE_APP_MATERIEL)
const requstOrgLevel = axios(process.env.VUE_APP_BASE_INFO)

//产品家族列表
export function familyList(data) {
  return requst({
    url: `/web/productfamily`,
    method: 'GET',
    params: data
  })
}

//产品家族搜索车型名称
export function cartypeNameList(data) {
  return requst({
    url: `web/cartypeDict`,
    method: 'GET',
    params: data
  })
}

//产品家族车型列表
export function familyCarTypList(data) {
  return requst({
    url: `web/cartypePaged`,
    method: 'GET',
    params: data
  })
}

//产品类型类型列表
export function productTypeList(data) {
  return requstOrgLevel({
    url: `/web/selectDictByKeys?keys=product_family_product_type
        `,
    method: 'GET',
    params: data
  })
}

//产品家族导出
export function familyExport(data) {
  return requestDownload({
    url: `/web/productfamilyExcelExport`,
    method: 'POST',
    data: data
  })
}
