<!--
 * @Author: youyuan
 * @Date: 2021-09-01 10:24:03
 * @LastEditTime: 2021-09-22 11:19:03
 * @LastEditors: Please set LastEditors
 * @Description: chang log
 * @FilePath: \重庆软维科技\front-portal\src\views\mtz\annualGeneralBudgetLeader\annualBudget\components\changLog.vue
-->
<template>
  <div>
    <iDialog :title="language('CHANGLOG', 'Change Log')" :visible.sync="value" width="80%" @close='closeDiolog'>
      <div class="dialogBox">
        <div class="searchBox">
          <el-form :inline="true" :model="searchForm" label-position="top" class="demo-form-inline">
            <el-form-item :label="language('YONGLIANGBANBEN', '用量版本')">
              <iSelect v-model="searchForm.level">
                <el-option value="">{{language('QUANBU', '全部')}}</el-option>
              </iSelect>
            </el-form-item>
            <el-form-item :label="language('YUSUANNIANFEN', '预算年份')">
              <iDatePicker v-model="searchForm.year" type="year"></iDatePicker>
            </el-form-item>
            <el-form-item class="searchButton">
              <iButton @click="handleSubmitSearch">{{language('QR', '确认')}}</iButton>
              <iButton @click="handleSearchReset">{{language('CZ', '重置')}}</iButton>
            </el-form-item>
          </el-form>
        </div>
        <el-divider class="margin-top20"></el-divider>
        <div class="contentBox">
          <div class="tableOptionBox">
            <p class="tableTitle">{{language('XIANGQINGLIEBIAO', '详情列表')}}  </p>
          </div>
          <tableList
            class="margin-top20"
            :tableData="tableListData"
            :tableTitle="changeLogTitle"
            :tableLoading="loading"
            :index="true">
          </tableList>
          <iPagination
            v-update
            @size-change="handleSizeChange($event, getTableData)"
            @current-change="handleCurrentChange($event, getTableData)"
            background
            :page-sizes="page.pageSizes"
            :page-size="page.pageSize"
            :layout="page.layout"
            :current-page='page.currPage'
            :total="page.totalCount"/>
        </div>
      </div>
    </iDialog>
  </div>
</template>

<script>
import { iDialog, iSelect, iDatePicker, iButton, iSearch, iPagination } from 'rise'
import { pageMixins } from '@/utils/pageMixins';
import { changeLogTitle } from './data'
import { fetchChangeLogPage } from '@/api/mtz/annualGeneralBudget/annualBudget'
import tableList from '@/components/commonTable/index.vue'
export default {
  mixins: [pageMixins],
  components: {
    iDialog,
    iSelect,
    iDatePicker,
    iButton,
    iSearch,
    iPagination,
    tableList
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {
      changeLogTitle,
      searchForm: {},
      tableListData: [],
      loading: false,
    }
  },
  created() {
    this.getTableData()
  },
  methods: {
    // 关闭弹窗
    closeDiolog() {
      this.$emit('closeDiolog')
    },
    // 获取表格数据
    getTableData() {
      const params = {
        extendFields:{
          pageNo: this.page.currPage,
          pageSize: this.page.pageSize,
          type:"",
          creator:"",
          bizId:"MEK0000001"
        }
      }
      fetchChangeLogPage(params).then(res => {
        console.log('res', res);
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.searchBox {
  .searchButton {
    margin-top: 50px;
    float: right;
    z-index: 100;
  }
}
.contentBox {
  margin-top: 48px;
  padding-bottom: 30px;
  .tableOptionBox {
    .tableTitle {
      display: inline;
      font-weight: bold;
      font-size: 16px;
      color: #000;
      margin: 0 10px;
    }
    button {
      float: right;
      z-index: 100;
      margin-bottom: 20px;
    }
  }
}
 
</style>
