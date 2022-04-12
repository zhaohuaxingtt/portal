<template>
  <iCard :title="language('银行信息')" collapse :loading="loading">
    <div class="actions" slot="header-control">
      <iButton v-show="!editable" @click="editable = true">{{
        language('编辑')
      }}</iButton>
      <iButton v-show="editable" @click="save">{{ language('保存') }}</iButton>
      <iButton v-show="editable" @click="cancel">{{
        language('取消')
      }}</iButton>
      <iButton @click="addBank">新增子银行账户</iButton>
    </div>
    <iFormGroup
      row="3"
      :model="form"
      :rules="rules"
      ref="ruleForm"
    >
        <!-- 银行所在国家 -->
          <iFormItem :label="$t('YINHANGSUOZAIGUOJIA')">
            <iSelect v-model="form.countryCode" @change="changeCountry" :disabled="!editable">
                <el-option :value="item.sapLocationCode" :label="item.cityNameCn" v-for="(item, index) in country" :key="index"></el-option>
            </iSelect>
          </iFormItem>
        <!-- 银行所在省份 -->
          <iFormItem :label="$t('YINGHANSUOZAISHENGFEN')">
            <iSelect v-model="form.provinceCode" @change="changeProvince" :disabled="!editable">
                <el-option :value="item.sapLocationCode" :label="item.cityNameCn" v-for="(item, index) in bankProvince" :key="index"></el-option>
            </iSelect>
          </iFormItem>
        <!-- 银行所在城市/区 -->
          <iFormItem :label="$t('YINHANGSUOZAICHENGSHI')">
            <iSelect v-model="form.cityCode" :disabled="!editable" @change="changeCity">
                <el-option :value="item.cityIdStr" :label="item.cityNameCn" v-for="(item, index) in bankCity" :key="index"></el-option>
            </iSelect>
          </iFormItem>
          <iFormItem :label="language('银行名称')">
            <iInput v-model="form.bankName" :placeholder="$t('LK_QINGSHURU')+$t('YINGHANGMINCHENG')"></iInput>
          </iFormItem>
          <iFormItem :label="language('银行代码')" prop="bankCode">
            <iInput v-model="form.bankCode" :placeholder="$t('LK_QINGSHURU')+$t('YINHANGDAIMA')"></iInput>
          </iFormItem>
          <iFormItem :label="language('银行账号')" prop="bankAccount">
            <iInput v-model="form.bankAccount" :placeholder="$t('LK_QINGSHURU')+$t('YINHANGZHANGHAO')"></iInput>
          </iFormItem>
          <iFormItem :label="language('税务代码')">
            <iInput  :placeholder="$t('LK_QINGSHURU')+$t('SHUIWUDAIMA')" v-model="form.bankTaxCode"></iInput>
          </iFormItem>
    </iFormGroup>
    <!-- 修改 -->
    <div v-for="(item, index) in zbankList" :key="index" class="smallbank">
        <iButton class="btn" @click="removeBank(item.id,index)">删除</iButton>
        <el-divider></el-divider>
        <iCard
            collapse
            :title="$t('GONGYINGSHANGZIYINHANGZHANGHU') + (index+1)"
            class="margin-top20 ziyinhang"
        >
            <iFormGroup row="3"
                    :rules="bankRules"
                    :model="item"
                    ref="bankRules">
              <!-- 银行所在国家 -->
              <iFormItem prop="country"
                          v-permission="SUPPLIER_BASEINFO_BANK_BANKINCOUNTRY">
                  <iLabel :label="$t('YINHANGSUOZAIGUOJIA')" 
                          slot="label"></iLabel>
                  <iSelect v-model="item.country"
                          @change="changeCountrySmall($event,index)">
                  <el-option :value="item.id"
                              :label="item.cityNameCn"
                              v-for="(item, index) in country"
                              :key="index"></el-option>
                  </iSelect>
              </iFormItem>
              <!-- 银行所在省份 -->
              <iFormItem prop="province"
                          v-permission="SUPPLIER_BASEINFO_BANK_BANKINPROVINCES">
                  <iLabel :label="$t('YINGHANSUOZAISHENGFEN')"
                          slot="label"></iLabel>
                  <iSelect v-model="item.province"
                          @change="changeProvinceSmall($event,index)">
                  <el-option :value="item.id"
                              :label="item.cityNameCn"
                              v-for="(item, index) in item.bankProvince"
                              :key="index"></el-option>
                  </iSelect>
              </iFormItem>
              <!-- 银行所在城市/区 -->
              <iFormItem prop="city"
                          v-permission="SUPPLIER_BASEINFO_BANK_BANKINCITY">
                  <iLabel :label="$t('YINHANGSUOZAICHENGSHI')"
                          slot="label"></iLabel>
                  <iSelect v-model="item.city">
                  <el-option :value="item.id"
                              :label="item.cityNameCn"
                              v-for="(item, index) in item.bankCity"
                              :key="index"></el-option>
                  </iSelect>
              </iFormItem>

              <!-- 银行名称 -->
              <iFormItem prop="item.bankName"
                          v-permission="SUPPLIER_BASEINFO_BANK_BANKNAME">
                  <iLabel :label="$t('YINGHANGMINCHENG')" 
                          slot="label"
                          icons="iconxinxitishi"
                          :tip="$t('QDLYBJHJRXKZCXY_YINGHANGMINCHEN')"></iLabel>
                  <iInput v-model="item.bankName"
                          :placeholder="$t('LK_QINGSHURU') + $t('YINGHANGMINCHENG')"></iInput>
              </iFormItem>
              <!-- 银行代码 -->
              <iFormItem  prop="bankCode"
                          v-permission="SUPPLIER_BASEINFO_BANK_BANKCODE">
                  <iLabel :label="$t('YINHANGDAIMA')" 
                          slot="label"
                          icons="iconxinxitishi"
                          :tip="$t('QDLYBJHJRXKZCXY_YINGHANGDAIMA')"></iLabel>
                  <iInput v-model="item.bankCode"
                          :placeholder="$t('LK_QINGSHURU') + $t('YINHANGDAIMA')"></iInput>
              </iFormItem>
              <!-- 银行账号 -->
              <iFormItem  prop="bankAccount"
                          v-permission="SUPPLIER_BASEINFO_BANK_ACCOUNTS">
                  <iLabel :label="$t('YINHANGZHANGHAO')" 
                          slot="label"></iLabel>
                  <iInput v-model="item.bankAccount"
                          :placeholder="$t('LK_QINGSHURU') + $t('YINHANGZHANGHAO')"></iInput>
              </iFormItem>
              <!-- 农民工工资专用账户名称 -->
              <iFormItem prop="salaryAccount">
                  <iLabel :label="$t('NONGMINGGONGGONGZIZHUANYONG')" 
                          slot="label"></iLabel>
                  <iInput v-model="item.salaryAccount"
                          :placeholder="$t('LK_QINGSHURU') + $t('YINHANGZHANGHAO')"></iInput>
              </iFormItem>
            </iFormGroup>
            <iFormGroup row="1"
                      :model="item"
                      ref="bankRules2">
              <!-- 备注 -->
              <iFormItem >
                  <iLabel :label="$t('BEIZHU')" 
                          slot="label"></iLabel>
                  <iInput v-model="item.remark"
                          type="textarea"
                          rows="3"
                          :placeholder="$t('LK_QINGSHURU') + $t('YINHANGZHANGHAO')"></iInput>
              </iFormItem>
            </iFormGroup>
        </iCard>
    </div>
  </iCard>
