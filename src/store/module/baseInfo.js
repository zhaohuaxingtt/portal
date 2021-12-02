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
	},
    currPageFlag: false,
    originalModuleId: ''
    // pageModel: {
    //     register: false,
    //     view: false
    // }
};

const mutations = {
    SET_BASE_INFO(state, data) {
        state.baseMsg = data
    },
    SET_CURRPAGE_FLAG(state, data) {
        state.currPageFlag = data
    },
    SET_ORIGINAL_MODULE_ID(state, data) {
        state.originalModuleId = data
    }
    // SET_PAGE_MODEL_VIEW(state, data) {
    //     state.pageModel.view = data
    // },
};

const actions = {
    setBaseInfo({commit}, data) {
        commit('SET_BASE_INFO', data)
    },
    setCurrPageFlag({commit}, data) {
        commit('SET_CURRPAGE_FLAG', data)
    },
    setOriginalModuleId({commit}, data) {
        commit('SET_ORIGINAL_MODULE_ID', data)
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