<template>
  <iCard :title="$t('SUPPLIER_GONGYINGSHANGTONGXUNLU')">
        <template slot="header-control">
            <!-- <iButton @click="exportsTable">
            {{ $t('delete') }}
            </iButton>
            <iButton @click="exportsTable">
            {{ $t('LK_DAOCHU') }}
            </iButton> -->
        </template>
        <table-list :tableData="tableListData" :tableTitle="tableTitle"
                    :tableLoading="tableLoading" @handleSelectionChange="handleSelectionChange"
                    :index="true"
                    ref="commonTable"
                    border
        >
            <template slot="contactType" slot-scope="scope">
                <span v-if="scope.row.contactType">{{scope.row.contactType}}</span>
                <iInput v-else :placeholder="$t('LK_QINGSHURU')" v-model="supplierData.contactsSaveDTO.list[0].contactType"></iInput>
            </template>
            <template slot="nameZh" slot-scope="scope">
                <span v-if="scope.row.nameZh">{{scope.row.nameZh}}</span>
                <iInput v-else :placeholder="$t('LK_QINGSHURU')" v-model="supplierData.contactsSaveDTO.list[0].nameZh"></iInput>
            </template>
            <template slot="designation" slot-scope="scope">
                <span v-if="scope.row.designation">{{scope.row.designation}}</span>
                <iInput v-else :placeholder="$t('LK_QINGSHURU')" v-model="supplierData.contactsSaveDTO.list[0].designation"></iInput>
            </template>
            <template slot="dept" slot-scope="scope">
                <span v-if="scope.row.dept">{{scope.row.dept}}</span>
                <iInput v-else :placeholder="$t('LK_QINGSHURU')" v-model="supplierData.contactsSaveDTO.list[0].dept"></iInput>
            </template>
            <template slot="telephoneAreaCode" slot-scope="scope">
                <span v-if="scope.row.telephoneAreaCode">{{scope.row.telephoneAreaCode}}</span>
                <iInput v-else :placeholder="$t('LK_QINGSHURU')" v-model="supplierData.contactsSaveDTO.list[0].telephoneAreaCode"></iInput>
            </template>
            <template slot="telephone" slot-scope="scope">
                <span v-if="scope.row.telephone">{{scope.row.telephone}}</span>
                <iInput v-else :placeholder="$t('LK_QINGSHURU')" v-model="supplierData.contactsSaveDTO.list[0].telephone"></iInput>
            </template>
            <template slot="email" slot-scope="scope">
                <span v-if="scope.row.email">{{scope.row.email}}</span>
                <iInput v-else :placeholder="$t('LK_QINGSHURU')" v-model="supplierData.contactsSaveDTO.list[0].email"></iInput>
            </template>
            <template slot="remark" slot-scope="scope">
                <span v-if="scope.row.remark">{{scope.row.remark}}</span>
                <iInput v-else :placeholder="$t('LK_QINGSHURU')" v-model="supplierData.contactsSaveDTO.list[0].remark"></iInput>
            </template>
        </table-list>
  </iCard>
</template>

<script>
import { iPage,iButton,iCard,iInput } from "rise";
import { tableTitle } from "./data"
import tableList from '@/components/commonTable'

export default {
    props:{
        supplierData:{
            type:Object,
            default:()=>{}
        }
    },
    components:{
        iCard,
        iButton,
        tableList,
        iInput
    },
    data(){
        return{
            tableListData:[{
                contactType:"商务联系人"
            }],
            tableTitle:tableTitle,
            tableLoading:false,
        }
    },
    created(){

    },
    methods:{
        exportsTable(){

        },
        handleSelectionChange(){

        },
        inputProps(){

        }
    }
}
</script>

<style>

</style>