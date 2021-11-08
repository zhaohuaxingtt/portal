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
      <iFormItem :label="$t('ROLE.ROLE_CODE')">
        <iInput
          :placeholder="$t('APPROVAL.PLEASE_INPUT')"
          v-model="form.code"
        />
      </iFormItem>
      <iFormItem :label="$t('ROLE.ROLE_NAME')">
        <iInput
          :placeholder="$t('APPROVAL.PLEASE_INPUT')"
          v-model="form.fullNameZh"
        />
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
