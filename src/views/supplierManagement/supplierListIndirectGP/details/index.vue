<template>
  <iPage :loading="onLoading">
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">间接物料供应商</span>
      <div class="floatright">
        <i-button v-permission="SUPPLIER_INDIRECT_BASEINFO_SUBMIT" :loading="loadingType" @click="save">{{
          $t('LK_TIJIAO')
        }}</i-button>
        <i-button v-permission="SUPPLIER_INDIRECT_BASEINFO_CANCLE" :loading="loadingType" @click="cancle">{{
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
              :disabled="$route.query.subSupplierId && canNotEdit"
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
              :disabled="$route.query.subSupplierId && canNotEdit"
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
            <iSelect
              v-model="supplierComplete.supplierDTO[item.key]"
              v-if="['isForeignManufacture'].includes(item.key)"
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
              :disabled="canNotEdit && !supplierComplete.supplierDTO.isForeignManufacture"
              v-model="supplierComplete.supplierDTO[item.key]"
            ></iInput>
          </iFormItem>
        </template>
      </iFormGroup>
    </iCard>
    <!-- 公司概况 -->
    <companyProfileGP
      class="margin-bottom20"
      ref="companyProfile"
      :country="country"
      :canNotEdit="canNotEdit"
      :supplierData="supplierComplete"
    >
    </companyProfileGP>
    <!-- 开户银行 -->
    <opneBank
      ref="opneBank"
      class="margin-bottom20"
      :country="country"
      :canNotEdit="canNotEdit"
      :supplierData="supplierComplete"
    >
    </opneBank>
    <!-- 联系人信息 -->
    <mailList
      ref="mailList"
      :canNotEdit="canNotEdit"
      :supplierData="supplierComplete"
      :mailListData="mailListData"
      class="margin-bottom20"
    ></mailList>
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
import mailList from './components/mailList'
import { getCityInfo } from '@/api/dictionary'
import { generalPageMixins } from '@/views/generalPage/commonFunMixins'
import { getInfosByCode } from '@/api/register/home'
import { supplierDetail } from '@/api/register/baseInfo'
import {
  saveOrUpdate,
  listSupplierUser,
  getSupplierByNameOrSocialCode
} from '@/api/supplierManagement/supplierListIndirect/index'
import { updateSupplierUser } from '@/api/mainDataSupplier/list/user'

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
    mailList
  },
  data() {
    return {
      supplierCompleteRe,
      supplierComplete: {},
      baseRules,
      country: [],
      number: 0,
      onLoading: false,
      loadingType: false,
      baseInfoTitle,
      options: {
        //是否大陆厂商
        isForeignCountryList: [
          { label: this.language('FOU', '否'), value: 1 },
          { label: this.language('SHI', '是'), value: 0 }
        ]
      },
      mailListData: [
        {
          nameZh: '',
          designation: '',
          dept: '',
          telephoneAreaCode: '',
          telephone: '',
          email: '',
          userName: ''
        }
      ]
    }
  },
  computed:{
    canNotEdit(){
      let onlyDc = false
      let isGP = this.supplierComplete.supplierDTO?.supplierType == 'GP'
      let hasGpDetails = this.supplierComplete.gpSupplierDetails&&this.supplierComplete.gpSupplierDetails.length==1
      if(hasGpDetails && this.supplierComplete.gpSupplierDetails[0].businessType==4){
        onlyDc = true
      }
      if(this.$route.query.supplierToken){  // 编辑时，只有间接供应商一个身份(GP类型，只有一个业务4)时可以编辑
        return !(onlyDc && isGP)
      }else{  // 注册时
        return !!this.supplierComplete?.supplierDTO?.supplierType // 没有注册过，都可以编辑
      }
    },
  },
  created() {
    this.supplierComplete = _.cloneDeep(this.supplierCompleteRe)
    this.supplierDetail()
    this.getCityInfo()
  },
  methods: {
    // 切换是否大陆厂商
    changeFact(val) {
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
      // 国内供应商没有社会信用代码就不查询
      if (!this.supplierComplete.supplierDTO.socialcreditNo) return
      const socialcreditNo = this.supplierComplete.supplierDTO.socialcreditNo
      getSupplierByNameOrSocialCode({
        isForeignManufacture:
          this.supplierComplete.supplierDTO.isForeignManufacture,
        nameEn: this.supplierComplete.supplierDTO.nameEn,
        nameZh: this.supplierComplete.supplierDTO.nameZh,
        socialcreditNo: this.supplierComplete.supplierDTO.socialcreditNo
      }).then((res) => {
        if (res?.data) {
          //初始数据很多为null 需要重置为“” 不然会触发表单验证
          let supplierDTO = this.reView(res.data)
          // 供应商信息
          this.supplierComplete.gpSupplierDetails = supplierDTO.gpSupplierDetails || []
          // 银行子账号
          if (supplierDTO.subBankVos) {
            this.supplierComplete.subBankList = supplierDTO.subBankVos
          }
          // GP电子银票DTO
          if (supplierDTO.gpSupplierBankNoteVO) {
            this.supplierComplete.gpSupplierBankNoteDTO =
              supplierDTO.gpSupplierBankNoteVO
          }
          // 银行
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
          // 基本信息
          if (supplierDTO.supplierInfoVo) {
            this.supplierComplete.supplierDTO = supplierDTO.supplierInfoVo
            this.supplierComplete.supplierDTO.address =
              supplierDTO.supplierInfoVo.companyAddress

            if (this.$route.query.subSupplierType == 'GP') {
              this.supplierComplete.supplierDTO.svwTempCode =
                supplierDTO.gpSupplierInfoVO?.svwTempCode
              this.supplierComplete.supplierDTO.svwCode =
                supplierDTO.gpSupplierInfoVO?.svwCode
            }
          }
          // GP信息
          this.supplierComplete.gpSupplierDTO =
            supplierDTO.gpSupplierInfoVO || {}
          if (this.supplierComplete.supplierDTO.countryCode) {
            if (this.supplierComplete.supplierDTO.countryCode.length >= 6) {
              this.$refs.companyProfile.getProvince()
            } else {
              this.$refs.companyProfile.getProvince(true)
            }
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
          // 是否大陆厂商 校验必填项
          this.changeFact(
            this.supplierComplete.supplierDTO.isForeignManufacture
          )
          if(res.data.gpSupplierInfoVO?.id)
          listSupplierUser(res.data.gpSupplierInfoVO.id).then((res) => {
            if (res?.code == 200) {
              this.mailListData = res.data?.list || [
                {
                  nameZh: '',
                  designation: '',
                  dept: '',
                  telephoneAreaCode: '',
                  telephone: '',
                  email: '',
                  userName: ''
                }
              ]
            } else {
              iMessage.error('获取供应商联系人信息失败')
            }
          })
          setTimeout(() => {
            this.$refs.opneBank.getType()
          }, 100)
          this.$forceUpdate()
        } else {
          let supplierComplete = _.cloneDeep(this.supplierCompleteRe)
          supplierComplete.supplierDTO.socialcreditNo = socialcreditNo
          this.supplierComplete = supplierComplete
          this.mailListData = [
            {
              nameZh: '',
              designation: '',
              dept: '',
              telephoneAreaCode: '',
              telephone: '',
              email: '',
              userName: ''
            }
          ]
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
            // 供应商信息
            this.supplierComplete.gpSupplierDetails = supplierDTO.gpSupplierDetails || []
            // 银行子账号
            if (supplierDTO.subBankVos) {
              this.supplierComplete.subBankList = supplierDTO.subBankVos
            }
            // GP电子银票DTO
            if (supplierDTO.gpSupplierBankNoteVO) {
              this.supplierComplete.gpSupplierBankNoteDTO =
                supplierDTO.gpSupplierBankNoteVO
            }
            // 银行
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
            // 基本信息
            if (supplierDTO.supplierInfoVo) {
              this.supplierComplete.supplierDTO = supplierDTO.supplierInfoVo
              this.supplierComplete.supplierDTO.address =
                supplierDTO.supplierInfoVo.companyAddress

              if (this.$route.query.subSupplierType == 'GP') {
                this.supplierComplete.supplierDTO.svwTempCode =
                  supplierDTO.gpSupplierInfoVO.svwTempCode
                this.supplierComplete.supplierDTO.svwCode =
                  supplierDTO.gpSupplierInfoVO.svwCode
              }
            }
            // GP信息
            this.supplierComplete.gpSupplierDTO =
              supplierDTO.gpSupplierInfoVO || {}
            if (this.supplierComplete.supplierDTO.countryCode) {
              if (this.supplierComplete.supplierDTO.countryCode.length >= 6) {
                this.$refs.companyProfile.getProvince()
              } else {
                this.$refs.companyProfile.getProvince(true)
              }
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
            // 是否大陆厂商 校验必填项
            this.changeFact(
              this.supplierComplete.supplierDTO.isForeignManufacture
            )
            listSupplierUser(res.data.gpSupplierInfoVO.id).then((res) => {
              if (res?.code == 200) {
                this.mailListData = res.data?.list || [
                  {
                    nameZh: '',
                    designation: '',
                    dept: '',
                    telephoneAreaCode: '',
                    telephone: '',
                    email: '',
                    userName: ''
                  }
                ]
              } else {
                iMessage.error('获取供应商联系人信息失败')
              }
            })
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
    // 基本信息校验
    getRule1() {
      return new Promise((resolve, reject) => {
        this.$refs.baseInfoForm.validate((valid, object) => {
          if (valid) {
            resolve(valid)
          } else {
            return reject(false)
          }
        })
      })
    },
    // 公司概览校验
    getRule2() {
      return new Promise((resolve, reject) => {
        this.$refs.companyProfile.$refs.formRules.validate((valid, object) => {
          if (valid) {
            resolve(valid)
          } else {
            return reject(false)
          }
        })
      })
    },
    // 开户行
    getRule3() {
      //bank
      return new Promise((resolve, reject) => {
        this.$refs.opneBank.$refs.bankRules1.validate((valid, object) => {
          if (valid) {
            resolve(valid)
          } else {
            return reject(false)
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
            return reject(false)
          }
        }, 0)
      })
    },
    // 联系人
    getRule5() {
      //mailList
      return new Promise((resolve, reject) => {
        this.$refs.mailList.$refs.commonTable.$refs.commonTableForm.validate(
          (valid, object) => {
            if (valid) {
              resolve(valid)
            } else {
              return reject(false)
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
          this.getRule5()
        ]).then((res) => {
          console.log(res);
          this.loadingType = true
          this.$refs.companyProfile.getCityName()
          // if(!this.$route.query.subSupplierId){
          this.supplierComplete.contactsSaveDTO.list =
            this.$refs.mailList.tableListData
          // }else{
          //   console.log(this.supplierComplete);
          //   let data = this.$refs.mailList.tableListData.map(item=>{
          //     return {
          //       ...item,
          //       supplierId: item.supplierId || this.supplierComplete.gpSupplierDTO.id
          //     }
          //   })
          //   // 保存联系人
          //   updateSupplierUser(data).then(res=>{
          //     if(res?.code==200){
          //       iMessage.success(res.desZh || '联系人保存成功')
          //     }else{
          //       iMessage.error(res.desZh || '联系人保存失败')
          //     }
          //   })
          // }
          var data = _.cloneDeep(this.supplierComplete)
          data.supplierDTO.postCode = data.supplierDTO.post
          data.subBankList.forEach((e) => {
            delete e.bankCity
            delete e.bankProvince
          })
          // 子银行信息放到gpSupplierSubBankListSaveDTO里面
          data.gpSupplierSubBankListSaveDTO = { list: data.subBankList }
          if (this.$route.query.subSupplierId) {
            data.supplierId = this.$route.query.subSupplierId
          }
          if (this.supplierComplete.supplierDTO.isForeignManufacture == '0') {
            this.supplierComplete.settlementBankDTO.bankTaxCode =
              this.supplierComplete.supplierDTO.socialcreditNo
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
        }).catch((err)=>{
          if(this.supplierComplete.supplierDTO.supplierType=='GP'){
            return iMessage.warn('请在一般采购供应商管理页面完善信息后再提交')
          }else if(['PP','PD'].includes(this.supplierComplete.supplierDTO.supplierType)) {
            return iMessage.warn('请在生产采购供应商管理页面完善信息后再提交')
          }
        })
      })
    },
    cancle() {
      this.$router.go(-1)
    }
  }
}
</script>