const state = {
  todoNum: 0,
  switchData:{
    id:"",
    bool:false,
    coordinate:""
  }
}

const mutations = {
  SET_TODO_NUM(state, data) {
    state.todoNum = data
  },
  SET_SWITCH(state, data) {
    state.switchData = data
  }
}

const actions = {
  setApprovalTodoNum({ commit }, data) {
    commit('SET_TODO_NUM', data)
  },
  setSwitch({ commit }, data) {
    commit('SET_SWITCH', data)
  }
}

export default {
  state,
  mutations,
  actions
}
