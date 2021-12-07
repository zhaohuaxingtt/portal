<template>
  <iSearch
    class="margin-bottom20"
    icon
    resetKey="ROLE_SEARCH_RESET"
    searchKey="ROLE_SEARCH_CONFIRM"
    @sure="sure"
    @reset="reset"
  >
    <el-form ref="searchForm">
      <iFormItem :label="language('角色代码')">
        <iInput :placeholder="language('请输入')" v-model="form.code" />
      </iFormItem>
      <iFormItem :label="language('角色名称')">
        <iInput :placeholder="language('请输入')" v-model="form.fullNameZh" />
      </iFormItem>
    </el-form>
  </iSearch>
</template>

<script>
import { iSearch, iInput, iFormItem } from 'rise'
export default {
  name: 'filterPanel',
  components: { iSearch, iInput, iFormItem },
  data() {
    return {
      form: {
        code: '',
        fullNameZh: ''
      }
    }
  },
  methods: {
    sure() {
      this.$emit('search', { ...this.form })
    },
    reset() {
      this.form = {
        code: '',
        fullNameZh: ''
      }
      this.$emit('search', this.form)
    }
  }
}
</script>

<style lang="scss" scoped></style>
