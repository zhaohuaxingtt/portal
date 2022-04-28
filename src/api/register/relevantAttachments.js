/*
 * @Author: moxuan
 * @Date: 2021-04-19 17:50:00
 * @LastEditTime: 2021-04-15 17:50:00
 * @LastEditors: moxuan
 * @Description: 联系人与用户
 */
import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')
import store from '@/store'

//附件上传
//查询-相关模板附件
export function getTemplateList(params) {
  return requst({
    url: `/attachment/templateList`,
    method: 'POST',
    data: {
      ...params,
      supplierToken: store.state.home.valiCode
    }
  })
}

//查询-相关模板附件
export function getTemplateListNew(params) {
  return requst({
    url: `/attachment/templateList`,
    method: 'POST',
    data: {
      ...params,
    }
  })
}

//获取承诺书详情-相关附件
export function getAttachmentCommitment(params) {
  return requst({
    url: `/attachment/commitment/${params.id}`,
    method: 'POST',
    data: {
      ...params,
      supplierToken: store.state.home.valiCode
    }
  })
}

//签署-相关附件
export function signatureAttachment(params) {
  return requst({
    url: `/attachment/signature`,
    method: 'POST',
    data: {
      ...params,
      supplierToken: store.state.home.valiCode
    }
  })
}

//保存相关附件
export function saveAttachment(params) {
  return requst({
    url: `/attachment/save`,
    method: 'POST',
    data: {
      ...params,
      supplierToken: store.state.home.valiCode
    }
  })
}

//保存相关附件
export function saveAttachmentNew(params) {
  return requst({
    url: `/attachment/save`,
    method: 'POST',
    data: {
      ...params,
    }
  })
}

//自由上传
//查询-相关模板附件
export function getFreeAttachmentList(params) {
  return requst({
    url: `/attachment/list`,
    method: 'POST',
    data: {
      ...params,
      supplierToken: store.state.home.valiCode
    }
  })
}

//删除-相关附件
export function deleteAttachment(params) {
  return requst({
    url: `/attachment`,
    method: 'DELETE',
    data: {
      ...params,
      supplierToken: store.state.home.valiCode
    }
  })
}
