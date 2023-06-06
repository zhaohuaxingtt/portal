<template>
  <iPage :loading="onLoading">
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">间接物料供应商</span>
      <div class="floatright">
        <i-button :loading="loadingType" @click="save">{{
          $t('LK_TIJIAO')
        }}</i-button>
        <i-button :loading="loadingType" @click="cancle">{{
          $t('LK_QUXIAO')
        }}</i-button>
      </div>
    </div>
    <!-- baseInfo -->
    <iCard
      tabCard
      collapse
      :title="$t('LK_JICHUXINXI')"
      class="margin-bottom20"
    >
      <iFormGroup
        row="3"
        ref="baseInfoForm"
        :model="supplierComplete.supplierDTO"
        :rules="baseRules"
      >
        <template v-for="(item, index) in baseInfoTitle">
          <iFormItem
            v-if="item.key == 'isForeignManufacture'"
            :key="index"
            prop="isForeignManufacture"
          >
            <iLabel
              :label="$t(item.name)"
              :required="item.required"
              :icons="item.icons"
              :tip="$t(item.tip)"
              slot="label"
            ></iLabel>
            <iSelect
              v-model="supplierComplete.supplierDTO[item.key]"
              @change="changeFact(supplierComplete.supplierDTO[item.key])"
            >
              <el-option
                :value="child.value"
                :label="child.label"
                v-for="child in options[item.option]"
                :key="child.value"
              ></el-option>
            </iSelect>
          </iFormItem>
          <iFormItem
            v-else-if="item.key == 'socialcreditNo'"
            :key="index"
            prop="socialcreditNo"
          >
            <iLabel
              :label="$t(item.name)"
              :required="!supplierComplete.supplierDTO.isForeignManufacture"
              :icons="item.icons"
              :tip="$t(item.tip)"
              slot="label"
            ></iLabel>
            <iInput
              v-model="supplierComplete.supplierDTO[item.key]"
              @change="getInfosByCode"
            ></iInput>
          </iFormItem>
          <iFormItem :key="index" :prop="item.key" v-else>
            <iLabel
              :label="$t(item.name)"
              :required="item.required"
              :icons="item.icons"
              :tip="$t(item.tip)"
              slot="label"
            ></iLabel>
            <iText
              v-if="['sapCode', 'svwTempCode', 'svwCode'].includes(item.key)"
              >{{ supplierComplete.supplierDTO[item.key] }}</iText
            >
            <iSelect
              v-model="supplierComplete.supplierDTO[item.key]"
              v-else-if="
                ['isForeignManufacture', 'supplierType'].includes(item.key)
              "
            >
              <el-option
                :value="child.value"
                :label="child.label"
                v-for="child in options[item.option]"
                :key="child.value"
              ></el-option>
            </iSelect>
            <iInput
              v-else
              v-model="supplierComplete.supplierDTO[item.key]"
            ></iInput>
          </iFormItem>
        </template>
      </iFormGroup>
    </iCard>
    <!-- 采购员信息 -->
    <linie
      ref="linie"
      :supplierData="supplierComplete.gpSupplierDetails"
      class="margin-bottom20"
    ></linie>
    <!-- 公司概况 -->
    <companyProfileGP
      class="margin-bottom20"
      ref="companyProfile"
      :country="country"
      :supplierData="supplierComplete"
      :fromGroup="fromGroup"
    >
    </companyProfileGP>
    <!-- 经营状态 -->
    <operationStatusGP
      ref="operationStatus"
      :supplierData="supplierComplete"
      :fromGroup="fromGroup"
    >
    </operationStatusGP>
    <opneBank
      ref="opneBank"
      class="margin-bottom20"
      :country="country"
      :supplierData="supplierComplete"
      :fromGroup="fromGroup"
    >
    </opneBank>
    <!-- 供货状态 -->
    <supplyStatus
      ref="supplyStatus"
      v-if="showSupply"
      :supplierData="supplierComplete"
      :fromGroup="fromGroup"
    >
    </supplyStatus>
  </iPage>
</template>

