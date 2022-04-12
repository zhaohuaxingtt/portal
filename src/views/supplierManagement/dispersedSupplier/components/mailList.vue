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
        <table-list :tableData="supplierData.contactsSaveDTO.list" :tableTitle="tableTitle"
                    :tableLoading="tableLoading" @handleSelectionChange="handleSelectionChange"
                    :index="true"
                    ref="commonTable"
                    border
        >
            <template slot="contactType" slot-scope="scope">
                <span v-if="scope.row.contactType">{{scope.row.contactType == "BUSINESS_CONTACTS"?'商务联系人':''}}</span>
            </template>
            <template slot="nameZh" slot-scope="scope">
                <iInput :placeholder="$t('LK_QINGSHURU')" v-model="scope.row.nameZh"></iInput>
            </template>
            <template slot="designation" slot-scope="scope">
                <iInput :placeholder="$t('LK_QINGSHURU')" v-model="scope.row.designation"></iInput>
            </template>
            <template slot="dept" slot-scope="scope">
                <iInput :placeholder="$t('LK_QINGSHURU')" v-model="scope.row.dept"></iInput>
            </template>
            <template slot="telephoneAreaCode" slot-scope="scope">
                <iInput :placeholder="$t('LK_QINGSHURU')" v-model="scope.row.telephoneAreaCode"></iInput>
            </template>
            <template slot="telephone" slot-scope="scope">
                <iInput :placeholder="$t('LK_QINGSHURU')" v-model="scope.row.telephone"></iInput>
            </template>
            <template slot="email" slot-scope="scope">
                <iInput :placeholder="$t('LK_QINGSHURU')" v-model="scope.row.email"></iInput>
            </template>
            <template slot="remark" slot-scope="scope">
                <iInput :placeholder="$t('LK_QINGSHURU')" v-model="scope.row.remark"></iInput>
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
                contactType:"BUSINESS_CONTACTS"
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