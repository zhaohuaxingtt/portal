<template>
  <div>
    <base-info-card class="margin-bottom20"/>
    <iCard tabCard>
      <template slot="header-control">
        <iButton v-permission="SUPPLIER_CAIGOUFENLEI_TABLE_ADD" @click="exportsTable" v-if="showExportsButton">
          {{ $t('LK_XINZENG') }}
        </iButton>
        <iButton v-permission="SUPPLIER_CAIGOUFENLEI_TABLE_DEL" @click="exportsTable" v-if="showExportsButton">
          {{ $t('delete') }}
        </iButton>
        <iButton v-permission="SUPPLIER_CAIGOUFENLEI_TABLE_SAVE" @click="exportsTable" v-if="showExportsButton">
          {{ $t('LK_DAOCHU') }}
        </iButton>
      </template>
<!--      v-permission="SUPPLIER_BAKN_TABLE"-->
      <table-list :tableData="tableListData" :tableTitle="tableTitle"
                  :tableLoading="tableLoading" @handleSelectionChange="handleSelectionChange" :input-props="inputProps"
                  :index="true"
                  ref="commonTable"
                  border
      >
      </table-list>
    </iCard>
  </div>
</template>

<script>
import baseInfoCard from '@/views/generalPage/components/baseInfoCard'
import tableList from '@/components/commonTable';
import { tableTitle } from "./data";
import { iButton,iCard } from "rise";

import { generalPageMixins } from '@/views/generalPage/commonFunMixins'

export default {
  mixins: [generalPageMixins],
  components: {
    baseInfoCard,
    tableList,
    iButton,
    iCard
  },
  data() {
    return {
        tableTitle,
        tableListData:[],
        tableLoading:false,
        inputProps:[],

    }
  },
  methods: {
    handleSelectionChange(val){

    },
  }
}
</script>

<style scoped>
</style>