<script>
import {
  iPage,
  iCard,
  iButton,
  iFormGroup,
  iFormItem,
  iLabel,
  iInput,
  iSelect,
  iMessage,
  iText
} from 'rise'
import { baseRules, supplierCompleteRe, baseInfoTitle } from './data'
import opneBank from './components/opneBank'
import companyProfileGP from './components/companyProfileGP'
import linie from './components/linie'
import operationStatusGP from './components/operationStatusGP'
import supplyStatus from './components/supplyStatus'
import { tableData } from './components/data'
import { selectDictByKeys, getCityInfo } from '@/api/dictionary'
import { generalPageMixins } from '@/views/generalPage/commonFunMixins'
import { getInfosByCode } from '@/api/register/home'
import { supplierDetail } from '@/api/register/baseInfo'
import { saveOrUpdate } from '@/api/supplierManagement/supplierListIndirect/index'

export default {
  mixins: [generalPageMixins],
  components: {
    iPage,
    iCard,
    iButton,
    iFormGroup,
    iFormItem,
    iLabel,
    iInput,
    iText,
    iSelect,
    opneBank,
    companyProfileGP,
    linie,
    operationStatusGP,
    supplyStatus
  },
  data() {
    return {
      tableData,
      supplierCompleteRe,
      supplierComplete: {},
      baseRules,
      province: [],
      country: [],
      city: [],
      fromGroup: [],
      number: 0,
      onLoading: false,
      loadingType: false,
      countryDisabled: false,
      provinceDisabled: false,
      baseInfoTitle,
      options: {
        // 供应商类型
        supplierTypeList: [
          {
            label: '一般供应商',
            value: 'GP'
          },
          {
            label: '生产供应商',
            value: 'PP'
          },
          {
            label: '共用供应商',
            value: 'PD'
          }
        ],
        //是否大陆厂商
        isForeignCountryList: [
          { label: this.language('FOU', '否'), value: 1 },
          { label: this.language('SHI', '是'), value: 0 }
        ]
      }
    }
  },
  computed: {
    showSupply() {
      return this.$route.query.subSupplierId
    }
  },
  created() {
    this.supplierComplete = _.cloneDeep(this.supplierCompleteRe)
    this.getAllSelect()
    this.getCityInfo()
  },
  methods: {
    changeFact(val) {
      // this.$forceUpdate();
      console.log('-=-', this.baseRules.socialcreditNo)
      this.baseRules.socialcreditNo[0].required = !val
      this.$refs.baseInfoForm.clearValidate()
    },
    //获取国家
    getCityInfo() {
      let data = {
        parentCityId: -1,
        cityName: ''
      }
      getCityInfo(data).then((res) => {
        if (res.data) {
          this.country = res.data
        }
      })
    },
    // 根据社会信用代码获取供应商信息
    getInfosByCode() {
      if (!this.supplierComplete.supplierDTO.socialcreditNo) return
      getInfosByCode({
        code: this.supplierComplete.supplierDTO.socialcreditNo,
        type: this.supplierType == 3 ? 'bkra' : null
      }).then((res) => {
        if (res?.data) {
          for (let m in res.data) {
            if (res.data[m]) {
              this.supplierComplete.supplierDTO[m] = res.data[m]
            }
          }
          this.supplierComplete.supplierDTO.supplierType = 'GP'
          this.$set(
            this.supplierComplete.supplierDTO,
            'isForeignManufacture',
            res.data.isForeignManufacture
          )
          if (res.data.supplierToken) {
            this.$store.dispatch('setValiCode', res.data.supplierToken)
            this.supplierDetail()
          }
        } else {
          this.supplierComplete.supplierDTO = Object.assign(
            this.supplierComplete.supplierDTO,
            {
              nameZh: '',
              shortNameZh: '',
              nameEn: '',
              shortNameEn: ''
            }
          )
        }
        this.supplierAPIData = JSON.parse(
          JSON.stringify(this.supplierComplete.supplierDTO)
        )
      })
    },
    // 获取下拉框数据
    getAllSelect() {
      let data = [
        'FINANCIAL',
        'TREND',
        'PAYMENT',
        'OWNMODE',
        'ENTERPRISESIZE',
        'FINANCIAL',
        'SUPPLIER_TRADECODE',
        'ORGANIZATION_BUSINESS_SCOPE',
        'MARKADDRESS',
        'PROPERTIES_SUPPLY',
        'ENTERPRISE_PROPERTY',
        'TURE_FALSE',
        'LEGALSTATUS',
        'SUPPLY_OF_METERIAL_TYPE'
      ]
      let url = 'keys='
      url = url + data.join('&keys=')
      selectDictByKeys(url).then((res) => {
        if (res.data) {
          this.fromGroup = res.data
          this.supplierDetail()
        }
      })
    },
    // 获取基本信息
    supplierDetail() {
      if (!this.$route.query.supplierToken) return
      this.onLoading = true
      supplierDetail(this.supplierType, this.$route.query.supplierToken)
        .then((res) => {
          if (res.data) {
            //初始数据很多为null 需要重置为“” 不然会触发表单验证
            let supplierDTO = this.reView(res.data)
            console.log('supplierDTO=>', supplierDTO)
            supplierDTO.supplierInfoVo.isListing =
              supplierDTO.supplierInfoVo.isListing.toString()
            if (supplierDTO.gpSupplierInfoVO)
              this.supplierComplete.gpSupplierDTO = supplierDTO.gpSupplierInfoVO
            if (supplierDTO.ppSupplierInfoVo) {
              supplierDTO.ppSupplierInfoVo.isSign = supplierDTO.ppSupplierInfoVo
                .isSign
                ? '1'
                : '0'
              this.supplierComplete.ppSupplierDTO = supplierDTO.ppSupplierInfoVo
            }
            if (supplierDTO.gpSupplierDetails) {
              supplierDTO.gpSupplierDetails.forEach((e) => {
                if (e.isUse) {
                  e.industryPosition = 'Y'
                }
              })

              this.supplierComplete.gpSupplierDetails = _.cloneDeep(
                supplierDTO.gpSupplierDetails
              )
            } else {
              this.supplierComplete.gpSupplierDetails = _.cloneDeep(
                this.tableData
              )
            }
            if (supplierDTO.subBankVos) {
              this.supplierComplete.subBankList = supplierDTO.subBankVos
            }

            if (supplierDTO.gpSupplierBankNoteVO) {
              this.supplierComplete.gpSupplierBankNoteDTO =
                supplierDTO.gpSupplierBankNoteVO
            }

            if (supplierDTO.settlementBankVo) {
              if (
                !supplierDTO.settlementBankVo.bankTaxCode ||
                supplierDTO.settlementBankVo.bankTaxCode == ''
              ) {
                supplierDTO.settlementBankVo.bankTaxCode =
                  supplierDTO.supplierInfoVo.socialcreditNo
              }
              this.supplierComplete.settlementBankDTO =
                supplierDTO.settlementBankVo
            }
            if (supplierDTO.supplierInfoVo) {
              this.supplierComplete.supplierDTO = supplierDTO.supplierInfoVo
              this.supplierComplete.supplierDTO.address =
                supplierDTO.supplierInfoVo.companyAddress

              if (this.$route.query.subSupplierType == 'GP') {
                this.supplierComplete.supplierDTO.svwTempCode =
                  supplierDTO.gpSupplierInfoVO.svwTempCode
                this.supplierComplete.supplierDTO.svwCode =
                  supplierDTO.gpSupplierInfoVO.svwCode
                this.supplierComplete.supplierDTO.payHistory =
                  this.supplierComplete.gpSupplierDTO.payHistory
              }
            }
            this.$refs.companyProfile.changeListing()
            if (this.supplierComplete.supplierDTO.epNatureCategory)
              this.$refs.companyProfile.getEpNatureSubcategorySelect()
            if (this.supplierComplete.supplierDTO.countryCode)
              if (this.supplierComplete.supplierDTO.countryCode.length >= 6) {
                this.$refs.companyProfile.getProvince()
              } else {
                this.$refs.companyProfile.getProvince(true)
              }
            if (this.supplierComplete.supplierDTO.provinceCode) {
              if (this.supplierComplete.supplierDTO.provinceCode.length >= 6) {
                this.$refs.companyProfile.getCity()
              } else {
                this.$refs.companyProfile.getCity(true)
              }
            }
            if (this.supplierComplete.settlementBankDTO.countryCode) {
              if (
                this.supplierComplete.settlementBankDTO.countryCode.length >= 6
              ) {
                this.$refs.opneBank.getBankProvince()
              } else {
                this.$refs.opneBank.getBankProvince(true)
              }
            }
            if (this.supplierComplete.settlementBankDTO.provinceCode) {
              if (
                this.supplierComplete.settlementBankDTO.provinceCode.length >= 6
              ) {
                this.$refs.opneBank.getBankCity()
              } else {
                this.$refs.opneBank.getBankCity(true)
              }
            }
            if (this.supplierComplete.gpSupplierBankNoteDTO.country)
              this.$refs.opneBank.getYP()
            if (this.supplierComplete.subBankList)
              this.$refs.opneBank.getSubBank()

            setTimeout(() => {
              this.$refs.opneBank.getType()
            }, 100)
            this.$forceUpdate()
          }
        })
        .finally(() => {
          this.onLoading = true
        })
    },
    // 调整详情数据
    reView(data) {
      for (let i in data) {
        if (data[i]) {
          for (let k in data[i]) {
            if (data[i][k] == null || k == 'createDate' || k == 'updateDate') {
              data[i][k] = ''
            }
            if (k == 'registeredCapital') {
              data[i][k] = data[i][k] + ''
            }
          }
        }
      }
      return data
    },

    getRule1() {
      return new Promise((resolve, reject) => {
        this.$refs.baseInfoForm.validate((valid, object) => {
          console.log(valid)
          if (valid) {
            resolve(valid)
          } else {
            return false
          }
        })
      })
    },
    getRule2() {
      return new Promise((resolve, reject) => {
        this.$refs.companyProfile.$refs.formRules.validate((valid, object) => {
          console.log(valid)
          if (valid) {
            resolve(valid)
          } else {
            return false
          }
        })
      })
    },
    // 开户行
    getRule3() {
      //bank
      return new Promise((resolve, reject) => {
        this.$refs.opneBank.$refs.bankRules1.validate((valid, object) => {
          console.log(valid)
          if (valid) {
            resolve(valid)
          } else {
            return false
          }
        })
      })
    },
    // 子银行账号
    getRule4() {
      //bank
      var that = this
      that.number = 0
      return new Promise((resolve, reject) => {
        that.supplierComplete.subBankList.forEach((e, index) => {
          var bankRulesDTO = 'bankRulesDTO' + index
          var rule = that.$refs.opneBank.$refs
          rule[bankRulesDTO][0].validate((valid, object) => {
            console.log(valid)
            if (valid) {
            } else {
              that.number++
            }
          })
        })
        setTimeout(() => {
          if (that.number == 0) {
            resolve()
          } else {
            return false
          }
        }, 0)
      })
    },
    // 经营状态
    getRule5() {
      //operationStatus
      return new Promise((resolve, reject) => {
        let flag = true
        this.$refs.operationStatus.$refs.businessRules1.validate((valid) => {
          flag = flag && valid
        })
        this.$refs.operationStatus.$refs.businessRules.validate((valid) => {
          flag = flag && valid
        })
        resolve(flag)
      })
    },
    // linie
    getRule6() {
      //linie
      return new Promise((resolve, reject) => {
        this.$refs.linie.$refs.commonTable.$refs.commonTableForm.validate(
          (valid, object) => {
            console.log(valid)
            if (valid) {
              resolve(valid)
            } else {
              return false
            }
          }
        )
      })
    },

    save() {
      return new Promise((resolve, reject) => {
        Promise.all([
          this.getRule1(),
          this.getRule2(),
          this.getRule3(),
          this.getRule4(),
          this.getRule5(),
          this.getRule6()
        ]).then((res) => {
          this.loadingType = true
          this.$refs.companyProfile.getCityName()
          var data = _.cloneDeep(this.supplierComplete)
          data.supplierDTO.postCode = data.supplierDTO.post
          data.subBankList.forEach((e) => {
            delete e.bankCity
            delete e.bankProvince
          })
          if (this.$route.query.subSupplierId) {
            data.supplierId = this.$route.query.subSupplierId
          }
          setTimeout(() => {
            saveOrUpdate(data)
              .then((res) => {
                if (res.result) {
                  this.loadingType = false
                  this.$router.go(-1)
                } else {
                  this.loadingType = false
                  iMessage.error(res.desZh)
                }
              })
              .catch((res) => {
                this.loadingType = false
              })
          }, 500)
        })
      })
    },
    cancle() {
      this.$router.go(-1)
    }
  }
}
</script>