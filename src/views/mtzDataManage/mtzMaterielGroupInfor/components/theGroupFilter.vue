<template>
  <iSearch @sure="sure" @reset="reset">
    <el-form class="search-form">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
          <iFormItem :label="language('MTZ材料组编号')">
            <iInput
              v-model="form.materialGroupCode"
              :placeholder="language('请输入')"
            />
          </iFormItem>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
          <iFormItem :label="language('大类编号/名称')">
            <iInput
              v-model="form.generalCategoryCode"
              :placeholder="language('请输入')"
            />
          </iFormItem>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
          <iFormItem :label="language('科室')">
            <iInput
              v-model="form.dept"
              :placeholder="language('请输入科室编号')"
            />
          </iFormItem>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
          <iFormItem :label="language('MTZ材料组名称(中)')">
            <iInput
              v-model="form.materialGroupNameZh"
              :placeholder="language('请输入')"
            />
          </iFormItem>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
          <iFormItem :label="language('材料中类')">
            <iInput
              v-model="form.rawMaterialCode"
              :placeholder="language('请输入')"
            />
          </iFormItem>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
          <iFormItem :label="language('状态')">
            <iSelect v-model="form.status" :placeholder="language('请选择')">
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              />
            </iSelect>
          </iFormItem>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
          <iFormItem :label="language('MTZ材料组名称(英)')">
            <iInput
              v-model="form.materialGroupNameEn"
              :placeholder="language('请输入')"
            />
          </iFormItem>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
          <iFormItem :label="language('中类描述')">
            <iInput
              v-model="form.rawMaterialName"
              :placeholder="language('请输入')"
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
      this.$emit('search', this.form)
    },
    sure() {
      this.$emit('search', this.form)
    }
  }
}
</script>

<style lang="scss" scoped></style>
