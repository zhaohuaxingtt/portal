<!--
 * @Author: youyuan
 * @Date: 2021-09-08 14:57:16
 * @LastEditTime: 2021-11-01 18:16:47
 * @LastEditors: Please set LastEditors
 * @Description: 编辑
 * @FilePath: \重庆软维科技\front-portal\src\views\mtz\annualBudgetEdit\buyerOverview\components\detail.vue
-->
<template>
  <div>
    <iDialog :title="editData.buyerName + ' ' + editData.departments"
             :visible.sync="value"
             width="80%"
             @close='closeDiolog'>
      <div class="dialogBox">
        <div class="searchBox">
          <el-form :inline="true"
                   :model="searchForm"
                   label-position="top"
                   class="demo-form-inline">
            <el-form-item style="marginRight:68px"
                          :label="language('MTZCAILIAOZU', 'MTZ材料组')">
              <!-- <iInput v-model="searchForm['mtzMaterialName']" :placeholder="language('QINGSHURU','请输入')"></iInput> -->
              <!-- <iSelect 
              v-model="searchForm['mtzMaterialList']" 
              filterable
              multiple
              collapse-tags
              :placeholder="language('QINGXUANZE', '请选择')">
                <el-option v-for="(item, index) in  mtzMaterialList" :key="index" :value="item.materialGroupCode" :label="item.materialGroupNameZh"></el-option>
              </iSelect> -->
              <custom-select v-model="searchForm['mtzMaterialList']"
                             :user-options="mtzMaterialList"
                             filterable
                             multiple
                             collapse-tags
                             :placeholder="language('QINGXUANZE', '请选择')"
                             display-member="materialGroupNameZh"
                             value-member="materialGroupCode"
                             value-key="materialGroupCode" />
            </el-form-item>
            <el-form-item style="marginRight:68px"
                          :label="language('CAILIAOZHONGLEI', '材料中类')">
              <!-- <iSelect 
              v-model="searchForm['rawMaterialCodeList']" 
              class="margin-top6" 
              filterable
              remote
              multiple
              collapse-tags
              :remote-method="remoteGetRawMaterial"
              :loading="rawMaterialCodeLoading"
              :placeholder="language('QINGXUANZE', '请选择')">
                <el-option v-for="(item, index) in  rawMaterialCodeList" :key="index" :value="item.code" :label="item.message"></el-option>
              </iSelect> -->
              <custom-select filterable
                             multiple
                             collapse-tags
                             v-model="searchForm['rawMaterialCodeList']"
                             :user-options="rawMaterialCodeList"
                             :placeholder="language('QINGXUANZE', '请选择')"
                             display-member="message"
                             value-member="code"
                             value-key="code" />
            </el-form-item>
            <el-form-item class="searchButton">
              <iButton @click="handleSubmitSearch">{{language('CX', '查询')}}</iButton>
              <iButton @click="handleSearchReset">{{language('CZ', '重置')}}</iButton>
            </el-form-item>
          </el-form>
        </div>
        <el-divider class="margin-top20"></el-divider>
        <div class="contentBox">
          <div class="tableOptionBox">
            <p class="tableTitle">{{language('CSYSZJEBWMH', '初始预算总金额（百万元）：')}} {{money(params.initPrice)}} </p>
            <p class="tableTitle">{{language('XISHUMAOHAO', '系数：')}} {{ratio(money(params.initPrice), money(params.totalPrice))}} </p>
            <p class="tableTitle">{{language('ZZYSZJEBWMH', '最终预算总金额（百万元）：')}} {{money(params.totalPrice)}} </p>
            <iButton v-if="!editMode"
                     @click="handleEdit">{{language('BIANJI', '编辑')}}</iButton>
            <iButton v-if="editMode"
                     @click="handleSave">{{language('BAOCUN', '保存')}}</iButton>
            <iButton v-if="editMode"
                     @click="handleCancel">{{language('QUXIAO', '取消')}}</iButton>
          </div>
          <tableList class="margin-top20"
                     :tableData="tableListData"
                     :tableTitle="editDetailTableTitle"
                     :tableLoading="loading"
                     :index="true"
                     :selection="false">
            <template #materialMediumNum="scope">
              {{scope.row.materialMediumNum}} {{scope.row.materialMediumNum && scope.row.materialMediumName ? ' - ' : ''}} {{scope.row.materialMediumName}}
            </template>
            <template #initPrTotal="scope">
              <el-tooltip :content="moneyInfo(scope.row['initPrTotal'])"
                          placement="top"
                          effect="light">
                <p>{{money(scope.row['initPrTotal'])}}</p>
              </el-tooltip>
            </template>
            <template #coefValue="scope">
              <div v-if="editMode">
                <iInput v-float.expression="2"
                        v-model="scope.row.coefValue"
                        :placeholder="language('QINGSHURU','请输入')"></iInput>
              </div>
              <div v-if="!editMode">{{scope.row.coefValue}}</div>
            </template>
            <template #prTotal="scope">
              <el-tooltip :content="moneyInfo(scope.row['prTotal'])"
                          placement="top"
                          effect="light">
                <p>{{money(scope.row['prTotal'])}}</p>
              </el-tooltip>
            </template>
          </tableList>
          <iPagination v-update
                       @size-change="handleSizeChange($event, getTableData)"
                       @current-change="handleCurrentChange($event, getTableData)"
                       background
                       :page-sizes="page.pageSizes"
                       :page-size="page.pageSize"
                       :layout="page.layout"
                       :current-page='page.currPage'
                       :total="page.totalCount" />
        </div>
      </div>
    </iDialog>
  </div>
