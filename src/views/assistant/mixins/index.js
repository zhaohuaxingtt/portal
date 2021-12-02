export default {
    methods: {
        getUserType(){
            return this.$store.state.permission.userInfo.userType == 1 ? "inner" : "supplier";
        }
    },
}