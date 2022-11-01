<!--
 维护MTZ原材料规则表格
-->
<template>
  <iCard class="margin-top20">
    <template v-slot:header>
      <span>
        {{ language('维护芯片补差规则', '维护芯片补差规则') }}
      </span>
      <div>
        <uploadButton
          v-if="!editType && (appStatus == '草稿' || appStatus == '未通过')"
          ref="uploadButtonAttachment"
          :buttonText="language('DAORU', '导入')"
          :uploadByBusiness="true"
          @uploadedCallback="uploaded"
          class="margin-right20"
        />
        <iButton
          @click="download"
          v-if="!editType && (appStatus == '草稿' || appStatus == '未通过')"
          >{{ language('XIAZAIMUBAN', '下载模板') }}</iButton
        >
        <iButton
          @click="cancel"
          v-if="editType && (appStatus == '草稿' || appStatus == '未通过')"
          >{{ language('QUXIAO', '取消') }}</iButton
        >
        <iButton
          @click="add"
          v-if="!editType && (appStatus == '草稿' || appStatus == '未通过')"
          >{{ language('XINZENG', '新增') }}</iButton
        >
        <iButton
          @click="edit"
          v-if="!editType && (appStatus == '草稿' || appStatus == '未通过')"
          >{{ language('BIANJI', '编辑') }}</iButton
        >
        <iButton
          @click="continueBtn"
          v-if="!editType && (appStatus == '草稿' || appStatus == '未通过')"
          >{{ language('YANYONG', '沿用') }}</iButton
        >
        <iButton
          @click="delecte"
          v-if="!editType && (appStatus == '草稿' || appStatus == '未通过')"
          >{{ language('SHANCHU', '删除') }}</iButton
        >
        <iButton
          @click="save"
          v-if="editType && (appStatus == '草稿' || appStatus == '未通过')"
          >{{ language('BAOCUN', '保存') }}</iButton
        >
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
          width="60"
          align="center"
        >
        </el-table-column>
        <el-table-column label="#" fixed type="index" width="60" align="center">
        </el-table-column>
        <el-table-column
          prop="ruleNo"
          align="center"
          show-overflow-tooltip
          width="100"
          :label="language('GUIZEBIANHAO', '规则编号')"
        >
          <template slot-scope="scope">
            <el-form-item
              :prop="'tableData.' + scope.$index + '.' + 'ruleNo'"
              :rules="formRules.ruleNo ? formRules.ruleNo : ''"
            >
              <!-- <iInput v-model="scope.row.ruleNo" v-if="editId.indexOf(scope.row.id)!==-1"></iInput> -->
              <span>{{ scope.row.ruleNo }}</span>
            </el-form-item>
          </template>
        </el-table-column>

        <el-table-column
          prop="formalFlag"
          align="center"
          show-overflow-tooltip
          width="100"
          :label="language('补差方式', '补差方式')"
        >
          <template slot-scope="scope">
            <el-form-item
              :prop="'tableData.' + scope.$index + '.' + 'method'"
              :rules="formRules.method ? formRules.method : ''"
            >
              <!-- <iInput v-model="scope.row.ruleNo" v-if="editId.indexOf(scope.row.id)!==-1"></iInput> -->
              <span>{{
                scope.row.method == '2' ? '变价单补差' : '一次性补差'
              }}</span>
            </el-form-item>
          </template>
        </el-table-column>

        <el-table-column
          prop="sapCode"
          align="center"
          :label="language('GONGYINGSHANGBIANHAO', '供应商编号')"
          show-overflow-tooltip
          width="90"
        >
        </el-table-column>

        <el-table-column
          prop="supplierName"
          align="center"
          :label="language('供应商名称', '供应商名称')"
          show-overflow-tooltip
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="materialGroup"
          align="center"
          :label="language('材料组', '材料组')"
          show-overflow-tooltip
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="materialName"
          align="center"
          width="120"
          :label="language('原材料描述', '原材料描述')"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-form-item
              :prop="'tableData.' + scope.$index + '.' + 'materialName'"
            >
              <el-input
                v-model="scope.row.materialName"
                :placeholder="language('QINGSHURU', '请输入')"
                v-if="editId.indexOf(scope.row.id) !== -1"
              >
              </el-input>
              <span v-else>{{ scope.row.materialName }}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          prop="partNum"
          align="center"
          width="120"
          :label="language('LINGJIANHAO', '零件号')"
          show-overflow-tooltip
        >
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
          prop="amount"
          align="center"
          width="150"
          :label="language('补差金额', '补差金额')"
          show-overflow-tooltip
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
          width="60"
          :label="language('HUOBI', '货币')"
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
          width="90"
          :label="language('HUILV', '汇率')"
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
          width="150"
          :label="language('YOUXIAOQIQI', '有效期起')"
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
          width="150"
          :label="language('YOUXIAOQIZHI', '有效期止')"
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
      <addGZ
        :resetType="resetType"
        @close="saveGzClose"
        @addDialogGZ="addDialogGZList"
      >
      </addGZ>
    </iDialog>
  </iCard>
</template>

