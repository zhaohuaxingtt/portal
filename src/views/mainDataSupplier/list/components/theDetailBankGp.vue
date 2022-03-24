<template>
  <iCard :title="language('银行信息')" collapse>
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
    <el-form
      label-position="left"
      label-width="130px"
      :model="form"
      :rules="rules"
      ref="ruleForm"
      class="validate-required-form formClass"
    >
        <!-- 银行所在国家 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <iFormItem :label="$t('YINHANGSUOZAIGUOJIA')">
            <iSelect v-model="form.countryCode" @change="changeCountry()" :disabled="!editable">
                <el-option :value="item.sapLocationCode" :label="item.cityNameCn" v-for="(item, index) in country" :key="index"></el-option>
            </iSelect>
          </iFormItem>
        </el-col>
        <el-col :span="8">
          <iFormItem :label="$t('YINGHANSUOZAISHENGFEN')">
            <iSelect v-model="form.provinceCode" @change="changeProvince()" :disabled="!editable">
                <el-option :value="item.sapLocationCode" :label="item.cityNameCn" v-for="(item, index) in bankProvince" :key="index"></el-option>
            </iSelect>
          </iFormItem>
        </el-col>
        <el-col :span="8">
          <iFormItem :label="$t('YINHANGSUOZAICHENGSHI')">
            <iSelect v-model="form.cityCode" :disabled="!editable">
                <el-option :value="item.cityIdStr" :label="item.cityNameCn" v-for="(item, index) in bankCity" :key="index"></el-option>
            </iSelect>
          </iFormItem>
        </el-col>

        <el-col :span="8">
          <iFormItem :label="language('银行名称')">
            <iInput v-model="form.bankName" :placeholder="$t('LK_QINGSHURU')+$t('YINGHANGMINCHENG')"></iInput>
          </iFormItem>
        </el-col>
        <el-col :span="8">
          <iFormItem :label="language('银行代码')">
            <iInput v-model="form.bankCode" :placeholder="$t('LK_QINGSHURU')+$t('YINHANGDAIMA')"></iInput>
          </iFormItem>
        </el-col>
        <el-col :span="8">
          <iFormItem :label="language('银行账号')">
            <iInput v-model="form.bankAccount" :placeholder="$t('LK_QINGSHURU')+$t('YINHANGZHANGHAO')"></iInput>
          </iFormItem>
        </el-col>
        <el-col :span="8">
          <iFormItem :label="language('税务代码')">
            <iInput  :placeholder="$t('LK_QINGSHURU')+$t('SHUIWUDAIMA')" v-model="form.bankTaxCode"></iInput>
          </iFormItem>
        </el-col>

        <!-- <el-col :span="6">
          <iFormItem :label="language('银行所在地')" prop="rawMaterialCodes">
            <areaSelect
              v-if="form && Object.keys(form).length"
              :countryCode.sync="form.countryCode"
              :provinceCode.sync="form.provinceCode"
              :cityCode.sync="form.cityCode"
              :disabled="!editable"
              @change="areaChange"
            />
          </iFormItem>
        </el-col> -->

        <!-- <el-col :span="6">
          <iFormItem :label="language('公司代码?')">
            <iInput
              v-model="form.rawMaterialCodes"
              :disabled="!editable"
              :placeholder="language('请输入')"
            />
          </iFormItem>
        </el-col> -->
      </el-row>
    </el-form>
    <!-- 修改 -->
    <div v-for="(item, index) in zbankList" :key="index" class="smallbank">
        <iButton class="btn" @click="removeBank(index)">删除</iButton>
        <el-divider></el-divider>
        <iCard
            collapse
            :title="$t('GONGYINGSHANGZIYINHANGZHANGHU') + (index+1)"
            class="margin-top20 ziyinhang"
        >
            <iFormGroup row="3"
                    :rules="bankRules"
                    :model="supplierData"
                    ref="bankRules">
            <iFormItem prop="settlementBankDTO.countryCode"
                        v-permission="SUPPLIER_BASEINFO_BANK_BANKINCOUNTRY">
                <iLabel :label="$t('YINHANGSUOZAIGUOJIA')" required 
                        slot="label"></iLabel>
                <iSelect v-model="settlementBankDTO.countryCode"
                        @change="changeCountry">
                <el-option :value="item.sapLocationCode"
                            :label="item.cityNameCn"
                            v-for="(item, index) in country"
                            :key="index"></el-option>
                </iSelect>
            </iFormItem>
            <iFormItem :prop="isVatile ? 'settlementBankDTO.provinceCode' : 'empty'"
                        v-permission="SUPPLIER_BASEINFO_BANK_BANKINPROVINCES">
                <iLabel :label="$t('YINGHANSUOZAISHENGFEN')" required
                        slot="label"></iLabel>
                <iSelect v-model="settlementBankDTO.provinceCode"
                        @change="changeProvince()">
                <el-option :value="item.sapLocationCode"
                            :label="item.cityNameCn"
                            v-for="(item, index) in bankProvince"
                            :key="index"></el-option>
                </iSelect>
            </iFormItem>
            <iFormItem :prop="isVatile ? 'settlementBankDTO.cityCode' : 'empty'"
                        v-permission="SUPPLIER_BASEINFO_BANK_BANKINCITY">
                <iLabel :label="$t('YINHANGSUOZAICHENGSHI')" required
                        slot="label"></iLabel>
                <iSelect v-model="settlementBankDTO.cityCode"
                        @change="changeCity()">
                <el-option :value="item.cityIdStr"
                            :label="item.cityNameCn"
                            v-for="(item, index) in bankCity"
                            :key="index"></el-option>
                </iSelect>
            </iFormItem>

            <iFormItem prop="settlementBankDTO.bankName"
                        v-permission="SUPPLIER_BASEINFO_BANK_BANKNAME">
                <iLabel :label="$t('YINGHANGMINCHENG')" required
                        slot="label"
                        icons="iconxinxitishi"
                        :tip="$t('QDLYBJHJRXKZCXY_YINGHANGMINCHEN')"></iLabel>
                <iInput v-model="settlementBankDTO.bankName"
                        :placeholder="$t('LK_QINGSHURU') + $t('YINGHANGMINCHENG')"></iInput>
            </iFormItem>
            <iFormItem prop="settlementBankDTO.bankCode"
                        v-permission="SUPPLIER_BASEINFO_BANK_BANKCODE">
                <iLabel :label="$t('YINHANGDAIMA')" required
                        slot="label"
                        icons="iconxinxitishi"
                        :tip="$t('QDLYBJHJRXKZCXY_YINGHANGDAIMA')"></iLabel>
                <iInput v-model="settlementBankDTO.bankCode"
                        :placeholder="$t('LK_QINGSHURU') + $t('YINHANGDAIMA')"></iInput>
            </iFormItem>
            <iFormItem prop="settlementBankDTO.bankAccount"
                        v-permission="SUPPLIER_BASEINFO_BANK_ACCOUNTS">
                <iLabel :label="$t('YINHANGZHANGHAO')" required
                        slot="label"></iLabel>
                <iInput v-model="settlementBankDTO.bankAccount"
                        :placeholder="$t('LK_QINGSHURU') + $t('YINHANGZHANGHAO')"></iInput>
            </iFormItem>
            <iFormItem prop="settlementBankDTO.bankAccount">
                <iLabel :label="$t('NONGMINGGONGGONGZIZHUANYONG')" required
                        slot="label"></iLabel>
                <iInput v-model="settlementBankDTO.bankAccount"
                        :placeholder="$t('LK_QINGSHURU') + $t('YINHANGZHANGHAO')"></iInput>
            </iFormItem>
            </iFormGroup>
            <iFormGroup row="1"
                    :rules="bankRules"
                    :model="supplierData"
                    ref="bankRules2">
            <iFormItem prop="settlementBankDTO.bankAccount">
                <iLabel :label="$t('BEIZHU')" required
                        slot="label"></iLabel>
                <iInput v-model="settlementBankDTO.bankAccount"
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
import { iCard, iInput, iFormGroup,iFormItem,iLabel, iButton, iMessage,iSelect } from 'rise'
import { areaSelect } from '@/components/remoteSelect'
import { updateSupplierBank } from '@/api/mainDataSupplier/list/bank'
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
    return {
      form: {
        countryCode:"",
        cityCode:"",
        provinceCode:"",
      },
      editable: false,
      originalForm: {},
      rules: {},
      country:[],
      bankProvince:[],
      bankCity:[],
      zbankList:[],
      bankRules,
      settlementBankDTO:{

      }
    }
  },
  created() {
    this.setForm(this.bankForm)
  },
  watch: {
    bankForm(val) {
      this.setForm(val)
    }
  },
  methods: {
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
                getCityInfo(req).then(result=>{
                    this.bankCity=result.data
                })
            }
        })
    },
    // 国家切换 获取省信息
    changeCountry(){
        this.form.provinceCode=""
        this.form.cityCode=""
        this.bankProvince=[]
        this.bankCity=[]
        this.getBankProvince()
    },
    addBank(){
        this.zbankList.push({

        })
    },
    removeBank(val){
        this.zbankList.splice(val,1);
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
          const params = { supplierId: this.supplierId }
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
            }
          }
          updateSupplierBank(params, data)
            .then((res) => {
              if (res.result) {
                iMessage.success(res.desZh || '保存成功')
                this.editable = false
                this.originalForm = _.cloneDeep({
                  ...this.originalForm,
                  ...data
                })
              } else {
                iMessage.error(res.desZh || '保存失败')
              }
            })
            .catch((err) => {
              iMessage.error(err.desZh || '保存失败')
            })
        }
      })
    },
    cancel() {
      this.form = _.cloneDeep(this.originalForm)
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
