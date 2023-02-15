<!--
 * @Author: your name
 * @Date: 2021-11-02 15:34:30
 * @LastEditTime: 2022-12-24 13:02:08
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\locationChange\components\ChipLocationPoint\components\approverRecord\components\approveTable.vue
-->
<template>
  <iCard>
    <template slot="header">
      <span>{{ language('SHENPIRENLIEBIAO', '审批人列表') }}</span>
      <div v-if="!editFlag">
        <iButton
          @click="approveStream"
          v-permission="PORTAL_CHIP_POINT_SHENPIREN_SHENPILIU"
          >{{ language('SHENPILIU', '审批流') }}</iButton
        >
        <iButton
          @click="addStream"
          v-show="!flag"
          v-permission="PORTAL_CHIP_POINT_SHENPIREN_ADD"
          :disabled="disabled"
          >{{ language('XINZENG', '新增') }}</iButton
        >
        <iButton
          v-show="!flag"
          :disabled="disabled"
          v-permission="PORTAL_CHIP_POINT_SHENPIREN_EDIT"
          @click="edit"
          >{{ language('BIANJI', '编辑') }}</iButton
        >
      </div>
      <div v-if="editFlag">
        <iButton @click="del" v-permission="PORTAL_CHIP_POINT_SHENPIREN_DEL">{{
          language('SHANCHU', '删除')
        }}</iButton>
        <iButton @click="cancel">{{ language('QUXIAO', '取消') }}</iButton>
        <iButton @click="save" :loading="loading">{{
          language('BAOCUN', '保存')
        }}</iButton>
      </div>
    </template>
    <el-form :rules="rules" ref="tableForm" :model="{ tableData }">
      <el-table
        :data="tableData"
        v-loading="tableLoading"
        ref="approveTable"
        tooltip-effect="light"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="60"> </el-table-column>
        <el-table-column type="index" label="#" width="60"> </el-table-column>
        <el-table-column :label="$t('审批部门')" width="240">
          <template slot-scope="scope">
            <el-form-item
              :prop="'tableData.' + scope.$index + '.' + 'approvalDepartment'"
              :rules="rules['approvalDepartment']"
            >
              <template v-if="scope.row.editRow">
                <iSelect
                  v-model="scope.row.approvalDepartment"
                  filterable
                  remote
                  placeholder="输入关键词搜索"
                  @change="
                    changeNum(
                      scope.row,
                      'approvalDepartmentNum',
                      'selectDeptList',
                      'approvalDepartment',
                      1
                    )
                  "
                  @visible-change="getSelectDept($event, scope.row, 1)"
                >
                  <el-option
                    v-for="item in scope.row.selectDeptList"
                    :key="item.code"
                    :label="item.message"
                    :value="item.message"
                  >
                  </el-option>
                </iSelect>
              </template>
              <span v-else>{{ scope.row.approvalDepartment }}</span>
            </el-form-item>
          </template>
        </el-table-column>

        <el-table-column :label="$t('审批科室')" width="240">
          <template slot-scope="scope">
            <el-form-item
              :prop="'tableData.' + scope.$index + '.' + 'approvalSection'"
              :rules="rules['approvalSection']"
            >
              <template v-if="scope.row.editRow">
                <iSelect
                  v-model="scope.row.approvalSection"
                  filterable
                  remote
                  placeholder="输入关键词搜索"
                  @change="
                    changeNum(
                      scope.row,
                      'approvalSectionNum',
                      'selectSectionList',
                      'approvalSection',
                      2
                    )
                  "
                  @visible-change="getSelectDept($event, scope.row, 2)"
                >
                  <el-option
                    v-for="item in scope.row.selectSectionList"
                    :key="item.code"
                    :label="item.message"
                    :value="item.message"
                  >
                  </el-option>
                </iSelect>
              </template>
              <span v-else> {{ scope.row.approvalSection }}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column :label="$t('审批人')">
          <template slot-scope="scope">
            <el-form-item
              :prop="'tableData.' + scope.$index + '.' + 'approvalName'"
              :rules="rules['approvalName']"
            >
              <template v-if="scope.row.editRow">
                <iSelect
                  v-model="scope.row.approvalName"
                  filterable
                  remote
                  placeholder="输入关键词搜索"
                  @change="
                    changeNum(
                      scope.row,
                      'approvalBy',
                      'userList',
                      'approvalName'
                    )
                  "
                  @visible-change="getSelectDept($event, scope.row, 3)"
                >
                  <!-- @change="
                    (changedVal) => {
                      handleChangeApprovalName(changedVal, scope.row)
                    }
                  " -->
                  <el-option
                    v-for="item in scope.row.userList"
                    :key="item.code"
                    :label="item.message"
                    :value="item.message"
                  >
                  </el-option>
                </iSelect>
              </template>
              <span v-else> {{ scope.row.approvalName }}</span>
            </el-form-item>
          </template>
        </el-table-column>

        <el-table-column :label="$t('生成时间')">
          <template slot-scope="scope">
            <iDatePicker
              v-model="scope.row.startDate"
              v-if="scope.row.editRow"
              valueFormat="yyyy-MM-dd hh:mm:ss"
              type="date"
            ></iDatePicker>
            <span v-else> {{ scope.row.startDate }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('截止时间')">
          <template slot-scope="scope">
            <iDatePicker
              v-model="scope.row.endDate"
              v-if="scope.row.editRow"
              valueFormat="yyyy-MM-dd hh:mm:ss"
              type="date"
            ></iDatePicker>
            <span v-else> {{ scope.row.endDate }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-form>

    <el-dialog
      :title="$t('审批流')"
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <process-vertical
        :instanceId="riseId"
        :tableData="tableData"
        :formInfo="formInfo"
      />
      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>
  </iCard>
</template>

<script>
import {
  iCard,
  iButton,
  iPagination,
  iMessage,
  iSelect,
  iDatePicker
} from 'rise'
import { pageMixins } from '@/utils/pageMixins'
import processVertical from './processVertical'
import {
  modifyApprove,
  deleteApprove,
  pageApprove,
  syncAuther,
  selectDept
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/chipLocation/details'
export default {
  data() {
    return {
      formData: {},
      formInfo: {},
      appId: this.$route.query.appId,
      tableData: [],
      tableLoading: false,
      editFlag: false,
      muilteList: [],
      ttNominateFlag: false,
      loading: false,
      dialogVisible: false,
      riseId: '',
      selectDeptList: [],
      selectSectionList: [],
      flag: false,
      disabled: false,
      rules: {
        approvalDepartment: [
          { required: true, message: '请输入审批部门', trigger: 'change' }
        ],
        // approvalSection: [
        //   { required: true, message: '请选择审批科室', trigger: 'change' }
        // ],
        approvalName: [
          { required: true, message: '请选择审批人', trigger: 'change' }
        ]
      }
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
  props: {
    baseData: {
      type: Object,
      default: () => ({})
    }
  },
  created() {
    // this.init()
  },
  watch: {
    baseData: {
      handler(val) {
        console.log(val)

        this.formInfo = val.chipAppBase || {}
        this.riseId = val.chipAppBase?.workflowId
        if (
          this.formInfo.statusDesc == '草稿' ||
          this.formInfo.statusDesc == '未通过' ||
          this.formInfo.statusDesc == '已提交'
        ) {
          this.flag = false
        } else {
          this.flag = true
        }
        if (!val.approveList.length) {
          syncAuther({ appId: this.formInfo.id }).then((res) => {
            this.getTableList()
          })
        } else {
          this.getTableList()
        }
      }
    }
  },
  mixins: [pageMixins],
  methods: {
    async init() {},
    // 获取默认审批数据
    async getTableList() {
      this.tableLoading = true
      let params = {
        appId: this.formInfo.id
      }
      let res = await pageApprove(params)
      console.log(res)
      if (res?.code === '200') {
        this.page.totalCount = res.total
        this.tableLoading = false
        res.data.forEach((item) => {
          this.$set(item, 'editRow', false)
        })
        this.tableData = res.data
      } else {
        iMessage.error(res.desZh)
        this.tableLoading = false
        this.tableData = []
      }
    },
    handleSelectionChange(val) {
      this.muilteList = val
    },
    changeNum(row, prop, list, key, type) {
      this.$set(
        row,
        prop,
        row[list].find((item) => item.message == row[key]).code
      )
      if (type == 1) {
        this.$set(row, 'approvalSection', '')
        this.$set(row, 'approvalSectionNum', '')
        this.$set(row, 'approvalName', '')
        this.$set(row, 'approvalBy', '')
      } else if (type == 2) {
        this.$set(row, 'approvalName', '')
        this.$set(row, 'approvalBy', '')
      }
      console.log(row)
    },
    getSelectDept(visible, row, type) {
      if (!visible) return
      let params
      if (type == 1) {
        params = {
          departmentNum: '',
          sectionNum: ''
        }
      } else if (type == 2) {
        params = {
          departmentNum: row.approvalDepartmentNum || '',
          sectionNum: ''
        }
      } else if (type == 3) {
        params = {
          departmentNum: row.approvalDepartmentNum || '',
          sectionNum: row.approvalSectionNum || ''
        }
      }
      selectDept(params).then((res) => {
        if (res?.code == '200') {
          if (type == 1) {
            this.$set(row, 'selectDeptList', res.data['deptList'])
          } else if (type == 2) {
            this.$set(row, 'selectSectionList', res.data['officeList'])
          } else {
            this.$set(row, 'userList', res.data['approvalList'])
          }
        }
      })
    },
    addStream() {
      this.editFlag = true
      let obj = {
        approvalDepartment: '',
        approvalSectionName: '',
        approvalName: '',
        startDate: '',
        endDate: '',
        editRow: true
      }

      this.tableData.push(obj)
      this.$refs.approveTable.toggleRowSelection(
        this.tableData[this.tableData.length - 1],
        true
      )
    },
    handleChangeApprovalName(val, row) {
      let obj = row.userList.find((item) => item.message === val)
      row.approvalBy = Number(obj.code)
    },
    approveStream() {
      this.dialogVisible = true
    },
    edit() {
      if (this.muilteList.length === 0) {
        iMessage.error(this.language('QINGXUANZESHUJU', '请选择数据'))
        return
      }
      this.editFlag = true
      this.muilteList.forEach((item) => {
        item.editRow = true
      })
    },
    cancel() {
      this.editFlag = false
      this.tableData.forEach((item) => {
        item.editRow = false
      })
      this.getTableList()
    },
    save() {
      this.loading = true
      this.$refs['tableForm'].validate((valid) => {
        if (valid) {
          let tableData = JSON.parse(JSON.stringify(this.tableData))
          // this.muilteList.forEach((item) => {
          //   delete item.selectDeptList
          //   delete item.selectSectionList
          //   delete item.userList
          // })
          modifyApprove(tableData, this.$route.query.appId)
            .then((res) => {
              if (res.code == '200' && res.result) {
                this.editFlag = false
                this.loading = false
                this.tableData.forEach((item) => {
                  item.editRow = false
                })
                iMessage.success(res.desZh)
                this.getTableList()
              } else {
                iMessage.error(res.desZh)
                this.loading = false
              }
            })
            .catch((res) => {
              this.loading = false
            })
        } else {
          iMessage.error('请填写完整')
          this.loading = false
          return false
        }
      })
      return
    },
    del() {
      if (this.muilteList.length === 0) {
        iMessage.error(this.language('QINGXUANZESHUJU', '请选择数据'))
        return
      }
      let idList = this.muilteList.map((item) => item.id)
      deleteApprove(idList).then((res) => {
        if (res?.code === '200') {
          iMessage.success(res.desZh)
          this.getTableList()
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    handleClose(done) {
      done()
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-table .el-table__row .el-input {
  width: 200px !important;
}
::v-deep .el-form-item {
  margin-bottom: 0;
}
</style>