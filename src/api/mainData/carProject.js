import axios from '@/utils/axios'
import axiosDownload from '@/utils/axios.download'

// 供应商管理网络请求模块
const requst = axios(process.env.VUE_APP_MATERIEL)
const requestDownload = axiosDownload(process.env.VUE_APP_MATERIEL)
const requstOrgLevel = axios(process.env.VUE_APP_BASE_INFO)
const requstUserCenter = axios(process.env.VUE_APP_USER_CENTER)

/*

车型项目列表相关接口

*/

//车型项目列表
export function carProjectList(data) {
  return requst({
    url: `/web/cartypeProPaged`,
    method: 'GET',
    params: data
  })
}

//  2： 车型下拉数据字典    parts/web/cartypeDict                请求方式: GET
export function carProjectCarTypeList(data) {
  return requst({
    url: `/web/cartypeDict`,
    method: 'GET',
    params: data
  })
}

//车型项目详情  根据项目ID
export function carProjectDetail(data) {
  return requst({
    url: `/web/cartypeProByIdOrCode`,
    method: 'GET',
    params: data
  })
}

//  5： 批量设置车型项目有效    /parts/web/batchSetEffect               请求方式：POST
export function carProjectSetValidStatus(data) {
  return requst({
    url: `/web/batchSetEffect`,
    method: 'POST',
    data: data
  })
}

//车型项目发布状态
//  9： 发布状态数据字典  /baseinfo/web/selectDictByKeys?keys=cartype_pro_public_state&parentId=-1   请求方式：GET
export function carProjectReleaseStatusList(data) {
  return requstOrgLevel({
    url: `/web/selectDictByKeys?keys=cartype_pro_public_state`,
    method: 'GET',
    params: data
  })
}

//  8： 车型项目中文名称（下拉模糊查/parts/web/cartypeProDict               请求方式：GET
export function carProjectNameList(data) {
  return requst({
    url: `/web/cartypeProDict`,
    method: 'GET',
    params: data
  })
}

//车型
export function carProjectcarTypeList(data) {
  return requst({
    url: `/web/cartypeDict`,
    method: 'GET',
    params: data
  })
}

//发布状态数据字典
export function carProjectStatusList(data) {
  return requstOrgLevel({
    url: `/web/selectDictByKeys?keys=cartype_pro_public_state`,
    method: 'GET',
    params: data
  })
}

//导入车型项目产量计划
export function carProjectImport(data) {
  return requst({
    url: `/web/importCartypeProOutPlanByExcel`,
    method: 'POST',
    data: data
  })
}

//  4： 下载车型项目产量计划模板 /parts/web/downLoadCartypeProOutPutTemp           请求方式：POST
export function downloadCarProjectExcelTemplate(data) {
  return requestDownload({
    url: `/web/downLoadCartypeProOutPutTemp`,
    method: 'POST',
    data: data
  })
}

//车型项目列表导出
export function carProjectListExport(data) {
  return requestDownload({
    url: `/web/exportCartypePro`,
    method: 'POST',
    data: data
  })
}

/*

车型项目产量创建/编辑

*/

//通过车型项目ID获取
export function carProjectBaseInfo2222(data) {
  return requst({
    url: `/web/cartypeProByIdOrCode`,
    method: 'GET',
    params: data
  })
}

//  6： 车型项目信息创建  parts/web/cartypeProSave               请求方式：POST
export function carProjectCreateBaseInfo(data) {
  return requst({
    url: `/web/cartypeProSave`,
    method: 'POST',
    data: data
  })
}

//  7： 车型项目信息修改  parts/web/cartypeProUpdate              请求方式：PUT
export function carProjectUpdateBaseInfo(data) {
  return requst({
    url: `/web/cartypeProUpdate`,
    method: 'PUT',
    data: data
  })
}