</template>

<script>
import { iDialog, iInput, iButton, iPagination, iSelect, iMessage } from 'rise'
import { pageMixins } from '@/utils/pageMixins';
import { editDetailTableTitle } from './data'
import tableList from '@/components/commonTable/index.vue'
import { getMoney, getMoneyInfo, getRatio } from '@/views/mtz/moneyComputation'
import { fetchEditBuyerDataPage, fetchEditBuyerSave, fetchGroups, fetchRemoteMtzMaterial } from '@/api/mtz/annualGeneralBudget/annualBudgetEdit'
import { debounce } from '@/views/mtz/debounce.js'
export default {
  mixins: [pageMixins],
  components: {
    iDialog,
    iInput,
    iButton,
    iSelect,
    iPagination,
    tableList
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    params: {
      type: Object,
      default: () => { }
    },
    editData: {
      type: Object,
      default: () => { }
    },
    forecastId: {
      type: String,
      default: null
    },
    forecastTime: {
      type: String,
      default: null
    },
  },
  data () {
    return {
      editDetailTableTitle,
      tableListData: [],
      searchForm: {},
      loading: false,
      editMode: false,
      backupData: [],
      rawMaterialCodeLoading: false,
      rawMaterialCodeList: [],
      mtzMaterialList: [],
    }
  },
  computed: {
    money () {
      return function (val) {
        let res = ''
        if (val) {
          // res = Number(val/1000000).toFixed(2)
          res = getMoney(val)
        }
        return res
      }
    },
    moneyInfo () {
      return function (val) {
        let res = ''
        if (val) {
          res = getMoneyInfo(val)
        }
        return res
      }
    },
    ratio () {
      return function (initPrice, totalPrice) {
        let res = ''
        if (initPrice && Number(initPrice)) {
          res = getRatio(initPrice, totalPrice)
        }
        return res
      }
    }
  },
  created () {
    this.getTableData()
    this.getMtzMaterial()
    this.remoteGetRawMaterial()
  },
  methods: {
    // 获取数据
    getTableData () {
      // this.tableListData = [
      //   {mtzMaterialName: '座椅骨架', materialMediumName: '51332131', initPrTotal: '1234567.89', coefValue: '1', prTotal: '1234567.89'}
      // ]
      this.loading = true
      const params = {
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
        forecastId: this.forecastId || null,
        userIds: [this.editData.buyerId || null],
        departNumberList: [this.editData.departNumber || null],
        ...this.searchForm
      }
      fetchEditBuyerDataPage(params).then(res => {
        this.loading = false
        if (res && res.code == 200) {
          this.params = {
            ...res.data
          }
          this.tableListData = res.data.pageVO.records
          this.page.totalCount = res.data.pageVO.total
        } else iMessage.error(res.desZh)
      })
    },
    // 点击确定查询
    handleSubmitSearch (val) {
      this.page.currPage = 1
      this.page.pageSize = 10
      this.getTableData().then(res => {
        if (!res.data || res.data.length == 0) {
          iMessage.error(this.language('BQWFCXDJGSRCWHBCZQQRHCXSR', '抱歉，无法查询到结果（输入错误或不存在），请确认后重新输入'));
        }
      })
    },
    // 点击重置查询
    handleSearchReset () {
      this.searchForm = {
        mtzMaterialList: [],
        rawMaterialCodeList: []
      }
      this.page.currPage = 1
      this.page.pageSize = 10
      this.getTableData()
    },
    // 远程搜索材料中类
    remoteGetRawMaterial (query) {
      this.rawMaterialCodeLoading = true
      debounce(fetchGroups({
        keyWords: query
      }).then(res => {
        this.rawMaterialCodeLoading = false
        if (res && res.code == 200) {
          this.rawMaterialCodeList = res.data
        } else iMessage.error(res.desZh)
      }))
    },
    // 获取mtz材料数据
    getMtzMaterial () {
      fetchRemoteMtzMaterial().then(res => {
        if (res && res.code == 200) {
          this.mtzMaterialList = res.data
        } else iMessage.error(res.desZh)
      })
    },
    // 关闭弹窗
    closeDiolog () {
      this.$emit('closeDiolog')
    },
    // 编辑
    handleEdit () {
      this.backupData = window._.cloneDeep(this.tableListData)
      this.editMode = true
    },
    // 取消
    handleCancel () {
      this.tableListData = window._.cloneDeep(this.backupData)
      this.editMode = false
    },
    // 保存
    handleSave () {
      fetchEditBuyerSave({
        editList: this.tableListData,
        forecastTime: this.forecastTime || null,
        forecastId: this.forecastId || null,
        buyerId: this.editData.buyerId || null,
      }).then(res => {
        if (res && res.code == 200) {
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
