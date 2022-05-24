/*
 * @Author: your name
 * @Date: 2021-03-18 20:15:17
 * @LastEditTime: 2021-08-12 10:58:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\api\usercenter\index.js
 */
import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_USER_CENTER)

export function purchaseUsers(parmars) {
  return requst({
    url: '/api/purchaseUsers',
    method: 'GET',
    params: parmars
  })
}
//根据用户id查询相关用户列表
export function getUserIdListTree(data) {
  return requst({
    url: `/api/sapUser/getUserIdListTree`,
    method: 'post',
    data
  })
}

export function getGraderIdByDept(deptNUm) {
  return requst({
    url: `/api/raters?deptNUm=${deptNUm}`,
    method: 'GET'
  })
}

export function getSystemMeun() {
  return requst({
    url: '/api/userPermission',
    method: 'GET'
  })
}

//模拟登陆接口，返回token
export function login(data) {
  return requst({
    url: '/web/login',
    method: 'post',
    data: data
  })
}

export function getUserInfoByToken() {
  return requst({
    url: '/web/getUserInfoByToken',
    method: 'GET'
  })
}

export function getPageListByParams(data) {
  return requst({
    url: '/web/dept/pageList',
    method: 'post',
    data
  })
}
export function getDeptDropDownList(data) {
  return requst({
    url: '/web/dept/dropDownList',
    method: 'post',
    data
  })
}
//根据股长查询采购员
export function getPurchaseUsers(parmars) {
  return requst({
    url: '/api/purchaseUsers',
    method: 'GET',
    params: parmars
  })
}

export function sendKey(data) {
  return requst({
    url: 'http://10.122.18.136:8088/i18n/addTranslationMap',
    method: 'POST',
    data: {
      cliant: 'protal',
      dataList: data
    }
  })
}

export function fetchPermissionList(data) {
  return requst({
    url: '/api/permission/list',
    method: 'POST',
    data: data
  })
}

export function fetchUserListMemery(data) {
  return requst({
    url: '/web/getUserListMemory',
    method: 'POST',
    data
  })
}

// 获取CS下属的R1/R2部门
export function getDeptByCondition(data) {
  return requst({
    url: `/web/dept/getSubDeptListByParam`,
    method: 'post',
    data
  })
}

// 切换岗位
export function switchPosition(data) {
  return requst({
    url: `/web/switchPosition`,
    method: 'post',
    data
  })
}
