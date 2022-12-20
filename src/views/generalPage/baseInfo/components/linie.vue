<!--
 * @Author: 余继鹏 917955345@qq.com
 * @Date: 2022-07-01 14:20:34
 * @LastEditors: 余继鹏 917955345@qq.com
 * @LastEditTime: 2022-11-30 19:49:40
 * @FilePath: \front-portal\src\views\generalPage\baseInfo\components\linie.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <iCard :title="$t('CAIGOUYUANXINXI')" collapse>
        <table-list
            :tableData="supplierData"
            :tableTitle="tableTitle"
            :tableLoading="tableLoading"
            @handleSelectionChange="handleSelectionChange"
            ref="commonTable"
            :selection="false"
        >
            <template #businessBuyerEmail="scope">
                <span v-if="scope.row.industryPosition=='Y'">{{scope.row.businessBuyerEmail | hiddenEmail}}</span>
                <iInput v-else v-model="scope.row.businessBuyerEmail" @change="chioseEamil($event,scope.row)"></iInput>
            </template>
            <template #businessBuyerNum="scope">
                <span v-if="scope.row.industryPosition=='Y'">{{scope.row.businessBuyerNum}}</span>
                <iInput v-else v-model="scope.row.businessBuyerNum"></iInput>
            </template>
            <template #businessBuyerDept="scope">
                <span v-if="scope.row.industryPosition=='Y'">{{scope.row.businessBuyerDept}}</span>
                <iInput v-else v-model="scope.row.businessBuyerDept"></iInput>
            </template>
            <template #businessContactEmail="scope">
                <iInput v-model="scope.row.businessContactEmail"></iInput>
            </template>
            <template #businessContactUser="scope">
                <iInput v-model="scope.row.businessContactUser"></iInput>
            </template>
        </table-list>
    </iCard>
</template>

<script>
import { iCard,iInput } from "rise";
import tableList from './table'
import { tableTitle } from './data'
import { getUserInfo } from "@/api/register/home"
import { desensitizationEmail } from "@/utils";
export default {
    props:{
        supplierData:{
            type: Array,
            default: () => []
        }
    },
    components:{
        iCard,
        tableList,
        iInput
    },
    data(){
        return{
            tableTitle:tableTitle,
            tableLoading:false,
        }
    },
    created(){
        
    },
    methods:{
        handleSelectionChange(e){
            this.tableListData = e;
        },
        chioseEamil(val,data){
            if(val){
                getUserInfo({
                    purchaserEmail: val
                }).then(res=>{
                    data.businessBuyerName = res.data.nameZh;
                    data.businessBuyerNum = res.data.userNum;
                    data.businessBuyerDept = res.data.purchaserSection;
                })
            }else{
                data.businessBuyerName = "";
                data.businessBuyerNum = "";
                data.businessBuyerDept = "";
            };
        }
    },
    filters:{
        hiddenEmail(val){
            return desensitizationEmail(val)
        }
    }
}
</script>

<style scoped lang="scss">
::v-deep .el-form-item{
    margin:0!important;
}

::v-deep .el-table .el-table__row .el-input{
    width:100%!important;
}
</style>