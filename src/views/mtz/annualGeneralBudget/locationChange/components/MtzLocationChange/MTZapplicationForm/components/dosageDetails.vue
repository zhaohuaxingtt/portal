<!--
 * @Author: your name
 * @Date: 2021-10-27 19:29:09
 * @LastEditTime: 2021-11-17 16:11:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\locationChange\components\MtzLocationChange\MTZapplicationForm\components\dosageDetails.vue
-->
<template>
  <div>
    <iTabsList v-model="tabsValue"
               @tab-click="tableChange"
               type="card"
               slot="components"
               calss="iTabsList">
      <el-tab-pane :name="1"
                   :label="language('WEIHULINGJIANYUANCAILIAOYONGLIANG','维护零件原材料用量')">
        <iCard>
          <template slot="header">
            <span>
              {{language('YONGLIANGXIANGQING','用量详情')}}
            </span>
            <div class="opration"
                 v-if="!isView">
              <div v-show="!editFlag">
                <uploadButton ref="uploadButtonAttachment"
                              :buttonText="language('SHANGCHUANYUANCAILIAOYONGLIANGBIANGENG','上传原材料用量变更')"
                              :uploadByBusiness="true"
                              @uploadedCallback="uploadBasePriceChange($event)"
                              class="margin-right20"
                              :disabled="disabled" />
                <iButton @click="downFile"
                         :disabled="disabled"> {{language('XIAZAIMUBAN','下载模板')}}</iButton>
                <iButton @click="del"
                         :disabled="disabled"> {{language('SHANCHU','删除')}}</iButton>
                <iButton @click="add"
                         :disabled="disabled"> {{language('XINZENG','新增')}}</iButton>
                <iButton @click="edit"
                         :disabled="disabled"> {{language('BIANJI','编辑')}}</iButton>
              </div>
              <div v-show="editFlag">
                <iButton @click="edit"
                         :disabled="disabled"> {{language('QUXIAO','取消')}}</iButton>
                <iButton @click="save"
                         :disabled="disabled"> {{language('BAOCUN','保存')}}</iButton>
              </div>
            </div>
          </template>
          <div class="table-wrapper">
            <iTableCustom :ref="'paramsTable'"
                          :loading="tableLoading"
                          :data="tableList"
                          :columns="TABLE_COLUMNS"
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
            <!-- <div class="opration">
              <iButton @click="explain"> {{language('JIESHI','解释')}}</iButton>
            </div> -->
          </template>
          <div class="table-wrapper">
            <iTableCustom :ref="'SPTable'"
                          :loading="tableLoading"
                          :data="approvalRecordList"
                          :columns="TABLE_COLUMNS1"
                          singleChoice
                          highlight-current-row
                          @handle-selection-change="handleSelectionChange1">
            </iTableCustom>
          </div>
        </iCard>
      </el-tab-pane>
    </iTabsList>
    <iDialog :title="language('JIESHIYUANYIN','解释原因')"
             :visible.sync="isShow"
             width="30%"
             class="table-header-modal"
             :before-close="handleBeforeClose">
      <div class="content">
        <iInput type='textarea'
                :placeholder="language('QINGSHURUNEIRONG','请输入内容') "
                v-model="textarea"
                :rows="4"></iInput>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <i-button @click="handleSave">保存</i-button>
        <i-button @click="handleCancel">取消</i-button>
      </span>
    </iDialog>
  </div>
</template>

<script>
import { iButton, iTabsList, iCard, iPagination, iMessage, iDialog, iInput } from "rise";
import uploadButton from '@/components/uploadButton';
import { basePriceChangePageList, uploadBasePriceChange, priceChangeExport, basePriceChangeDelete, updateBasePriceChange, approvalRecordList, approvalExplain } from '@/api/mtz/annualGeneralBudget/mtzChange'
import iTableCustom from '@/components/iTableCustom'
import { TABLE_COLUMNS, TABLE_COLUMNS1 } from './data'
import { pageMixins } from '@/utils/pageMixins'

