<template>
  <iCard class="margin-top20">
    <div class="save margin-bottom20">
      <iButton @click="saveInfos()" v-permission="SUPPLIER_BASEINFO_BUYER_SAVEALL|基本信息-采购员-保存">保存</iButton>
    </div>
    <iFormGroup row="3"
                :rules="purchaseRules"
                :model="supplierData"
                ref="purchaseRulesForm">
      <iFormItem prop="purchaserEmail"
                 v-permission="SUPPLIER_BASEINFO_BUYER_EMAIL">
        <iLabel :label="$t('SUPPLIER_PURCHASEREMAIL')"
                slot="label"
                required
                icons="iconzhongyaoxinxitishi"
                tip="请填写与您联系的大众汽车采购员信息，否则您的申请将无法被审批。"></iLabel>
        <!-- <iInput :placeholder="$t('LK_QINGSHURU')+$t('SUPPLIER_PURCHASEREMAIL')"
                v-model="supplierData.purchaserEmail"
                :disabled="disabled"
                @change="getUserInfo"></iInput> -->
        <iSelect v-model="supplierData.purchaserEmail"
                 filterable
                 clearablel
                 :filter-method="filter"
                 @change="hanldeChange"
                 value-key="purchaserId">
          <el-option v-for="item in purchaseListCopy"
                     :key="item.purchaserId"
                     :value="item.purchaserEmail"
                     :label="item.purchaserEmail"></el-option>
        </iSelect>
      </iFormItem>
      <iFormItem :label="$t('SUPPLIER_PURCHASERNAME')"
                 v-permission="SUPPLIER_BASEINFO_BUYER_NAME">
        <iInput :placeholder="$t('LK_QINGSHURU')+$t('SUPPLIER_PURCHASERNAME')"
                disabled
                v-model="supplierData.purchaserName"></iInput>
      </iFormItem>
      <iFormItem prop="supplierType"
                 v-permission="SUPPLIER_BASEINFO_SUPPLIER_TYPE">
        <iLabel :label="$t('SUPPLIER_SUPPLIERTYPE')"
                slot="label"
                required
                icons="iconzhongyaoxinxitishi"
                :tip="$t('SUPPLIER_GONGYINGSHANGLEIXINGTIPS')"></iLabel>
        <iSelect v-model="supplierData.supplierType"
                 :disabled="disabled">
          <el-option :value="item.code"
                     :label="item.name"
                     v-for="(item, index) in supplierTypeList"
                     :key="index"></el-option>
        </iSelect>
      </iFormItem>
      <iFormItem prop="supplierType"
                 v-permission="SUPPLIER_BASEINFO_SUPPLIER_TYPE">
        <iLabel :label="language(
                'CAIGOUYUANGONGHAO',
                '采购员工号'
              )"
                slot="label"></iLabel>
        <iInput v-model="supplierData.userNum"
                :disabled="disabled">
        </iInput>
      </iFormItem>
      <iFormItem prop="supplierType"
                 v-permission="SUPPLIER_BASEINFO_SUPPLIER_TYPE">
        <iLabel :label="language(
                'CAIGOUYUANKESHI',
                '采购员科室'
              )"
                slot="label"></iLabel>
        <iInput v-model="supplierData.purchaserSection"
                :disabled="disabled">
        </iInput>
      </iFormItem>
    </iFormGroup>
  </iCard>
</template>

