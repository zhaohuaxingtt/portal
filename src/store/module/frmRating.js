const state = {
  addToPreliminaryReviewList: [],
};

const mutations = {
  SET_ADD_TO_PRELIMINARY_REVIEW_LIST(state, data) {
    state.addToPreliminaryReviewList = data;
  },
};

const actions = {
  setAddToPreliminaryReviewList({commit}, data) {
    commit('SET_ADD_TO_PRELIMINARY_REVIEW_LIST', data);
  },
};

export default {
  state,
  mutations,
  actions,
};
