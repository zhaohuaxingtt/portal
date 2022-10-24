<!-- 维护MTZ原材料规则新增弹窗 -->
<template>
  <div style="padding-bottom: 30px">
    <!-- :rules="metalType?rules1:rules2" -->
    <div class="form-wrapper">
      <iFormGroup
        :row="2"
        :model="contractForm"
        :rules="rules"
        ref="contractForm"
      >
        <iFormItem prop="method">
          <iLabel
            :label="language('补差方式', '补差方式')"
            slot="label"
            :required="true"
          ></iLabel>
          <i-select
            v-model="contractForm.method"
            clearable
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
            :label="language('GONGYINGSHANGBIANHAO', '供应商编号')"
            slot="label"
            :required="true"
          ></iLabel>
          <i-select
            v-model="contractForm.sapCode"
            clearable
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
        <iFormItem prop="supplierName">
          <iLabel
            :label="language('GONGYINGSHANGMINGCHENG', '供应商名称')"
            slot="label"
            :required="true"
          ></iLabel>
          <i-select
            v-model="contractForm.supplierName"
            clearable
            filterable
            :placeholder="language('QINGSHURU', '请输入')"
            @change="supplierNC"
          >
            <el-option
              v-for="item in supplierList"
              :key="item.message"
              :label="item.message"
              :value="item.message"
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
            :required="true"
          ></iLabel>
          <i-text>
            <span>{{ contractForm.partName }}</span>
          </i-text>
        </iFormItem>
        <iFormItem>
          <iLabel
            :label="language('CAILIAOZU', '材料组')"
            slot="label"
            :required="true"
          ></iLabel>
          <i-text>
            <span>{{ contractForm.materialGroup }}</span>
          </i-text>
        </iFormItem>
        <iFormItem prop="materialName">
          <iLabel
            :label="language('原材料描述', '原材料描述')"
            slot="label"
            :required="true"
          ></iLabel>
          <!-- <i-select
            v-model="contractForm.materialCode"
            clearable
            filterable
            @change="MaterialGrade"
            :placeholder="language('QINGSHURU', '请输入')"
          >
            <el-option
              v-for="item in materialCode"
              :key="item.code"
              :label="item.codeMessage"
              :value="item.code"
            >
            </el-option>
          </i-select> -->
          <iInput
            :placeholder="language('QINGSHURU', '请输入')"
            v-model.trim="contractForm.materialName"
          ></iInput>
        </iFormItem>
        <iFormItem prop="tcExchangeRate">
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
            clearable
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
            value-format="yyyy-MM-dd hh:mm:ss"
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
            value-format="yyyy-MM-dd hh:mm:ss"
          >
          </iDatePicker>
        </iFormItem>
      </iFormGroup>
    </div>
    <span slot="footer" class="dialog-footer">
      <!-- <span class="time_color" v-if="timeShow">重叠时间段为：{{startTime}}&nbsp;&nbsp;~&nbsp;&nbsp;{{endTime}}</span> -->
      <i-button @click="handleSave" :disabled="saveLoading">保存</i-button>
      <i-button @click="handleReset">重置</i-button>
      <i-button @click="handleCancel">取消</i-button>
    </span>
  </div>
</template>

