<template>
  <iSearch @sure="sure" @reset="reset">
    <el-form class="search-form" inline>
      <iFormItem :label="language('MTZ材料组编号')">
        <iInput v-model="form.materialGroupCode" :placeholder="language('请输入')" />
      </iFormItem>
      <iFormItem :label="language('MTZ材料组名称')">
        <iInput v-model="form.materialGroupName" :placeholder="language('请输入')" />
      </iFormItem>
      <iFormItem :label="language('零件材料组编号')">
        <iInput v-model="form.categoryCode" :placeholder="language('请输入')" />
      </iFormItem>
      <iFormItem :label="language('零件材料组名称')">
        <iInput v-model="form.categoryName" :placeholder="language('请输入')" />
      </iFormItem>
      <iFormItem :label="language('零件六位号')">
        <iInput v-model="form.sixPartCode" :placeholder="language('请输入')" />
      </iFormItem>
      <iFormItem :label="language('科室')">
        <!-- <orgSelect v-model="form.deptCode" /> -->
        <iInput v-model="form.deptCode" :placeholder="language('请输入科室编号')" />
      </iFormItem>
    </el-form>
  </iSearch>
</template>

<script>
import { iSearch, iInput, iFormItem } from 'rise'
import { RELATION_FILTER_FORM } from './data'
export default {
  name: 'theRelationFilter',
  components: { iSearch, iInput, iFormItem },
  data() {
    return {
      form: { ...RELATION_FILTER_FORM }
    }
  },
  created() {
    if (this.$route.query.code) {
      this.form.materialGroupCode = this.$route.query.code
    }
    this.$nextTick(() => {
      this.$emit('search', this.form)
    })
  },
  methods: {
    reset() {
      this.form = { ...RELATION_FILTER_FORM }
      this.$emit('search', this.form)
    },
    sure() {
      this.$emit('search', this.form)
    }
  }
}
</script>

<style lang="scss" scoped></style>
