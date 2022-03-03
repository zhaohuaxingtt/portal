import axios from "@/utils/axios"

const requst = axios(process.env.VUE_APP_SOURCING)

// 获取预设规则列表数据
export function getNominateRulesList(params) {
  return requst({
    url: '/typeRules/findNominateTypeRulesPage',
    method: "GET",
    params: params
  })
}

// 删除预设规则
export function deleteNominateRules(params) {
  return requst({
    url: '/typeRules/delNominateTypeRules',
    method: 'POST',
    data: params
  })
}

// 添加或更新预设规则
export function addNominateRules(params) {
  return requst({
    url: '/typeRules/addNominateTypeRules',
    method: 'POST',
    data: params
  })
}

// 获取燃料类型列表
export function findFuelTypeList(partTermType) {
  return requst({
    url: '/typeRules/findFuelTypeList?partTermType='+partTermType,
    method: 'GET'
  })
}