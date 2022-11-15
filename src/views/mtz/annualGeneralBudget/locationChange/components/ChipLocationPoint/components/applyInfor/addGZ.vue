<!-- 维护MTZ原材料规则新增弹窗 -->
<template>
  <div style="padding-bottom: 30px">
    <div class="form-wrapper">
      <iFormGroup
        :row="2"
        :model="contractForm"
        :rules="rules"
        ref="contractForm"
      >
        <iFormItem prop="type">
          <iLabel
            :label="language('补差类型', '补差类型')"
            slot="label"
            :required="true"
          ></iLabel>
          <i-select
            v-model="contractForm.type"
            :placeholder="language('QINGSHURU', '请输入')"
          >
            <el-option
              v-for="item in typeList"
              :key="item.code"
              :label="item.message"
              :disabled="item.disabled"
              :value="item.code"
            >
            </el-option>
          </i-select>
        </iFormItem>
        <iFormItem prop="method">
          <iLabel
            :label="language('补差方式', '补差方式')"
            slot="label"
            :required="true"
          ></iLabel>
          <i-select
            v-model="contractForm.method"
            :placeholder="language('QINGSHURU', '请输入')"
          >
            <el-option
              v-for="item in methodList"
              :key="item.code"
              :label="item.message"
              :disabled="item.disabled"
              :value="item.code"
            >
            </el-option>
          </i-select>
        </iFormItem>
        <iFormItem prop="sapCode">
          <iLabel
            :label="language('GONGYINGSHANG', '供应商')"
            slot="label"
            :required="true"
          ></iLabel>
          <i-select
            v-model="contractForm.sapCode"
            filterable
            :placeholder="language('QINGSHURU', '请输入')"
            @change="supplierBH"
          >
            <el-option
              v-for="item in supplierList"
              :key="item.code"
              :label="item.codeMessage"
              :value="item.code"
            >
            </el-option>
          </i-select>
        </iFormItem>
        <iFormItem prop="partNum">
          <iLabel
            :label="language('LINGJIANHAO', '零件号')"
            slot="label"
            :required="true"
          ></iLabel>
          <iInput
            v-model.trim="contractForm.partNum"
            @blur="getPartCodeId(contractForm.partNum)"
          ></iInput>
        </iFormItem>
        <iFormItem>
          <iLabel
            :label="language('LINGJIANMINGCHENG', '零件名称')"
            slot="label"
          ></iLabel>
          <i-text>
            <span>{{ contractForm.partName }}</span>
          </i-text>
        </iFormItem>
        <iFormItem>
          <iLabel
            :label="language('JILIANGDANWEI', '计量单位')"
            slot="label"
          ></iLabel>
          <i-text>
            <span>{{ contractForm.partUnit }}</span>
          </i-text>
        </iFormItem>
        <iFormItem prop="materialName">
          <iLabel
            :label="language('原材料描述', '原材料描述')"
            slot="label"
          ></iLabel>
          <iInput
            :placeholder="language('QINGSHURU', '请输入')"
            v-model.trim="contractForm.materialName"
          ></iInput>
        </iFormItem>
        <iFormItem prop="amount">
          <iLabel
            :label="language('补差金额', '补差金额')"
            slot="label"
            :required="true"
          ></iLabel>
          <iInput
            v-model="contractForm.amount"
            type="number"
            placeholder="请输入"
            :disabled="disabled"
          />
        </iFormItem>
        <iFormItem prop="currency">
          <iLabel
            :label="language('HUOBI', '货币')"
            slot="label"
            :required="true"
          ></iLabel>
          <i-select
            v-model="contractForm.currency"
            :placeholder="language('QINGXUANZE', '请选择')"
          >
            <el-option
              v-for="item in tcCurrence"
              :key="item.code"
              :label="item.code"
              :value="item.code"
            >
            </el-option>
          </i-select>
        </iFormItem>
        <iFormItem prop="exchangeRate">
          <iLabel
            :label="language('HUILV', '汇率')"
            slot="label"
            :required="true"
            icons="iconxinxitishi"
            tip="货币比人民币"
          ></iLabel>
          <iInput
            v-model="contractForm.exchangeRate"
            type="number"
            placeholder="请输入汇率"
            :disabled="disabled"
          />
        </iFormItem>
        <iFormItem prop="startDate">
          <iLabel
            :label="language('YOUXIAOQIQI', '有效期起')"
            slot="label"
            :required="true"
          ></iLabel>
          <iDatePicker
            v-model="contractForm.startDate"
            type="date"
            value-format="yyyy-MM-dd 00:00:00"
          >
          </iDatePicker>
        </iFormItem>
        <iFormItem prop="endDate">
          <iLabel
            :label="language('YOUXIAOQIZHI', '有效期止')"
            slot="label"
            :required="true"
          ></iLabel>
          <iDatePicker
            v-model="contractForm.endDate"
            type="date"
            value-format="yyyy-MM-dd 23:59:59"
            default-time="23:59:59"
          >
          </iDatePicker>
        </iFormItem>
      </iFormGroup>
    </div>
    <span slot="footer" class="dialog-footer">
      <i-button @click="handleSave" :disabled="saveLoading">{{
        $t('保存')
      }}</i-button>
      <i-button @click="handleReset">{{ $t('重置') }}</i-button>
      <i-button @click="handleCancel">{{ $t('取消') }}</i-button>
    </span>
  </div>
