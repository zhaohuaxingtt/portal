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
            options:{
                type:Array,
                default:() => []
            }
        },
        data() {
            return {
                loading:false
            }
        },
        methods: {
            remoteMethod(query) {
                console.log(query);
                if (query !== '') {
                this.loading = true;
                    // api
                    
                } 
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>