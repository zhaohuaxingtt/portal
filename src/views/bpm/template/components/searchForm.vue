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
      <iFormItem :label="language('流程序号')">
        <iInput
          :placeholder="language('请输入')"
          v-model="form.serialNo"
        ></iInput>
      </iFormItem>
      <iFormItem :label="language('流程标题')">
        <iInput
          :placeholder="language('请输入')"
          v-model="form.modelName"
        ></iInput>
      </iFormItem>
      <iFormItem :label="language('创建者')">
        <!-- <iInput
          :placeholder="language('请输入')"
          v-model="form.creater"
        ></iInput> -->
        <userSelect v-model="form.creater" />
      </iFormItem>
      <iFormItem :label="language('流程状态')">
        <iSelect :placeholder="language('请选择')" v-model="form.status">
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
import userSelect from '@/components/remoteSelect/user'
export default {
  components: {
    iSearch,
    iInput,
    iSelect,
    iFormItem,
    userSelect
  },
  data() {
    return {
      templateStatus,
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
