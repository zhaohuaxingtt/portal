/*
 * @Author: moxuan
 * @Date: 2021-04-19 17:50:00
 * @LastEditors: zbin
 * @Description: 联系人与用户
 */
import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')
import store from '@/store'

export function selectFinance(parmars, type) {
  return requst({
    url: `/finance/list`,
    method: 'POST',
    data: {
      supplierToken: store.state.home.valiCode,
      ...parmars,
    },
    baseURL:
      type < 4
        ? `${process.env.VUE_APP_SUPPLIER}/web/register`
        : `${process.env.VUE_APP_SUPPLIER}/web`
  })
}

export function deleteFinance(parmars, type) {
  return requst({
    url: `/finance`,
    method: 'DELETE',
    data: {
      ...parmars,
      supplierToken: store.state.home.valiCode
    },
    baseURL:
      type < 4
        ? `${process.env.VUE_APP_SUPPLIER}/web/register`
        : `${process.env.VUE_APP_SUPPLIER}/web`
  })
}

export function saveFinance(parmars, type) {
  return requst({
    url: `/finance`,
    method: 'POST',
    data: {
      ...parmars,
      supplierToken: store.state.home.valiCode
    },
    baseURL:
      type < 4
        ? `${process.env.VUE_APP_SUPPLIER}/web/register`
        : `${process.env.VUE_APP_SUPPLIER}/web`
  })
}

export function uploadFinance(parmars, type) {
  return requst({
    url: `/financeAttach`,
    method: 'POST',
    data: {
      ...parmars,
      supplierToken: store.state.home.valiCode
    },
    baseURL:
      type < 4
        ? `${process.env.VUE_APP_SUPPLIER}/web/register`
        : `${process.env.VUE_APP_SUPPLIER}/web`
  })
}
// 分页查询
export function financeFieldDisplayList(parmars, type) {
  return requst({
    url: `/financeFieldDisplay/list`,
    method: 'POST',
    data: {
      ...parmars,
      supplierToken: store.state.home.valiCode
    },
    baseURL:
      type < 4
        ? `${process.env.VUE_APP_SUPPLIER}/web/register`
        : `${process.env.VUE_APP_SUPPLIER}/web`
  })
}
// 弹框保存
export function financeFieldDisplaySave(parmars, type) {
  return requst({
    url: `/financeFieldDisplay`,
    method: 'POST',
    data: {
      ...parmars,
      supplierToken: store.state.home.valiCode
    },
    baseURL:
      type < 4
        ? `${process.env.VUE_APP_SUPPLIER}/web/register`
        : `${process.env.VUE_APP_SUPPLIER}/web`
  })
}
// 供应商准入评级查询-财务数据
export function getRatingList(parmars, type) {
  return requst({
    url: `/finance/ratingList`,
    method: 'POST',
    data: {
      ...parmars
    },
    baseURL:
      type < 4
        ? `${process.env.VUE_APP_SUPPLIER}/web/register`
        : `${process.env.VUE_APP_SUPPLIER}/web`
  })
}
//  获取外部评级按钮
export function externalRating(parmars) {
  return requst({
    url: `/finance/externalRating`,
    method: 'POST',
    data: {
      ...parmars
    }
  })
}
