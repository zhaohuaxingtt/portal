<template>
  <iCard tabCard
         collapse
         :title="$t('GONGSIGAIKANG')">
    <iFormGroup row="3"
                :rules="baseInfoRules"
                :model="supplierData"
                ref="baseInfoRules">
      <!-- 法定代表人 -->
      <iFormItem prop="supplierDTO.legalPerson">
        <iLabel :label="$t('LegalPerson')"
                required
                slot="label"></iLabel>
        <iInput v-model="supplierData.supplierDTO.legalPerson"
                v-if="$route.query.subSupplierType !== 'GP'"
                v-permission.edit="SUPPLIER_BASEINFO_COMPANY_LEGALPERSON"
                :placeholder="$t('LK_QINGSHURU') + $t('LegalPerson')"></iInput>
        <iInput v-model="supplierData.supplierDTO.legalPerson" v-else
                :placeholder="$t('LK_QINGSHURU') + $t('LegalPerson')"></iInput>
      </iFormItem>
      <!-- 企业规模 -->
      <iFormItem prop="supplierDTO.companySize"
                 v-permission="SUPPLIER_BASEINFO_COMPANY_COMPANYSIZE">
        <iLabel :label="$t('companySize')"
                required
                slot="label"></iLabel>
        <iSelect v-model="supplierData.supplierDTO.companySize">
          <el-option :value="item.code"
                     :label="item.name"
                     v-for="(item, index) in fromGroup.ENTERPRISESIZE"
                     :key="index"></el-option>
        </iSelect>
      </iFormItem>
      <!-- 经营状态 -->
      <iFormItem prop="supplierDTO.businessState"
                 v-permission="SUPPLIER_BASEINFO_COMPANY_BUSINESSSTATUS">
        <iLabel :label="$t('JINGYINGZHUANGTAI')"
                required
                slot="label"></iLabel>
        <iSelect v-model="supplierData.supplierDTO.businessState">
          <el-option :value="item.code"
                     :label="item.name"
                     v-for="(item, index) in fromGroup.FINANCIAL"
                     :key="index"></el-option>
        </iSelect>
      </iFormItem>
      <!-- 企业类型 -->
      <iFormItem prop="supplierDTO.enterpriseType"
                 v-permission="SUPPLIER_BASEINFO_COMPANY_ENTERPRISETYPE">
        <iLabel :label="$t('EnterpriseType')"
                required
                slot="label"></iLabel>
        <iSelect v-model="supplierData.supplierDTO.enterpriseType">
          <el-option :value="item.code"
                     :label="item.name"
                     v-for="(item, index) in fromGroup.LEGALSTATUS"
                     :key="index"></el-option>
        </iSelect>
      </iFormItem>
      <!-- 企业性质（大类） -->
      <iFormItem prop="supplierDTO.epNatureCategory"
                 v-permission="SUPPLIER_BASEINFO_COMPANY_EPNATURECATEGORY">
        <iLabel :label="$t('epNatureCategory')"
                required
                slot="label"></iLabel>
        <iSelect v-model="supplierData.supplierDTO.epNatureCategory"
                 @change="getEpNatureSubcategorySelect(true)">
          <el-option :value="item.code"
                     :label="item.name"
                     v-for="(item, index) in fromGroup.ENTERPRISE_PROPERTY"
                     :key="index"></el-option>
        </iSelect>
      </iFormItem>
      <!-- 企业性质（小类） -->
      <iFormItem prop="supplierDTO.epNatureSubcategory"
                 v-permission="SUPPLIER_BASEINFO_COMPANY_COMPANYNATURE">
        <iLabel :label="$t('QIYEXINGZHI')"
                required
                slot="label"></iLabel>
        <iSelect v-model="supplierData.supplierDTO.epNatureSubcategory">
          <el-option :value="item.code"
                     :label="item.name"
                     v-for="(item, index) in epNatureSubcategorySelect"
                     :key="index"></el-option>
        </iSelect>
      </iFormItem>
      <!-- 所属行业 -->
      <iFormItem prop="">
        <iLabel :label="$t('Industry')"
                required
                slot="label"
                v-permission="SUPPLIER_BASEINFO_COMPANY_INDUSTRY"></iLabel>
        <iSelect v-model="supplierData.supplierDTO.industry"
                 @change="getIndustryCode">
          <el-option :value="item.code"
                     :label="item.name"
                     v-for="(item, index) in fromGroup.SUPPLIER_TRADECODE"
                     :key="index"></el-option>
        </iSelect>
      </iFormItem>
      <!-- 行业代码 -->
      <iFormItem>
        <iLabel :label="$t('industryCode')"
                required
                slot="label"
                v-permission="SUPPLIER_BASEINFO_COMPANY_INDUSTRYCODE"></iLabel>
        <iText>{{isIndustryCode}}</iText>
      </iFormItem>
      <!-- 业务范围 -->
      <iFormItem prop="supplierDTO.businessOfScope"
                 v-permission="SUPPLIER_BASEINFO_COMPANY_SCOPEOFBUSINESS">
        <iLabel :label="$t('YEWUFANWEI')"
                required
                slot="label"></iLabel>
        <iSelect v-model="supplierData.supplierDTO.businessOfScope">
          <el-option :value="item.code"
                     :label="item.name"
                     v-for="(item, index) in fromGroup.ORGANIZATION_BUSINESS_SCOPE"
                     :key="index"></el-option>
        </iSelect>
      </iFormItem>
      <!-- 是否上市 -->
      <iFormItem prop="supplierDTO.isListing"
                 v-permission="SUPPLIER_BASEINFO_COMPANY_ISLISTING">
        <iLabel :label="$t('IsListing')"
                required
                slot="label"></iLabel>
        <iSelect v-model="supplierData.supplierDTO.isListing"
                 @change="changeListing">
          <el-option :value="item.code"
                     :label="item.name"
                     v-for="(item, index) in fromGroup.TURE_FALSE"
                     :key="index"></el-option>
        </iSelect>
      </iFormItem>
      <!-- 上市地点 -->
      <iFormItem prop="supplierDTO.listingAddress"
                 :rules="listingAddress"
                 ref="listingAddressItem"
                 v-permission="SUPPLIER_BASEINFO_COMPANY_LISTINGADDRESS">
        <iLabel :label="$t('listingAddress')"
                :required="isListing"
                slot="label"></iLabel>
        <iSelect v-model="supplierData.supplierDTO.listingAddress"
                 :disabled="!isListing">
          <el-option :value="item.code"
                     :label="item.name"
                     v-for="(item, index) in fromGroup.MARKADDRESS"
                     :key="index"></el-option>
        </iSelect>
      </iFormItem>
      <!-- 股票代码 -->
      <iFormItem prop="supplierDTO.stockCode"
                 :rules="stockCode"
                 ref="stockCodeItem"
                 v-permission="SUPPLIER_BASEINFO_COMPANY_CODEOFSTOCK">
        <iLabel :label="$t('GUPIAODAIMA')"
                :required="isListing"
                slot="label"></iLabel>
        <iInput v-model="supplierData.supplierDTO.stockCode"
                :placeholder="$t('LK_QINGSHURU') + $t('GUPIAODAIMA')"
                :disabled="!isListing"></iInput>
      </iFormItem>
      <!-- 注册资本 -->
      <iFormItem prop="supplierDTO.registeredCapital"
                 v-permission="SUPPLIER_BASEINFO_COMPANY_REGISTEREDCAPITAL">
        <iLabel :label="$t('SUPPLIER_ZHUCEZIBEN')"
                required
                slot="label"></iLabel>
        <iInput v-model="supplierData.supplierDTO.registeredCapital"
                :placeholder="$t('LK_QINGSHURU') + $t('SUPPLIER_ZHUCEZIBEN')"></iInput>
      </iFormItem>
      <!-- 注册日期 -->
      <iFormItem prop="supplierDTO.registeredDate"
                 v-permission="SUPPLIER_BASEINFO_COMPANY_REGISTEREDDATE">
        <iLabel :label="$t('registeredDate')"
                required
                slot="label"></iLabel>
        <iDatePicker style="width: 100%"
                     value-format="yyyy-MM-dd"
                     type="date"
                     :placeholder="$t('SUPPLIER_XUANZERQI')"
                     v-model="supplierData.supplierDTO.registeredDate"
                     :picker-options="{
            disabledDate(time) {
              return time.getTime() > Date.now()
            }
          }"></iDatePicker>
      </iFormItem>
      <!-- 供货属性 -->
      <iFormItem prop="supplierDTO.supplyProperty"
                 v-permission="SUPPLIER_BASEINFO_COMPANY_SUPPLIERSTATUS">
        <iLabel :label="$t('GONGHUOSHUXING')"
                required
                slot="label"></iLabel>
        <iSelect v-model="supplierData.supplierDTO.supplyProperty">
          <el-option :value="item.code"
                     :label="item.name"
                     v-for="(item, index) in fromGroup.PROPERTIES_SUPPLY"
                     :key="index"></el-option>
        </iSelect>
      </iFormItem>





      <!-- 国家 -->
      <iFormItem prop="supplierDTO.countryCode"
                 v-permission="SUPPLIER_BASEINFO_COMPANY_NATION">
        <iLabel :label="$t('SUPPLIER_GUOJIA')"
                required
                slot="label"></iLabel>
        <iSelect v-model="supplierData.supplierDTO.countryCode" v-show="!supplierData.supplierDTO.countryCode || supplierData.supplierDTO.countryCode.length>='6'"
                 @change="changeCountry($event)">
          <el-option :value="item.cityIdStr"
                     :label="item.cityNameCn"
                     v-for="(item, index) in country"
                     :key="index"></el-option>
        </iSelect>
        <iSelect v-model="supplierData.supplierDTO.countryCode" v-show="!(!supplierData.supplierDTO.countryCode || supplierData.supplierDTO.countryCode.length>='6')"
                 @change="changeCountry($event,true)">
          <el-option :value="item.sapLocationCode"
                     :label="item.cityNameCn"
                     v-for="(item, index) in country"
                     :key="index"></el-option>
        </iSelect>
      </iFormItem>
      <!-- 省份 -->
      <iFormItem prop="supplierDTO.provinceCode"
                 v-permission="SUPPLIER_BASEINFO_COMPANY_PROVINCE">
        <iLabel :label="$t('SUPPLIER_SHENGFEN')"
                required
                slot="label"></iLabel>
        <iSelect v-model="supplierData.supplierDTO.provinceCode" v-show="!supplierData.supplierDTO.provinceCode || supplierData.supplierDTO.provinceCode.length>='6'"
                 @change="changeProvince($event)">
          <el-option :value="item.cityIdStr"
                     :label="item.cityNameCn"
                     v-for="(item, index) in province"
                     :key="index"></el-option>
        </iSelect>
        <iSelect v-model="supplierData.supplierDTO.provinceCode" v-show="!(!supplierData.supplierDTO.provinceCode || supplierData.supplierDTO.provinceCode.length>='6')"
                 @change="changeProvince($event,true)">
          <el-option :value="item.sapLocationCode"
                     :label="item.cityNameCn"
                     v-for="(item, index) in province"
                     :key="index"></el-option>
        </iSelect>
      </iFormItem>
      <!-- 城市 -->
      <iFormItem prop="supplierDTO.cityCode"
                 v-permission="SUPPLIER_BASEINFO_COMPANY_CITY">
        <iLabel :label="$t('SUPPLIER_CHENGSHI')"
                required
                slot="label"></iLabel>
        <iSelect v-model="supplierData.supplierDTO.cityCode">
          <el-option :value="item.cityIdStr"
                     :label="item.cityNameCn"
                     v-for="(item, index) in city"
                     :key="index"></el-option>
        </iSelect>
      </iFormItem>





      <!-- 注册地址 -->
      <iFormItem prop="supplierDTO.address"
                 v-permission="SUPPLIER_BASEINFO_COMPANY_COMPANYADDRESS">
        <iLabel :label="$t('companyAddress')"
                required
                slot="label"></iLabel>
        <iInput v-model="supplierData.supplierDTO.address"
                :placeholder="$t('LK_QINGSHURU') + $t('companyAddress')"></iInput>
      </iFormItem>
      <!-- 注册地址邮编 -->
      <iFormItem prop="supplierDTO.post"
                 :rules="postRules"
                 v-permission="SUPPLIER_BASEINFO_COMPANY_REGISTERADDRESSPOSTCODE">
        <iLabel :label="$t('ZHUCEDIZHIYOUBIAN')"
                required
                slot="label"></iLabel>
        <iInput v-model="supplierData.supplierDTO.post"
                :placeholder="$t('LK_QINGSHURU') + $t('ZHUCEDIZHIYOUBIAN')"></iInput>
      </iFormItem>
      <!-- 公司网址 -->
      <iFormItem 
                 v-permission="SUPPLIER_BASEINFO_COMPANY_COMPANYWEBSITE">
        <iLabel :label="$t('GONGSHIWANGZHI')"
                slot="label"></iLabel>
        <iInput v-model="supplierData.supplierDTO.companyWebPage"
                :placeholder="$t('LK_QINGSHURU') + $t('GONGSHIWANGZHI')"></iInput>
      </iFormItem>
      <!-- 财务状况 -->
      <iFormItem >
        <iLabel :label="$t('financialStatus')"
                slot="label"></iLabel>
        <iSelect v-model="supplierData.supplierDTO.financialStatus">
          <el-option :value="item.code"
                     :label="item.name"
                     v-for="(item, index) in fromGroup.FINANCIAL"
                     :key="index"></el-option>
        </iSelect>
      </iFormItem>
      <!-- 财务趋势 -->
      <iFormItem 
                 v-permission="SUPPLIER_BASEINFO_COMPANY_FINANCIALTREND">
        <iLabel :label="$t('CAIWUQUSHI')"
                slot="label"></iLabel>
        <iSelect v-model="supplierData.supplierDTO.financialTrend">
          <el-option :value="item.code"
                     :label="item.name"
                     v-for="(item, index) in fromGroup.TREND"
                     :key="index"></el-option>
        </iSelect>
      </iFormItem>
      <!-- 付款记录 -->
      <iFormItem v-permission="SUPPLIER_BASEINFO_COMPANY_PAYMENTRECORD">
        <iLabel :label="$t('FUKUANGJILV')"
                slot="label"></iLabel>
        <iSelect v-model="supplierData.ppSupplierDTO.payHistory">
          <el-option :value="item.code"
                     :label="item.name"
                     v-for="(item, index) in fromGroup.PAYMENT"
                     :key="index"></el-option>
        </iSelect>
      </iFormItem>
      <!-- 是否大陆厂商 -->
      <iFormItem>
        <iLabel :label="language('SHIFOUGUOWAICHANGSHANG', '是否大陆厂商')"
                slot="label"></iLabel>

        <iSelect disabled
                 v-model="supplierData.supplierDTO.isForeignManufacture">
          <el-option :value="item.code"
                     :label="item.name"
                     v-for="(item, index) in isForeignCountryList"
                     :key="index"></el-option>
        </iSelect>
      </iFormItem>
      <!-- 是否黑名单 -->
      <iFormItem>
        <iLabel :label="language('SHIFOUHEIMINGDAN', '是否黑名单')"
                slot="label"></iLabel>
        <iText>{{
          isBlacklist ? language('SHI', '是') : language('FOU', '否')
        }}</iText>
        <!-- <iSelect disabled
                 v-model="supplierData.supplierDTO.isBlacklist">
          <el-option :value="item.code"
                     :label="item.name"
                     v-for="(item, index) in blackList"
                     :key="index"></el-option>
        </iSelect> -->
      </iFormItem>
      <iFormItem v-if="$route.query.subSupplierType !== 'GP'">
        <iLabel :label="language('QIANDINGCAIGOUTIAOKUAN', '签订采购条款')"
                slot="label"></iLabel>
        <iText> {{isPP?supplierData.ppSupplierDTO.isSignedClause?supplierData.ppSupplierDTO.signTime:this.language('FOU','否'):supplierData.gpSupplierInfoVO.isSignedClause?supplierData.ppSupplierDTO.signTime:this.language('FOU','否') }}</iText>
      </iFormItem>

      <!-- <iFormItem v-if="(supplierData.ppSupplierDTO&&supplierData.ppSupplierDTO.isSignedClause)||(supplierData.gpSupplierInfoVO&&supplierData.gpSupplierInfoVO.isSignedClause)">
        <iLabel :label="language('CAIGOUTIAOKUANQIANSHURIQI', '采购条款签署日期')"
                slot="label"></iLabel>
        <iText> {{supplierData.ppSupplierDTO.signTime}}</iText>
      </iFormItem> -->
    </iFormGroup>
  </iCard>
