<template>
  <iSearch
    class="margin-bottom20"
    :icon="true"
    @sure="sure"
    @reset="reset"
    resetKey="APPROVAL_TEMPLATE_RESET"
    searchKey="APPROVAL_TEMPLATE_CONFIRM"
  >
    <el-form>
      <iFormItem :label="$t('APPROVAL.FLOW_NO')">
        <iInput
          :placeholder="$t('APPROVAL.PLEASE_INPUT')"
          v-model="form.serialNo"
        ></iInput>
      </iFormItem>
      <iFormItem :label="$t('APPROVAL.FLOW_NAME')">
        <iInput
          :placeholder="$t('APPROVAL.PLEASE_INPUT')"
          v-model="form.modelName"
        ></iInput>
      </iFormItem>
      <iFormItem :label="$t('APPROVAL.CREATE_BY')">
        <iInput
          :placeholder="$t('APPROVAL.PLEASE_INPUT')"
          v-model="form.creater"
        ></iInput>
      </iFormItem>
      <iFormItem :label="$t('APPROVAL.FLOW_STATUS')">
        <iSelect
          :placeholder="$t('APPROVAL.PLEASE_CHOOSE')"
          v-model="form.status"
        >
          <el-option
            v-for="(item, index) in templateStatus"
            :key="index"
            :value="item.value"
            :label="item.label"
          >
          </el-option>
        </iSelect>
      </iFormItem>
    </el-form>
  </iSearch>
</template>

<script>
import { iSearch, iInput, iSelect, iFormItem } from 'rise'
import { templateStatus, searchForm } from './data'
export default {
  components: {
    iSearch,
    iInput,
    iSelect,
    iFormItem,
  },
  data() {
    return {
      templateStatus,
      form: { ...searchForm },
    }
  },
  methods: {
    sure() {
      this.$emit('search', this.form)
    },
    reset() {
      this.form = { ...searchForm }
      this.$emit('search', this.form)
    },
  },
}
</script>

<style lang="scss" scoped></style>
