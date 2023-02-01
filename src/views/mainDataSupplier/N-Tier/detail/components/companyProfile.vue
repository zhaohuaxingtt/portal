<template>
  <iCard tabCard collapse :title="$t('GONGSIGAIKANG')">
    <iFormGroup
      row="3"
      :rules="companyProfileRules"
      :model="supplierData"
      ref="companyProfileRules"
    >
      <iFormItem prop="legalRepresentative">
        <iLabel :label="$t('LegalPerson')" required slot="label"></iLabel>
        <iInput
          v-model="supplierData.legalRepresentative"
          :placeholder="$t('LK_QINGSHURU') + $t('LegalPerson')"
          :disabled="!editable"
        ></iInput>
      </iFormItem>
      <iFormItem prop="companySize">
        <iLabel :label="$t('companySize')" required slot="label"></iLabel>
        <iSelect v-model="supplierData.companySize" :disabled="!editable">
          <el-option
            :value="item.code"
            :label="item.name"
            v-for="(item, index) in fromGroup.ENTERPRISESIZE"
            :key="index"
          ></el-option>
        </iSelect>
      </iFormItem>
      <iFormItem prop="enterpriseType">
        <iLabel :label="$t('epNatureCategory')" required slot="label"></iLabel>
        <iSelect v-model="supplierData.enterpriseType" :disabled="!editable">
          <el-option
            :value="item.code"
            :label="item.name"
            v-for="(item, index) in fromGroup.ENTERPRISE_PROPERTY"
            :key="index"
          ></el-option>
        </iSelect>
      </iFormItem>

      <iFormItem prop="registeredCapital">
        <iLabel
          :label="$t('SUPPLIER_ZHUCEZIBENWAN')"
          required
          slot="label"
        ></iLabel>
        <iInput
          v-model="supplierData.registeredCapital"
          :disabled="!editable"
          :placeholder="$t('LK_QINGSHURU') + $t('SUPPLIER_ZHUCEZIBENWAN')"
        ></iInput>
      </iFormItem>
      <iFormItem prop="address.countryCode">
        <iLabel :label="$t('SUPPLIER_GUOJIA')" required slot="label"></iLabel>
        <iSelect
          filterable
          v-model="supplierData.address.countryCode"
          :disabled="!editable"
          @change="changeCountry()"
        >
          <el-option
            :disabled="countryDisabled"
            :value="item.sapLocationCode"
            :label="item.cityNameCn"
            v-for="(item, index) in country"
            :key="index"
          ></el-option>
        </iSelect>
      </iFormItem>
      <iFormItem prop="address.provinceCode">
        <iLabel
          :label="$t('SUPPLIER_SHENGFEN')"
          :required="supplierData.address.countryCode === 'CN'"
          slot="label"
        ></iLabel>
        <i-input v-if="supplierData.address.countryCode != 'CN'" v-model="supplierData.address.province" disabled></i-input>
        <iSelect
          v-else
          filterable
          v-model="supplierData.address.provinceCode"
          :disabled="!editable"
          @change="changeProvince()"
        >
          <el-option
            :disabled="provinceDisabled"
            :value="item.sapLocationCode"
            :label="item.cityNameCn"
            v-for="(item, index) in province"
            :key="index"
          ></el-option>
        </iSelect>
      </iFormItem>
      <iFormItem prop="address.cityCode">
        <iLabel
          :label="$t('SUPPLIER_CHENGSHI')"
          :required="supplierData.address.countryCode === 'CN'"
          slot="label"
        ></iLabel>
        <i-input v-if="supplierData.address.countryCode != 'CN'" v-model="supplierData.address.city" disabled></i-input>
        <iSelect
          v-else
          filterable
          v-model="supplierData.address.cityCode"
          :disabled="!editable"
          @change="changeCity()"
        >
          <el-option
            :value="item.cityIdStr"
            :label="item.cityNameCn"
            v-for="(item, index) in city"
            :key="index"
          ></el-option>
        </iSelect>
      </iFormItem>
      <!-- 七 -->
      <iFormItem prop="address.address">
        <iLabel :label="$t('companyAddress')" required slot="label"></iLabel>
        <iInput
          v-model="supplierData.address.address"
          :placeholder="$t('LK_QINGSHURU') + $t('companyAddress')"
          :disabled="!editable"
        ></iInput>
      </iFormItem>
      <iFormItem prop="address.postCode">
        <iLabel :label="$t('ZHUCEDIZHIYOUBIAN')" required slot="label"></iLabel>
        <iInput
          v-model="supplierData.address.postCode"
          :placeholder="$t('LK_QINGSHURU') + $t('ZHUCEDIZHIYOUBIAN')"
          :disabled="!editable"
        ></iInput>
      </iFormItem>
      <iFormItem prop="certification">
        <iLabel
          :label="language('QIYEZIZHIYURENZHENG', '企业资质与认证')"
          required
          slot="label"
        ></iLabel>
        <iInput
          v-model="supplierData.certification"
          :placeholder="$t('LK_QINGSHURU')"
          :disabled="!editable"
        ></iInput>
      </iFormItem>
    </iFormGroup>
  </iCard>
