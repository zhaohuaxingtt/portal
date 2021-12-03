<!--
 * @Author: your name
 * @Date: 2021-11-02 15:34:30
 * @LastEditTime: 2021-12-02 20:23:38
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
                 :disabled="disabled"
                 icon="el-icon-refresh">{{language('TONGBU', '同步') }}</iButton>
        <iButton @click="approveStream">{{language('SHENPILIU', '审批流') }}</iButton>
        <iButton @click="addStream">{{language('XINZENG', '新增') }}</iButton>
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
                   v-model="scope.row.approvalDepartment"
                   filterable
                   remote
                   placeholder="输入关键词搜索"
                   @change="function(changedVal) {handleChangeDepartment(changedVal, scope.row)}">
            <el-option v-for="item in scope.row.selectDeptList"
                       :key="item.id"
                       :label="item.nameEn"
                       :value="item.nameEn">
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
                     @change="function(changedVal) {handleChangeApprovalSection(changedVal, scope.row)}">
              <el-option v-for="item in scope.row.selectSectionList"
                         :key="item.id"
                         :label="item.nameEn"
                         :value="item.nameEn">
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
                   @change="function(changedVal) {handleChangeApprovalName(changedVal, scope.row)}">
            <el-option v-for="item in scope.row.userList"
                       :key="item.id"
                       :label="item.nameZh"
                       :value="item.nameZh">
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
      mtzAppId: this.$route.query.mtzAppId,
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
  computed: {
    mtzObject () {
      return this.$store.state.location.mtzObject;
    }
  },
  watch: {
    mtzObject (newVlue, oldValue) {
      this.init()
    }
  },
  mixins: [pageMixins],
  methods: {
    async init () {
      // this.flag = JSON.parse(this.$route.query.isView)
      await this.getAppFormInfo()
      // this.selectDept()
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
      this.muilteList.forEach(item => {
        selectDept({}).then((res) => {
          if (res?.code === '200') {
            this.$set(item, 'selectDeptList', res.data);
            console.log(res.data)
            let deptList = item.selectDeptList.find(i => item.approvalDepartment === i.nameEn)
            if (deptList) {
              item.approvalDepartmentName = deptList.nameZh || ''
              selectSection({
                lineDeptId: deptList.id
              }).then((res) => {
                console.log( res.data)
                this.$set(item, 'selectSectionList', res.data);
                let approvalNameList = item.selectSectionList.find(i => item.approvalSection === i.nameEn)
                item.approvalSectionName = deptList.nameZh
                this.$set(item, 'userList', approvalNameList.userDTOList || '');
              })
            }
          }
        })
      })
    },
    addStream () {
      this.editFlag = true
      let obj = {
        approvalDepartment: "",
        approvalSectionName: "",
        approvalName: "",
        startDate: "",
        endDate: "",
        editRow: true
      }
      selectDept({}).then((res) => {
        if (res?.code === '200') {
          this.$set(obj, 'selectDeptList', res.data);
        }
      })
      this.tableData.push(obj)
      this.$refs.approveTable.toggleRowSelection(this.tableData[this.tableData.length - 1], true)
    },
    // selectDept () {
    //   selectDept({}).then((res) => {
    //     if (res?.code === '200') {
    //       this.selectDeptList = res.data
    //     }
    //   })
    // },
    // selectSection (id) {
    //   selectSection({ deptId: id }).then((res) => {
    //     this.selectSectionList = res.data
    //   })
    // },
    getAppFormInfo () {
      getAppFormInfo({
        isDeptLead: true,
        mtzAppId: this.mtzAppId || '5107001'
      }).then(res => {
        if (res?.code === '200') {
          if (res.data.appStatus === '草稿' || res.data.appStatus === '未通过') {
            this.flag = false;
          } else {
            this.flag = true;
          }
          if (res.data.flowType === 'FILING') {
            this.disabled = true
            return
          }
          this.riseId = res.data.riseId
          console.log(this.riseId, "22222222222")
          if (res.data.ttNominateAppId) {
            this.disabled = true
            this.handleSync('')
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
      this.muilteList.forEach(item => {
        delete item.selectDeptList
        delete item.selectSectionList
        delete item.userList
      })
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
      let obj = row.selectDeptList.find(item => item.nameZh === val)
      row.approvalDepartmentName = obj.nameZh
      selectSection({ lineDeptId: obj.id }).then(res => {
        this.$set(row, 'selectSectionList', res.data);
      })
    },
    handleChangeApprovalSection (val, row) {
      // let obj = row.selectSectionList.find(item => item.nameZh === val)
      // row.approvalSection = obj.nameEn
      // this.$set(row, 'userList', obj.userDTOList);

    },
    handleChangeApprovalName (val, row) {
      let obj = row.userList.find(item => item.nameZh === val)
      row.approvalBy = obj.id
      // row.approvalName = obj.id
    },
    handleSync (params) {
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