/*
 * @Author: your name
 * @Date: 2021-11-09 15:26:21
 * @LastEditTime: 2021-11-17 15:51:49
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \front-portal\src\store\module\location.js
 */
const location = {
  state: {
    locationNumber: 1,
    mtzObject: {},
    submitType: '',
    submitDataList: 0,
    disabled: localStorage.getItem('disabled') || false
  },
  actions: {
    setMtzChangeBtn({ commit }, data) {
      commit('SET_MTZ_CHANGE_DISABLED', data)
    }
  },
  mutations: {
    locationBtnChange: (state, data) => {
      state.locationNumber = data
    },
    routerMtzData: (state, data) => {
      state.mtzObject = data
    },
    submitBtnType: (state, data) => {
      state.submitType = data
    },
    submitDataNumber: (state, data) => {
      state.submitDataList = data
    },
    SET_MTZ_CHANGE_DISABLED(state, data) {
      state.disabled = data
      localStorage.setItem('disabled', data)
    }
  }
}
export default location
