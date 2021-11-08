/*
 * @Author: 舒杰
 * @Date: 2021-05-17 21:11:42
 * @LastEditTime: 2021-07-20 14:34:25
 * @LastEditors: 舒杰
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\store\module\baseInfo.js
 */
const state = {
    baseMsg: {
        supplierDTO: {
            nameZh:'',
            shortNameZh:'',
            socialcreditNo:'',
            nameEn:'',
            shortNameEn:'',
            dunsCode:'',
            sapCode:''
        },
        ppSupplierDTO: {
            svwTempCode:'',
            svwCode: '',
            vmCode:''
        },
        gpSupplierDTO: {
            svwTempCode:'',
            svwCode: '',
            vmCode:''
        }
	}
    // pageModel: {
    //     register: false,
    //     view: false
    // }
};

const mutations = {
    SET_BASE_INFO(state, data) {
        state.baseMsg = data
    },
    // SET_PAGE_MODEL_VIEW(state, data) {
    //     state.pageModel.view = data
    // },
};

const actions = {
    setBaseInfo({commit}, data) {
        commit('SET_BASE_INFO', data)
    },
//     setPageModelView({commit}, data) {
//         commit('SET_PAGE_MODEL_VIEW', data)
//     },
}

export default {
    state,
    mutations,
    actions
}