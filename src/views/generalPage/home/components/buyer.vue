<template>
  <iCard class="margin-top20">
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
        <iInput :placeholder="$t('LK_QINGSHURU')+$t('SUPPLIER_PURCHASEREMAIL')"
                v-model="supplierData.purchaserEmail"
                :disabled="disabled"
                @change="getUserInfo"></iInput>
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
import { iCard, iFormGroup, iFormItem, iInput, iLabel, iSelect } from 'rise'
import { purchaseRules, dictByCode } from './data'
import { getUserInfo } from '@/api/register/home'
import { generalPageMixins } from '@/views/generalPage/commonFunMixins'
export default {
  mixins: [generalPageMixins],
  components: {
    iCard,
    iFormGroup,
    iFormItem,
    iInput,
    iLabel,
    iSelect
  },
  props: {
    supplierData: {
      type: Object,
      default: () => {}
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      purchaseRules: purchaseRules,
      supplierTypeList: [] //供应商类型
    }
  },
  created() {
    this.getDictByCode()
  },
  mounted() {
    console.log(this.supplierData)
    if (this.$route.query.user && !this.supplierData.purchaserEmail) {
      this.supplierData.purchaserEmail = this.$route.query.user
      this.getUserInfo()
    }
  },
  methods: {
    // 获取供应商类型
    async getDictByCode() {
      this.supplierTypeList = await dictByCode('SUPPLIER_TYPE')
    },
    // 根据邮箱查询信息
    getUserInfo() {
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
    }
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
</style>