<script>
import {
  getMtzSupplierList //获取原材料牌号
} from '@/api/mtz/annualGeneralBudget/mtzReplenishmentOverview'
import {
  cartypePaged, //车型
  currencyDict
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/firstDetails'
import {
  addAppRule, //维护MTZ原材料规则-新增
  checkPreciousMetal,
  queryMaterialList,
  getMtzMarketSourceList,
  getPreciousMetalDosageUnit
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/details'
import { getRawMaterialNos } from '@/api/mtz/annualGeneralBudget/replenishmentManagement/supplementary/details'
import {
  fetchRemoteMtzMaterial //查询MTZ材料组
} from '@/api/mtz/annualGeneralBudget/annualBudgetEdit'
import {
  isNumber,
  timeCoincide,
  timeTransformation,
  Mul,
  numAdd,
  formatDecimal
} from './util'

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
  addAppDetailCheck,
  getPartCodeId,
  addAppDetail
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/chipLocation/details'
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
    var validatePass1 = (rule, value, callback) => {
      //非负数字
      if (value < 0) {
        callback(new Error('不能为负数'))
      } else {
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      //阈值
      if (value.toString().split('.')[1] !== undefined) {
        if (value.toString().split('.')[1].length > 4) {
          callback(new Error('最多输入小数点后4位'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    var validatePass3 = (rule, value, callback) => {
      //用量
      if (value == '' || value == undefined) {
        callback()
      } else {
        if (value.toString().split('.')[1] !== undefined) {
          if (value.toString().split('.')[1].length > 6) {
            callback(new Error('最多输入小数点后6位'))
          } else {
            callback()
          }
        } else {
          callback()
        }
      }
    }
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
        materialGroup: '',
        materialName: '',
        method: 2,
        partName: '',
        partNum: '',
        sapCode: '',
        startDate: null,
        supplierName: ''
      },
      rules: {
        method: [{ required: true, message: '请选择', trigger: 'blur' }],
        materialGroup: [{ required: true, message: '请选择', trigger: 'blur' }],
        sapCode: [{ required: true, message: '请选择', trigger: 'blur' }],
        supplierName: [{ required: true, message: '请选择', trigger: 'blur' }],
        materialCode: [{ required: true, message: '请选择', trigger: 'blur' }],
        currency: [{ required: true, message: '请选择', trigger: 'blur' }],
        partNum: [{ required: true, message: '请输入', trigger: 'blur' }],
        exchangeRate: [{ required: true, message: '请输入', trigger: 'blur' }],
        source: [{ required: true, message: '请输入', trigger: 'blur' }],
        compensationRatio: [
          { required: true, message: '请输入', trigger: 'blur' },
          { validator: validatePass1, trigger: 'blur' }
        ],
        threshold: [
          {
            required: true,
            message: '请输入',
            trigger: 'blur'
          },
          { validator: validatePass2, trigger: 'blur' }
        ],
        startDate: [
          { required: true, message: '请选择', trigger: 'blur' },
          { validator: validatePass4, trigger: 'blur' }
        ],
        endDate: [
          { required: true, message: '请选择', trigger: 'blur' },
          { validator: validatePass4, trigger: 'blur' }
        ]
      },
      methodList: [
        {
          code: 1,
          message: '一次性补差',
          disabled: true
        },
        {
          code: 2,
          message: '变价单补差'
        }
      ],
      materialCode: [],
      materialGroup: [],
      getMtzMarketSourceList: [],
      getPreciousMetalDosageUnit: [],

      supplierType1: false,
      supplierType2: false,
      metalType: false,
      timeShow: false, //重叠时间显示
      startTime: '',
      endTime: '',
      saveLoading: false
    }
  },
  created() {
    getMtzSupplierList({}).then((res) => {
      this.supplierList = res.data
    })
    getRawMaterialNos({}).then((res) => {
      this.materialCode = res.data
    })
    fetchRemoteMtzMaterial({}).then((res) => {
      this.materialGroup = res.data
    })
    cartypePaged({
      current: 1,
      size: 99999
    }).then((res) => {
      this.carline = res.data
    })

    currencyDict().then((res) => {
      this.tcCurrence = res.data
    })

    getMtzMarketSourceList({}).then((res) => {
      this.getMtzMarketSourceList = res.data
    })

    getPreciousMetalDosageUnit({}).then((res) => {
      this.getPreciousMetalDosageUnit = res.data
    })
    console.log(this.contractForm)
  },
  methods: {
    getPartCodeId(partNum) {
      getPartCodeId({ partsNum: partNum }).then((res) => {
        console.log(res)
        if (res?.code == '200') {
          this.contractForm.partNum = res.data.partNum
          this.contractForm.partName = res.data.partNameZh
          this.contractForm.materialGroup = res.data.materialGroup || '-'
        }
      })
    },
    jijiaCompute() {
      var jijia = [
        this.contractForm.platinumPrice ? this.contractForm.platinumPrice : 0,
        this.contractForm.palladiumPrice ? this.contractForm.palladiumPrice : 0,
        this.contractForm.rhodiumPrice ? this.contractForm.rhodiumPrice : 0
      ]
      var yongliang = [
        this.contractForm.platinumDosage ? this.contractForm.platinumDosage : 0,
        this.contractForm.palladiumDosage
          ? this.contractForm.palladiumDosage
          : 0,
        this.contractForm.rhodiumDosage ? this.contractForm.rhodiumDosage : 0
      ]

      var number = 0

      for (var i = 0; i < jijia.length; i++) {
        number = numAdd(number, Mul(Number(jijia[i]), Number(yongliang[i])))
      }

      this.contractForm.price = formatDecimal(number, 6)

      if (Number(number) == 0) {
        this.contractForm.price = ''
      }
    },
    MaterialGrade(value) {
      ;(this.contractForm.priceMeasureUnit = ''),
        (this.contractForm.price = ''),
        (this.contractForm.platinumPrice = ''),
        (this.contractForm.platinumDosage = ''),
        (this.contractForm.palladiumPrice = ''),
        (this.contractForm.palladiumDosage = ''),
        (this.contractForm.rhodiumPrice = ''),
        (this.contractForm.rhodiumDosage = ''),
        (this.contractForm.preciousMetalDosageUnit = '')
      queryMaterialList({ materialCode: value }).then((res) => {
        this.contractForm.priceMeasureUnit = res.data.countUnit
      })
      try {
        this.materialCode.forEach((e) => {
          if (e.code == value) {
            this.contractForm.materialName = e.message
            throw new Error('EndIterative')
          }
        })
      } catch (e) {
        if (e.message != 'EndIterative') throw e
      }

      checkPreciousMetal({
        code: value,
        message: this.contractForm.materialName
      }).then((res) => {
        this.metalType = res.data
        if (res.data) {
          this.contractForm.preciousMetalDosageUnit = 'OZ'
        } else {
          this.contractForm.preciousMetalDosageUnit = ''
        }
      })
    },
    supplierBH(value) {
      if (this.supplierType2 == true) return false
      this.supplierType1 = true
      if (value == '') {
        this.contractForm.supplierName = ''
        this.contractForm.sapCode = ''
        setTimeout(() => {
          this.supplierType1 = false
        }, 100)
      }
      try {
        this.supplierList.forEach((e) => {
          if (e.code == value) {
            this.contractForm.supplierName = e.message
            this.contractForm.sapCode = value
            setTimeout(() => {
              this.supplierType1 = false
            }, 100)
            throw new Error('EndIterative')
          }
        })
      } catch (e) {
        if (e.message != 'EndIterative') throw e
      }
    },
    supplierNC(value) {
      if (this.supplierType1 == true) return false
      this.supplierType2 = true
      if (value == '') {
        this.contractForm.supplierName = ''
        this.contractForm.sapCode = ''
        setTimeout(() => {
          this.supplierType2 = false
        }, 100)
      }
      try {
        this.supplierList.forEach((e) => {
          if (e.message == value) {
            // console.log(e.code,2222222)
            // console.log(value,2222222)
            this.contractForm.supplierName = value
            this.contractForm.sapCode = e.code
            setTimeout(() => {
              this.supplierType2 = false
            }, 100)
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
        currency: '',
        endDate: '2999-12-31',
        exchangeRate: 0,
        materialGroup: '',
        materialName: '',
        method: 0,
        partName: '',
        partNum: '',
        sapCode: '',
        startDate: '',
        supplierName: ''
      }
      this.metalType = false
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