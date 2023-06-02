<template>
  <iCard
    tabCard
    collapse
    :title="$t('JINGYINGZHUANGTAI')"
    class="margin-top20 operation"
  >
    <el-form
      label-position="top"
      :rules="businessRules"
      :model="supplierData"
      ref="businessRules1"
	    hide-required-asterisk
    >
      <el-form-item
        prop="supplierDTO.businessScope"
        v-permission="SUPPLIER_BASEINFO_BUSINESSSTATUS_BUSINESSSCOPE_GP"
      >
        <iLabel :label="$t('JINGYINGFANWEI')" required slot="label"></iLabel>
        <iInput
          v-model="supplierData.supplierDTO.businessScope"
          type="textarea"
          rows="4"
        ></iInput>
      </el-form-item>
    </el-form>
    <iFormGroup
      row="3"
      class="margin-top25"
      :rules="businessRules"
      :model="supplierData"
      ref="businessRules"
    >
      <iFormItem
        prop="supplierDTO.businessPeriod"
        v-permission="SUPPLIER_BASEINFO_BUSINESSSTATUS_BUSINESSPERIOD_GP"
      >
        <iLabel :label="$t('JINGYINGQIXIAN')" required slot="label"></iLabel>
        <iInput
          v-model="supplierData.supplierDTO.businessPeriod"
          :placeholder="$t('LK_QINGSHURU') + $t('JINGYINGQIXIAN')"
        ></iInput>
      </iFormItem>
      <iFormItem
        prop="supplierDTO.businessPlaceForm"
        v-permission="
          SUPPLIER_BASEINFO_BUSINESSSTATUS_FORMSOFOWNERSHIPOFBUSINESSSITE_GP
        "
      >
        <iLabel
          :label="$t('JINGYINGCHANSUOSUOYOUXINGSHI')"
          required
          slot="label"
        ></iLabel>
        <iSelect v-model="supplierData.supplierDTO.businessPlaceForm">
          <el-option
            :value="item.code"
            :label="item.name"
            v-for="(item, index) in fromGroup.OWNMODE"
            :key="index"
          ></el-option>
        </iSelect>
      </iFormItem>
      <iFormItem
        prop="supplierDTO.businessPlacePosition"
        v-permission="
          SUPPLIER_BASEINFO_BUSINESSSTATUS_LOCATIONOFBUSINESSSITE_GP
        "
      >
        <iLabel
          :label="$t('JINGYINGCHANGSUOWEIZHI')"
          required
          slot="label"
        ></iLabel>
        <iInput
          v-model="supplierData.supplierDTO.businessPlacePosition"
          :placeholder="$t('LK_QINGSHURU') + $t('JINGYINGCHANGSUOWEIZHI')"
        >
        </iInput>
      </iFormItem>
    </iFormGroup>
  </iCard>
</template>

<script>
import { iCard, iFormGroup, iFormItem, iLabel, iInput, iSelect } from 'rise'
import { businessRules } from './data'
export default {
  components: { iCard, iFormGroup, iFormItem, iLabel, iInput, iSelect },
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
      businessRules
    }
  }
}
</script>

<style lang="scss" scoped>
.operation {
  ::v-deep .el-form-item__label {
    font-size: 16px;
  }
}
</style>
