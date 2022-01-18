import axios from '@/utils/axios'
import axiosFile from '@/utils/axios.download'
const request = axios(process.env.VUE_APP_MTZ)
const donwload = axiosFile(process.env.VUE_APP_MTZ)

///报表展示接口API
//MTZ报表年度品牌
export function  yearBrand(data){
  return request({
    url: '/web/mtz/forecastReport/yearBrand',
    method: 'POST',
    data: data
  })
}

//MTZ年度车型
export  function  yearCardModel(data){
  return request({
    url:'/web/mtz/forecastReport/yearCarModel',
    method:'POST',
    data:data,
  })
}
//MTZ 车型下拉
export function  cardList(){
  return request({
    url:'/web/mtz/forecastReport/carModelDropDown',
    method:'POST'
  })
}

//MTZ车型6位号下来
export  function  carSixCodeDropDown(carModel){
  return request({
    url:'/web/mtz/forecastReport/carSixCodeDropDown',
    method:'POST',
    params:carModel
  })
}
//MTZ车型明细
export  function carModelDetail(data){
  return request({
    url:'/web/mtz/forecastReport/yearCarModelDetail',
    method:'POST',
    data:data
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
export function yearDropDown(data=false) {
  return request({
    url: `/web/mtz/forecastReport/yearDropDown?isMonth=${data}`,
    method: 'GET'
  })
}


//比较版本下拉框数据
export function getVersionData(data) {
  return request({
    url: `/web/mtz/ReportBasicData/getVersionData?forecastType=${data}`,
    method: 'GET'
  })
}

//含月份-下拉
export function yearMonthDropDown(data=true) {
  return request({
    url: `/web/mtz/forecastReport/yearDropDown?isMonth=${data}`,
    method: 'GET'
  })
}

//差异原因分析
export function differenceAnalysis(params) {
  return request({
    url: '/web/mtz/forecastReport/differenceAnalysis',
    method: 'POST',
    data: params
  })
}

//⻋型预算⽉度跟踪
export function differenceAnalysisCarModel(params) {
  return request({
    url: '/web/mtz/forecastReport/differenceAnalysisCarModel',
    method: 'POST',
    data: params
  })
}

//差异原因分析-导出
export function differenceAnalysisExport(params) {
  return donwload({
    url: '/web/mtz/forecastReport/differenceAnalysisExport',
    method: 'POST',
    data: params
  })
}

//⻋型⽉度预算跟踪-导出
export function differenceAnalysisCarModelExport(params) {
  return donwload({
    url: '/web/mtz/forecastReport/differenceAnalysisCarModelExport',
    method: 'POST',
    data: params
  })
}

//车型导出
export function yearCarModelExport(params) {
  return request({
    url: "/web/mtz/forecastReport/yearCarModelExport",
    method: "POST",
    responseType: 'blob',
    data: params
  })
}