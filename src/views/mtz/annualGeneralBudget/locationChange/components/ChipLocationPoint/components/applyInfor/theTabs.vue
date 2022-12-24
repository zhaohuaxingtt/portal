<!--
 维护MTZ原材料规则表格
-->
<template>
  <iCard class="margin-top20">
    <template v-slot:header>
      <div class="table-search">
        <span class="title margin-right20">
          {{ language('维护芯片补差规则', '维护芯片补差规则') }}
        </span>
        <i-input
          v-if="!editType"
          @blur="filterData"
          class="search"
          clearable
          v-model="partNum"
          :placeholder="$t('请输入零件号')"
        ></i-input>
      </div>
      <div>
        <uploadButton
          v-if="!editType && canEdit"
          ref="uploadButtonAttachment"
          v-permission="PORTAL_CHIP_POINT_DETAIL_DAORU"
          :buttonText="language('DAORU', '导入')"
          :uploadByBusiness="true"
          @uploadedCallback="uploaded"
          class="margin-right20"
        />
        <iButton @click="download" v-if="!editType && canEdit" v-permission="PORTAL_CHIP_POINT_DETAIL_XIAZAI">{{
          language('XIAZAIMUBAN', '下载模板')
        }}</iButton>
        <iButton @click="cancel" v-if="editType && canEdit">{{
          language('QUXIAO', '取消')
        }}</iButton>
        <iButton @click="add" v-if="!editType && canEdit" v-permission="PORTAL_CHIP_POINT_DETAIL_XINZENG">{{
          language('XINZENG', '新增')
        }}</iButton>
        <iButton @click="edit" v-if="!editType && canEdit" v-permission="PORTAL_CHIP_POINT_DETAIL_RULE_BIANJI">{{
          language('BIANJI', '编辑')
        }}</iButton>
        <iButton @click="continueBtn" v-if="!editType && canEdit" v-permission="PORTAL_CHIP_POINT_DETAIL_YANYONG">{{
          language('YANYONG', '沿用')
        }}</iButton>
        <iButton @click="deleteItem" v-if="!editType && canEdit" v-permission="PORTAL_CHIP_POINT_DETAIL_SHANCHU">{{
          language('SHANCHU', '删除')
        }}</iButton>
        <iButton @click="save" v-if="editType && canEdit">{{
          language('BAOCUN', '保存')
        }}</iButton>
      </div>
    </template>
    <el-form
      :rules="formRules"
      :model="{ tableData }"
      ref="contractForm"
      class="formStyle"
    >
      <el-table
        :data="tableData"
        ref="moviesTable"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          :selectable="selectionType"
          fixed
          width="50"
          align="center"
        >
        </el-table-column>
        <el-table-column label="#" fixed type="index" width="50" align="center">
        </el-table-column>
        <el-table-column
          prop="ruleNo"
          align="center"
          show-overflow-tooltip
          minWidth="120"
          :label="language('GUIZEBIANHAO', '规则编号')"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="formalFlag"
          align="center"
          show-overflow-tooltip
          width="140"
          :label="language('补差方式', '补差方式')"
          sortable
        >
          <template slot-scope="scope">
            <el-form-item
              :prop="'tableData.' + scope.$index + '.' + 'method'"
              :rules="formRules.method ? formRules.method : ''"
            >
              <el-select
                v-model="scope.row.method"
                :placeholder="language('QINGXUANZE', '请选择')"
                v-if="editId.indexOf(scope.row.id) !== -1"
              >
                <el-option
                  v-for="item in methodList"
                  :key="item.code"
                  :label="item.message"
                  :disabled="item.disabled"
                  :value="item.code"
                >
                </el-option>
              </el-select>
              <span v-else>{{
                scope.row.method == '2' ? '变价单补差' : '一次性补差'
              }}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          prop="sapCode"
          align="center"
          :label="language('GONGYINGSHANG', '供应商')"
          show-overflow-tooltip
          minWidth="160"
          sortable
        >
          <template slot-scope="scope">
            <el-form-item
              :prop="'tableData.' + scope.$index + '.' + 'supplier'"
              :rules="formRules.supplier ? formRules.supplier : ''"
              v-if="editId.indexOf(scope.row.id) !== -1"
            >
              <i-input
                v-model="scope.row.supplier"
                @change="change($event, scope.row)"
                :placeholder="
                  language('请输入供应商SAP号', '请输入供应商SAP号')
                "
              ></i-input>
            </el-form-item>
            <span v-else>{{ scope.row.supplier }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="materialName"
          align="center"
          width="120"
          :label="language('原材料描述', '原材料描述')"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.materialName"
              :placeholder="language('QINGSHURU', '请输入')"
              v-if="editId.indexOf(scope.row.id) !== -1"
            >
            </el-input>
            <span v-else>{{ scope.row.materialName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="partNum"
          align="center"
          width="120"
          :label="language('LINGJIANHAO', '零件号')"
          show-overflow-tooltip
          sortable
        >
          <template slot-scope="scope">
            <el-form-item
              :prop="'tableData.' + scope.$index + '.' + 'partNum'"
              :rules="formRules.partNum ? formRules.partNum : ''"
              v-if="editId.indexOf(scope.row.id) !== -1"
            >
              <el-input
                @blur="getPartCodeId(scope.row)"
                v-model.trim="scope.row.partNum"
                :placeholder="language('QINGSHURU', '请输入')"
              >
              </el-input>
            </el-form-item>
            <span v-else>{{ scope.row.partNum }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="partName"
          align="center"
          width="120"
          :label="language('LINGJIANMINGCHENG', '零件名称')"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="partUnit"
          align="center"
          width="110"
          :label="language('JILIANGDANWEI', '计量单位')"
          show-overflow-tooltip
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="amount"
          align="center"
          width="130"
          :label="language('补差金额', '补差金额')"
          show-overflow-tooltip
          sortable
        >
          <template slot-scope="scope">
            <el-form-item
              :prop="'tableData.' + scope.$index + '.' + 'amount'"
              :rules="formRules.amount ? formRules.amount : ''"
            >
              <el-input
                v-model="scope.row.amount"
                :placeholder="language('QINGSHURU', '请输入')"
                v-if="editId.indexOf(scope.row.id) !== -1"
              >
              </el-input>
              <span v-else>{{ scope.row.amount }}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          prop="currency"
          align="center"
          width="100"
          :label="language('HUOBI', '货币')"
          sortable
        >
          <template slot-scope="scope">
            <el-form-item
              :prop="'tableData.' + scope.$index + '.' + 'currency'"
              :rules="formRules.currency ? formRules.currency : ''"
            >
              <el-select
                v-model="scope.row.currency"
                clearable
                :placeholder="language('QINGSHURU', '请输入')"
                v-if="editId.indexOf(scope.row.id) !== -1"
              >
                <el-option
                  v-for="item in tcCurrence"
                  :key="item.code"
                  :label="item.code"
                  :value="item.code"
                >
                </el-option>
              </el-select>
              <span v-else>{{ scope.row.currency }}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          prop="exchangeRate"
          align="center"
          width="100"
          :label="language('HUILV', '汇率')"
          sortable
        >
          <template slot-scope="scope">
            <el-form-item
              :prop="'tableData.' + scope.$index + '.' + 'exchangeRate'"
              :rules="formRules.exchangeRate ? formRules.exchangeRate : ''"
            >
              <iInput
                type="number"
                v-model="scope.row.exchangeRate"
                v-if="editId.indexOf(scope.row.id) !== -1"
              ></iInput>
              <span v-else>{{ scope.row.exchangeRate }}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          prop="startDate"
          align="center"
          width="155"
          :label="language('YOUXIAOQIQI', '有效期起')"
          sortable
        >
          <template slot-scope="scope">
            <el-form-item
              :prop="'tableData.' + scope.$index + '.' + 'startDate'"
              :rules="formRules.startDate ? formRules.startDate : ''"
            >
              <iDatePicker
                v-model="scope.row.startDate"
                type="date"
                value-format="yyyy-MM-dd hh:mm:ss"
                v-if="editId.indexOf(scope.row.id) !== -1"
              >
              </iDatePicker>
              <span v-else>{{ getDay(scope.row.startDate) }}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          prop="endDate"
          align="center"
          width="155"
          :label="language('YOUXIAOQIZHI', '有效期止')"
          sortable
        >
          <template slot-scope="scope">
            <el-form-item
              :prop="'tableData.' + scope.$index + '.' + 'endDate'"
              :rules="formRules.endDate ? formRules.endDate : ''"
            >
              <iDatePicker
                v-model="scope.row.endDate"
                type="date"
                value-format="yyyy-MM-dd hh:mm:ss"
                v-if="editId.indexOf(scope.row.id) !== -1"
              >
              </iDatePicker>
              <span v-else>{{ getDay(scope.row.endDate) }}</span>
            </el-form-item>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <iDialog
      :title="language('沿用芯片补差规则', '沿用芯片补差规则')"
      :visible.sync="mtzAddShow"
      v-if="mtzAddShow"
      :selectList="selectList"
      width="90%"
      @close="closeDiolog"
    >
      <continueBox @addDialogData="addDialogDataList"></continueBox>
    </iDialog>

    <iDialog
      :title="language('新增芯片补差规则', '新增芯片补差规则')"
      :visible.sync="addDialog"
      v-if="addDialog"
      width="70%"
      @close="saveGzDialog"
    >
      <addGZ @close="saveGzClose" @addDialogGZ="addDialogGZList"> </addGZ>
    </iDialog>
  </iCard>
</template>

<script>
import {
  iCard,
  iButton,
  iPagination,
  iMessage,
  iMessageBox,
  iInput,
  iDatePicker,
  iDialog,
  iSelect
} from 'rise'
import continueBox from './continueBox'
import addGZ from './addGZ'
import uploadButton from '@/components/uploadButton'
import { formRulesGZ } from './data'
import { currencyDict } from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/firstDetails'
import {
  updateApp,
  deleteAppDetail,
  uploadData,
  downloadFile,
  getSupplierInfoBySap,
  getPartCodeId
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/chipLocation/details'
import { timeTransformation } from './util'
export default {
  name: 'Search',
  componentName: 'theTabs',
  components: {
    iCard,
    iButton,
    uploadButton,
    iPagination,
    iInput,
    iDatePicker,
    continueBox,
    iDialog,
    iSelect,
    addGZ
  },
  watch: {},
  props: ['canEdit', 'type', 'relationType', 'chipDetailList', 'baseData'],
  data() {
    var validate = (rule, value, callback, data) => {
      let index = Object.keys(data)[0].split('.')[1]
      let item = this.tableData[index]
      if (
        timeTransformation(item.startDate) >= timeTransformation(item.endDate)
      ) {
        callback(new Error('有效期起不能大于等于有效期止'))
      } else {
        callback()
      }
    }
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
      tcCurrence: [],
      formRules: {
        ...formRulesGZ,
        startDate: [
          { required: true, message: '请选择', trigger: 'change' },
          { validator: validate, trigger: 'change' }
        ], //开始日期
        endDate: [
          { required: true, message: '请选择', trigger: 'change' },
          { validator: validate, trigger: 'change' }
        ] //结束日期
      },
      newDataList: [], //传过来的列表数据
      editType: false,
      editId: '',
      selectList: [],
      mtzAddShow: false,
      addDialog: false,
      tableData: [],
      partNum: ''
    }
  },
  watch: {
    chipDetailList: {
      handler(val) {
        this.tableData = JSON.parse(JSON.stringify(val)).filter(
          (item) =>
            (item.partNum || '')
              .toUpperCase()
              .indexOf(this.partNum?.toUpperCase()) != -1
        )
      },
      immediate: true,
      deep: true
    },
    partNum(val) {
      this.cancel() // 取消编辑状态
      this.tableData = JSON.parse(JSON.stringify(this.chipDetailList)).filter(
        (item) => {
          console.log(item)
          return item.partNum.toUpperCase().indexOf(val.toUpperCase()) != -1
        }
      )
    }
  },
  created() {
    // 汇率
    currencyDict().then((res) => {
      this.tcCurrence = res.data
    })
  },
  methods: {
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
    // 导入
    async uploaded(content) {
      const formData = new FormData()
      formData.append('file', content.file)
      formData.append('applicationName', 'rise')
      const res = await uploadData(formData, { appId: this.$route.query.appId })
      if (res?.code == '200') {
        iMessage.success(this.$i18n.locale == 'zh' ? res.desZh : res.desEn)
        this.$emit('init')
      } else {
        iMessage.error(this.$i18n.locale == 'zh' ? res.desZh : res.desEn)
      }
    },

    download() {
      iMessageBox(
        this.language('SHIFOUDAOCHUMUBAN', '是否导出模板？'),
        this.language('LK_WENXINTISHI', '温馨提示'),
        {
          confirmButtonText: this.language('QUEREN', '确认'),
          cancelButtonText: this.language('QUXIAO', '取消')
        }
      ).then((res) => {
        downloadFile({
          appId: this.$route.query.appId
        }).then((res) => {
          let url = window.URL.createObjectURL(res)
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          let fname = '芯片补差规则模板.xlsx'
          link.setAttribute('download', fname)
          document.body.appendChild(link)
          link.click()
          link.parentNode.removeChild(link)
        })
      })
    },
    getDay(date) {
      return date ? date.split(' ')[0] : date
    },
    add() {
      //新增
      this.addDialog = true
    },
    addDialogGZList() {
      this.$emit('init')
      this.saveGzDialog()
    },
    edit() {
      //编辑
      if (this.selectList.length > 0) {
        this.editType = true
        this.editId = this.selectList.map((item) => item.id)
      } else {
        iMessage.warn('请选择需要修改数据！')
      }
    },

    save() {
      this.$refs['contractForm'].validate(async (valid) => {
        if (valid) {
          const params = {
            chipDetailList: this.tableData,
            chipAppBase: this.baseData.chipAppBase
          }
          updateApp(params).then((res) => {
            if (res.code == 200) {
              this.editId = ''
              this.editType = false
              this.$emit('init')
            } else {
              iMessage.error(res.message)
            }
          })
          this.$refs['contractForm'].clearValidate()
        } else {
          iMessage.warn(
            this.language('QINGBUQUANYANZHENGBITIANXIANG', '请补全验证必填项')
          )
          return false
        }
      })
    },
    cancel() {
      //取消
      this.editType = false
      this.editId = []
      this.tableData = JSON.parse(JSON.stringify(this.chipDetailList)).filter(
        (item) =>
          item.partNum.toUpperCase().indexOf(this.partNum.toUpperCase()) != -1
      )
      this.$refs['contractForm'].clearValidate()
    },
    continueBtn() {
      //沿用
      this.mtzAddShow = true
    },
    addDialogDataList(val) {
      this.newDataList = val.map((item) => {
        this.$set(item, 'supplier', item.sapCode + '-' + item.supplierName)
        return item
      })
      this.closeDiolog()
      this.tableData.unshift(...this.newDataList)
      this.editType = true
      this.$refs.moviesTable.clearSelection()
      this.editId = this.newDataList.map((item) => {
        this.$refs.moviesTable.toggleRowSelection(item, true)
        return item.id
      })
    },
    deleteItem() {
      //删除
      // console.log(this.$parent.$refs)
      iMessageBox(
        this.language('SHIFOUSHANCHU', '是否删除？'),
        this.language('LK_WENXINTISHI', '温馨提示'),
        {
          confirmButtonText: this.language('QUEREN', '确认'),
          cancelButtonText: this.language('QUXIAO', '取消')
        }
      )
        .then((res) => {
          var numList = []
          this.selectList.forEach((e) => {
            numList.push(e.id)
          })
          deleteAppDetail(numList).then((res) => {
            if (res.code == 200 && res.result) {
              this.$emit('init')
              console.log(res)
            } else {
              iMessage.error(res.desZh)
            }
          })
        })
        .catch((res) => {})
    },
    closeDiolog() {
      this.mtzAddShow = false
    },

    saveGzDialog() {
      this.addDialog = false
    },
    saveGzClose() {
      this.saveGzDialog()
    },
    selectionType(row) {
      if (this.editType == true) {
        return false
      } else {
        return true
      }
    },
    handleSelectionChange(val) {
      this.selectList = val
    }
  }
}
</script>

<style lang="scss" scoped>
.table-search {
  display: inline-flex;
  align-items: center;
  .title {
    flex: 0 0 auto;
  }
  .search {
    font-size: 14px !important;
  }
}
.formStyle ::v-deep .el-form-item {
  margin-top: 0;
  margin-bottom: 0;
}
::v-deep .el-select__tags {
  max-width: 100% !important;
}
::v-deep .el-table .el-table__row .el-input {
  width: 100% !important;
}
</style>
<style lang="scss">
.el-table__fixed-body-wrapper,
.el-table__fixed-header-wrapper {
  background: #fff;
}
</style>