<script>
import {
  iCard,
  iButton,
  iPagination,
  icon,
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
  downloadFile
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/chipLocation/details'

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
  props: ['appStatus', 'type', 'relationType', 'chipDetailList', 'baseData'],
  data() {
    return {
      tcCurrence: [],
      formRules: formRulesGZ,
      newDataList: [], //传过来的列表数据
      editType: false,
      editId: '',
      selectList: [],
      mtzAddShow: false,
      addDialog: false,
      resetNum: false,
      dialogEditType: false, //判断是否是沿用过来的数据
      carline: [] //车型
    }
  },
  watch: {
    chipDetailList(val) {
      console.log('val=>', val)
      this.tableData = val
    }
  },
  computed: {
    tableData() {
      return this.chipDetailList
    }
  },
  created() {
    // 汇率
    currencyDict().then((res) => {
      this.tcCurrence = res.data
    })
  },
  methods: {
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 20
      if (!isLt2M) {
        iMessage.error('上传文件大小不能超过 20MB!')
      }
      return isLt2M
    },
    handleExceed(files, fileList) {
      iMessage.warn(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      )
    },
    uploadSuccess(res, file) {
      if (res.code == 200 && res.result) {
        this.getTableList()
      } else {
        if (res.data == null) {
          iMessage.error(res.desZh)
        } else {
          this.errorList = res.data
          this.cancelNo = true
        }
      }
    },
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
    sourceChange(e, val) {
      this.$set(e, 'source', val)
    },
    add() {
      //新增
      this.addDialog = true
      return
      if (this.type !== 'SIGN') {
        this.addDialog = true
      } else {
        iMessageBox(
          this.language(
            '新增芯片补差规则时，申请单类型不能为流转，继续添加会重置申请单类型，是否确认添加？',
            '新增芯片补差规则时，申请单类型不能为流转，继续添加会重置申请单类型，是否确认添加？'
          ),
          this.language('LK_WENXINTISHI', '温馨提示'),
          {
            confirmButtonText: this.language('QUEREN', '确认'),
            cancelButtonText: this.language('QUXIAO', '取消')
          }
        ).then((res) => {
          this.addDialog = true
          this.resetNum = true
        })
      }
    },
    addDialogGZList() {
      this.$emit('init')
      //mtz申请单类型或已关联申请单类型为流转备案/新增原材料规则
      // if (this.resetNum) {
      //   //流转
      //   const chipAppBase = {
      //     ...this.baseData.chipAppBase,
      //     type: 'MEETING'
      //   }
      //   const chipTTO = {
      //     chipDetailList: this.baseData.chipDetailList,
      //     chipAppBase: chipAppBase
      //   }
      //   updateApp(chipTTO).then((res) => {
      //     console.log(res)
      //     this.$emit('init')
      //   })
      //   this.resetNum = false
      // }
      this.saveGzDialog()
    },
    edit() {
      //编辑
      if (this.selectList.length > 0) {
        this.editType = true
        var changeArrayList = []
        this.selectList.forEach((item) => {
          changeArrayList.push(item.id)
        })
        this.editId = changeArrayList
        this.dialogEditType = false
      } else {
        iMessage.error('请选择需要修改数据！')
      }
    },

    save() {
      this.$refs['contractForm'].validate(async (valid) => {
        if (valid) {
          // iMessageBox(
          //   this.language(
          //     'GZFSBHXGLJJTBGGSFJX',
          //     '规则发生变化，相关零件将同步更改，是否继续？'
          //   ),
          //   this.language('LK_WENXINTISHI', '温馨提示'),
          //   {
          //     confirmButtonText: this.language('QUEREN', '确认'),
          //     cancelButtonText: this.language('QUXIAO', '取消')
          //   }
          // ).then((res) => {
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
          // })
          this.$refs['contractForm'].clearValidate()
        } else {
          iMessage.error(
            this.language('QINGBUQUANYANZHENGBITIANXIANG', '请补全验证必填项')
          )
          return false
        }
      })
    },
    cancel() {
      //取消
      var that = this
      iMessageBox(
        this.language('SHIFOUQUXIAOBIANJI', '是否取消编辑？'),
        this.language('LK_WENXINTISHI', '温馨提示'),
        {
          confirmButtonText: this.language('QUEREN', '确认'),
          cancelButtonText: this.language('QUXIAO', '取消')
        }
      )
        .then((res) => {
          this.editType = false
          if (this.dialogEditType) {
            this.editId.forEach((e) => {
              this.tableData.splice(0, 1)
            })
            this.dialogEditType = false
          } else {
            this.getTableList()
          }
        })
        .then((res) => {
          this.editId = ''
          this.$refs['contractForm'].clearValidate()
        })
        .catch((res) => {})
    },
    continueBtn() {
      //沿用
      this.mtzAddShow = true
    },
    addDialogDataList(val) {
      //沿用
      val.forEach((item) => {
        this.$set(item, 'source', item.sourceType)
        item.formalFlag = 'Y'
        delete item.sourceType
        delete item.id
        if (item.carline == null) {
          item.carlineList = []
          item.carline = ''
        } else {
          item.carlineList = item.carline.split(',')
        }
      })
      this.newDataList = val
      this.closeDiolog()
      this.tableData.unshift(...this.newDataList)
      this.editType = true
      var changeArrayList = []
      this.$refs.moviesTable.clearSelection()
      this.newDataList.forEach((item) => {
        changeArrayList.push(item.id)
        this.$refs.moviesTable.toggleRowSelection(item, true)
      })
      this.editId = changeArrayList
      this.dialogEditType = true
    },
    delecte() {
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
    saveClose() {
      this.closeDiolog()
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
      console.log(val)
      this.selectList = val
    },
    ratioRules(arr) {
      var str = arr.row
      if (str.compensationRatio < 0) {
        str.compensationRatio = ''
        iMessage.error(
          this.language('BUCHAXISHUBUNENGWEIFUSHU', '补差系数不能为负数')
        )
      }
    }
  }
}
</script>

<style lang="scss" scoped>
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
