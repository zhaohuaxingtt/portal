<!--
 * @Author: your name
 * @Date: 2021-10-27 19:18:05
 * @LastEditTime: 2021-12-16 11:25:54
 * @LastEditors: caopeng
 * @Description: In User Settings Edit
 * @FilePath: \front-portal-new\src\views\mtz\annualGeneralBudget\locationChange\components\MtzLocationChange\MTZapplicationForm\preview.vue
-->
<template>
  <div :class="ifSelf?'page':''">
    <iCard class="margin-bottom20">
      <el-form :inline="true"
               ref="baseInfoForm"
               :model="formInline"
               :rules="rules"
               class="demo-form-inline"
               label-position="left">
        <div class="baseInformation">
          <el-form-item label="申请单名"
                        class="formItem"
                        prop="appName">
            <el-input :disabled="true"
                      v-model="formInline.appName"></el-input>
          </el-form-item>
          <el-form-item label="申请单Id"
                        class="formItem">
            <el-input v-model="formInline.mtzAppId"
                      :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="申请单类型"
                        class="formItem">
            <el-input :disabled="true"
                      v-model="formInline.appType"></el-input>
          </el-form-item>
          <el-form-item label="申请状态"
                        class="formItem">
            <el-input :disabled="true"
                      v-model="formInline.appStatus"></el-input>
          </el-form-item>
        </div>
      </el-form>
    </iCard>
    <iTabsList v-model="tabsValue"
               @tab-click="tableChange"
               type="card"
               calss="iTabsList">
      <el-tab-pane :name="1"
                   :label="language('WEIHULINGJIANYUANCAILIAOYONGLIANG','维护零件原材料用量')">
        <iCard>
          <template slot="header">
            <span>
              {{language('YONGLIANGXIANGQING','用量详情')}}
            </span>
          </template>
          <div class="table-wrapper">
            <iTableCustom :ref="'paramsTable'"
                          :loading="tableLoading"
                          :data="tableList"
                          :columns="TABLE_COLUMNS"
                          max-height="400px"
                          highlight-current-row
                          @handle-selection-change="handleSelectionChange">
            </iTableCustom>
            <iPagination v-update
                         @size-change="handleSizeChange($event, getBasePriceChangePageList)"
                         @current-change="handleCurrentChange($event, getBasePriceChangePageList)"
                         background
                         :current-page="page.currPage"
                         :page-sizes="page.pageSizes"
                         :page-size="page.pageSize"
                         :layout="page.layout"
                         :total="page.totalCount" />
          </div>
        </iCard>
      </el-tab-pane>
      <el-tab-pane :name="2"
                   :label="language('SHENPIJILU','审批记录')">
        <iCard>
          <template slot="header">
            <span>
              {{language('SHENPIXIANGQING','审批详情')}}
            </span>
          </template>
          <div class="table-wrapper">
            <iTableCustom :ref="'SPTable'"
                          :loading="tableLoading"
                          :data="approvalRecordList"
                          :columns="TABLE_COLUMNS1"
                          singleChoice
                          max-height="400px"
                          highlight-current-row
                          @handle-selection-change="handleSelectionChange1">
            </iTableCustom>
          </div>
        </iCard>
      </el-tab-pane>
    </iTabsList>

  </div>
</template>

<script>
import { iPage, iCard, iTabsList, iPagination, iMessage } from 'rise'
import { genericAppChangeDetail } from '@/api/mtz/annualGeneralBudget/mtzChange.js'
import { basePriceChangePageList, approvalRecordList } from '@/api/mtz/annualGeneralBudget/mtzChange'
import iTableCustom from '@/components/iTableCustom'
import { TABLE_COLUMNS, TABLE_COLUMNS1 } from './components/data'
import { pageMixins } from '@/utils/pageMixins'
export default {
  data () {
    return {
      tabsValue: 1,
      TABLE_COLUMNS,
      TABLE_COLUMNS1,
      tableList: [],
      mtzAppId: "",
      editFlag: false,
      tableLoading: false,
      approvalRecordList: [],
      formInline: {
        appName: "",
        appStatus: "",
        appType: ""
      },
      ifSelf:true

    }
  },
  mixins: [pageMixins],
  components: {
    iCard,
    iPage,
    iTabsList,
    iPagination,
    iTableCustom
  },

  created () {
    this.init()
     if (window.top === window.self) {
      this.ifSelf = true
    } else {
      this.ifSelf = false
    }
  },
    updated () {
    var tbody = window.document.getElementById('appRouterView')
    var height = tbody.clientHeight
    window.parent.postMessage({ key: 'setFormHeight', value: height + 'px' }, '*')
  },
  methods: {
    init () {
      this.formInline.mtzAppId = this.$route.query.mtzAppId
      this.getGenericAppChangeDetail()
      this.getBasePriceChangePageList()
      this.getApprovalRecordList()
    },
    getGenericAppChangeDetail () {
      genericAppChangeDetail({
        mtzAppId: this.formInline.mtzAppId
      }).then(res => {
        if (res.code === '200') {
          this.formInline.appName = res.data.appName
          this.formInline.appStatus = res.data.appStatus
          this.formInline.appType = res.data.appType
          this.formInline.remark = res.data.remark
          this.formInline.approveRemarks = res.data.approveRemarks
          this.linieName = res.data.linieName
          this.linieDeptNum = res.data.linieDeptNum
        }
      })
    },
    getBasePriceChangePageList () {
      this.tableLoading = true
      let params = {
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
        mtzAppId: this.formInline.mtzAppId
      }
      basePriceChangePageList(params).then((res) => {
        if (res && res.code === '200') {
          this.tableList = res.data
          this.page.currPage = res.pageNum
          this.page.pageSize = res.pageSize
          this.page.totalCount = res.total
          this.tableList.forEach(item => {
            this.$set(item, 'editRow', false);
          })
          this.tableLoading = false
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    getApprovalRecordList () {
      this.tableLoading = true
      let params = {
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
        mtzAppId: this.formInline.mtzAppId || "8"
        // mtzAppId: "8"
      }
      approvalRecordList(params).then((res) => {
        if (res && res.code === '200') {
          this.approvalRecordList = res.data
          this.approvalRecordList.forEach(item => {
            this.$set(item, 'editRow', false);
          })
          this.tableLoading = false
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.page {
  padding: 30px 40px 30px 40px;

}
.header {
  justify-content: space-between;
  margin-bottom: 20px;
  .title {
    font-size: 20px;
    font-family: Arial;
    font-weight: bold;
    line-height: 23px;
  }
}
.baseInformation {
  display: flex;
  justify-content: space-between;
}
.remarks {
  display: flex;
  flex-direction: column;
}
::v-deep .el-form-item__content {
  width: 100%;
}
.dTitle {
  font-size: 16px;
}
</style>