</template>

<script>
import { iCard, iInput, iFormGroup,iFormItem,iLabel, iButton, iMessage,iSelect,iMessageBox } from 'rise'
import { areaSelect } from '@/components/remoteSelect'
import { updateSupplierBank,gpSubBankDelete } from '@/api/mainDataSupplier/list/bank'
import { getCityInfo } from "@/api/dictionary";
import {bankRules} from "./data";
export default {
  name: 'theDetailBank',
  components: {
    iCard,
    iInput,
    iFormItem,
    iButton,
    iSelect,
    areaSelect,
    iFormGroup,
    iLabel
  },
  props: {
    subBankVos: {
      type: Array,
      default: () => {
        return []
      }
    },
    bankForm: {
      type: Object,
      default: () => {
        return {}
      }
    },
    supplierId: {
      type: String,
      default: ''
    }
  },
  data() {
    var bankCode = (rule, value, callback) => {
      const mailReg = /^[a-zA-Z\d]+$/
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入数字或字母大小写'))
        }
      }, 100)
    }
    var bankAccount = (rule, value, callback) => {
      const mailReg = /^[1-9]\d{9,29}$/
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确银行卡号'))
        }
      }, 100)
    }
    return {
      loading:false,
      form: {
        countryCode:"",
        cityCode:"",
        provinceCode:"",
      },
      editable: false,
      originalForm: {},
      rules: {
        bankCode: [
          { validator: bankCode, trigger: 'blur' },
        ],
        bankAccount:[
          { validator: bankAccount, trigger: 'blur' },
        ]
      },
      country:[],
      bankProvince:[],
      bankCity:[],
      zbankList:[],
      bankRules,
      settlementBankDTO:{

      },
      zbankListOld:[],
      num:0,
    }
  },
  created() {
    
  },
  watch: {
    bankForm(val) {
      console.log(val)
      this.setForm(val)
      this.getCountry();
      this.getProvice();
      this.getCityList();
    },
    subBankVos(val){
      console.log(val)
      this.zBankGet(val);
    }
  },
  methods: {
    zBankGet(val){
      val.forEach(e=>{
        let data = {parentCityId: e.country}
        getCityInfo(data).then(res=>{
          this.$set(e,"bankProvince",res.data)
        })

        let  data1 = {parentCityId: e.province}
        getCityInfo(data1).then(res=>{
          this.$set(e,"bankCity",res.data)
        })
      })

      this.zbankList = _.cloneDeep(val)
      this.zbankListOld = _.cloneDeep(val)
    },
    getCountry(){
      let data = {}
      getCityInfo(data).then(res=>{
        let  data1 = {parentCityId: res.data[0].id}
        getCityInfo(data1).then(red=>{
            this.country=red.data
        })
      })
    },
    getProvice(){
      let data = {
        sapLocationCode: this.form.countryCode
      }
      getCityInfo(data).then(res=>{
        if (res.data) {
          let req={
              parentCityId:res.data[0].cityIdStr
          }
          getCityInfo(req).then(result=>{
              this.bankProvince=result.data
          })
        }
      })
    },
    getCityList(){
      let  data = {
          sapLocationCode: this.form.provinceCode
      }
      getCityInfo(data).then(res=>{
          if (res.data) {
              let req={
                  parentCityId:res.data[0].cityIdStr
              }
              getCityInfo(req).then(result=>{
                  this.bankCity=result.data
              })
          }
      })
    },
    changeCity(){
      let  data = {
          parentCityId: this.form.cityCode
      }
      getCityInfo(data).then(res=>{
          if (res.data) {
            this.form.city = res.data[0].cityNameCn
          }
      })
    },
    // 获取银行省市
    getBankProvince(){
        let  data = {
            sapLocationCode: this.form.countryCode
        }
        getCityInfo(data).then(res=>{
            if (res.data) {
                let req={
                    parentCityId:res.data[0].cityIdStr
                }
                this.form.country = res.data[0].cityNameCn
                getCityInfo(req).then(result=>{
                    this.bankProvince=result.data
                })
            }
        })
    },
    // 省市切换 获取市级信息
    changeProvince(){
        this.form.cityCode=""
        this.bankCity=[]
        this.getBankCity()
    },
    // 获取银行城市
    getBankCity(){
        let  data = {
            sapLocationCode: this.form.provinceCode
        }
        getCityInfo(data).then(res=>{
            if (res.data) {
                let req={
                    parentCityId:res.data[0].cityIdStr
                }
                this.form.province = res.data[0].cityNameCn
                getCityInfo(req).then(result=>{
                    this.bankCity=result.data
                })
            }
        })
    },
    changeCountrySmall(val,index){// 国家切换 获取省信息
      this.zbankList[index].province=""
      this.zbankList[index].city=""
      this.zbankList[index].bankProvince=[]
      this.zbankList[index].bankCity=[]

      let data = {parentCityId: val}
      getCityInfo(data).then(res=>{
        this.$set(this.zbankList[index],"bankProvince",res.data)
      })
    },
    changeProvinceSmall(val,index){
      this.zbankList[index].city=""
      this.zbankList[index].bankCity=[]
      let data1 = {parentCityId: val}
      getCityInfo(data1).then(res=>{
        this.$set(this.zbankList[index],"bankCity",res.data)
      })
    },
    // 国家切换 获取省信息
    changeCountry(val){
      this.form.provinceCode=""
      this.form.cityCode=""
      this.bankProvince=[]
      this.bankCity=[]
      this.getBankProvince()
    },
    addBank(){
      this.editable = true;
      this.zbankList.push({
        province:"",
        city:"",
        bankCity:[],
        bankProvince:[],
      })
    },
    removeBank(val,index){
      iMessageBox("是否取消编辑？", '温馨提示', {
        confirmButtonText: this.language('QUEREN', '确认'),
        cancelButtonText: this.language('QUXIAO', '取消'),
      }).then(red=>{
        this.loading = true;
        if(val){
          gpSubBankDelete(
            [val]
          ).then(res=>{
            this.loading = false;
            if(res.result){
              iMessage.success(this.language("删除成功"))
              this.$emit("delete-bank-success");
            }else{
              iMessage.error(this.language("删除失败"))
            }
          })
        }else{
          this.loading = false;
          iMessage.success(this.language("删除成功"))
          this.zbankList.splice(index,1);
        }
      })
    },
    setForm(val) {
      if (val && Object.keys(val).length) {
        this.form = _.cloneDeep(val)
        this.originalForm = _.cloneDeep(val)
      }
    },
    save() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          const params = { supplierId: this.supplierId }
          this.zbankList.forEach(e=>{
            delete e.bankProvince
            delete e.bankCity;
            e.supplierId = this.supplierId
          })
          const data = {
            bankAccount: this.form.bankAccount,
            bankCode: this.form.bankCode,
            bankName: this.form.bankName,
            bankTaxCode: this.form.bankTaxCode,

            addressInfoUpdateVo: {
              addressId: this.form.addressId,
              countryCode: this.form.countryCode,
              provinceCode: this.form.provinceCode,
              cityCode: this.form.cityCode,
              city: this.form.city,
              country: this.form.country,
              province: this.form.province
            },
            gpSubBankVos:this.zbankList
          }
          console.log(data)
          // return false;
          updateSupplierBank(params, data)
            .then((res) => {
              this.loading = false;
              if (res.result) {
                iMessage.success(res.desZh || '保存成功')
                this.editable = false
                this.originalForm = _.cloneDeep({
                  ...this.originalForm,
                  ...data
                })
                this.$emit("delete-bank-success");
              } else {
                iMessage.error(res.desZh || '保存失败')
              }
            })
            .catch((err) => {
              this.loading = false;
              iMessage.error(err.desZh || '保存失败')
            })
        }
      })
    },
    cancel() {
      this.form = _.cloneDeep(this.originalForm)
      console.log(this.zbankList)
      console.log(this.zbankListOld)
      this.zbankList = _.cloneDeep(this.zbankListOld)
      this.editable = false
    },
    areaChange(val, valStrs) {
      console.log('valStrs', valStrs)
      if (valStrs.length > 2) {
        this.form.country = valStrs[0]
        this.form.province = valStrs[1]
        this.form.city = valStrs[2]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .cardBody{
  position: relative;
}
::v-deep .el-form-item__label{
  width:14.8rem!important;
}
.ziyinhang{
  box-shadow:none!important;

  ::v-deep .cardHeader{
    padding:0 0 20px 0!important;
  }

  ::v-deep .cardBody{
    padding:0!important;
  }
}
.smallbank{
  position: relative;

  .btn{
    position: absolute;
    top: 20px;
    right: 50px;
  }
}
.formClass{
    ::v-deep .el-form-item__content{
        margin-left:14.8rem!important;
    }
    ::v-deep .el-col {
        padding-left:30px!important;
    }
    ::v-deep .el-col:nth-child(3n+1) {
        padding-left:10px!important;
    }
}

</style>
