<template>
  <iCard collapse :title="language('基础信息')">
    <div slot="header-control">
      <iButton v-show="!editable" @click="editable = true">
        {{ language('编辑') }}
      </iButton>
      <iButton v-show="editable" :loading="loading" @click="handleSave">
        {{ language('保存') }}
      </iButton>
      <iButton v-show="editable" @click="editable = false">
        {{ language('取消') }}
      </iButton>
    </div>
    <iFormGroup
      row="3"
      :rules="baseRules"
      :model="supplierData"
      ref="baseRules"
    >
      <iFormItem prop="isForeignManufacture">
        <iLabel :label="language('是否国外厂商')" slot="label" required />
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
          :label="language('统一社会信用代码')"
          slot="label"
          :required="!supplierData.isAbroad"
        />
        <iInput
          :placeholder="language('请输入') + language('统一社会信用代码')"
          @change="getInfosByCode"
          :disabled="!editable"
          v-model="supplierData.creditCode"
        />
      </iFormItem>
      <iFormItem prop="supplierNameCn">
        <iLabel :label="language('供应商中文名')" required slot="label" />
        <iInput
          :placeholder="language('请输入') + language('供应商中文名')"
          :disabled="!editable"
          v-model="supplierData.supplierNameCn"
        />
      </iFormItem>
      <iFormItem prop="supplierShortNameCn">
        <iLabel
          :label="language('供应商简称（中）')"
          slot="label"
          required
          icons="iconxinxitishi"
          :disabled="!editable"
          :tip="
            language(
              '中文简称规则：地区+名称+业务<br/>例：（上海友好塑料股份有限公司—上海友好塑料）'
            )
          "
        />
        <iInput
          :placeholder="language('请输入') + language('供应商简称（中）')"
          v-model="supplierData.supplierShortNameCn"
          :disabled="!editable"
        />
      </iFormItem>

      <iFormItem prop="supplierNameEn">
        <iLabel :label="language('供应商英文名')" slot="label" required />
        <iInput
          :placeholder="language('请输入') + language('供应商英文名')"
          v-model="supplierData.supplierNameEn"
          :disabled="!editable"
        />
      </iFormItem>
      <iFormItem prop="supplierShortNameEn">
        <iLabel
          :label="language('供应商简称（英）')"
          slot="label"
          required
          icons="iconxinxitishi"
          :tip="
            $t(
              '英文简称规则：地区的首字母缩写+名称+业务<br/>例：（Shanghai Friendly Plastic Co., Ltd.—Sh Friendly Plastic）'
            )
          "
        />
        <iInput
          :placeholder="language('请输入') + language('供应商简称（英）')"
          v-model="supplierData.supplierShortNameEn"
          :disabled="!editable"
        />
      </iFormItem>
      <iFormItem>
        <iLabel
          label="DUNS"
          slot="label"
          icons="iconxinxitishi"
          :tip="
            language(
              '邓白氏号申请事宜请联系<br/>上海华夏邓白氏商业信息咨询有限公司或其他地区邓白氏公司机构。'
            )
          "
        />
        <div class="duns flex-align-center">
          <iInput v-model="dunsCode.one" maxlength="2" :disabled="!editable" />
          <span></span>
          <iInput v-model="dunsCode.two" maxlength="3" :disabled="!editable" />
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
  iSelect,
  iButton
} from 'rise'
import { baseRules } from './data'
export default {
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
      default: () => {}
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
      ],
      editable: false
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
  created() {
    // this.setDuns()
  },
  methods: {
    changeFact() {
      this.$refs.baseRulesForm.clearValidate()
    },
    setDuns() {
      const duns = this.supplierData?.duns || ''
      const dunsCode = { one: '', two: '', three: '' }
      if (duns.length >= 1) {
        dunsCode.one = duns.substring(0, 2)
      }
      if (duns.length >= 2) {
        dunsCode.one = duns.substring(2, 5)
      }
      if (duns.length >= 5) {
        dunsCode.one = duns.substring(5, 9)
      }
      this.dunsCode = dunsCode
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
    },
    handleSave() {}
  }
}
</script>

<style></style>
