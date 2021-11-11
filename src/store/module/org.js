/*
 * @Author: your name
 * @Date: 2021-04-26 14:07:51
 * @LastEditTime: 2021-04-28 20:51:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-supplier\src\store\module\home.js
 */


const state = {
  orgInfo: {
    parentId: "", //所属组织部门ID
    parentName: "",
    superDeptId: "", //上级部门id
    subDeptId: "", //下级部门id
    fullCode: "", //组织机构编码
    nameZh: "", //组织机构名称（中）
    nameEn: "", //组织机构名称（英）
    level: "", //组织级别
    svcdCode: "", //SVCD组织编码
    description: "", //组织描述
    tagList: [], //组织标签
    isVisible: "", //是否显示在组织树
    isCommodity: "", //是否为Commodity
    syncStatus: "", //是否同步svcd
    logoName:"",//部门logo名字
    supDeptList:[], //下级组织
    remark:null, //备注
  },
  table: {
    tableListData: [],
    extraData: {
      dimensionLeftMenu: [],
      dimensionRightMenu: [],
    },
  } //组织维度
}

const mutations = {
  SET_ORG_TAG(state, data) {
    console.log("===mutations",state.orgInfo)
    if (state.orgInfo) {
        // , tagList: data 
    //   state.orgInfo = { ...state.orgInfo}
    state.orgInfo = data;
    }
  },
  SET_ORG_INFO(state, data) {
    state.orgInfo = data
  },
  RESET_ORG_INFO(state) {
    state.orgInfo = null
  },
  SET_ORG_TABLE(state,data){
      state.table = data;
  }
}

const actions = {
  setOrgTag({ commit }, data) {
    commit('SET_ORG_TAG', data)
  },
  setOrgInfo({ commit }, data) {
    commit('SET_ORG_INFO', data)
  },
  resetOrgInfo({ commit }) {
    commit('RESET_ORG_INFO')
  },
}

export default {
  state,
  mutations,
  actions,
}
