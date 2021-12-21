<template>
   <el-select
        v-model="value"
        multiple
        filterable
        remote
        reserve-keyword
        :placeholder="placeholder"
        style="width: 100%;"
        :remote-method="remoteMethod"
        :loading="loading">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
    </el-select>
</template>

<script>
    export default {
        props:{
            value:{},
            placeholder:{
                type:String,
                default:"请输入关键字"
            },
        },
        data() {
            return {
                value:"",
                loading:false,
                options:[]
            }
        },
        methods: {
            remoteMethod(query) {
                if (query !== '') {
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                    this.options = [{label:1,value:2}]
                }, 200);
                } 
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>