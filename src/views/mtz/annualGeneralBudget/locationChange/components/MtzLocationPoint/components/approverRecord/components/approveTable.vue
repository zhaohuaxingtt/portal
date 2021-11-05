<!--
 * @Author: your name
 * @Date: 2021-11-02 15:34:30
 * @LastEditTime: 2021-11-03 19:01:29
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
                 icon="el-icon-refresh">{{language('TONGBU', '同步') }}</iButton>
        <iButton @click="approveStream">{{language('SHENPILIU', '审批流') }}</iButton>
        <iButton @click="edit">{{language('BIANJI', '编辑') }}</iButton>
      </div>
      <div v-if="editFlag">
        <iButton @click="del">{{language('SHANCHU', '删除') }}</iButton>
        <iButton @click="cancel">{{language('QUXIAO', '取消') }}</iButton>
        <iButton @click="save">{{language('BAOCUN', '保存') }}</iButton>
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
                   v-model="scope.row.approvalDepartment"
                   filterable
                   remote
                   placeholder="输入关键词搜索"
                   :remote-method="queryOptions"
                   @change="handleChange">
            <el-option v-for="item in options"
                       :key="item.id"
                       :label="item.nameZh"
                       :value="item.id">
            </el-option>
          </iSelect>
          <span v-else>{{scope.row.approvalDepartment}}</span>
        </template>
      </el-table-column>
      <el-table-column label="审批科室"
                       width="240">
        <template slot-scope="scope">
          <div v-if="scope.row.editRow">
            <iSelect v-model="scope.row.approvalSection"
                     filterable
                     remote
                     placeholder="输入关键词搜索"
                     :remote-method="queryOptions"
                     @change="handleChange">
              <el-option v-for="item in options"
                         :key="item.id"
                         :label="item.nameZh"
                         :value="item.id">
              </el-option>
            </iSelect>
          </div>
          <span v-else> {{ scope.row.approvalSection }}</span>
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
            <el-option v-for="item in options"
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
  </iCard>
</template>

<script>
import { iCard, iButton, iPagination, iMessage, iSelect, iDatePicker } from 'rise'
import { getDeptDropDownList } from '@/api/authorityMgmt'
import { pageMixins } from '@/utils/pageMixins'
import { pageApprove, listApproveStream, deleteApprove, modifyApprove } from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/approve'
export default {
  data () {
    return {
      mtzAppId: "",
      tableData: [],
      tableLoading: false,
      editFlag: false,
      muilteList: []
    }
  },
  components: {
    iCard,
    iButton,
    iPagination,
    iSelect,
    iDatePicker
  },
  created () {
    this.init()
  },
  mixins: [pageMixins],
  methods: {
    init () {
      this.mtzAppId = this.$route.query.id
      this.getTableList()
      this.queryOptions()
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
    queryOptions (key) {
      getDeptDropDownList({
        searchInfo: key || ""
      }).then((res) => {
        if (res?.code === '200')
          this.options = res.data
      })
    },
    approveStream () {
      listApproveStream({ mtzAppId: this.mtzAppId || '5107001' }).then(res => {
        if (res?.code === '200') {
          iMessage.success(res.desZh)
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    edit () {
      this.editFlag = true
      this.tableData.forEach(item => {
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
      modifyApprove({
        mtzAppId: this.mtzAppId,
        dataList: this.muilteList
      }).then(res => {

      })
    },
    del () {
      let idList = this.muilteList.map(item => item.id)
      deleteApprove({ idList }).then((res) => {
        if (res?.code === '200') {
          iMessage.success(res.desZh)
          this.getTableList()
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