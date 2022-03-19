/*
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-08-06 10:06:24
 * @LastEditors: Please set LastEditors
 * @Descripttion: your project
 */
/**
 * @Author: shujie
 * @createTime: 2021-6-28 10:43:43
 * @Description:报告清单
 */

import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_NTIER + '/web/ntier')
const requstAon = axios(process.env.VUE_APP_AON)
const requstDIC = axios(process.env.VUE_APP_BASE_INFO)

// 查询-供应链地图
export function supplierAddress(parmars) {
  return requst({
    url: '/nTier/supplierAddress',
    method: 'POST',
    data: parmars
  })
}

// 保存
export function nTierSave(parmars) {
  return requstAon({
    url: '/web/aon/nTier/nTierSave',
    method: 'POST',
    data: parmars
  })
}

// 用户材料组
export function userCategory(parmars) {
  return requst({
    url: '/nTier/userCategory',
    method: 'POST',
    data: parmars
  })
}

// 供应链卡片
export function nTierCard(parmars) {
  return requst({
    url: '/nTier/nTierCard',
    method: 'POST',
    data: parmars
  })
}

//城市信息查询
export function getCityInfo(params) {
  return requstDIC({
    url: `/web/cityInfo`,
    method: 'GET',
    params
  })
}
//查询范围内工厂
export function listFactoryByCircle(parmars) {
  return requst({
    url: `/ntierEventImpactFeedback/listFactoryByCircle`,
    method: 'POST',
    data: parmars
  })
}
//工厂名称下拉框
export function getBySupplierId(parmars) {
  return requst({
    url: `/ntierPlant/getBySupplierId/${parmars}`,
    method: 'GET'
  })
}

//查询散件供应商名称
// export function queryChainSupplier(parmars) {
//   return requst({
//     url: `/ntierSupplier/queryChainSupplier/${parmars}`,
//     method: 'GET'
//   })
// }

//零件号查询
export function selectChainPart(parmars) {
  return requst({
    url: `/ntierEventImpactFeedback/selectChainPart/`,
    method: 'POST',
    data: parmars
  })
}

// -------------

//N级供应链地图--列表
export function getNTierMap(parmars) {
  return requst({
    url: `/ntierMap/list`,
    method: 'POST',
    data: parmars
  })
}
//下拉列表--车型
export function listSelectCarModel(parmars) {
  return requst({
    url: `/ntierMap/listSelectCarModel`,
    method: 'POST',
    data: parmars
  })
}
//下拉列表--材料组
export function listSelectCategory(parmars) {
  return requst({
    url: `/ntierMap/listSelectCategory`,
    method: 'POST',
    data: parmars
  })
}
//下拉列表--零件
export function listSelectPart(parmars) {
  return requst({
    url: `/ntierMap/listSelectPart`,
    method: 'POST',
    data: parmars
  })
}
//下拉列表--供应商
export function listSelectSupplier(parmars) {
  return requst({
    url: `/ntierMap/listSelectSupplier`,
    method: 'POST',
    data: parmars
  })
}
//地图信息--高亮
export function getRetrieveChain(parmars) {
  return requst({
    url: `/ntierChain/retrieveChain`,
    method: 'POST',
    data: parmars
  })
}
//地图信息--供应链路供应商Tier零件信息查询
export function getChainPart(parmars) {
  return requst({
    url: `/ntierChain/chainPart`,
    method: 'POST',
    data: parmars
  })
}
//地图信息--评级信息
export function listFrameInfo(parmars) {
  return requst({
    url: `/ntierMap/listFrameInfo`,
    method: 'POST',
    data: parmars
  })
}
// 查询-大众工厂
export function querySvwFactory(parmars) {
  return requst({
    url: '/ntierChain/querySvwFactory',
    method: 'GET',
    data: parmars
  })
}
// 国家省市---三级联动
export const getCity = async () => {
  let areaList = []
  let res = await getCityInfo()
  // 筛选国家
  res.data.map((item) => {
    if (item.locationType === 'Nation') {
      areaList.push({
        value: item.cityNameCn,
        label: item.cityNameCn,
        cityId: item.cityId,
        children: []
      })
    }
  })
  // 筛选省
  res.data.forEach((item) => {
    areaList.forEach((val, index) => {
      if (
        item.locationType === 'Province' &&
        item.parentCityId === val.cityId
      ) {
        areaList[index].children.push({
          value: item.cityNameCn,
          label: item.cityNameCn,
          cityId: item.cityId,
          parentCityId: item.parentCityId,
          children: []
        })
      }
    })
  })
  // 筛选市
  res.data.forEach((item) => {
    areaList.forEach((val, j) => {
      val.children.forEach((i, index) => {
        if (item.locationType === 'City' && item.parentCityId === i.cityId) {
          areaList[j].children[index].children.push({
            value: item.cityNameCn,
            label: item.cityNameCn,
            cityId: item.cityId,
            parentCityId: item.parentCityId
          })
        }
      })
    })
  })
  // 删除空数组
  areaList.map((item) => {
    if (item.children.length) {
      item.children.map((val) => {
        if (item.children.length === 0) {
          delete val.children
        }
      })
    } else {
      delete item.children
    }
  })
  areaList
  areaList.map((item) => {
    return item.children && item.children
  })
  return areaList
}
