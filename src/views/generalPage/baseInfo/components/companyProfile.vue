<template>
  <iCard tabCard
         collapse
         :title="$t('GONGSIGAIKANG')">
    <iFormGroup row="3"
                :rules="baseInfoRules"
                :model="supplierData"
                ref="baseInfoRules">
      <iFormItem prop="supplierDTO.legalPerson"
                 v-permission="SUPPLIER_BASEINFO_COMPANY_LEGALPERSON">
        <iLabel :label="$t('LegalPerson')"
                required
                slot="label"></iLabel>
        <iInput v-model="supplierData.supplierDTO.legalPerson"
                :placeholder="$t('LK_QINGSHURU')+$t('LegalPerson')"></iInput>
      </iFormItem>
      <iFormItem prop="supplierDTO.companySize"
                 v-if="isPP"
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
      <iFormItem prop="supplierDTO.businessState"
                 v-if="isPP && supplierType==4"
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
      <iFormItem prop="supplierDTO.epNatureCategory"
                 v-if="isPP"
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
      <iFormItem prop="supplierDTO.epNatureSubcategory"
                 v-if="isPP"
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
      <!-- 三 -->
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
      <iFormItem>
        <iLabel :label="$t('industryCode')"
                required
                slot="label"
                v-permission="SUPPLIER_BASEINFO_COMPANY_INDUSTRYCODE"></iLabel>
        <iText>{{supplierData.supplierDTO.industryCode}}</iText>
      </iFormItem>
      <iFormItem prop="supplierDTO.businessOfScope"
                 v-if="isPP"
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
      <!-- 四 -->
      <iFormItem prop="supplierDTO.isListing"
                 v-if="isPP"
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
      <iFormItem prop="supplierDTO.listingAddress"
                 :rules="listingAddress"
                 ref="listingAddressItem"
                 v-if="isPP"
                 v-permission="SUPPLIER_BASEINFO_COMPANY_LISTINGADDRESS">
        <iLabel :label="$t('listingAddress')"
                :required='isListing'
                slot="label"></iLabel>
        <iSelect v-model="supplierData.supplierDTO.listingAddress"
                 :disabled="!isListing">
          <el-option :value="item.code"
                     :label="item.name"
                     v-for="(item, index) in fromGroup.MARKADDRESS"
                     :key="index"></el-option>
        </iSelect>
      </iFormItem>
      <iFormItem prop="supplierDTO.stockCode"
                 :rules="stockCode"
                 ref="stockCodeItem"
                 v-if="isPP"
                 v-permission="SUPPLIER_BASEINFO_COMPANY_CODEOFSTOCK">
        <iLabel :label="$t('GUPIAODAIMA')"
                :required='isListing'
                slot="label"></iLabel>
        <iInput v-model="supplierData.supplierDTO.stockCode"
                :placeholder="$t('LK_QINGSHURU')+$t('GUPIAODAIMA')"
                :disabled="!isListing"></iInput>
      </iFormItem>
      <!-- 五 -->
      <iFormItem prop="supplierDTO.registeredCapital"
                 v-permission="SUPPLIER_BASEINFO_COMPANY_REGISTEREDCAPITAL">
        <iLabel :label="$t('SUPPLIER_ZHUCEZIBENWAN')"
                required
                slot="label"></iLabel>
        <iInput v-model="supplierData.supplierDTO.registeredCapital"
                :placeholder="$t('LK_QINGSHURU')+$t('SUPPLIER_ZHUCEZIBENWAN')"></iInput>
      </iFormItem>
      <iFormItem prop="supplierDTO.registeredDate"
                 v-permission="SUPPLIER_BASEINFO_COMPANY_REGISTEREDDATE">
        <iLabel :label="$t('registeredDate')"
                required
                slot="label"></iLabel>
        <iDatePicker style="width: 100%;"
                     value-format="yyyy-MM-dd"
                     type="date"
                     :placeholder="$t('SUPPLIER_XUANZERQI')"
                     v-model="supplierData.supplierDTO.registeredDate"
                     :picker-options="{disabledDate(time) {return time.getTime() > Date.now()}}"></iDatePicker>
      </iFormItem>
      <iFormItem prop="supplierDTO.supplyProperty"
                 v-if="isPP"
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
      <!-- 六 -->
      <iFormItem prop="supplierDTO.countryCode"
                 v-permission="SUPPLIER_BASEINFO_COMPANY_NATION">
        <iLabel :label="$t('SUPPLIER_GUOJIA')"
                required
                slot="label"></iLabel>
        <iSelect v-model="supplierData.supplierDTO.countryCode"
                 @change="changeCountry()">
          <el-option :value="item.sapLocationCode"
                     :label="item.cityNameCn"
                     v-for="(item, index) in country"
                     :key="index"></el-option>
        </iSelect>
      </iFormItem>
      <iFormItem prop="supplierDTO.provinceCode"
                 v-permission="SUPPLIER_BASEINFO_COMPANY_PROVINCE">
        <iLabel :label="$t('SUPPLIER_SHENGFEN')"
                required
                slot="label"></iLabel>
        <iSelect v-model="supplierData.supplierDTO.provinceCode"
                 @change="changeProvince()">
          <el-option :value="item.sapLocationCode"
                     :label="item.cityNameCn"
                     v-for="(item, index) in province"
                     :key="index"></el-option>
        </iSelect>
      </iFormItem>
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
      <!-- 七 -->
      <iFormItem prop="supplierDTO.companyAddress"
                 v-permission="SUPPLIER_BASEINFO_COMPANY_COMPANYADDRESS">
        <iLabel :label="$t('companyAddress')"
                required
                slot="label"></iLabel>
        <iInput v-model="supplierData.supplierDTO.companyAddress"
                :placeholder="$t('LK_QINGSHURU')+$t('companyAddress')"></iInput>
      </iFormItem>
      <iFormItem prop="supplierDTO.post"
                 :rules="postRules"
                 v-permission="SUPPLIER_BASEINFO_COMPANY_REGISTERADDRESSPOSTCODE">
        <iLabel :label="$t('ZHUCEDIZHIYOUBIAN')"
                required
                slot="label"></iLabel>
        <iInput v-model="supplierData.supplierDTO.post"
                :placeholder="$t('LK_QINGSHURU')+$t('ZHUCEDIZHIYOUBIAN')"></iInput>
      </iFormItem>
      <iFormItem v-if="isPP"
                 v-permission="SUPPLIER_BASEINFO_COMPANY_COMPANYWEBSITE">
        <iLabel :label="$t('GONGSHIWANGZHI')"
                slot="label"></iLabel>
        <iInput v-model="supplierData.supplierDTO.companyWebPage"
                :placeholder="$t('LK_QINGSHURU')+$t('GONGSHIWANGZHI')"></iInput>
      </iFormItem>
      <!-- 八 -->
      <iFormItem v-if="isPP">
        <iLabel :label="$t('financialStatus')"
                slot="label"></iLabel>
        <iSelect v-model="supplierData.supplierDTO.financialStatus">
          <el-option :value="item.code"
                     :label="item.name"
                     v-for="(item, index) in fromGroup.FINANCIAL"
                     :key="index"></el-option>
        </iSelect>
      </iFormItem>
      <iFormItem v-if="isPP"
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
      <!-- 九 -->
      <iFormItem>
        <iLabel :label="language(
                'SHIFOUGUOWAICHANGSHANG',
                '是否国外厂商'
              )"
                slot="label"></iLabel>

        <iSelect disabled
                 v-model="supplierData.supplierDTO.isForeignManufacture">
          <el-option :value="item.code"
                     :label="item.name"
                     v-for="(item, index) in isForeignCountryList"
                     :key="index"></el-option>
        </iSelect>
      </iFormItem>

      <iFormItem>
        <iLabel :label="language(
                'SHIFOUHEIMINGDAN',
                '是否黑名单'
              )"
                slot="label"></iLabel>
        <iText>{{isBlacklist?language(
                'SHI',
                '是'
              ):language(
                'FOU',
                '否'
              )}}</iText>
        <!-- <iSelect disabled
                 v-model="supplierData.supplierDTO.isBlacklist">
          <el-option :value="item.code"
                     :label="item.name"
                     v-for="(item, index) in blackList"
                     :key="index"></el-option>
        </iSelect> -->
      </iFormItem>
      <iFormItem>
        <iLabel :label="language(
                'QIANDINGCAIGOUTIAOKUAN',
                '签订采购条款'
              )"
                slot="label"></iLabel>
        <iText> {{language(
                'WEIQIANSHU',
                '未签署'
              )}}</iText>

      </iFormItem>
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
      default: () => {}
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
    supplierData() {},
    country(val) {
      if (val.length > 0) {
        console.log(val)
        this.getisForeignCountry(val)
      }
    }
  },
  data() {
    return {
        isBlacklist:'',
      baseInfoRules,
      listingAddress, //上市地点
      stockCode, //股票代码
      province: [],
      isForeignCountryList: [
        { name: this.language('SHI', '是'), code: 1 },
        { name: this.language('FOU', '否'), code: 0 }
      ],
      city: [],
      blackList: [
        { name: this.language('SHI', '是'), code: 1 },
        { name: this.language('FOU', '否'), code: 0 }
      ],
      epNatureSubcategorySelect: [] //企业小类值
    }
  },
  computed: {
    // 是否可编辑 股票代码 和 上市地点
    isListing() {
      return this.supplierData.supplierDTO.isListing == '1' ? true : false
    },
    isPP() {
      if (this.supplierData.supplierDTO.supplierType == 'GP') {
        return false
      } else {
        return true
      }
    },
    //邮编校验规则
    postRules() {
      let rules = []
      if (this.supplierData.supplierDTO.countryCode == 'CN') {
        rules = [
          { required: true, message: '请输入注册地址邮编', trigger: 'blur' },
          { pattern: /^[0-9]{6}$/, message: '邮编错误', trigger: 'blur' }
        ]
      } else {
        rules = [
          { required: true, message: '请输入注册地址邮编', trigger: 'blur' },
          { pattern: /^[A-Za-z0-9]+$/, message: '邮编错误', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10个字符', trigger: 'blur' }
        ]
      }
      return rules
    },
    //当前supplierType
    supplierType() {
      return this.$route.query.supplierType
    }
  },
  created() {
    this.getIsSigned()
    this.getisBlack()

  },
  methods: {
    // 获取省份
    getProvince() {
      let data = {
        sapLocationCode: this.supplierData.supplierDTO.countryCode
      }
      getCityInfo(data).then((res) => {
        if (res.data) {
          this.getisForeignCountry(res.data)
          let req = {
            parentCityId: res.data[0].cityIdStr
          }
          getCityInfo(req).then((result) => {
            this.province = result.data
          })
        }
      })
    },
    //获取城市
    getCity() {
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
    },
    //是否黑名单
    getisBlack() {
      isBlack({ supplierToken: this.$route.query.supplierToken }).then(
        (res) => {
            this.isBlacklist=res.data
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
    getIsSigned() {
      //   isSigned({}).then((res) => {})
    },
    //是否国内外
    getisForeignCountry(val) {
      if (val.length > 0) {
        isForeignCountry({
          addressInfoId: val.find(
            (item) =>
              item.sapLocationCode == this.supplierData.supplierDTO.countryCode
          ).id
        }).then((res) => {
          let code = 0
          if (res.data) {
            code = 1
          } else code = 0
          this.$set(this.supplierData.supplierDTO, 'isForeignManufacture', code)
        })
      }
    },

    // 国家切换 获取省信息
    changeCountry() {
      this.supplierData.supplierDTO.provinceCode = ''
      this.supplierData.supplierDTO.cityCode = ''
      this.province = []
      this.city = []
      this.getProvince()
    },
    // 省市切换 获取市级信息
    changeProvince() {
      this.supplierData.supplierDTO.cityCode = ''
      this.city = []
      this.getCity()
    },
    // 获取城市 国家 省市对应中文名
    getCityName() {
      this.supplierData.supplierDTO.country = this.country.find(
        (item) =>
          item.sapLocationCode == this.supplierData.supplierDTO.countryCode
      ).cityNameCn
      this.supplierData.supplierDTO.province = this.province.find(
        (item) =>
          item.sapLocationCode == this.supplierData.supplierDTO.provinceCode
      ).cityNameCn
      this.supplierData.supplierDTO.city = this.city.find(
        (item) => item.cityIdStr == this.supplierData.supplierDTO.cityCode
      ).cityNameCn
    },
    //查询企业小类
    getEpNatureSubcategorySelect(clear) {
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
    getIndustryCode(value) {
      this.supplierData.supplierDTO.industryCode = value
    },
    // 是否上市切换
    changeListing() {
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

<style>
</style>
