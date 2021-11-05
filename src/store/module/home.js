/*
 * @Author: your name
 * @Date: 2021-04-26 14:07:51
 * @LastEditTime: 2021-04-28 20:51:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-supplier\src\store\module\home.js
 */
const state = {
  supplierBasicInfoDTO: {
    //供应商注册基本信息
    stepCode: 'register', //register : 注册 tempStore ： 暂存 submint :提交
    purchaserEmail: '', //采购员邮箱
    supplierType: '', //供应商类型
    purchaserName: '',
    valiCode: '', //验证码
    nameZh: '', //供应商简称中
    nameEn: '', //供应商简称英
    shortNameZh: '',
    shortNameEn: '',
    socialcreditNo: '', //社会信用代码
    dunsCode: ''
  },
  valiCode: '' //验证码
}

const mutations = {
  SET_BASE_INFO_LIST(state, data) {
    state.supplierBasicInfoDTO = data
  },
  SET_VALICODE(state, data) {
    state.valiCode = data
  }
}

const actions = {
  setBaseInfoList({ commit }, data) {
    commit('SET_BASE_INFO_LIST', data)
  },
  // 保存注册验证吗
  setValiCode({ commit }, data) {
    commit('SET_VALICODE', data)
  }
}

export default {
  state,
  mutations,
  actions
}
