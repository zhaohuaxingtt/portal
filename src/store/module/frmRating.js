/*
 * @Date: 2021-11-08 11:47:59
 * @LastEditors: caopeng
 * @LastEditTime: 2022-01-24 17:21:44
 * @FilePath: \front-portal-new\src\store\module\frmRating.js
 */
const state = {
  addToPreliminaryReviewList: [],
  trackFrequencyAgain:'',
  deepCommentRatingResults:''
};

const mutations = {
  SET_ADD_TO_PRELIMINARY_REVIEW_LIST(state, data) {
    state.addToPreliminaryReviewList = data;
  },
  SET_trackFrequencyAgain(state, data) {
    state.trackFrequencyAgain = data;
  },
  SET_deepCommentRatingResults(state, data) {
    state.deepCommentRatingResults = data;
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
