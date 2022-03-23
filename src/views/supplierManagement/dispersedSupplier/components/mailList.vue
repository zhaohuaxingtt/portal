<template>
  <iCard :title="$t('SUPPLIER_GONGYINGSHANGTONGXUNLU')">
        <template slot="header-control">
            <iButton @click="exportsTable">
            {{ $t('delete') }}
            </iButton>
            <iButton @click="exportsTable">
            {{ $t('LK_DAOCHU') }}
            </iButton>
        </template>
        <table-list :tableData="tableListData" :tableTitle="tableTitle"
                    :tableLoading="tableLoading" @handleSelectionChange="handleSelectionChange"
                    :index="true"
                    ref="commonTable"
                    border
        >
        </table-list>
  </iCard>
</template>

<script>
import { iPage,iButton,iCard,iFormGroup,iFormItem,iLabel,iInput,iSelect } from "rise";
import { tableTitle } from "./data"
import tableList from '@/components/commonTable'

export default {
    components:{
        iCard,
        iButton,
        tableList
    },
    data(){
        return{
            tableListData:[],
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