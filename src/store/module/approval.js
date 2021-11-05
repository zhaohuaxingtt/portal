const state = {
  todoNum: 0
}

const mutations = {
  SET_TODO_NUM(state, data) {
    state.todoNum = data
  }
}

const actions = {
  setApprovalTodoNum({ commit }, data) {
    commit('SET_TODO_NUM', data)
  }
}

export default {
  state,
  mutations,
  actions
}
