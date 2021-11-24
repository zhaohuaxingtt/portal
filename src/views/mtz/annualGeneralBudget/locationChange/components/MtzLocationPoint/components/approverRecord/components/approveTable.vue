<!--
 * @Author: your name
 * @Date: 2021-11-02 15:34:30
 * @LastEditTime: 2021-11-24 17:37:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\locationChange\components\MtzLocationPoint\components\approverRecord\components\theTable.vue
-->
<template>
  <iCard>
    <template slot="header">
      <span>{{language('SHENPIRENLIEBIAO', '审批人列表') }}</span>
      <div v-if="!editFlag">
        <iButton type="text"
                 class="margin-right20"
                 @click="handleSync('')"
                 v-show="!flag"
                 icon="el-icon-refresh">{{language('TONGBU', '同步') }}</iButton>
        <iButton @click="approveStream">{{language('SHENPILIU', '审批流') }}</iButton>
        <iButton v-show="!flag"
                 :disabled="disabled"
                 @click="edit">{{language('BIANJI', '编辑') }}</iButton>
      </div>
      <div v-if="editFlag">
        <iButton @click="del">{{language('SHANCHU', '删除') }}</iButton>
        <iButton @click="cancel">{{language('QUXIAO', '取消') }}</iButton>
        <iButton @click="save"
                 :loading="loading">{{language('BAOCUN', '保存') }}</iButton>
      </div>
    </template>
    <el-table :data="tableData"
              v-loading="tableLoading"
              ref="approveTable"
              tooltip-effect="light"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection"
                       width="60">
      </el-table-column>
      <el-table-column type="index"
                       label="#"
                       width="60">
      </el-table-column>
      <el-table-column label="审批部门"
                       width="240">
        <template slot-scope="scope">
          <iSelect v-if="scope.row.editRow"
                   v-model="scope.row.approvalDepartmentName"
                   filterable
                   remote
                   placeholder="输入关键词搜索"
                   @change="function(changedVal) {handleChangeDepartment(changedVal, scope.row)}">
            <el-option v-for="item in selectDeptList"
                       :key="item.id"
                       :label="item.nameZh"
                       :value="item.nameZh">
            </el-option>
          </iSelect>
          <span v-else>{{scope.row.approvalDepartmentName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="审批科室"
                       width="240">
        <template slot-scope="scope">
          <div v-if="scope.row.editRow">
            <iSelect v-model="scope.row.approvalSectionName"
                     filterable
                     remote
                     placeholder="输入关键词搜索"
                     @change="function(changedVal) {handleChangeApprovalSection(changedVal, scope.row)}">
              <el-option v-for="item in selectSectionList"
                         :key="item.id"
                         :label="item.nameZh"
                         :value="item.nameZh">
              </el-option>
            </iSelect>
          </div>
          <span v-else> {{ scope.row.approvalSectionName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审批人">
        <template slot-scope="scope">
          <iSelect v-if="scope.row.editRow"
                   v-model="scope.row.approvalName"
                   filterable
                   remote
                   placeholder="输入关键词搜索"
                   :remote-method="queryOptions"
                   @change="handleChange">
            <el-option v-for="item in userList"
                       :key="item.id"
                       :label="item.nameZh"
                       :value="item.id">
            </el-option>
          </iSelect>
          <span v-else> {{ scope.row.approvalName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="生成时间">
        <template slot-scope="scope">
          <iDatePicker v-model="scope.row.startDate"
                       v-if="scope.row.editRow"
                       valueFormat="yyyy-MM-dd"
                       type="date"></iDatePicker>
          <span v-else> {{ scope.row.startDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="截止时间">
        <template slot-scope="scope">
          <iDatePicker v-model="scope.row.endDate"
                       v-if="scope.row.editRow"
                       valueFormat="yyyy-MM-dd"
                       type="date"></iDatePicker>
          <span v-else> {{ scope.row.endDate }}</span>
        </template>
      </el-table-column>
    </el-table>
    <iPagination v-update
                 @size-change="handleSizeChange($event, getTableList)"
                 @current-change="handleCurrentChange($event, getTableList)"
                 background
                 :current-page="page.currPage"
                 :page-sizes="page.pageSizes"
                 :page-size="page.pageSize"
                 :layout="page.layout"
                 :total="page.totalCount" />
    <el-dialog title="审批流"
               v-if="dialogVisible"
               :visible.sync="dialogVisible"
               width="30%"
               :before-close="handleClose">
      <process-vertical :instanceId="riseId" />
      <span slot="footer"
            class="dialog-footer">
      </span>
    </el-dialog>
  </iCard>
</template>

<script>
import { iCard, iButton, iPagination, iMessage, iSelect, iDatePicker } from 'rise'
// import { getDeptDropDownList } from '@/api/authorityMgmt'
import { pageMixins } from '@/utils/pageMixins'
import processVertical from './processVertical'
import { pageApprove, deleteApprove, modifyApprove, getAppFormInfo, selectDept, selectSection, syncAuther } from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/approve'
export default {
  data () {
    return {
      mtzAppId: "",
      tableData: [],
      tableLoading: false,
      editFlag: false,
      muilteList: [],
      loading: false,
      dialogVisible: false,
      riseId: "",
      selectDeptList: [],
      selectSectionList: [],
      flag: false,
      disabled: false
    }
  },
  components: {
    iCard,
    iButton,
    iPagination,
    iSelect,
    iDatePicker,
    processVertical
  },
  created () {
    this.init()
  },
  // computed: {
  //   mtzObject () {
  //     return this.$store.state.location.mtzObject;
  //   }
  // },
  // watch: {
  //   mtzObject (newVlue, oldValue) {
  //     this.init()
  //   }
  // },
  mixins: [pageMixins],
  methods: {
    async init () {
      this.mtzAppId = this.$route.query.mtzAppId
      this.flag = JSON.parse(this.$route.query.isView)
      await this.getAppFormInfo()
      this.selectDept()
      this.selectSection()

    },
    getTableList () {
      this.tableLoading = true
      let params = {
        isDeptLead: true,
        mtzAppId: this.mtzAppId || '5107001',
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize
      }
      pageApprove(params).then(res => {
        if (res?.code === '200') {
          this.tableData = res.data
          this.tableData.forEach(item => {
            this.$set(item, 'editRow', false);
          })
          this.page.currPage = res.pageNum
          this.page.pageSize = res.pageSize
          this.page.totalCount = res.total
          this.tableLoading = false
        } else {
          iMessage.error(res.desZh)
          this.tableLoading = false
        }
      })
    },
    handleSelectionChange (val) {
      this.muilteList = val
    },
    selectDept () {
      selectDept({}).then((res) => {
        if (res?.code === '200') {
          this.selectDeptList = res.data
        }
      })
    },
    selectSection () {
      selectSection({}).then((res) => {
        this.selectSectionList = res.data
      })
    },
    getAppFormInfo () {
      getAppFormInfo({
        isDeptLead: true,
        mtzAppId: this.mtzAppId || '5107001'
      }).then(res => {
        if (res?.code === '200') {
          this.riseId = res.data.riseId
          if (res.data.ttNominateAppId) {
            this.disabled = true
          }
          if (res.data.flowType === 'FILING') {
            this.disabled = true
            return
          }
          this.handleSync('1')
        }
      })
    },
    approveStream () {
      this.dialogVisible = true
    },
    edit () {
      if (this.muilteList.length === 0) {
        iMessage.error(this.language('QINGXUANZESHUJU', '请选择数据'))
        return
      }
      this.editFlag = true
      this.muilteList.forEach(item => {
        item.editRow = true
      })
    },
    cancel () {
      this.editFlag = false
      this.tableData.forEach(item => {
        item.editRow = false
      })
      this.getTableList()
    },
    save () {
      this.loading = true
      modifyApprove({
        mtzAppId: this.mtzAppId || '5107001',
        dataList: this.muilteList
      }).then(res => {
        if (res?.code === '200') {
          this.editFlag = false
          this.loading = false
          this.tableData.forEach(item => {
            item.editRow = false
          })
          iMessage.success(res.desZh)
          this.getTableList()
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    del () {
      if (this.muilteList.length === 0) {
        iMessage.error(this.language('QINGXUANZESHUJU', '请选择数据'))
        return
      }
      let idList = this.muilteList.map(item => item.id)
      deleteApprove({ idList }).then((res) => {
        if (res?.code === '200') {
          iMessage.success(res.desZh)
          this.getTableList()
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    handleClose (done) {
      done();
    },
    handleChangeDepartment (val, row) {
      let obj = this.selectDeptList.find(item => item.nameZh === val)
      row.approvalDepartment = obj.id
    },
    handleChangeApprovalSection (val, row) {
      let obj = this.selectSectionList.find(item => item.nameZh === val)
      row.approvalDepartment = obj.id
      this.userList = obj.userDTOList
    },
    handleSync (params) {
      debugger
      syncAuther({ mtzAppId: this.mtzAppId || '5107001', tag: params || "" }).then(res => {
        if (res?.code === '200') {
          this.getTableList()
          iMessage.success(res.desZh)
        } else {
          iMessage.error(res.desZh)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-table .el-table__row .el-input {
  width: 200px !important;
}
</style>