</template>

<script>
//获取供应商下拉
import { getMtzSupplierList } from '@/api/mtz/annualGeneralBudget/mtzReplenishmentOverview'
// 货币
import { currencyDict } from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/firstDetails'

import {
  iButton,
  iMessage,
  iInput,
  iFormGroup,
  iText,
  iFormItem,
  iLabel,
  iSelect,
  iDatePicker
} from 'rise'
import {
  getPartCodeId,
  addAppDetail
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/chipLocation/details'
import { formRulesGZ } from './data'
import { timeTransformation } from './util'
export default {
  components: {
    iButton,
    iMessage,
    iInput,
    iFormGroup,
    iText,
    iFormItem,
    iLabel,
    iSelect,
    iDatePicker
  },
  props: {
    show: {
      type: Boolean
    },
    parent: {
      type: Object,
      default: () => {
        return {}
      }
    },
    resetNum: {
      type: Boolean
    }
  },
  data() {
    var validatePass4 = (rule, value, callback) => {
      if (
        timeTransformation(this.contractForm.startDate) >=
        timeTransformation(this.contractForm.endDate)
      ) {
        callback(new Error('有效期起不能大于等于有效期止'))
      } else {
        callback()
      }
    }
    return {
      tcCurrence: [],
      supplierList: [], //供应商
      contractForm: {
        amount: 0,
        currency: 'RMB',
        endDate: '2999-12-31 23:59:59',
        exchangeRate: 1,
        materialName: '',
        method: '2',
        type: '1',
        partName: '',
        partNum: '',
        sapCode: '',
        startDate: null,
        supplierName: ''
      },
      rules: {
        ...formRulesGZ,
        startDate: [
          { required: true, message: '请选择', trigger: 'change' },
          { validator: validatePass4, trigger: 'change' }
        ], //开始日期
        endDate: [
          { required: true, message: '请选择', trigger: 'change' },
          { validator: validatePass4, trigger: 'change' }
        ] //结束日期
      },
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
      typeList: [
        {
          code: '1',
          message: '芯片补差'
        }
      ],
      saveLoading: false
    }
  },
  created() {
    getMtzSupplierList({}).then((res) => {
      this.supplierList = res.data
    })
    // 货币
    currencyDict().then((res) => {
      this.tcCurrence = res.data
    })
  },
  methods: {
    getPartCodeId(partNum) {
      getPartCodeId({ partsNum: partNum }).then((res) => {
        console.log(res)
        if (res?.code == '200') {
          this.contractForm.partNum = res.data?.partNum || ''
          this.contractForm.partName = res.data?.partNameZh || ''
          this.contractForm.partUnit = res.data?.unitNameEn || ''
        } else {
          this.contractForm.partNum = ''
          this.contractForm.partName = ''
          this.contractForm.partUnit = ''
        }
      })
    },
    supplierBH(value) {
      if (value == '') {
        this.contractForm.supplierName = ''
        this.contractForm.sapCode = ''
      }
      try {
        this.supplierList.forEach((e) => {
          if (e.code == value) {
            this.contractForm.supplierName = e.message
            this.contractForm.sapCode = value
            throw new Error('EndIterative')
          }
        })
      } catch (e) {
        if (e.message != 'EndIterative') throw e
      }
    },
    handleSave() {
      this.saveLoading = true
      this.$refs['contractForm'].validate(async (valid) => {
        if (valid) {
          // console.log("验证成功")
          addAppDetail(this.contractForm, this.$route.query.appId).then(
            (res) => {
              if (res.code == 200 && res.result) {
                iMessage.success(this.language(res.desEn, res.desZh))
                this.saveLoading = false
                this.$emit('addDialogGZ', '')
              } else {
                iMessage.error(this.language(res.desEn, res.desZh))
                this.saveLoading = false
              }
            }
          )
        } else {
          setTimeout(() => {
            this.saveLoading = false
          }, 500)
          return false
        }
      })
    },
    handleReset() {
      this.contractForm = {
        amount: 0,
        currency: 'RMB',
        endDate: '2999-12-31 23:59:59',
        exchangeRate: 1,
        materialName: '',
        method: '2',
        type: '1',
        partName: '',
        partNum: '',
        sapCode: '',
        startDate: null,
        supplierName: ''
      }
    },
    handleCancel() {
      this.$emit('close', '')
    }
  }
}
</script>

<style style="scss" scoped>
::v-deep .dialog-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.time_color {
  color: red;
  display: inline-block;
  margin-right: 20px;
}
.vue-select {
  width: 100%;
}
::v-deep .el-date-editor {
  width: 100% !important;
}
::v-deep .el-form-item__label {
  width: 13.5rem !important;
}
</style>