//车型项目类型下拉 keys=TYPE_VEHICLE_PROJECT&parentId=-1
export function carTypeSelectOptions(data) {
  return requstOrgLevel({
    url: `/web/selectDictByKeys?keys=TYPE_VEHICLE_PROJECT`,
    method: 'GET',
    params: data
  })
}

//车型项目燃料类型 keys=cartype_fuel_type&parentId=-1
export function carTypeFuelSelectOptions(data) {
  return requstOrgLevel({
    url: `/web/selectDictByKeys?keys=cartype_fuel_type`,
    method: 'GET',
    params: data
  })
}

//生产工厂
export function procureFactorySelectOptions(data) {
  return requstOrgLevel({
    url: `/web/procureFactorySelectVo`,
    method: 'POST',
    data: data
  })
}

//通过用户ID获取用户信息数组
export function usersInfoList(data) {
  return requstUserCenter({
    url: `/web/users`,
    method: 'GET',
    params: data
  })
}

/*

车型项目PEP时间节点

*/

//根据车型项目id查询车型pep时间节点
export function carProjectPEPInfo(data) {
  return requst({
    url: `/web/pepNodeByCartTypeProId`,
    method: 'GET',
    params: data
  })
}

/*

车型项目配置

*/

//发动机类型数据字典查询
export function carProjectEngine(data) {
  return requst({
    url: `/web/engineSelect`,
    method: 'GET',
    params: data
  })
}

//变速箱数据字典查询
export function carProjectGearBox(data) {
  return requst({
    url: `/web/gearBoxSelect`,
    method: 'GET',
    params: data
  })
}

//电池容量数据字典查询
export function carProjectBattery(data) {
  return requst({
    url: `/web/batterySelect`,
    method: 'GET',
    params: data
  })
}

//车型等级数据字典查询 Felix
export function carProjectCarType(data) {
  return requst({
    url: `/web/carTypeLevelSelect`,
    method: 'GET',
    params: data
  })
}

/**************************************** 车型项目配置 *********************************/
// 车型项目配置版本列表
export function fetchCarTypeProConfigGroup(params) {
  return requst({
    url: `/web/carTypeProConfigGroup`,
    method: 'GET',
    params
  })
}

// 车型项目配置详情
export function fetchCartypeProConfigList(data) {
  return requst({
    url: `/web/cartypeProConfigList`,
    method: 'post',
    data
  })
}

// 车型项目配置保存
export function saveOrupdCarTypeProConfig(data) {
  return requst({
    url: `/web/saveOrupdCarTypeProConfig`,
    method: 'post',
    data
  })
}

// 设置有效，无效
export function updateCartypeProCfgVersionInfo(data) {
  return requst({
    url: `/web/updateCartypeProCfgVersionInfo`,
    method: 'post',
    data
  })
}

/**************************************** 车型项目 *******************************************/
//车型项目产量计划保存
export function saveCarProjectPlanVersion(data) {
  return requst({
    url: `/web/updCartypeProOutputPlanVersion`,
    method: 'POST',
    data
  })
}

// 保存车型产量计划详情
export function saveCarProjectPlanDetail(data) {
  return requst({
    url: `/web/saveOrUpdCartypeProOutputPlanVersion`,
    method: 'POST',
    data
  })
}

// 查询车型产量计划版本
export function fetchCarProjectPlanVersionList(data) {
  return requst({
    url: `/web/cartypeProOutputPlanVersionList`,
    method: 'POST',
    data
  })
}

// 查询车型产量计划明细
export function fetchCarProjectPlanDetail(params) {
  return requst({
    url: `/web/queryCartypeProOutputPlan`,
    params
  })
}

/************************************* 时间节点 **************************************/
// 查询时间节点
export function fetchPepDateNode(params) {
  return requst({
    url: `/web/pepNodeByCartTypeProId`,
    params
  })
}
// 保存时间节点
export function savePepDateNode(data) {
  return requst({
    url: `/web/saveOrUpdatePepNode`,
    method: 'post',
    data
  })
}
