<!--
* @author:shujie
* @Date: 2021-4-13 16:56:56
* @Description: 基本信息
 -->
<template>
  <div class="baseInfo">
    <div class="save margin-bottom20">
      <iButton @click="saveInfos()"
               v-permission="SUPPLIER_BASEINFO_COMPANY_BASEINFO_SAVEALL">保存</iButton>
    </div>
    <!-- <basic ref="basic" class="margin-bottom20" :supplierData="supplierComplete.supplierDTO"
			@changeBaseInfo='basicChange'></basic> -->
    <baseInfoCard ref="baseInfoCard" />
    <linie ref="linie" :supplierData="supplierComplete.supplierDTO" v-if="$route.query.subSupplierType=='GP'"></linie>
    <buyer ref="buyer" v-if="$route.query.subSupplierType!=='GP'"
           :supplierData="supplierComplete.supplierDTO"
           disabled
           class="margin-bottom20"></buyer>
    <companyProfile ref="companyProfile"
                    :country="country"
                    :supplierData="supplierComplete"
                    :fromGroup="fromGroup">
    </companyProfile>
    <!-- 经营状态 -->
    <operationStatus ref="operationStatus"
                     :supplierData="supplierComplete"
                     :fromGroup="fromGroup"
                     v-if="isPP">
    </operationStatus>
    <!-- 开户银行 -->
    <opneBank ref="opneBank"
              :country="country"
              :supplierData="supplierComplete"
              :fromGroup="fromGroup"></opneBank>
    <!-- 供货状态 -->
    <supplyStatus ref='supplyStatus'
                  :supplierData="supplierComplete"
                  :fromGroup="fromGroup">
    </supplyStatus>
    <!-- 内部评价 -->
    <!-- <comment  :supplierData="supplierComplete"></comment> -->
  </div>
</template>

<script>
import {
  iButton,
  iMessage
} from 'rise';
import {
  supplierComplete
} from "./components/data";
import linie from './components/linie'
import {
  saveInfos,
  supplierDetail
} from "@/api/register/baseInfo";
import {
  selectDictByKeys,
  getCityInfo
} from "@/api/dictionary";
import {
  generalPageMixins
} from '@/views/generalPage/commonFunMixins';
// import basic from "../home/components/basic";
import companyProfile from "./components/companyProfile"
import supplyStatus from './components/supplyStatus';
// import comment from './components/comment';
import operationStatus from './components/operationStatus';
import opneBank from './components/opneBank';
import buyer from "../home/components/buyer";
import baseInfoCard from '@/views/generalPage/components/baseInfoCard'
import {
  baseInfoSubmit
} from "../../../api/supplier360/baseInfo";

