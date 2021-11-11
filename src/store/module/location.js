const location = {
    state: {
        locationNumber: 1,
        mtzObject:{}
    },
    actions: {},
    mutations: {
        locationBtnChange: (state,data) => {
            state.locationNumber = data;
        },
        routerMtzData:(state,data) => {
            state.mtzObject = data;
        }
    }
}
export default location