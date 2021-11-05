<template>
  <iSearch @sure="sure" @reset="reset">
    <el-form class="search-form">
      <el-row :gutter="20">
        <el-col :span="8">
          <iFormItem :label="$t('MTZ材料组编号')">
            <iInput
              v-model="form.materialGroupCode"
              :placeholder="$t('请输入')"
            />
          </iFormItem>
        </el-col>
        <el-col :span="8">
          <iFormItem :label="$t('大类编号/名称')">
            <iInput
              v-model="form.generalCategoryCode"
              :placeholder="$t('请输入')"
            />
          </iFormItem>
        </el-col>
        <el-col :span="8">
          <iFormItem :label="$t('科室')">
            <iInput v-model="form.dept" :placeholder="$t('请输入科室编号')" />
          </iFormItem>
        </el-col>
        <el-col :span="8">
          <iFormItem :label="$t('MTZ材料组名称(中)')">
            <iInput
              v-model="form.materialGroupNameZh"
              :placeholder="$t('请输入')"
            />
          </iFormItem>
        </el-col>
        <el-col :span="8">
          <iFormItem :label="$t('材料中类')">
            <iInput
              v-model="form.rawMaterialCode"
              :placeholder="$t('请输入')"
            />
          </iFormItem>
        </el-col>
        <el-col :span="8">
          <iFormItem :label="$t('状态')">
            <iSelect v-model="form.status" :placeholder="$t('请选择')">
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              />
            </iSelect>
          </iFormItem>
        </el-col>
        <el-col :span="8">
          <iFormItem :label="$t('MTZ材料组名称(英)')">
            <iInput
              v-model="form.materialGroupNameEn"
              :placeholder="$t('请输入')"
            />
          </iFormItem>
        </el-col>
        <el-col :span="8">
          <iFormItem :label="$t('中类描述')">
            <iInput
              v-model="form.rawMaterialName"
              :placeholder="$t('请输入')"
            />
          </iFormItem>
        </el-col>
      </el-row>
    </el-form>
  </iSearch>
</template>

<script>
import { iSearch, iInput, iSelect, iFormItem } from 'rise'
import { STATUS_OPTIONS, FILTER_FORM } from './data'
export default {
  name: 'FilterPanel',
  components: { iSearch, iInput, iSelect, iFormItem },
  data() {
    return {
      form: { ...FILTER_FORM },
      statusOptions: STATUS_OPTIONS
    }
  },
  methods: {
    reset() {
      this.form = { ...FILTER_FORM }
      this.$emit('search',this.form)
    },
    sure() {
      this.$emit('search', this.form)
    }
  }
}
</script>

<style lang="scss" scoped></style>
