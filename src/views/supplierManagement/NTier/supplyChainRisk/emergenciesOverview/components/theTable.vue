<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-21 10:18:28
 * @LastEditors: YoHo
 * @Descripttion: your project
-->
<template>
  <iCard>
    <div class="margin-bottom20 flex-between-center-center">
      <div class="title">
        {{language('TUFASHIJIANZONGLAN1','突发事件总览')}}
      </div>
      <!-- 创建突发事件-->
      <div>
        <iButton @click="handleCreate" v-permission="SUPPLIER_WORKBENCH_N_FENGXIAN_CJTFSJ">{{ language('CJTFSJ','创建突发事件') }}</iButton>
        <buttonTableSetting @click="$refs.tableListRef.openSetting()"></buttonTableSetting>
      </div>
    </div>
    <iTableCustom
      ref="tableListRef"
      :data="tableListData"
      :columns="tableTitle"
      :loading="tableLoading"
      @handle-selection-change="handleSelectionChange"
      @go-detail="handleEvent"
      @go-weather="goWeather"
    >
    </iTableCustom>

    <iPagination v-update
                 @size-change="handleSizeChange($event, getTableList)"
                 @current-change="handleCurrentChange($event, getTableList)"
                 background
                 :page-sizes="page.pageSizes"
                 :page-size="page.pageSize"
                 :layout="page.layout"
                 :current-page='page.currPage'
                 :total="page.totalCount" />
    <createEmergenciesDialog v-model="createEmergenciesDialog" v-if="createEmergenciesDialog" v-bind="$attrs" />
  </iCard>
</template>

<script>
import { iCard, iButton, iPagination, icon } from 'rise';
import tableList from '@/components/commonTable';
import buttonTableSetting from '@/components/buttonTableSetting';
import iTableCustom from '@/components/iTableCustom';
import { emergenciesTableTitle } from './data';
import { pageMixins } from '@/utils/pageMixins';
import resultMessageMixin from '@/mixins/resultMessageMixin';
import { generalPageMixins } from '@/views/generalPage/commonFunMixins'
import createEmergenciesDialog from "./createEmergenciesDialog";
import { eventInformation } from "@/api/supplierManagement/supplyChainRisk/index.js";
export default {
  mixins: [resultMessageMixin, pageMixins, generalPageMixins],
  components: {
    iCard,
    iButton,
    tableList,
    iPagination,
    icon,
    createEmergenciesDialog,
    iTableCustom,
    buttonTableSetting
  },
  data () {
    return {
      createEmergenciesDialog: false,
      tableListData: [],
      selectTableData: [],
      tableTitle: emergenciesTableTitle,
      tableLoading: false,
    };
  },
  created () {
    this.handleInit()
  },
  methods: {
    goWeather(){
      
    },
    // 进入分线地图
    handleEvent (row) {
      this.$router.push({ path: '/supplier/NTier/supplyChainRisk/map', query: { id: row.id } })
    },
    // 初始化
    handleInit (reqParams) {
      this.page.currPage = 1
      this.page.pageSize = 10
      this.getTableList()
    },
    // 请求数据
    async getTableList () {
      this.tableLoading = true;
      try {
        const req = {
          pageNo: this.page.currPage,
          pageSize: this.page.pageSize,
          ...this.$parent.$refs.theSearch.form,
        };
        const res = await eventInformation(req);
        if (res.result) {
          this.tableListData = res.data;

          // return;

          this.page.currPage = res.pageNum;
          this.page.pageSize = res.pageSize;
          this.page.totalCount = res.total || 0;
        }
        this.tableLoading = false;
      } catch {
        this.tableListData = [];
        this.tableLoading = false;
      }
    },
    handleSelectionChange (e) {
      this.selectTableData = e
    },
    handleCreate () {
      this.createEmergenciesDialog = true
    },
  },
};
</script>

<style lang='scss' scoped>
.openLinkText {
  color: $color-blue;
}
.title {
  font-size: 18px;
  font-weight: bold;
}
</style>