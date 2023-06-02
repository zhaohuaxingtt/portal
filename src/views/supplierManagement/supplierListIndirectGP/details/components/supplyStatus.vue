<template>
  <iCard tabCard collapse :title="$t('GONGHUOZHUANGTAI')" class="margin-top20">
    <iFormGroup row="3">
      <!-- 是否在供 -->
      <iFormItem v-permission="SUPPLIER_BASEINFO_SUPPLIERSTATUS_ISSUPPLY_GP">
        <iLabel :label="$t('SHIFOUZAIGONG')" slot="label"></iLabel>
        <iText>{{
          dicName('TURE_FALSE', supplierData.gpSupplierDTO.isSupply)
        }}</iText>
      </iFormItem>

      <!-- 供应商身份 -->
      <iFormItem
        v-permission="SUPPLIER_BASEINFO_SUPPLIERSTATUS_SUPPLIERSTATUS_GP"
      >
        <iLabel :label="$t('GYSSF')" slot="label"></iLabel>
        <iText>{{ supplierData.gpSupplierDTO.formalStatus }}</iText>
      </iFormItem>
      <iFormItem
        v-permission="SUPPLIER_BASEINFO_SUPPLIERSTATUS_ISSHAREDSUPPLIER_GP"
      >
        <iLabel :label="$t('SHIFOUGONGONGGONGYINGSHANG')" slot="label"></iLabel>
        <iText>{{
          dicName('TURE_FALSE', supplierData.gpSupplierDTO.isShareSupplier)
        }}</iText>
      </iFormItem>
    </iFormGroup>
  </iCard>
</template>

<script>
import { iCard, iFormGroup, iFormItem, iLabel, iText } from 'rise'
import { generalPageMixins } from '@/views/generalPage/commonFunMixins'
export default {
  mixins: [generalPageMixins],
  components: { iCard, iFormGroup, iFormItem, iLabel, iText },
  props: {
    supplierData: {
      type: Object,
      default: () => {}
    },
    fromGroup: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      that: this
    }
  },
  methods: {
    // 字典值回显
    dicName(key, value) {
      console.log(key,value);
      let name = ''
      if (this.fromGroup[key]) {
        this.fromGroup[key].filter((item) => {
          if (value) {
            if (item.code == value.toString()) {
              name = item.name
            }
          }
        })
        return name
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