</template>
<script>
import {
  iCard,
  iFormGroup,
  iFormItem,
  iLabel,
  iInput,
  iSelect,
  iText,
  iDatePicker
} from 'rise'
import {
  getCityInfo,
  isForeignCountry,
  isBlack,
  isSigned
} from '@/api/dictionary'
import { pad } from '@/utils'
import { baseInfoRules, listingAddress, stockCode } from './data'
export default {
  components: {
    iCard,
    iFormGroup,
    iFormItem,
    iLabel,
    iInput,
    iSelect,
    iText,
    iDatePicker
  },
  props: {
    supplierData: {
      type: Object,
      default: () => { }
    },
    fromGroup: {
      type: Array,
      default: () => []
    },
    country: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    supplierData: {
      handler (val) {
        console.log(val, "val")
      },
      immediate: true
    }
  },
  data () {
    return {
      isBlacklist: '',
      baseInfoRules,
      listingAddress, //上市地点
      stockCode, //股票代码
      province: [],
      isForeignCountryList: [
        //因页面显示需要修改为【是否大陆厂商】，因此此处的label显示做了调换
        { name: this.language('FOU', '否'), code: 1 },
        { name: this.language('SHI', '是'), code: 0 }
      ],
      city: [],
      blackList: [
        { name: this.language('SHI', '是'), code: 1 },
        { name: this.language('FOU', '否'), code: 0 }
      ],
      epNatureSubcategorySelect: [], //企业小类值
      pad
    }
  },
  computed: {
    // 是否可编辑 股票代码 和 上市地点
    isListing () {
      return this.supplierData.supplierDTO.isListing == '1' ? true : false
    },
    isIndustryCode () {
      return this.supplierData.supplierDTO.industryCode ? pad(this.supplierData.supplierDTO.industryCode, 4) : ''
    },
    isPP () {
      if (this.supplierData.supplierDTO.supplierType == 'GP') {
        return false
      } else {
        return true
      }
    },
    //邮编校验规则
    postRules () {
      let rules = []
      if (this.supplierData.supplierDTO.countryCode == '300001' || this.supplierData.supplierDTO.countryCode =='CN') {
        rules = [
          { required: true, message: '请输入注册地址邮编', trigger: 'blur' },
          { pattern: /^[0-9]{6}$/, message: '邮编错误', trigger: 'blur' }
        ]
      } else {
        rules = [
          { required: true, message: "请输入注册地址邮编", trigger: 'blur' },
          {
            validator(rule, value, callback) {
              const ruleT = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/
              if (ruleT.test(value)) {
                callback(new Error('邮编错误'))
              }else{
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      }
      return rules
    },
    //当前supplierType
    supplierType () {
      return this.$route.query.supplierType
    }
  },
  created () {
    this.getIsSigned()
    this.getisBlack()
  },
  methods: {
    
    //是否黑名单
    getisBlack () {
      isBlack({ supplierToken: this.$route.query.supplierToken }).then(
        (res) => {
          this.isBlacklist = res.data
          let code = 0
          if (res.data) {
            code = 1
          } else code = 0
          this.$set(this.supplierData.supplierDTO, 'isBlacklist', code)
          console.log(this.supplierData.supplierDTO)
        }
      )
    },
    //是否签署
    getIsSigned () {
      //   isSigned({}).then((res) => {})
    },

    // 国家切换 获取省信息
    changeCountry (val,type) {
      this.supplierData.supplierDTO.provinceCode = ''
      this.supplierData.supplierDTO.cityCode = ''
      this.province = []
      this.city = []
      this.getProvince(type)
    },
    // 获取省份
    getProvince (type) {
      if(type){
        let data = {
          sapLocationCode: this.supplierData.supplierDTO.countryCode
        }
        getCityInfo(data).then((res) => {
          if (res.data) {
            let req = {
              parentCityId: res.data[0].cityIdStr
            }
            getCityInfo(req).then((result) => {
              this.province = result.data
            })
          }
        })
      }else{
        let data = {
          parentCityId: this.supplierData.supplierDTO.countryCode
        }
        getCityInfo(data).then(res => {
          this.province = res.data
        })
      }
    },
    // 省市切换 获取市级信息
    changeProvince (val,type) {
      this.supplierData.supplierDTO.cityCode = ''
      this.city = []
      this.getCity(type)
    },
    //获取城市
    getCity (type) {
      if(type){
        let data = {
          sapLocationCode: this.supplierData.supplierDTO.provinceCode
        }
        getCityInfo(data).then((res) => {
          if (res.data) {
            let req = {
              parentCityId: res.data[0].cityIdStr
            }
            getCityInfo(req).then((result) => {
              this.city = result.data
            })
          }
        })
      }else{
        let data = {
          parentCityId: this.supplierData.supplierDTO.provinceCode
        }
        getCityInfo(data).then(res => {
          this.city = res.data
        })
      }
    },
    // 获取城市 国家 省市对应中文名
    getCityName () {
      if (this.supplierData.supplierDTO.countryCode) {
        if(this.supplierData.supplierDTO.countryCode.length>=6){
          if(this.country.find((item) =>item.cityIdStr == this.supplierData.supplierDTO.countryCode)){
            this.supplierData.supplierDTO.country = this.country.find((item) =>item.cityIdStr == this.supplierData.supplierDTO.countryCode).cityNameCn
          }
        }else{
          if(this.country.find((item) =>item.sapLocationCode == this.supplierData.supplierDTO.countryCode)){
            this.supplierData.supplierDTO.country = this.country.find((item) =>item.sapLocationCode == this.supplierData.supplierDTO.countryCode).cityNameCn
          }
        }
      }
      if (this.supplierData.supplierDTO.provinceCode) {
        if(this.supplierData.supplierDTO.provinceCode.length>=6){
          if(this.province.find((item) =>item.cityIdStr == this.supplierData.supplierDTO.provinceCode)){
            this.supplierData.supplierDTO.province = this.province.find((item) =>item.cityIdStr == this.supplierData.supplierDTO.provinceCode).cityNameCn
          }
        }else{
          if(this.province.find((item) =>item.sapLocationCode == this.supplierData.supplierDTO.provinceCode)){
            this.supplierData.supplierDTO.province = this.province.find((item) =>item.sapLocationCode == this.supplierData.supplierDTO.provinceCode).cityNameCn
          }
        }
      }
      if (this.supplierData.supplierDTO.cityCode) {
        if(this.city.find((item) => item.cityIdStr == this.supplierData.supplierDTO.cityCode)){
          this.supplierData.supplierDTO.city = this.city.find((item) => item.cityIdStr == this.supplierData.supplierDTO.cityCode).cityNameCn
        }
      }
      // this.supplierData.supplierDTO.country = this.country.find(
      //   (item) =>
      //     item.sapLocationCode == this.supplierData.supplierDTO.countryCode
      // ).cityNameCn
      // this.supplierData.supplierDTO.province = this.province.find(
      //   (item) =>
      //     item.sapLocationCode == this.supplierData.supplierDTO.provinceCode
      // ).cityNameCn
      // this.supplierData.supplierDTO.city = this.city.find(
      //   (item) => item.cityIdStr == this.supplierData.supplierDTO.cityCode
      // ).cityNameCn
    },
    //查询企业小类
    getEpNatureSubcategorySelect (clear) {
      if (clear) this.supplierData.supplierDTO.epNatureSubcategory = ''
      if (this.fromGroup.ENTERPRISE_PROPERTY) {
        let item = this.fromGroup.ENTERPRISE_PROPERTY.find(
          (item) => item.code == this.supplierData.supplierDTO.epNatureCategory
        )
        if (item) {
          this.epNatureSubcategorySelect = item.subSelectVos
        }
      }
    },
    // 获取行业代码
    getIndustryCode (value) {
      this.supplierData.supplierDTO.industryCode = pad(value, 4)
    },
    // 是否上市切换
    changeListing () {
      if (this.supplierData.supplierDTO.isListing == '1') {
        this.listingAddress[0].required = true
        this.stockCode[0].required = true
      } else {
        this.listingAddress[0].required = false
        this.stockCode[0].required = false
        this.supplierData.supplierDTO.listingAddress = ''
        this.supplierData.supplierDTO.stockCode = ''
      }
    }
  }
}
</script>

<style></style>
