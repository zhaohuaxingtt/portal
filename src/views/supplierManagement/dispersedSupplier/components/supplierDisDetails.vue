<template>
  <iPage>
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">新增分散（内部报销）供应商</span>
      <div class="floatright">
        <i-button @click="save">{{ $t('LK_TIJIAO') }}</i-button>
        <i-button @click="cancle">{{ $t('LK_QUXIAO') }}</i-button>
      </div>
    </div>

    <iCard :title="$t('LK_JICHUXINXI')" tabCard collapse class="margin-bottom20">
      <iFormGroup row="3" :rules="baseRules" :model="supplierData" ref="baseRulesForm">
        <iFormItem prop="nameZh">
          <iLabel :label="$t('SupplierZh')" required slot="label"></iLabel>
          <iInput :placeholder="$t('LK_QINGSHURU')+$t('SupplierZh')" v-model="supplierComplete.supplierDTO.nameZh"></iInput>
        </iFormItem>
        <iFormItem prop="shortNameZh">
          <iLabel :label="$t('SupplierAbbreviationZh')" slot="label" required icons="iconxinxitishi"
            :tip="$t('SUPPLIER_GONGYINGSHANGJIANCHENZHTIPS')"></iLabel>
          <iInput :placeholder="$t('LK_QINGSHURU')+$t('SupplierAbbreviationZh')" v-model="supplierComplete.supplierDTO.shortNameZh"></iInput>
        </iFormItem>
      </iFormGroup>
    </iCard>

    <iCard :title="$t('GONGSIGAIKANG')" tabCard collapse>
      <iFormGroup row="3" :rules="comRules" :model="supplierComplete.supplierDTO" ref="baseRulesForm">
        <iFormItem prop="countryCode">
          <iLabel :label="$t('SUPPLIER_GUOJIA')"
                  required
                  slot="label"></iLabel>
          <iSelect v-model="supplierComplete.supplierDTO.countryCode"
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
          <iSelect v-model="supplierComplete.supplierDTO.provinceCode"
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
          <iSelect v-model="supplierComplete.supplierDTO.cityCode">
            <el-option :value="item.cityIdStr"
                      :label="item.cityNameCn"
                      v-for="(item, index) in city"
                      :key="index"></el-option>
          </iSelect>
        </iFormItem>
        <iFormItem prop="corpEmail">
          <iLabel :label="$t('TERMS_YOUXIANG')"
                  required
                  slot="label"></iLabel>
          <iInput :placeholder="$t('LK_QINGSHURU')+$t('TERMS_YOUXIANG')" v-model="supplierComplete.supplierDTO.corpEmail"></iInput>
        </iFormItem>
      </iFormGroup>
    </iCard>

    <opneBank ref="opneBank"
              class="margin-bottom20"
              :country="country"
              :supplierData="supplierComplete"
              :fromGroup="fromGroup">
    </opneBank>

    <mailList ref="mailList" class="margin-bottom20" :supplierData="supplierComplete"
              >
    </mailList>
    <!-- <user ref="user"></user> -->
    <upload ref="user" :supplierData="supplierComplete"></upload>
  </iPage>
</template>

<script>
import { iPage,iButton,iCard,iFormGroup,iFormItem,iLabel,iInput,iSelect } from "rise";
import { baseRules,comRules,supplierComplete } from "./data";
import opneBank from "@/views/generalPage/baseInfo/components/opneBank"
import mailList from "./mailList"
import user from "./user"
import upload from "./upload"
import {
  selectDictByKeys,
  getCityInfo
} from "@/api/dictionary";
import { saveInner } from "@/api/supplierManagement/dispersedSupplier"

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
    user,
    upload
  },
  data(){
    return{
      supplierComplete:supplierComplete,
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
      province:[],
      country:[],
      city:[],
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
        sapLocationCode: this.supplierComplete.supplierDTO.countryCode
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
        sapLocationCode: this.supplierComplete.supplierDTO.provinceCode
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
      this.supplierComplete.supplierDTO.provinceCode = ''
      this.supplierComplete.supplierDTO.cityCode = ''
      this.province = []
      this.city = []
      this.getProvince()
    },
    // 省市切换 获取市级信息
    changeProvince () {
      this.supplierComplete.supplierDTO.cityCode = ''
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
      console.log(this.supplierComplete);
      var data = _.cloneDeep(this.supplierComplete)
      data.subBankList.forEach(e=>{
        delete e.bankCity
        delete e.bankProvince
      })
      data.attachmentList.forEach(e=>{
        e.attachId = e.id;
        e.attachRemark = "";
        e.file = {
          dummyName:"",
          fileName:e.fileName,
          filePath:e.filePath,
          fileSize:e.fileSize,
          id:e.id
        }
      })
      saveInner(data).then(res=>{
        console.log(res);
      })
    },
    cancle(){
      this.$router.go(-1)
    },
  },
}
</script>

<style>

</style>