<script>
import { iCard, iFormGroup, iFormItem, iInput, iLabel, iSelect, iMessage, iButton } from 'rise'
import { purchaseRules, dictByCode } from './data'
import { getUserInfo, getPurchaseInfo, isHaveUnfinishedTaskOrProcess, savePurchaserEmail } from '@/api/register/home'
import { generalPageMixins } from '@/views/generalPage/commonFunMixins'
export default {
  mixins: [generalPageMixins],
  components: {
    iCard,
    iFormGroup,
    iFormItem,
    iInput,
    iLabel,
    iSelect,
    iButton
  },
  props: {
    supplierData: {
      type: Object,
      default: () => { }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    supplierData (val) {
      if (val.purchaserJobNumber) {
        this.supplierData.userNum = val.purchaserJobNumber
      }
    }
  },
  data () {
    return {
      purchaseRules: purchaseRules,
      supplierTypeList: [], //供应商类型
      purchaseList: [],
      purchaseObj: {},
      purchaseListCopy: []
    }
  },
  created () {
    this.getPurchaseInfo()
    this.getDictByCode()
  },
  mounted () {
    if (this.$route.query.user && !this.supplierData.purchaserEmail) {
      this.supplierData.purchaserEmail = this.$route.query.user
      this.getUserInfo()
    }
  },
  methods: {
    // 保存信息
    saveInfos(){
      isHaveUnfinishedTaskOrProcess(this.$route.query.subSupplierId).then(res=>{
        if(res?.code=='200'){
          savePurchaserEmail({
            supplierId:this.$route.query.subSupplierId,
            purchaserEmail:this.supplierData.purchaserEmail,
          }).then(res=>{
            if(res?.code == '200'){
              iMessage.success(this.$i18n.locale == 'zh' ? res.desZh : res.dataEn)
            }
          })
        }else{
          iMessage.error(this.$i18n.locale == 'zh' ? res.desZh : res.dataEn)
        }
      })
    },
    // 获取供应商类型
    async getDictByCode () {
      this.supplierTypeList = await dictByCode('SUPPLIER_TYPE')
    },
    // 根据邮箱查询信息
    getUserInfo () {
      getUserInfo({
        purchaserEmail: this.supplierData.purchaserEmail
      }).then((res) => {
        if (res.data) {
          this.supplierData.purchaserName = res.data.nameZh || ''
          //   this.supplierData.userNum = res.data.userNum || ''
          this.$set(this.supplierData, 'userNum', res.data.userNum)
          this.$set(
            this.supplierData,
            'purchaserSection',
            res.data.purchaserSection
          )

          if (!this.supplierData.supplierType)
            this.supplierData.supplierType = res.data.sapUserType || ''
        }
        console.log(this.supplierData)
      })
    },
    clearDiolog () {
      this.purchaseObj = {}
      this.purchaseListCopy = []
      this.$emit("input", false);
    },
    hanldeChange (val) {
      if (!val) this.purchaseListCopy = JSON.parse(JSON.stringify(this.purchaseList)) || []
      let purchaseObj = this.purchaseListCopy.find(item => item.purchaserEmail === val)
      this.supplierData.purchaserSection = purchaseObj?.department || ''
      this.supplierData.userNum = purchaseObj?.userNum || ''
      this.supplierData.purchaserName = purchaseObj?.purchaserName || ''
      this.supplierData.purchaserId = purchaseObj?.purchaserId || ''
    },
    filter (val) {
      if (!val){
        this.purchaseListCopy = JSON.parse(JSON.stringify(this.purchaseList)) || []
      }else{
        // this.purchaseListCopy = this.purchaseList.filter(item => item.purchaserEmail.indexOf(val) > -1)
        this.purchaseListCopy = this.purchaseList.filter((item) => {
          // if(item.purchaserEmail){
          //   return item.purchaserName.indexOf(val) > -1 || item.purchaserEmail.indexOf(val) > -1
          // }else{
          //   return item.purchaserName.indexOf(val) > -1
          // }
          if(item.purchaserEmail){
            return item.purchaserName.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.purchaserEmail.toLowerCase().indexOf(val.toLowerCase()) > -1
          }else{
            return item.purchaserName.toLowerCase().indexOf(val.toLowerCase()) > -1
          }
        })
      }
    },
    getPurchaseInfo () {
      let req = {
        supplierToken: this.$route.query.supplierToken,
        tag: '1'
      }
      getPurchaseInfo(req).then(res => {
        if (res?.code == '200') {
          console.log(res.data);
          this.purchaseList = res.data.filter(item=>item.purchaserEmail)
          this.purchaseListCopy = JSON.parse(JSON.stringify(this.purchaseList))
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.duns {
  > span {
    display: inline-block;
    width: 18px;
    height: 1px;
    margin: 0 10px;
    background-color: $color-black;
  }
}

::v-deep .tips:hover .text {
  white-space: pre-line !important;
}
.save {
  text-align: right;
}
</style>
