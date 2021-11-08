<template>
  <iSearch @sure="sure" @reset="reset">
    <el-form class="search-form">
      <el-row :gutter="20">
        <el-col :span="8">
          <iFormItem :label="$t('模具材料组编号')">
            <iInput v-model="form.code" :placeholder="$t('请输入')" />
          </iFormItem>
        </el-col>
        <el-col :span="8">
          <iFormItem :label="$t('模具材料组名称（中）')">
            <iInput v-model="form.nameZh" :placeholder="$t('请输入')" />
          </iFormItem>
        </el-col>
        <el-col :span="8">
          <iFormItem :label="$t('模具材料组名称（德）')">
            <iInput v-model="form.nameDe" :placeholder="$t('请输入')" />
          </iFormItem>
        </el-col>
      </el-row>
    </el-form>
  </iSearch>
</template>

<script>
import { iSearch, iInput, iFormItem } from 'rise'
import { FILTER_FORM } from './data'
export default {
  name: 'theMaterielMouldFilter',
  components: { iSearch, iInput, iFormItem },
  data() {
    return {
      form: { ...FILTER_FORM }
    }
  },
  methods: {
    reset() {
      this.form = { ...FILTER_FORM }
      this.$emit('search', this.form)
    },
    sure() {
      this.$emit('search', this.form)
    }
  }
}
</script>

<style lang="scss" scoped></style>
