<!--
 * @Author: moxuan
 * @Date: 2021-04-13 17:30:36
 * @LastEditTime: 2022-03-03 17:04:51
 * @LastEditors: YoHo
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\ws3\generalPage\mainSubSuppliersAndProductNames\index.vue
-->
<template>
  <i-card>
    <div class="margin-bottom20 clearFloat">
      <div class="floatright">
        <i-button @click="exportsTable" v-if="$route.query.subSupplierType!=='GP'">{{ $t('LK_DAOCHU') }}</i-button>
        <i-button @click="exportsTable" v-permission="SUPPLIER_HISTORY_EXPORT_GP" v-if="$route.query.subSupplierType=='GP'">{{ $t('LK_DAOCHU') }}</i-button>
      </div>
    </div>
    <table-list
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        @handleSelectionChange="handleSelectionChange"
        :index="true"
        border
    >
      <template #contractCode="scope">
        <span class="open-link-text look-themen-click" @click="goGoGp(scope.row)">{{scope.row.contractCode}}</span>
      </template>
    </table-list>
    <!-- <iPagination
        @size-change="handleSizeChange($event, getTableList)"
        @current-change="handleCurrentChange($event, getTableList)"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :current-page="page.currPage"
        :total="page.totalCount"
        :layout="page.layout"
      >
    </iPagination> -->
  </i-card>
</template>

<script>
import {iCard, iButton,iPagination} from "rise";
import {generalPageMixins} from '@/views/generalPage/commonFunMixins'
import tableList from '@/components/commonTable'
import {projectDescriptionsTableTitle} from './data'
// import { pageMixins } from '@/utils/pageMixins'
import {queryGpSupplierCooperationRecord} from "@/api/supplier360/historicalCooperationRecord";
import base64 from '@/utils/base64'

export default {
  mixins: [
    generalPageMixins,
    // pageMixins
  ],
  components: {
    iCard,
    iButton,
    tableList,
    // iPagination
  },
  data() {
    return {
      tableListData: [],
      tableTitle: projectDescriptionsTableTitle,
      tableLoading: false,
      selectTableData: []
    }
  },
  created(){
    this.getTableList();
  },
  methods: {
    goGoGp(row){
      var id = window.btoa(row.contractId)
      window.open(`${process.env.VUE_APP_HOST}/gp-portal/#/contractDetail?contractCode=${row.contractCode}&id=${id}&contractStatus=${row.contractStatus}&contractType=AGREEMENT_PRICE&navType=true`)
    },
    getTableList(){
      console.log(this.$route.query);
      queryGpSupplierCooperationRecord(
          this.$route.query.subSupplierId | this.$route.query.supplierId
      ).then(res=>{
        console.log(res);
        this.tableListData = res.data;
      })
    },
  }
}
</script>

<style scoped lang="scss">
::v-deep .look-themen-click {
  cursor: pointer;
  color: #1763f7;
}
</style>