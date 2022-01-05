/*
 * @Author: Zhangbin
 * @Date: 2021-04-19 17:50:00
 * @LastEditTime: 2022-01-05 16:48:15
 * @Description: 联系人与用户
 */
import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')
import store from '@/store'

export function saveContacts(parmars, type) {
  return requst({
    url: '/contacts',
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

export function saveUser(parmars, type) {
  return requst({
    url: '/user',
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

//
export function selectContacts(parmars, type) {
  return requst({
    url: `/contacts/list`,
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
//
export function selectUser(parmars, type) {
  return requst({
    url: `/user/list`,
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
//
export function deleteContacts(parmars, type) {
  return requst({
    url: `/contacts`,
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
//
export function deleteUser(parmars, type) {
  return requst({
    url: `/user`,
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
//
export function getCommitmentLetter(parmars, type) {
  return requst({
    url: `/commitmentLetter/getCommitmentLetter?letterType=${parmars}`,
    method: '',
    data: {
      ...parmars
    },
    baseURL:
      type < 4
        ? `${process.env.VUE_APP_SUPPLIER}/web/register`
        : `${process.env.VUE_APP_SUPPLIER}/web`
  })
}

export function freeze(parmars, type) {
  return requst({
    url: '/user/freeze',
    method: 'PUT',
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
export function unFreeze(parmars, type) {
  return requst({
    url: '/user/unfreeze',
    method: 'PUT',
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
//应用操作权限
export function appOperateAuth(params,type) {
    return requst({
      url: `/user/appOperateAuth`,
      method: 'POST',
      data: {
        ...params,
        supplierToken: store.state.home.valiCode
      },
      baseURL:
        type < 4
          ? `${process.env.VUE_APP_SUPPLIER}/web/register`
          : `${process.env.VUE_APP_SUPPLIER}/web`
    })
  }
