<template>
  <iSearch
    class="margin-bottom20"
    style="margin-top: 20px"
    @sure="sure"
    @reset="reset"
    :resetKey="PARTSPROCURE_RESET"
    :searchKey="PARTSPROCURE_CONFIRM"
    :icon="true"
  >
    <el-form>
      <iFormItem :label="$t('MT_LEIXINGMINGCHENG')">
        <iInput
          :placeholder="language('请输入', '请输入')"
          v-model="form.name"
        ></iInput>
      </iFormItem>
      <iFormItem :label="$t('会议信息描述')">
        <iInput
          :placeholder="language('请输入', '请输入')"
          v-model="form.meetingInfoDesc"
        ></iInput>
      </iFormItem>
      <iFormItem :label="$t('是否触发审批流')">
        <iSelect
          :placeholder="language('请选择', 'MT_QINGXUANZE')"
          v-model="form.isTriggerApproval"
        >
          <el-option
            v-for="(item, index) in triggerApproval"
            :key="index"
            :value="item.value"
            :label="$t(item.i18n)"
          >
          </el-option>
        </iSelect>
      </iFormItem>
    </el-form>
  </iSearch>
</template>
<script>
import { iSearch, iInput, iSelect, iFormItem } from 'rise'
import { triggerApproval, searchForm } from './data'
export default {
  components: {
    iSearch,
    iInput,
    iSelect,
    iFormItem
  },
  data() {
    return {
      triggerApproval,
      form: { ...searchForm }
    }
  },
  methods: {
    sure() {
      this.$emit('search', this.form)
    },
    reset() {
      this.form = { ...searchForm }
      this.$emit('search', this.form)
    }
  }
}
</script>
<style lang="scss" scoped></style>
