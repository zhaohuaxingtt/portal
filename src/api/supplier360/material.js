/*
 * @Author: moxuan
 * @Date: 2021-04-19 17:50:00
 * @LastEditors: Please set LastEditors
 * @Description: 联系人与用户
 */
import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')
import store from '@/store'

// 材料组分页查询
export function getPageMaterialGroup(parmars) {
  return requst({
    url: `/materialGroup/pageMaterialGroup`,
    method: 'POST',
    data: {
      ...parmars,
      supplierToken: store.state.home.valiCode
    }
  })
}

// 受控记录分页查询
export function getPageControlRecord(parmars) {
  return requst({
    url: `/materialGroup/pageControlRecord`,
    method: 'POST',
    data: {
      ...parmars,
      supplierToken: store.state.home.valiCode
    }
  })
}
// 材料组受控
export function addControl(parmars) {
  return requst({
    url: `/materialGroup/control`,
    method: 'PUT',
    data: {
      ...parmars,
      supplierToken: store.state.home.valiCode
    }
  })
}

// 编辑受控原因
export function updateControl(parmars) {
  return requst({
    url: `/materialGroup/updateControl`,
    method: 'PUT',
    data: {
      ...parmars,
      supplierToken: store.state.home.valiCode
    }
  })
}
// 取消受控
export function updateUncontrol(parmars) {
  return requst({
    url: `/materialGroup/uncontrol`,
    method: 'PUT',
    data: {
      ...parmars,
      supplierToken: store.state.home.valiCode
    }
  })
}
// 移除BDL
export function updateAssociated(parmars) {
  return requst({
    url: `/materialGroup/cancel/associated`,
    method: 'PUT',
    data: {
      ...parmars,
      supplierToken: store.state.home.valiCode
    }
  })
}
// 移除MBDL
export function mbdlCancelAssociated(parmars) {
  return requst({
    url: `/materialGroup/materials/mbdlCancelAssociated`,
    method: 'POST',
    data: {
      ...parmars,
      supplierToken: store.state.home.valiCode
    }
  })
}
//   ----不用了
export function getStuffMaterials(parmars) {
  return requst({
    url: `/bdl/stuffMaterials/pageSupplierStuffMaterialGroup`,
    method: 'POST',
    data: {
      ...parmars
    }
  })
}
//
export function getPageStuffMaterialGroup(parmars) {
  return requst({
    url: `/bdl/stuffMaterials/pageStuffMaterialGroup`,
    method: 'POST',
    data: {
      ...parmars
    }
  })
}
//
export function submitBdl(parmars) {
  return requst({
    url: `/bdl/submitBdl`,
    method: 'POST',
    data: {
      ...parmars
    }
  })
}
//
export function getDeptList() {
  return requst({
    url: `/bdl/stuffMaterials/getDeptList`,
    method: 'GET'
  })
}
//
export function getUserList(parmars) {
  return requst({
    url: `/bdl/stuffMaterials/getUserList/${parmars.id}/${parmars.deptNum}`,
    method: 'GET'
  })
}
export function getPreDeptList(parmars) {
  return requst({
    url: `/bdl/stuffMaterials/getPreDeptList`,
    method: 'POST',
    data: parmars
  })
}
//
export function getPreUserList(parmars) {
  return requst({
    url: `/bdl/stuffMaterials/getPreUserList`,
    method: 'POST',
    data: parmars
  })
}
