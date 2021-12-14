<template>
  <iCard tabCard collapse :title="language('JICHUXINXI', '基础信息')">
    <iFormGroup
      row="3"
      :rules="baseRules"
      :model="supplierData"
      ref="baseRules"
    >
      <iFormItem prop="isForeignManufacture">
        <iLabel
          :label="language('SHIFOUGUOWAICHANGSHANG', '是否国外厂商')"
          slot="label"
          required
        ></iLabel>
        <iSelect
          @change="changeFact"
          v-model="supplierData.isAbroad"
          :disabled="!editable"
        >
          <el-option
            :value="item.code"
            :label="item.name"
            v-for="(item, index) in isForeignCountryList"
            :key="index"
          ></el-option>
        </iSelect>
      </iFormItem>
      <iFormItem :prop="supplierData.isAbroad ? '' : 'creditCode'">
        <iLabel
          :label="$t('UnifySocialCreditCode')"
          slot="label"
          :required="!supplierData.isAbroad"
        ></iLabel>
        <iInput
          :disabled="!editable"
          :placeholder="$t('LK_QINGSHURU') + $t('UnifySocialCreditCode')"
          @change="getInfosByCode"
          v-model="supplierData.creditCode"
        ></iInput>
      </iFormItem>
      <iFormItem prop="supplierNameCn">
        <iLabel :label="$t('SupplierZh')" required slot="label"></iLabel>
        <iInput
          :disabled="!editable"
          :placeholder="$t('LK_QINGSHURU') + $t('SupplierZh')"
          v-model="supplierData.supplierNameCn"
        ></iInput>
      </iFormItem>
      <iFormItem prop="supplierShortNameCn">
        <iLabel
          :label="$t('SupplierAbbreviationZh')"
          slot="label"
          required
          icons="iconxinxitishi"
          :tip="$t('SUPPLIER_GONGYINGSHANGJIANCHENZHTIPS')"
        ></iLabel>
        <iInput
          :disabled="!editable"
          :placeholder="$t('LK_QINGSHURU') + $t('SupplierAbbreviationZh')"
          v-model="supplierData.supplierShortNameCn"
        ></iInput>
      </iFormItem>

      <iFormItem prop="supplierNameEn">
        <iLabel :label="$t('SupplierEn')" slot="label" required></iLabel>
        <iInput
          :disabled="!editable"
          :placeholder="$t('LK_QINGSHURU') + $t('SupplierEn')"
          v-model="supplierData.supplierNameEn"
        ></iInput>
      </iFormItem>
      <iFormItem prop="supplierShortNameEn">
        <iLabel
          :label="$t('SupplierAbbreviationEn')"
          slot="label"
          required
          icons="iconxinxitishi"
          :tip="$t('SUPPLIER_GONGYINGSHANGJIANCHENGENTIPS')"
        ></iLabel>
        <iInput
          :disabled="!editable"
          :placeholder="$t('LK_QINGSHURU') + $t('SupplierAbbreviationEn')"
          v-model="supplierData.supplierShortNameEn"
        ></iInput>
      </iFormItem>
      <iFormItem>
        <iLabel
          label="DUNS"
          slot="label"
          icons="iconxinxitishi"
          :tip="$t('SUPPLIER_DUNSTIPS')"
        >
        </iLabel>
        <div class="duns flex-align-center">
          <iInput
            v-model="dunsCode.one"
            maxlength="2"
            :disabled="!editable"
          ></iInput>
          <span></span>
          <iInput
            v-model="dunsCode.two"
            maxlength="3"
            :disabled="!editable"
          ></iInput>
          <span></span>
          <iInput
            v-model="dunsCode.three"
            maxlength="4"
            :disabled="!editable"
          />
        </div>
      </iFormItem>
    </iFormGroup>
  </iCard>
</template>

<script>
// iMessage
import {
  iCard,
  iFormGroup,
  iFormItem,
  iInput,
  iLabel,
  iMessage,
  iSelect
} from 'rise'
import { baseRules } from './data'
export default {
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
    loading: {
      type: Boolean,
      default: false
    },
    editable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dunsCode: {
        one: '',
        two: '',
        three: ''
      },
      baseRules: baseRules,
      isForeignCountryList: [
        { name: this.language('SHI', '是'), code: 1 },
        { name: this.language('FOU', '否'), code: 0 }
      ]
    }
  },
  watch: {
    supplierData(val) {
      if (val.duns) {
        console.log(val)
        this.splitDuns()
      }
    }
  },
  created() {},
  methods: {
    changeFact() {
      this.$refs.baseRulesForm.clearValidate()
    },
    //获取邓氏号
    getDunsCode() {
      if (
        this.dunsCode.one.length == 2 &&
        this.dunsCode.two.length == 3 &&
        this.dunsCode.three.length == 4
      ) {
        return (
          this.dunsCode.one +
          '-' +
          this.dunsCode.two +
          '-' +
          this.dunsCode.three
        )
      } else if (
        this.dunsCode.one.length == 0 &&
        this.dunsCode.two.length == 0 &&
        this.dunsCode.three.length == 0
      ) {
        return ''
      } else {
        iMessage.warn('duns号错误，例：xx-xxx-xxxx')
        return 1
      }
    },
    // 拆分邓氏号
    splitDuns() {
      let arr = this.supplierData.duns.split('-')
      this.dunsCode.one = arr[0]
      this.dunsCode.two = arr[1]
      this.dunsCode.three = arr[2]
    }
  }
}
</script>

<style></style>