</template>
<script>
import { iCard, iFormGroup, iFormItem, iInput, iLabel, iSelect } from 'rise'
import { getCityInfo } from '@/api/dictionary'

export default {
  components: {
    iCard,
    iFormGroup,
    iFormItem,
    iLabel,
    iInput,
    iSelect
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
    },
    editable: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    supplierData(n) {
      //n为新值,o为旧值;
      
      if(n.address.countryCode){
        this.getProvince()
        this.getCity()
      }
      this.supplierData = n
    },
  },
  data() {
    const checkProvince = (rule, value, callback) => {
      if (this.supplierData.address.countryCode === 'CN' && !value) {
        return callback(new Error('请选择省份'))
      }
      callback()
    }
    const checkCity = (rule, value, callback) => {
      if (this.supplierData.address.countryCode === 'CN' && !value) {
        return callback(new Error('请选择城市'))
      }
      callback()
    }
    return {
      companyProfileRules: {
        legalRepresentative: [
          {
            required: true,
            message: '请输入法定代表人',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 30,
            message: '长度在 1 到 30个字符',
            trigger: 'blur'
          }
        ],
        companySize: [
          {
            required: true,
            message: '请选择企业规模',
            trigger: 'change'
          }
        ],
        enterpriseType: [
          {
            required: true,
            message: '请选择企业性质（大类）',
            trigger: 'change'
          }
        ],
        certification: [
          {
            required: true,
            message: '请选择企业资质与认证',
            trigger: 'change'
          }
        ],
        registeredCapital: [
          {
            required: true,
            message: '请输入注册资本',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 100,
            message: '长度在 1 到 100个字符',
            trigger: 'blur'
          }
        ],
        'address.countryCode': [
          {
            required: true,
            message: '请选择国家',
            trigger: 'change'
          }
        ],
        'address.provinceCode': [
          {
            validator: checkProvince,
            trigger: 'change'
          }
        ],
        'address.cityCode': [
          {
            validator: checkCity,
            trigger: 'change'
          }
        ],
        'address.address': [
          {
            required: true,
            message: '请输入注册地址',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 200,
            message: '长度在 1 到 200个字符',
            trigger: 'blur'
          }
        ],
        'address.postCode': [
          {
            required: true,
            message: '请输入注册地址邮编',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 200,
            message: '长度在 1 到 30个字符',
            trigger: 'blur'
          }
        ]
      },
      parentCityId: [],
      province: [],
      city: [],
      countryDisabled:false,
      provinceDisabled:false,
    }
  },
  mounted(){
    console.log(this.supplierData,'========');
    console.log(this.country,'========');

  },
  computed: {},
  methods: {
    //获取城市
    getCity() {
      let data = {
        sapLocationCode: this.supplierData.address.provinceCode
      }
      if (this.province.length > 0) {
        this.supplierData.address.province = this.province.find(
          (res) => this.supplierData.address.provinceCode == res.sapLocationCode
        ).cityNameCn
      }

      getCityInfo(data).then((res) => {
        if (res.data) {
          let req = {
            parentCityId: res.data[0].cityIdStr
          }
          getCityInfo(req).then((result) => {
            this.city = result.data
          }).finally(()=>{
            this.provinceDisabled = false
          })
        }else{
          this.provinceDisabled = false
        }
      })
    },
    // 省市切换 获取市级信息
    changeProvince() {
      if(this.provinceDisabled) return
      this.provinceDisabled = true
      this.supplierData.address.cityCode = ''
      this.city = []

      this.getCity()
    },
    // 国家切换 获取省信息
    changeCountry() {
      if(this.countryDisabled) return
      this.countryDisabled = true
      this.supplierData.address.provinceCode = ''
      this.supplierData.address.cityCode = ''
      this.province = []
      this.city = []
      this.supplierData.address.country = this.country.find(
        (res) => this.supplierData.address.countryCode == res.sapLocationCode
      ).cityNameCn
      // console.log(this.supplierData.address.country,'======');
      if(this.supplierData.address.countryCode != 'CN'){
          this.supplierData.isAbroad = 1
          this.supplierData.address.province = this.supplierData.address.country
          this.supplierData.address.city = this.supplierData.address.country
      }else{
        this.supplierData.isAbroad = 0
        this.getProvince()
      }
      
    },
    changeCity() {
      this.supplierData.address.city = this.city.find(
        (res) => this.supplierData.address.cityCode == res.cityIdStr
      ).cityNameCn
    },
    // 获取省份
    getProvince() {
      
      let data = {
        sapLocationCode: this.supplierData.address.countryCode
      }
      getCityInfo(data).then((res) => {
        if (res.data) {
          let req = {
            parentCityId: res.data[0].cityIdStr
          }
          getCityInfo(req).then((result) => {
            this.province = result.data
          }).finally(()=>{
            this.countryDisabled = false
          })
        }else{
          this.countryDisabled = false
        }
      })
    }
  }
}
</script>

<style></style>
