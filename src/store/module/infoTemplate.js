import { getTempList } from '@/api/info/template'
const subPosition = {
  state: () => ({
    templateList: [],
    listSelected: [],
    query: {
      current: 1,
      size: 10
    }
  }),
  mutations: {
    SET_TEMPLIST: (state, data) => {
      state.templateList = data
    }
  },
  actions: {
    async GetInfoTempList({ commit }) {
      const query = this.state.infoTemplate.query
      const res = await getTempList(query)
      if (res?.code === '200' && res?.data) {
        commit('SET_TEMPLIST', res.data || [])
      }
    }
  }
}
export default subPosition
