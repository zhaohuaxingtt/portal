const location = {
    state: {
        locationNumber: 1,
    },
    actions: {},
    mutations: {
        locationBtnChange: (state,data) => {
            state.locationNumber = data;
        }
    }
}
export default location