<template>
  <iPage>
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">新增分散（内部报销）供应商</span>
      <div class="floatright">
        <i-button v-permission="" @click="save">{{ $t('LK_TIJIAO') }}</i-button>
        <i-button v-permission="" @click="cancle">{{ $t('LK_QUXIAO') }}</i-button>
      </div>
    </div>

    <iCard :title="$t('LK_JICHUXINXI')" tabCard collapse class="margin-bottom20">
      <iFormGroup row="3" :rules="baseRules" :model="supplierData" ref="baseRulesForm">
        <iFormItem prop="nameZh">
          <iLabel :label="$t('SupplierZh')" required slot="label"></iLabel>
          <iInput :placeholder="$t('LK_QINGSHURU')+$t('SupplierZh')" v-model="supplierData.nameZh"></iInput>
        </iFormItem>
        <iFormItem prop="shortNameZh">
          <iLabel :label="$t('SupplierAbbreviationZh')" slot="label" required icons="iconxinxitishi"
            :tip="$t('SUPPLIER_GONGYINGSHANGJIANCHENZHTIPS')"></iLabel>
          <iInput :placeholder="$t('LK_QINGSHURU')+$t('SupplierAbbreviationZh')" v-model="supplierData.shortNameZh"></iInput>
        </iFormItem>
      </iFormGroup>
    </iCard>

    <iCard :title="$t('GONGSIGAIKANG')" tabCard collapse>
      <iFormGroup row="3" :rules="comRules" :model="compare" ref="baseRulesForm">
        <iFormItem prop="countryCode">
          <iLabel :label="$t('SUPPLIER_GUOJIA')"
                  required
                  slot="label"></iLabel>
          <iSelect v-model="compare.countryCode"
                  @change="changeCountry()">
            <el-option :value="item.sapLocationCode"
                      :label="item.cityNameCn"
                      v-for="(item, index) in country"
                      :key="index"></el-option>
          </iSelect>
        </iFormItem>
        <iFormItem prop="provinceCode">
          <iLabel :label="$t('SUPPLIER_SHENGFEN')"
                  required
                  slot="label"></iLabel>
          <iSelect v-model="compare.provinceCode"
                  @change="changeProvince()">
            <el-option :value="item.sapLocationCode"
                      :label="item.cityNameCn"
                      v-for="(item, index) in province"
                      :key="index"></el-option>
          </iSelect>
        </iFormItem>
        <iFormItem prop="cityCode">
          <iLabel :label="$t('SUPPLIER_CHENGSHI')"
                  required
                  slot="label"></iLabel>
          <iSelect v-model="compare.cityCode">
            <el-option :value="item.cityIdStr"
                      :label="item.cityNameCn"
                      v-for="(item, index) in city"
                      :key="index"></el-option>
          </iSelect>
        </iFormItem>
      </iFormGroup>
    </iCard>

    <opneBank ref="opneBank"
              class="margin-bottom20"
              :country="country"
              :supplierData="supplierComplete"
              :fromGroup="fromGroup">
    </opneBank>

    <mailList ref="mailList" class="margin-bottom20"
              >
    </mailList>
    <user ref="user"></user>
  </iPage>
</template>

<script>
import { iPage,iButton,iCard,iFormGroup,iFormItem,iLabel,iInput,iSelect } from "rise";
import { baseRules,comRules } from "./data";
import opneBank from "@/views/generalPage/baseInfo/components/opneBank"
import mailList from "./mailList"
import user from "./user"
import {
  supplierComplete
} from "./data";
import {
  selectDictByKeys,
  getCityInfo
} from "@/api/dictionary";

export default {
  components:{
    iPage,
    iButton,
    iCard,
    iFormGroup,
    iFormItem,
    iLabel,
    iInput,
    iSelect,
    opneBank,
    mailList,
    user
  },
  data(){
    return{
      baseRules,
      comRules,
      supplierData:{
        supplierData:"",
        shortNameZh:'',
        supplierDTO:{
          countryCode:'',
          provinceCode:'',
          cityCode:'',
        }
      },
      compare:{
        countryCode:'',
        provinceCode:'',
        cityCode:'',
      },
      province:[],
      country:[],
      city:[],

      supplierComplete,
      fromGroup:[],
    }
  },
  created(){
    this.getAllSelect()
    this.getCityInfo();
  },
  methods:{
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
    },
    // 获取省份
    getProvince () {
      let data = {
        sapLocationCode: this.compare.countryCode
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
    },
    //获取城市
    getCity () {
      let data = {
        sapLocationCode: this.compare.provinceCode
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
    // 国家切换 获取省信息
    changeCountry () {
      this.compare.provinceCode = ''
      this.compare.cityCode = ''
      this.province = []
      this.city = []
      this.getProvince()
    },
    // 省市切换 获取市级信息
    changeProvince () {
      this.compare.cityCode = ''
      this.city = []
      this.getCity()
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
        }
      })
    },
    save(){

    },
    cancle(){

    },
  },
}
</script>

<style>

</style>