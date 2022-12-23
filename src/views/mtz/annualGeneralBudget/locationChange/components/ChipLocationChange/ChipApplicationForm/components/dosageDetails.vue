<template>
  <div>
    <iTabsList v-model="tabsValue" @tab-click="tableChange" type="card" slot="components" calss="iTabsList">
      <el-tab-pane :name="1" :label="language('规则变更', '规则变更')">
        <iCard>
          <template slot="header">
            <div class="opration">
              <template v-if="canEdit">
                <div v-show="!editFlag">
                  <uploadButton ref="uploadButtonAttachment" :buttonText="language('SHANGCHUAN', '上传')"
                    :uploadByBusiness="true" v-permission="PORTAL_MTZ_CHANGE_INFOR_SCYCLYLBG"
                    @uploadedCallback="uploaded" class="margin-right20" :disabled="disabled" />
                  <iButton @click="download" :disabled="disabled">
                    {{ language('导出', '导出') }}
                  </iButton>
                  <iButton @click="edit" :disabled="disabled">
                    {{ language('BIANJI', '编辑') }}
                  </iButton>
                  <iButton @click="add" :disabled="disabled">
                    {{ language('XINZENG', '新增') }}
                  </iButton>
                  <iButton @click="del" :disabled="disabled">
                    {{ language('SHANCHU', '删除') }}
                  </iButton>
                </div>
                <div v-show="editFlag">
                  <iButton @click="cancel" :disabled="disabled">
                    {{ language('QUXIAO', '取消') }}</iButton>
                  <iButton @click="save" :disabled="disabled">
                    {{ language('BAOCUN', '保存') }}</iButton>
                </div>
              </template>
            </div>
          </template>
          <div class="table-wrapper">
            <el-form :rules="formRules" :model="{ tableList }" ref="contractForm" class="formStyle">
              <el-table :data="tableList" ref="moviesTable" :tableLoading="tableLoading" border
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" :selectable="selectionType" fixed width="50" align="center">
                </el-table-column>
                <el-table-column label="#" fixed type="index" width="50" align="center">
                </el-table-column>
                <el-table-column prop="ruleNo" align="center" show-overflow-tooltip minWidth="120"
                  :label="language('GUIZEBIANHAO', '规则编号')" sortable></el-table-column>
                <el-table-column prop="formalFlag" align="center" show-overflow-tooltip width="140"
                  :label="language('补差方式', '补差方式')" sortable>
                  <template slot-scope="scope">
                    <el-form-item :prop="'tableList.' + scope.$index + '.' + 'method'"
                      :rules="formRules.method ? formRules.method : ''">
                      <el-select v-model="scope.row.method" :placeholder="language('QINGXUANZE', '请选择')"
                        v-if="editId.indexOf(scope.row.id) !== -1">
                        <el-option v-for="item in methodList" :key="item.code" :label="item.message"
                          :disabled="item.disabled" :value="item.code">
                        </el-option>
                      </el-select>
                      <span v-else>{{
                          scope.row.method == '2' ? '变价单补差' : '一次性补差'
                      }}</span>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column prop="sapCode" align="center" :label="language('GONGYINGSHANG', '供应商')"
                  show-overflow-tooltip minWidth="140" sortable>
                  <template slot-scope="scope">
                    <!-- <el-form-item
                      :prop="'tableList.' + scope.$index + '.' + 'supplier'"
                      :rules="formRules.supplier ? formRules.supplier : ''"
                    >
                      <i-input
                        v-model="scope.row.supplier"
                        @change="change($event, scope.row)"
                        :placeholder="
                          language('请输入供应商SAP号', '请输入供应商SAP号')
                        "
                        v-if="editId.indexOf(scope.row.id) !== -1"
                      ></i-input>
                      <span v-else>{{ scope.row.supplier }}</span>
                    </el-form-item> -->
                    <span>{{ scope.row.supplier }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="materialName" align="center" width="120" :label="language('原材料描述', '原材料描述')"
                  show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.materialName" :placeholder="language('QINGSHURU', '请输入')"
                      v-if="editId.indexOf(scope.row.id) !== -1">
                    </el-input>
                    <span v-else>{{ scope.row.materialName }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="partNum" align="center" width="120" :label="language('LINGJIANHAO', '零件号')"
                  show-overflow-tooltip sortable>
                  <template slot-scope="scope">
                    <!-- <el-form-item
                      :prop="'tableList.' + scope.$index + '.' + 'partNum'"
                      :rules="formRules.partNum ? formRules.partNum : ''"
                    >
                      <el-input
                        @blur="getPartCodeId(scope.row)"
                        v-model.trim="scope.row.partNum"
                        :placeholder="language('QINGSHURU', '请输入')"
                        v-if="editId.indexOf(scope.row.id) !== -1"
                      >
                      </el-input>
                      <span v-else>{{ scope.row.partNum }}</span>
                    </el-form-item> -->
                    <span>{{ scope.row.partNum }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="partName" align="center" width="120"
                  :label="language('LINGJIANMINGCHENG', '零件名称')" show-overflow-tooltip>
                </el-table-column>
                <!-- <el-table-column
                  prop="partUnit"
                  align="center"
                  width="110"
                  :label="language('JILIANGDANWEI', '计量单位')"
                  show-overflow-tooltip
                  sortable
                >
                </el-table-column> -->
                <el-table-column prop="amount" align="center" width="140" :label="language('补差金额', '补差金额')"
                  show-overflow-tooltip sortable>
                  <template slot-scope="scope">
                    <el-form-item :prop="'tableList.' + scope.$index + '.' + 'amount'"
                      :rules="formRules.amount ? formRules.amount : ''">
                      <el-input v-model="scope.row.amount" :placeholder="language('QINGSHURU', '请输入')"
                        v-if="editId.indexOf(scope.row.id) !== -1">
                      </el-input>
                      <span v-else>{{ scope.row.amount }}</span>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column prop="currency" align="center" width="100" :label="language('HUOBI', '货币')" sortable>
                  <template slot-scope="scope">
                    <el-form-item :prop="'tableList.' + scope.$index + '.' + 'currency'"
                      :rules="formRules.currency ? formRules.currency : ''">
                      <el-select v-model="scope.row.currency" clearable :placeholder="language('QINGSHURU', '请输入')"
                        v-if="editId.indexOf(scope.row.id) !== -1">
                        <el-option v-for="item in tcCurrence" :key="item.code" :label="item.code" :value="item.code">
                        </el-option>
                      </el-select>
                      <span v-else>{{ scope.row.currency }}</span>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column prop="exchangeRate" align="center" width="100" :label="language('HUILV', '汇率')"
                  sortable>
                  <template slot-scope="scope">
                    <el-form-item :prop="'tableList.' + scope.$index + '.' + 'exchangeRate'" :rules="
                      formRules.exchangeRate ? formRules.exchangeRate : ''
                    ">
                      <iInput type="number" v-model="scope.row.exchangeRate" v-if="editId.indexOf(scope.row.id) !== -1">
                      </iInput>
                      <span v-else>{{ scope.row.exchangeRate }}</span>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column prop="startDate" align="center" width="160" :label="language('YOUXIAOQIQI', '有效期起')"
                  sortable>
                  <template slot-scope="scope">
                    <el-form-item :prop="'tableList.' + scope.$index + '.' + 'startDate'"
                      :rules="formRules.startDate ? formRules.startDate : ''">
                      <iDatePicker v-model="scope.row.startDate" type="date" value-format="yyyy-MM-dd hh:mm:ss"
                        v-if="editId.indexOf(scope.row.id) !== -1">
                      </iDatePicker>
                      <span v-else>{{ getDay(scope.row.startDate) }}</span>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column prop="endDate" align="center" width="160" :label="language('YOUXIAOQIZHI', '有效期止')"
                  sortable>
                  <template slot-scope="scope">
                    <el-form-item :prop="'tableList.' + scope.$index + '.' + 'endDate'"
                      :rules="formRules.endDate ? formRules.endDate : ''">
                      <iDatePicker v-model="scope.row.endDate" type="date" value-format="yyyy-MM-dd hh:mm:ss"
                        v-if="editId.indexOf(scope.row.id) !== -1">
                      </iDatePicker>
                      <span v-else>{{ getDay(scope.row.endDate) }}</span>
                    </el-form-item>
                  </template>
                </el-table-column>
              </el-table>
            </el-form>
            <!-- <iPagination
              v-update
              @size-change="
                handleSizeChange($event, getBasePriceChangePageList)
              "
              @current-change="
                handleCurrentChange($event, getBasePriceChangePageList)
              "
              background
              :current-page="page.currPage"
              :page-sizes="[50, 100, 200, 500, 1000]"
              :page-size="page.pageSize"
              :layout="page.layout"
              :total="page.totalCount"
            /> -->
          </div>
        </iCard>
      </el-tab-pane>
      <el-tab-pane :name="2" :label="language('SHENPIJILU', '审批记录')">
        <iCard>
          <template slot="header">
            <span>
              {{ language('SHENPIXIANGQING', '审批详情') }}
            </span>
          </template>
          <div class="table-wrapper">
            <iTableCustom :ref="'SPTable'" :loading="tableLoading" :data="approvalRecordList" :columns="TABLE_COLUMNS1"
              singleChoice highlight-current-row>
            </iTableCustom>
          </div>
        </iCard>
      </el-tab-pane>
    </iTabsList>

    <new-chipLocation-change :dialogVisible="addDialog" :addFlag="true" :detailList="detailList" @close="close"
      @addItem="addItem"></new-chipLocation-change>
  </div>
</template>

<script>
import {
  iButton,
  iTabsList,
  iCard,
  iPagination,
  iMessage,
  iDialog,
  iInput,
  iTableCustom,
  iDatePicker,
  iMessageBox
} from 'rise'
import newChipLocationChange from '../../newChipLocationChange'
import uploadButton from '@/components/uploadButton'
import {
  save,
  deleteDetail,
  approvalRecordList,
  uploadDetail,
  exportDetail
} from '@/api/mtz/annualGeneralBudget/chipChange'
import {
  // uploadData,
  getSupplierInfoBySap,
  // downloadFile,
  getPartCodeId
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/chipLocation/details'
import { queryWorkflowDetail } from '@/api/approval/myApplication'
import { TABLE_COLUMNS1, tableTitle, formRulesGZ } from './data'
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
    iDatePicker,
    newChipLocationChange,
    iInput,
  },
  mixins: [pageMixins],
  data() {
    return {
      methodList: [
        {
          code: '1',
          message: '一次性补差',
          disabled: true
        },
        {
          code: '2',
          message: '变价单补差'
        }
      ],
      addDialog: false,
      formRules: formRulesGZ,
      editId: [],
      inputProps: [],
      tabsValue: 1,
      tableTitle,
      TABLE_COLUMNS1,
      tableList: [],
      muliteList: [],
      muliteList1: [],
      mtzAppId: '',
      editFlag: false,
      tableLoading: false,
      approvalRecordList: [],
      isShow: false,
      textarea: '',
      disabled: false,
      visible: false,
    }
  },
  created() {
    this.changeId = this.$route.query.changeId
  },
  props: {
    baseDetail: {
      type: Object,
      default: () => {
        return {}
      }
    },
    canEdit: {
      type: Boolean,
      default: false
    },
    detailList: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    '$store.state.location.disabled': {
      handler(val) {
        this.disabled = JSON.parse(val)
      },
      deep: true,
      immediate: true
    },
    detailList: {
      handler(val) {
        this.tableList = val
        console.log('val====>',val);
      },
      immediate:true,
      deep: true
    }
  },
  methods: {
    addItem(addList) {
      this.$emit('getDetail')
      this.close()
    },
    // 编辑零件号
    getPartCodeId(row) {
      getPartCodeId({ partsNum: row.partNum }).then((res) => {
        console.log(res)
        if (res?.code == '200') {
          this.$set(row, 'partName', res.data?.partNameZh || '')
          this.$set(row, 'partUnit', res.data?.unitNameEn || '')
          this.$set(row, 'materialGroup', res.data?.materialGroup || '-')
          if (!res.data) iMessage.warn('未查询到零件数据')
        }
      })
    },
    // 编辑供应商，分割输入框
    change(val, row) {
      if (val) {
        let sapCode = val
        if (val.indexOf('-') != -1) {
          sapCode = val.split('-')[0]
        }
        getSupplierInfoBySap({
          sapCode: sapCode,
          supplierType: 'PP'
        }).then((res) => {
          console.log(res)
          if (!res.data) {
            return iMessage.error('暂无此供应商')
          }
          if (res?.data) {
            this.$set(row, 'sapCode', res.data?.sapCode || '')
            this.$set(row, 'supplierName', res.data?.nameZh || '')
            this.$set(row, 'supplier', res.data.sapCode + '-' + res.data.nameZh)
          }
        })
      }
    },
    // 调整日期格式
    getDay(date) {
      return date ? date.split(' ')[0] : date
    },
    // 新增后重新查询数据
    addDialogGZList() {
      this.$emit('getDetail')
      this.addDialog = false
    },
    tableChange() {
      if (this.tabsValue == '2') {
        this.getApprovalRecordList()
      }
    },
    getApprovalRecordList() {
      this.tableLoading = true
      let params = {
        appId: this.changeId
      }
      approvalRecordList(params).then((res) => {
        if (res && res.code === '200') {
          this.approvalRecordList = res.data
          this.tableLoading = false
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    add() {
      this.addDialog = true
    },

    close() {
      this.addDialog = false
    },
    edit() {
      try {
        if (!this.muliteList.length) {
          return iMessage.warn(
            this.language(
              'LK_QINGXUANZEZHISHAOYITIAOSHUJU',
              '请选择至少一条数据'
            )
          )
        }
      } catch (error) {
        console.log(error)
      }
      this.tableListOld = JSON.parse(JSON.stringify(this.tableList))
      this.editId = this.muliteList.map((item) => item.id)
      this.editFlag = true
    },
    cancel() {
      this.editId = []
      this.tableList = JSON.parse(JSON.stringify(this.tableListOld))
      this.editFlag = false
    },
    handleSelectionChange(val) {
      this.muliteList = val
    },
    // 检查表单
    check() {
      return new Promise((r, j) => {
        this.$refs['contractForm'].validate(async (valid) => {
          if (valid) {
            r(true)
          } else {
            j(false)
          }
        })
      })
    },
    // 保存
    async save() {
      let check = await this.check()
      if (check) {
        let params = {
          chipAttachmentBaseList: this.baseDetail.chipAttachmentBaseList,
          chipChangeBase: this.baseDetail.chipChangeBase,
          detailList: this.tableList
        }
        save(params).then((res) => {
          if (res?.code === '200') {
            iMessage.success(res.desZh)
            this.editId = []
            this.editFlag = false
            this.$emit('getDetail')
            return true
          } else {
            iMessage.error(res.desZh)
          }
        })
      }
    },

    // 导入
    async uploaded(content) {
      const formData = new FormData()
      formData.append('file', content.file)
      formData.append('applicationName', 'rise')
      const res = await uploadDetail(formData, {appId:this.$route.query.changeId})
      if (res?.code == '200') {
        iMessage.success(this.$i18n.locale == 'zh' ? res.desZh : res.desEn)
        this.$emit('getDetail')
      } else {
        iMessage.error(this.$i18n.locale == 'zh' ? res.desZh : res.desEn)
      }
    },

    // 导出
    download() {
      iMessageBox(
        this.language('SHIFOUDAOCHUMUBAN', '是否导出模板？'),
        this.language('LK_WENXINTISHI', '温馨提示'),
        {
          confirmButtonText: this.language('QUEREN', '确认'),
          cancelButtonText: this.language('QUXIAO', '取消')
        }
      ).then((res) => {
        exportDetail({appId:this.$route.query.changeId}).then((res) => {
          let url = window.URL.createObjectURL(res)
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          let fname = '芯片补差规则变更模板.xlsx'
          link.setAttribute('download', fname)
          document.body.appendChild(link)
          link.click()
          link.parentNode.removeChild(link)
        })
      })
    },
    // 删除
    del() {
      deleteDetail(
        this.muliteList.map((item) => {
          return item.id
        })
      ).then((res) => {
        if (res && res.code === '200') {
          this.$emit('getDetail')
        } else {
          iMessage.error(res.desZh)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  padding: 20px 10px;
}

.opration {
  width: 100%;
  text-align: right;
}

.dosage {
  width: 160px;
  line-height: 36px;
}

.formStyle ::v-deep .el-form-item {
  margin-top: 0;
  margin-bottom: 0;
}
::v-deep .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
</style>