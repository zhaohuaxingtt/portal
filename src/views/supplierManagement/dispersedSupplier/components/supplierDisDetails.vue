<template>
  <iPage>
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">{{$route.query.subSupplierId?'修改分散（内部报销）供应商':'新增分散（内部报销）供应商'}}</span>
      <div class="floatright">
        <i-button :loading="loadingType" @click="save" v-permission="SUPPLIER_DISPERSEDSUPPLIER_INFO_GP_SUBMIT">{{ $t('LK_TIJIAO') }}</i-button>
        <i-button :loading="loadingType" @click="cancle" v-permission="SUPPLIER_DISPERSEDSUPPLIER_INFO_GP_CANCLE">{{ $t('LK_QUXIAO') }}</i-button>
      </div>
    </div>

    <iCard :title="$t('LK_JICHUXINXI')" tabCard collapse class="margin-bottom20">
      <iFormGroup row="3" :rules="baseRules" :model="supplierComplete.supplierDTO" ref="baseRulesForm1">
        <iFormItem prop="nameZh">
          <iLabel :label="$t('SupplierZh')" required slot="label"></iLabel>
          <iInput :placeholder="$t('LK_QINGSHURU')+$t('SupplierZh')" v-model="supplierComplete.supplierDTO.nameZh"></iInput>
        </iFormItem>
        <iFormItem prop="nameEn">
          <iLabel :label="$t('SupplierEn')" slot="label" required
            ></iLabel>
          <iInput :placeholder="$t('LK_QINGSHURU')+$t('SupplierEn')" v-model="supplierComplete.supplierDTO.nameEn"></iInput>
        </iFormItem>
      </iFormGroup>
    </iCard>

    <iCard :title="$t('GONGSIGAIKANG')" tabCard collapse>
      <iFormGroup row="3" :rules="comRules" :model="supplierComplete.supplierDTO" ref="baseRulesForm2">
        <iFormItem prop="countryCode">
          <iLabel :label="$t('SUPPLIER_GUOJIA')"
                  required
                  slot="label"></iLabel>
          <iSelect v-model="supplierComplete.supplierDTO.countryCode"
                  @change="changeCountry($event)">
            <el-option :value="item.sapLocationCode"
                      :disabled="countryDisabled"
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
                  @change="changeProvince($event)">
            <el-option :value="item.sapLocationCode"
                      :disabled="provinceDisabled"
                      :label="item.cityNameCn"
                      v-for="(item, index) in province"
                      :key="index"></el-option>
          </iSelect>
        </iFormItem>
        <iFormItem prop="cityCode">
          <iLabel :label="$t('SUPPLIER_CHENGSHI')"
                  required
                  slot="label"></iLabel>
          <iSelect v-model="supplierComplete.supplierDTO.cityCode" @change="changeCity($event)">
            <el-option :value="item.cityIdStr"
                      :label="item.cityNameCn"
                      v-for="(item, index) in city"
                      :key="index"></el-option>
          </iSelect>
        </iFormItem>
        <iFormItem prop="postCode">
          <iLabel :label="$t('YOUBIAN')"
                  required
                  slot="label"></iLabel>
          <iInput :placeholder="$t('LK_QINGSHURU')+$t('YOUBIAN')" v-model="supplierComplete.supplierDTO.postCode"></iInput>
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
import { iPage,iButton,iCard,iFormGroup,iFormItem,iLabel,iInput,iSelect,iMessage } from "rise";
import { baseRules,comRules,supplierCompleteRe } from "./data";
import opneBank from "@/views/generalPage/baseInfo/components/opneBank"
import mailList from "./mailList"
import user from "./user"
import upload from "./upload"
import {
  selectDictByKeys,
  getCityInfo
} from "@/api/dictionary";
import { saveInner,getInner } from "@/api/supplierManagement/dispersedSupplier"

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
      supplierCompleteRe,
      supplierComplete:{},
      baseRules,
      comRules,
      // supplierData:{
      //   supplierData:"",
      //   shortNameZh:'',
      //   supplierDTO:{
      //     countryCode:'',
      //     provinceCode:'',
      //     cityCode:'',
      //   }
      // },
      province:[],
      country:[],
      city:[],
      fromGroup:[],
      number:0,
      loadingType:false,
      countryDisabled:false,
      provinceDisabled:false,
    }
  },
  created(){
    this.supplierComplete = _.cloneDeep(this.supplierCompleteRe)

    this.getData();
    this.getAllSelect()
    this.getCityInfo();
    
  },
  methods:{
    getData(){
      if(!this.$route.query.subSupplierId) return false;
      var data = {
        supplierId:this.$route.query.subSupplierId,
      }
      getInner(data).then(res=>{
        if(res.data.supplierInfoVo){//基本信息
          this.supplierComplete.supplierDTO = res.data.supplierInfoVo;
        }

        if(res.data.gpSupplierBankNoteVO){//电子银票
          this.supplierComplete.gpSupplierBankNoteDTO = res.data.gpSupplierBankNoteVO;
        }

        if(res.data.subBankList){//银行子账号
          this.supplierComplete.subBankList = res.data.subBankList;
        }

        if(res.data.settlementBankVo){//开户银行
          this.supplierComplete.settlementBankDTO = res.data.settlementBankVo;
        }

        if(res.data.contactsList){//供应商通讯录
          this.supplierComplete.contactsSaveDTO.list = res.data.contactsList;
        }

        if(res.data.attachList){//附件上传
          this.supplierComplete.attachmentList = res.data.attachList;
        }

        if(res.data.gpSupplierInfoVO){
          this.supplierComplete.gpSupplierDTO = res.data.gpSupplierInfoVO;
        }



        if(this.supplierComplete.supplierDTO.countryCode){
          this.getProvince();
        }
        if(this.supplierComplete.supplierDTO.provinceCode){
          this.getCity();
        }

        if (this.supplierComplete.settlementBankDTO.countryCode) this.$refs.opneBank.getBankProvince()
        if (this.supplierComplete.settlementBankDTO.provinceCode) this.$refs.opneBank.getBankCity()
        if (this.supplierComplete.gpSupplierBankNoteDTO.country) this.$refs.opneBank.getYP()
        if (this.supplierComplete.subBankList) this.$refs.opneBank.getSubBank()


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
          }).finally(()=>{
            this.countryDisabled = false
          })
        }else{
          this.countryDisabled = false
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
          }).finally(()=>{
            this.provinceDisabled = false
          })
        }else{
          this.provinceDisabled = false
        }
      })
    },
    // 国家切换 获取省信息
    changeCountry (val) {
      if(this.countryDisabled) return
      this.countryDisabled = true
      for(let i=0;i<this.country.length;i++){
        if(this.country[i].sapLocationCode == val){
          this.supplierComplete.supplierDTO.country = this.country[i].cityNameCn
          break;
        }
      }
      this.supplierComplete.supplierDTO.provinceCode = ''
      this.supplierComplete.supplierDTO.cityCode = ''

      this.province = []
      this.city = []
      this.getProvince()
    },
    // 省市切换 获取市级信息
    changeProvince (val) {
      if(this.provinceDisabled) return
      this.provinceDisabled = true
      for(let i=0;i<this.province.length;i++){
        if(this.province[i].sapLocationCode == val){
          this.supplierComplete.supplierDTO.province = this.province[i].cityNameCn
          break;
        }
      }
      this.supplierComplete.supplierDTO.cityCode = ''
      this.city = []
      this.getCity()
    },
    changeCity(val){
      for(let i=0;i<this.city.length;i++){
        if(this.city[i].cityIdStr == val){
          this.supplierComplete.supplierDTO.city = this.city[i].cityNameCn
          break;
        }
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
        }
      })
    },
    getRule1(){
      return new Promise((resolve, reject) => {
        this.$refs.baseRulesForm1.validate((valid, object) => {
          if (valid) {
            resolve(valid)
          } else {
            return false;
          }
        });
      })
    },
    getRule2(){
      return new Promise((resolve, reject) => {
        this.$refs.baseRulesForm2.validate((valid, object) => {
          if (valid) {
            resolve(valid)
          } else {
            return false;
          }
        });
      })
    },
    getRule3(){//bank
      return new Promise((resolve, reject) => {
        this.$refs.opneBank.$refs.bankRules1.validate((valid, object) => {
          if (valid) {
            resolve(valid)
          } else {
            return false;
          }
        });
      })
    },
    getRule4(){//bank
      var that = this;
      that.number = 0;
      return new Promise((resolve, reject) => {
        that.supplierComplete.subBankList.forEach((e,index)=>{
          var bankRulesDTO = "bankRulesDTO"+index
          var rule = that.$refs.opneBank.$refs;
          rule[bankRulesDTO][0].validate((valid, object) => {
            if (valid) {
            } else {
              that.number++;
            }
          });
        })
        setTimeout(() => {
          if(that.number==0){
            resolve();
          }else{
            return false;
          }
        }, 0);
      })
    },
    getRule5(){
      return new Promise((resolve, reject) => {
        this.$refs.mailList.$refs.commonTable.$refs.commonTableForm.validate((valid, object) => {
          if (valid) {
            resolve(valid)
          } else {
            return false;
          }
        });
      })
    },
    save(){
      return new Promise((resolve, reject) => {
        Promise.all([this.getRule1(), this.getRule2(), this.getRule3(), this.getRule4(), this.getRule5()]).then(res=>{
          this.loadingType = true;
          console.log(this.supplierComplete);
          var data = _.cloneDeep(this.supplierComplete)
          data.subBankList.forEach(e=>{
            delete e.bankCity
            delete e.bankProvince
          })
          if(this.$route.query.subSupplierId){
            data.supplierId = this.$route.query.subSupplierId;
          }
          data.attachmentList.forEach(e=>{
            // e.attachId = e.id;
            e.attachRemark = "";
            e.file = {
              dummyName:"",
              fileName:e.fileName,
              filePath:e.filePath,
              fileSize:e.fileSize,
              id:e.fileId
            }
          })
          // console.log(data.attachmentList);
          setTimeout(() => {
            saveInner(data).then(res=>{
              if(res.result){
                this.loadingType = false;
                this.$router.go(-1)
              }else{
                this.loadingType = false;
                iMessage.error(res.desZh);
              }
            }).catch(res=>{
              this.loadingType = false;
            })
          }, 500);
        })
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