/*
 * @Author: your name
 * @Date: 2021-04-26 14:07:51
 * @LastEditTime: 2021-08-11 17:21:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-supplier\src\store\module\home.js
 */
const state = {
  mainDataCarScrollData: null,
  mainDataQueryPlan: null,
  mainDataConfigEditMode: '',
  mainDataPlanEditMode: ''
}

const mutations = {
  TRIGGER_MAIN_DATA_CAR_SCROLL(state, data) {
    state.mainDataCarScrollData = { ...data }
  },
  TRIGGER_MAIN_DATA_QUERY_PLAN(state) {
    state.mainDataQueryPlan = new Date().getTime()
  },
  SET_CONFIG_EDIT_MODE(state, data) {
    state.mainDataConfigEditMode = data
  },
  SET_PLAN_EDIT_MODE(state, data) {
    state.mainDataPlanEditMode = data
  },
}

const actions = {
  triggerMainDataCarScroll({ commit }, data) {
    commit('TRIGGER_MAIN_DATA_CAR_SCROLL', data)
  },
  triggerMainDataQueryPlan({ commit }) {
    commit('TRIGGER_MAIN_DATA_QUERY_PLAN')
  },
  setMainDataConfigEditMode({ commit }, data) {
    commit('SET_CONFIG_EDIT_MODE', data)
  },
  setMainDataPlanEditMode({ commit }, data) {
    commit('SET_PLAN_EDIT_MODE', data)
  }
}

export default {
  state,
  mutations,
  actions
}
