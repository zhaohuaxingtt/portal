const location = {
    state: {
        locationNumber: 1,
        mtzObject:{},
        submitType:"",
        submitDataList:0
    },
    actions: {},
    mutations: {
        locationBtnChange: (state,data) => {
            state.locationNumber = data;
        },
        routerMtzData:(state,data) => {
            state.mtzObject = data;
        },
        submitBtnType:(state,data) => {
            state.submitType = data;
        },
        submitDataNumber:(state,data) => {
            state.submitDataList = data;
        },
    }
}
export default location