export default {
  components: {
    iButton,
    iCard,
    iTabsList,
    iTableCustom,
    iPagination,
    uploadButton,
    iDialog,
    iInput
  },
  mixins: [pageMixins],
  data () {
    return {
      tabsValue: 1,
      TABLE_COLUMNS,
      TABLE_COLUMNS1,
      tableList: [],
      muliteList: [],
      muliteList1: [],
      mtzAppId: "",
      editFlag: false,
      tableLoading: false,
      approvalRecordList: [],
      isShow: false,
      textarea: "",
      isView: false,
      disabled: false
    }
  },
  created () {
    this.init()
  },
  watch: {
    '$store.state.location.disabled': {
      handler (val) {
        this.disabled = val
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    init () {
      this.isView = JSON.parse(this.$route.query.isView)
      this.mtzAppId = this.$route.query.mtzAppId
      this.getBasePriceChangePageList()
      this.getApprovalRecordList()
    },
    getBasePriceChangePageList () {
      this.tableLoading = true
      let params = {
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
        mtzAppId: this.mtzAppId
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
        mtzAppId: this.mtzAppId || "8"
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
    add () {
      let routerPath = this.$router.resolve({
        path: `/mtz/annualGeneralBudget/newMtzLocationChange`,
        query: {
          addFlag: true,
          mtzAppId: this.mtzAppId
        }
      })
      window.open(routerPath.href, '_blank')
    },
    edit () {
      if (this.muliteList.length === 0) {
        iMessage.error('请选择数据')
        return
      }
      this.muliteList.forEach(item => {
        item.editRow = true
      })
      this.editFlag = true
    },
    handleSelectionChange (val) {
      this.muliteList = val
    },
    handleSelectionChange1 (val) {
      this.muliteList1 = val
    },
    save () {
      this.muliteList.forEach(item => {
        item.editRow = false
      })
      this.editFlag = false
      let editList = this.muliteList.map(item => {
        return {
          dosage: item.newDosage,
          endDate: item.endDate,
          id: item.id,
          startDate: item.startDate
        }
      })
      updateBasePriceChange({
        changeList: editList,
        isDeptLead: true,
        mtzAppId: this.mtzAppId
      }).then((res) => {
        this.getBasePriceChangePageList()
      })
    },
    uploadBasePriceChange (val) {
      console.log(val)
      let params = {
        multifile: val.file,
        mtzAppId: this.mtzAppId
      }
      uploadBasePriceChange(params).then((res) => {
        if (res.code === '200') {
          iMessage.success(res.desZh)
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    downFile () {
      priceChangeExport({
        mtzAppId: this.mtzAppId
      }).then(res => {

      })
    },
    explain () {
      if (this.muliteList.length === 0) {
        iMessage.error(this.language('QINGXUANZESHUJU', '请选择数据'))
        return
      }
      this.isShow = true
    },
    handleSave () {
      let params = {
        comment: this.textarea,
        isDeptLead: true,
        riseId: this.muliteList1[0].riseId || "",
        taskId: this.muliteList1[0].taskId || ""
      }
      approvalExplain(params).then(res => {
        if (res?.code === '200') {
          this.isShow = false
          this.getApprovalRecordList()
          iMessage.success(res.desZh)
        } else {
          this.isShow = false
          iMessage.error(res.desZh)
        }
      })
    },
    handleCancel () {
      this.isShow = false
    },
    del () {
      let ids = this.muliteList.map(item => {
        return item.id
      })
      let params = {
        id: ids
      }
      basePriceChangeDelete(params).then(res => {
        if (res && res.code === '200') {
          this.getBasePriceChangePageList()
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    handleBeforeClose (done) {
      done()
    }
  },

}
</script>

<style lang="scss" scoped>
.content {
  padding: 20px 10px;
}
</style>