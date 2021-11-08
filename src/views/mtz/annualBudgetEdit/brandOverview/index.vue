<!--
 * @Author: youyuan
 * @Date: 2021-09-03 16:33:28
 * @LastEditTime: 2021-10-21 16:35:00
 * @LastEditors: Please set LastEditors
 * @Description: 年度预算编辑-品牌总览
 * @FilePath: \重庆软维科技\front-portal\src\views\mtz\annualBudgetEdit\buyerOverview\index.vue
-->
<template>
  <iCard>
    <div class="contentBox">
      <div class="tableOptionBox">
        <p class="tableTitle">{{language('CSYSZJEBWMH', '初始预算总金额（百万元）：')}} {{money(params.initPrice)}} </p>
        <p class="tableTitle">{{language('TZHYSZJEBWMH', '调整后预算总金额（百万元）：')}} {{money(params.adjustTotal)}} </p>
        <p class="tableTitle">{{language('XISHUMAOHAO', '系数：')}} {{ratio(money(params.initPrice), money(params.totalPrice))}} </p>
        <p class="tableTitle">{{language('ZZYSZJEBWMH', '最终预算总金额（百万元）：')}} {{money(params.totalPrice)}} </p>
        <iButton v-if="!editMode" @click="handleEdit">{{language('BIANJI', '编辑')}}</iButton>
        <iButton v-if="editMode" @click="handleSave">{{language('BAOCUN', '保存')}}</iButton>
        <iButton v-if="editMode" @click="handleCancel">{{language('QUXIAO', '取消')}}</iButton>
      </div>
      <tableList
        class="margin-top20"
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="loading"
        :index="true"
        :selection="false">
        <template #initPrTotal="scope">
          <el-tooltip :content="scope.row['initPrTotal']" placement="top" effect="light">
            <p>{{money(scope.row['initPrTotal'])}}</p>
          </el-tooltip>
        </template>
        <template #coefValue="scope">
          <div v-if="editMode">
            <iInput v-model="scope.row.coefValue" :placeholder="language('QINGSHURU','请输入')"></iInput>
          </div>
          <div v-if="!editMode">{{scope.row.coefValue}}</div>
        </template>
        <template #prTotal="scope">
          <el-tooltip :content="moneyInfo(scope.row['prTotal'])" placement="top" effect="light">
            <p>{{money(scope.row['prTotal'])}}</p>
          </el-tooltip>
        </template>
        <template #adjustTotal="scope">
          <el-tooltip :content="moneyInfo(scope.row['adjustTotal'])" placement="top" effect="light">
            <p>{{money(scope.row['adjustTotal'])}}</p>
          </el-tooltip>
        </template>
      </tableList>
      <!-- <iPagination
        v-update
        @size-change="handleSizeChange($event, getTableData)"
        @current-change="handleCurrentChange($event, getTableData)"
        background
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :current-page='page.currPage'
        :total="page.totalCount"/> -->
    </div>
  </iCard>
</template>

<script>
import { iCard, iInput, iButton, iPagination, iMessage } from 'rise'
import { pageMixins } from '@/utils/pageMixins';
import { tableTitle } from './components/data'
import tableList from '@/components/commonTable/index.vue'
import { getMoney, getMoneyInfo, getRatio } from '@/views/mtz/moneyComputation'
import { fetchBrandDataPage, fetchBrandSave } from '@/api/mtz/annualGeneralBudget/annualBudgetEdit'
export default {
  mixins: [pageMixins],
  components: {
    iCard,
    iInput,
    iButton,
    iPagination,
    tableList
  },
  data () {
    return {
      tableTitle,
      tableListData: [],
      loading: false,
      editMode: false,
      backupData: [],
      params: {},
      forecastId: this.$route.query.forecastId,
      forecastTime: this.$route.query.forecastTime
    }
  },
  computed: {
    money() {
      return function(val) {
        let res = ''
        if(val) {
          // res = Number(val/1000000).toFixed(2)
          res = getMoney(val)
        }
        return res
      }
    },
    moneyInfo() {
      return function(val) {
        let res = ''
        if(val) {
          res = getMoneyInfo(val)
        }
        return res
      }
    },
    ratio() {
      return function(initPrice, totalPrice) {
        let res = ''
        if(initPrice && Number(initPrice)) {
          res = getRatio(initPrice, totalPrice)
        }
        return res
      }
    }    
  },
  created() {
    this.getTableData()
  },
  methods: {
    // 获取数据
    getTableData() {
      // this.tableListData = [
      //   {brand: '大众', initPrTotal: '1234567.89', adjustTotal: '1234567.89', coefValue: '1', prTotal: '1234567.89'}
      // ]
      // this.params = {
      //   ...this.params,
      //   initPrice: '11,000.00',
      //   adjustTotal: '11,000.00',
      //   ratio: '1.0',
      //   totalPrice: '12,000.00'
      // }
      this.loading = true
      const params = {
        pageNo: 1,
        pageSize: 400,
        forecastId: this.forecastId,
      }
      fetchBrandDataPage(params).then(res => {
        this.loading = false
        if(res && res.code == 200) {
          this.params = {
            ...res.data
          }
          this.tableListData = res.data.pageVO.records
          this.page.totalCount = res.data.pageVO.total
        } else iMessage.error(res.desZh) 
      })
    },
    // 编辑
    handleEdit() {
      this.backupData = window._.cloneDeep(this.tableListData)
      this.editMode = true
    },
    // 取消
    handleCancel() {
      this.tableListData = window._.cloneDeep(this.backupData)
      this.editMode = false
    },
    // 保存
    handleSave() {
      const params = {
        editList: this.tableListData,
        forecastId: this.forecastId || null,
        forecastTime: this.forecastTime || null,
      }
      fetchBrandSave(params).then(res => {
        if(res && res.code == 200) {
          iMessage.success(res.desZh)
          this.editMode = false
          this.getTableData()
        }
        else iMessage.error(res.desZh)
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.contentBox {
  padding-bottom: 30px;
  .tableOptionBox {
    .tableTitle {
      margin: 0 10px;
      display: inline-block;
      font-weight: bold;
      font-family: Arial;
      color: #000000;
      opacity: 1;
      font-size: 18px;
    }
    button {
      float: right;
      z-index: 100;
      margin-left: 10px;
      margin-bottom: 20px;
    }
  }
}
::v-deep .el-table .el-table__row .el-input .el-input__inner {
  text-align: center !important;
}
 
</style>

