import axios from '@/utils/axios'
const request = axios(process.env.VUE_APP_MTZ)

///报表展示接口API
//MTZ报表年度品牌
export function  yearBrand(data){
  return request({
    url: '/web/mtz/forecastReport/yearBrand',
    method: 'POST',
    data: data
  })
}

//MTZ年度品牌
export  function  yearCardModel(data){
  return request({
    url:'/web/mtz/forecastReport/yearCarModel',
    method:'POST',
    data:data,
  })
}
//MTZ材料组
export function queryMtzMaterial(data) {
    return request({
      url: '/web/mtz/forecastOther/queryMtzMaterial',
      method: 'GET'
      // params: data
    })
  }

//材料中类
export function queryMaterialMedium(data) {
    return request({
      url: '/web/mtz/forecastOther/queryMaterialMedium',
      method: 'GET'
      // params: data
    })
  }

//年度预算-科室
export function yearBudgetDept(params) {
  return request({
    url: '/web/mtz/forecastReport/yearDept',
    method: 'POST',
    data: params
  })
}

//年月份-下拉
export function yearDropDown(data) {
  return request({
    url: `/web/mtz/forecastReport/yearDropDown?isMonth=${data}`,
    method: 'GET'
  })
}