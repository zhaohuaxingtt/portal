<template>
  <iCard :title="$t('SUPPLIER_GONGYINGSHANGXINGMING')">
        <template slot="header-control">
            <iButton @click="exportsTable">
            {{ $t('SUPPLIER_DONGJIE') }}
            </iButton>
            <iButton @click="exportsTable">
            {{ $t('SUPPLIER_JIEDONG') }}
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
import { tableTitleUser } from "./data"
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
            tableTitle:tableTitleUser,
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