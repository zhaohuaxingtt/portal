<template>
  <iCard tabCard collapse :title="$t('GONGSIGAIKANG')">
    <iFormGroup
      row="3"
      :rules="baseInfoRules"
      :model="supplierData"
      ref="formRules"
    >
      <!-- 国家 -->
      <iFormItem
        prop="supplierDTO.countryCode"
        v-permission="SUPPLIER_BASEINFO_COMPANY_NATION_GP"
      >
        <iLabel :label="$t('SUPPLIER_GUOJIA')" required slot="label"></iLabel>
        <iSelect
          :disabled="canNotEdit"
          v-model="supplierData.supplierDTO.countryCode"
          v-show="
            !supplierData.supplierDTO.countryCode ||
            supplierData.supplierDTO.countryCode.length >= '6'
          "
          @change="changeCountry($event)"
        >
          <el-option
            :value="item.cityIdStr"
            :label="item.cityNameCn"
            v-for="(item, index) in country"
            :key="index"
          ></el-option>
        </iSelect>
      </iFormItem>
      <!-- 省份 -->
      <iFormItem
        prop="supplierDTO.provinceCode"
        :rules="provinceRules"
        v-permission="SUPPLIER_BASEINFO_COMPANY_PROVINCE_GP"
      >
        <iLabel
          :label="$t('SUPPLIER_SHENGFEN')"
          :required="
            supplierData.supplierDTO.countryCode == '300001' ||
            supplierData.supplierDTO.countryCode == 'CN'
              ? true
              : false
          "
          slot="label"
        ></iLabel>
        <iSelect
          :disabled="canNotEdit"
          v-model="supplierData.supplierDTO.provinceCode"
          v-show="
            !supplierData.supplierDTO.provinceCode ||
            supplierData.supplierDTO.provinceCode.length >= '6'
          "
          @change="changeProvince($event)"
        >
          <el-option
            :value="item.cityIdStr"
            :label="item.cityNameCn"
            v-for="(item, index) in province"
            :key="index"
          ></el-option>
        </iSelect>
      </iFormItem>
      <!-- 城市 -->
      <iFormItem
        prop="supplierDTO.cityCode"
        :rules="cityRules"
        v-permission="SUPPLIER_BASEINFO_COMPANY_CITY_GP"
      >
        <iLabel
          :label="$t('SUPPLIER_CHENGSHI')"
          :required="
            supplierData.supplierDTO.countryCode == '300001' ||
            supplierData.supplierDTO.countryCode == 'CN'
              ? true
              : false
          "
          slot="label"
        ></iLabel>
        <iSelect v-model="supplierData.supplierDTO.cityCode"
          :disabled="canNotEdit">
          <el-option
            :value="item.cityIdStr"
            :label="item.cityNameCn"
            v-for="(item, index) in city"
            :key="index"
          ></el-option>
        </iSelect>
      </iFormItem>

      <!-- 注册地址 -->
      <iFormItem
        prop="supplierDTO.companyAddress"
        v-permission="SUPPLIER_BASEINFO_COMPANY_COMPANYADDRESS_GP"
      >
        <iLabel :label="$t('companyAddress')" required slot="label"></iLabel>
        <iInput
          :disabled="canNotEdit"
          v-model="supplierData.supplierDTO.companyAddress"
          :placeholder="$t('LK_QINGSHURU') + $t('companyAddress')"
        ></iInput>
      </iFormItem>
      <!-- 注册地址邮编 -->
      <iFormItem
        prop="supplierDTO.post"
        :rules="postRules"
        v-permission="SUPPLIER_BASEINFO_COMPANY_REGISTERADDRESSPOSTCODE_GP"
      >
        <iLabel :label="$t('ZHUCEDIZHIYOUBIAN')" required slot="label"></iLabel>
        <iInput
          :disabled="canNotEdit"
          v-model="supplierData.supplierDTO.post"
          :placeholder="$t('LK_QINGSHURU') + $t('ZHUCEDIZHIYOUBIAN')"
        ></iInput>
      </iFormItem>
      <!-- 公司网址 -->
      <iFormItem v-permission="SUPPLIER_BASEINFO_COMPANY_COMPANYWEBSITE_GP">
        <iLabel :label="$t('GONGSHIWANGZHI')" slot="label"></iLabel>
        <iInput
          :disabled="canNotEdit"
          v-model="supplierData.supplierDTO.companyWebPage"
          :placeholder="$t('LK_QINGSHURU') + $t('GONGSHIWANGZHI')"
        ></iInput>
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
import { getCityInfo } from '@/api/dictionary'
import { baseInfoRules, stockCode } from './data'
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
    country: {
      type: Array,
      default: () => []
    },
    canNotEdit: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      baseInfoRules,
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
    }
  },
  computed: {
    //省市校验规则
    provinceRules() {
      let rules = []
      if (
        this.supplierData.supplierDTO.countryCode == '300001' ||
        this.supplierData.supplierDTO.countryCode == 'CN'
      ) {
        rules = [{ required: true, message: '请选择省市', trigger: 'change' }]
      } else {
        rules = [{ required: false, message: '请选择省市', trigger: 'change' }]
      }
      return rules
    },
    //城市校验规则
    cityRules() {
      let rules = []
      if (
        this.supplierData.supplierDTO.countryCode == '300001' ||
        this.supplierData.supplierDTO.countryCode == 'CN'
      ) {
        rules = [{ required: true, message: '请选择城市', trigger: 'change' }]
      } else {
        rules = [{ required: false, message: '请选择城市', trigger: 'change' }]
      }
      return rules
    },
    //邮编校验规则
    postRules() {
      let rules = []
      if (
        this.supplierData.supplierDTO.countryCode == '300001' ||
        this.supplierData.supplierDTO.countryCode == 'CN'
      ) {
        rules = [
          { required: true, message: '请输入注册地址邮编', trigger: 'blur' },
          { pattern: /^[0-9]{6}$/, message: '邮编错误', trigger: 'blur' }
        ]
      } else {
        rules = [
          { required: true, message: '请输入注册地址邮编', trigger: 'blur' },
          {
            validator(rule, value, callback) {
              const ruleT = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/
              if (ruleT.test(value)) {
                callback(new Error('邮编错误'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      }
      return rules
    },
  },
  methods: {
    // 国家切换 获取省信息
    changeCountry(val, type) {
      this.supplierData.supplierDTO.provinceCode = ''
      this.supplierData.supplierDTO.cityCode = ''
      this.province = []
      this.city = []
      this.getProvince(type)
    },
    // 获取省份
    getProvince(type) {
      if (type) {
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
      } else {
        let data = {
          parentCityId: this.supplierData.supplierDTO.countryCode
        }
        getCityInfo(data).then((res) => {
          this.province = res.data
        })
      }
    },
    // 省市切换 获取市级信息
    changeProvince(val, type) {
      this.supplierData.supplierDTO.cityCode = ''
      this.city = []
      this.getCity(type)
    },
    //获取城市
    getCity(type) {
      if (type) {
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
      } else {
        let data = {
          parentCityId: this.supplierData.supplierDTO.provinceCode
        }
        getCityInfo(data).then((res) => {
          this.city = res.data
        })
      }
    },
    // 获取城市 国家 省市对应中文名
    getCityName() {
      if (this.supplierData.supplierDTO.countryCode) {
        if (this.supplierData.supplierDTO.countryCode.length >= 6) {
          if (
            this.country.find(
              (item) =>
                item.cityIdStr == this.supplierData.supplierDTO.countryCode
            )
          ) {
            this.supplierData.supplierDTO.country = this.country.find(
              (item) =>
                item.cityIdStr == this.supplierData.supplierDTO.countryCode
            ).cityNameCn
          }
        } else {
          if (
            this.country.find(
              (item) =>
                item.sapLocationCode ==
                this.supplierData.supplierDTO.countryCode
            )
          ) {
            this.supplierData.supplierDTO.country = this.country.find(
              (item) =>
                item.sapLocationCode ==
                this.supplierData.supplierDTO.countryCode
            ).cityNameCn
          }
        }
      }
      if (this.supplierData.supplierDTO.provinceCode) {
        if (this.supplierData.supplierDTO.provinceCode.length >= 6) {
          if (
            this.province.find(
              (item) =>
                item.cityIdStr == this.supplierData.supplierDTO.provinceCode
            )
          ) {
            this.supplierData.supplierDTO.province = this.province.find(
              (item) =>
                item.cityIdStr == this.supplierData.supplierDTO.provinceCode
            ).cityNameCn
          }
        } else {
          if (
            this.province.find(
              (item) =>
                item.sapLocationCode ==
                this.supplierData.supplierDTO.provinceCode
            )
          ) {
            this.supplierData.supplierDTO.province = this.province.find(
              (item) =>
                item.sapLocationCode ==
                this.supplierData.supplierDTO.provinceCode
            ).cityNameCn
          }
        }
      }
      if (this.supplierData.supplierDTO.cityCode) {
        if (
          this.city.find(
            (item) => item.cityIdStr == this.supplierData.supplierDTO.cityCode
          )
        ) {
          this.supplierData.supplierDTO.city = this.city.find(
            (item) => item.cityIdStr == this.supplierData.supplierDTO.cityCode
          ).cityNameCn
        }
      }
    },
  }
}
</script>

<style></style>