export default {
  mixins: [generalPageMixins],
  components: {
    // basic,
    supplyStatus,
    // comment,
    companyProfile,
    operationStatus,
    opneBank,
    iButton,
    buyer,
    baseInfoCard,
    linie
  },
  data () {
    return {
      supplierComplete, //详情信息入参
      fromGroup: {}, //下拉框值
      country: []
    }
  },
  created () {
    this.getAllSelect()
    this.getCityInfo()
    // if (this.$store.state.home.valiCode) {
    // 	this.supplierDetail()
    // }
  },
  mounted () {

  },
  computed: {
    isPP () {
      if (this.supplierComplete.supplierDTO.supplierType == 'GP' && this.supplierType == 1) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    // 获取基本信息
    supplierDetail () {
      this.$parent.$parent.onLoading = true
      supplierDetail(this.supplierType).then(res => {
        if (res.data) {
          //初始数据很多为null 需要重置为“” 不然会触发表单验证
          let baseInfo = this.reView(res.data)
          this.$parent.$parent.onLoading = false
          baseInfo.supplierInfoVo.isListing = baseInfo.supplierInfoVo.isListing.toString()
          if (baseInfo.gpSupplierInfoVO) this.supplierComplete.gpSupplierDTO = baseInfo
            .gpSupplierInfoVO
          if (baseInfo.ppSupplierInfoVo) {
            baseInfo.ppSupplierInfoVo.isSign = baseInfo.ppSupplierInfoVo.isSign ? '1' : '0'
            this.supplierComplete.ppSupplierDTO = baseInfo.ppSupplierInfoVo
          }
          if (baseInfo.settlementBankVo) {
            if (!baseInfo.settlementBankVo.bankTaxCode || baseInfo.settlementBankVo.bankTaxCode == '') {
              baseInfo.settlementBankVo.bankTaxCode = baseInfo.supplierInfoVo.socialcreditNo
            }
            this.supplierComplete.settlementBankDTO = baseInfo.settlementBankVo

          }
          if (baseInfo.supplierInfoVo) this.supplierComplete.supplierDTO = baseInfo.supplierInfoVo
          // 如果是查看修改 需要从不同的表获取 基础信息
          // if (baseInfo.gpSupplierInfoVO) {
          // 	baseInfo.supplierInfoVo.svwTempCode = baseInfo.gpSupplierInfoVO.svwTempCode
          // 	baseInfo.supplierInfoVo.vmCode = ""
          // } else {
          // 	baseInfo.supplierInfoVo.svwTempCode = baseInfo.ppSupplierInfoVo.svwTempCode
          // 	baseInfo.supplierInfoVo.svwCode = baseInfo.ppSupplierInfoVo.svwCode
          // 	baseInfo.supplierInfoVo.vmCode = baseInfo.ppSupplierInfoVo.vmCode
          // }
          this.$store.dispatch('setBaseInfo', this.supplierComplete)
          // vw号可以修改
          this.$refs.baseInfoCard.changeTitle()
          //如果有详情，则获取下拉框数据 回显
          this.$refs.companyProfile.changeListing()
          if (this.supplierComplete.supplierDTO.epNatureCategory) this.$refs.companyProfile.getEpNatureSubcategorySelect()
          if (this.supplierComplete.supplierDTO.countryCode) this.$refs.companyProfile.getCity()
          if (this.supplierComplete.supplierDTO.provinceCode) this.$refs.companyProfile.getProvince()
          if (this.supplierComplete.settlementBankDTO.countryCode) this.$refs.opneBank.getBankProvince()
          if (this.supplierComplete.settlementBankDTO.provinceCode) this.$refs.opneBank.getBankCity()
        }
      })
    },
    // 调整详情数据
    reView (data) {
      for (let i in data) {
        if (data[i]) {
          for (let k in data[i]) {
            if (data[i][k] == null || k == 'createDate' || k == 'updateDate') {
              data[i][k] = ""
            }
            if (k == 'registeredCapital') {
              data[i][k] = data[i][k] + ""
            }
          }
        }
      }
      return data
    },
    basicChange (data) {
      for (let i in data) {
        this.supplierComplete.supplierDTO[i] = data[i]
      }
    },
    // 保存基本信息
    saveInfos (step = '') {
      return new Promise((resolve, reject) => {
        Promise.all([this.isBaseInfoRules(), this.isBusinessRules()]).then(res => {
          // 获取国家 城市 相应的name
          this.$refs.companyProfile.getCityName()
          this.$refs.opneBank.getCityName()
          let data = {
            stepCode: 'submit',
            supplierDTO: this.supplierComplete.supplierDTO,
            settlementBankDTO: this.supplierComplete.settlementBankDTO
          }
          // 判断是一般还是生产供应商 减去相应参数
          if (this.supplierComplete.supplierDTO.supplierType == 'GP') {
            data.gpSupplierDTO = this.supplierComplete.gpSupplierDTO
          } else {
            data.ppSupplierDTO = this.supplierComplete.ppSupplierDTO
          }
          saveInfos(data, this.supplierType).then(res => {
            if (res.data) {
              iMessage.success('保存成功')
              if (step === 'submit') {
                const req = {
                  stepCode: 'submit',
                  userId: this.$store.state.permission.userInfo.id
                }
                baseInfoSubmit(req).then((res) => {
                  this.resultMessage(res)
                })
              }
              resolve(true)
            } else {
              iMessage.error(res.desZh)
            }
          })
        })
      })
    },
    async handleNextStep () {
      const nextStep = await this.saveInfos()
      return nextStep
    },
    // 基础信息校验
    isBaseInfoRules () {
      return new Promise((resolve, reject) => {
        this.$refs.companyProfile.$refs.baseInfoRules.validate((valid, object) => {
          if (valid) {
            resolve(valid)
          } else {
            return false;
            // this.$nextTick(() => {
            // 	let isError = document.getElementsByClassName(
            // 		'el-form-item__error')
            // 	isError[0].scrollIntoView({
            // 		// 值有start,center,end，nearest，当前显示在视图区域中间
            // 		block: 'center',
            // 		// 值有auto、instant,smooth，缓动动画（当前是慢速的）
            // 		behavior: 'smooth'
            // 	})
            // 	return false;
            // })
          }
        });
      })
    },
    // 经营状态校验
    isBusinessRules () {
      if (this.isPP) {
        return new Promise((resolve, reject) => {
          this.$refs.operationStatus.$refs.businessRules.validate((valid) => {
            if (valid) {
              resolve(valid)
            } else {
              return false;
            }
          });
        })
      } else {
        return true
      }
    },
    // 获取下拉框数据
    getAllSelect () {
      let data = ['FINANCIAL', 'TREND', 'PAYMENT', 'OWNMODE', 'ENTERPRISESIZE', 'FINANCIAL',
        'SUPPLIER_TRADECODE', 'ORGANIZATION_BUSINESS_SCOPE', 'MARKADDRESS', 'PROPERTIES_SUPPLY',
        'ENTERPRISE_PROPERTY', 'TURE_FALSE', 'LEGALSTATUS', 'SUPPLY_OF_METERIAL_TYPE'
      ]
      let url = 'keys='
      url = url + data.join('&keys=')
      selectDictByKeys(url).then(res => {
        if (res.data) {
          this.fromGroup = res.data
          if (this.$store.state.home.valiCode) {
            this.supplierDetail()
          }
        }
      })
    },
    //获取国家
    getCityInfo () {
      let data = {
        parentCityId: -1,
        cityName: ''
      }
      getCityInfo(data).then(res => {
        if (res.data) {
          this.country = res.data
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.save {
  text-align: right;
}
</style>
