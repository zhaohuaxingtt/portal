<template>
  <iSearch @sure="sure" @reset="reset">
    <el-form class="search-form" label-position="top">
      <el-row :gutter="20">
        <el-col :span="6">
          <iFormItem :label="language('流程名称')">
            <iSelect
              :placeholder="language('请选择')"
              v-model="form.processDefinitionKeys"
              multiple
              filterable
              collpase-tags
              clearable
            >
              <el-option
                v-for="(item, index) in templates"
                :key="index"
                :value="item.name"
                :label="item.value"
              >
              </el-option>
            </iSelect>
          </iFormItem>
        </el-col>
        <el-col :span="6">
          <iFormItem :label="language('申请单号')">
            <iInput
              v-model="form.businessId"
              :placeholder="language('请输入')"
            />
          </iFormItem>
        </el-col>
        <el-col :span="6">
          <iFormItem :label="language('申请人')">
            <userSelect
              v-model="form.applyUserId"
              :placeholder="language('输入姓名和工号搜索')"
            />
          </iFormItem>
        </el-col>
        <el-col :span="6">
          <iFormItem :label="language('当前状态')">
            <!-- multiple collapse-tags -->
            <iSelect
              v-model="form.procStatus"
              :placeholder="language('请选择')"
            >
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              />
            </iSelect>
          </iFormItem>
        </el-col>
      </el-row>
    </el-form>
  </iSearch>
</template>

<script>
import { iSearch, iInput, iFormItem, iSelect } from 'rise'
import { userSelect } from '@/components/remoteSelect'
import { queryModelTemplate } from '@/api/approval/myApproval'
import { FILTER_FORM, STATUS_OPTIONS } from './data'
export default {
  name: 'FilterPanel',
  components: { iSearch, iInput, iFormItem, userSelect, iSelect },
  data() {
    return {
      form: { ...FILTER_FORM },
      statusOptions: STATUS_OPTIONS,
      templates: []
    }
  },
  created() {
    this.queryModelTemplate()
  },
  methods: {
    reset() {
      this.form = { ...FILTER_FORM }
      this.$emit('search', this.form)
    },
    sure() {
      this.$emit('search', this.form)
    },
    async queryModelTemplate() {
      const data = {
        pageNo: 1,
        pageSize: 100,
        type: 'modelTemplate'
      }
      const res = await queryModelTemplate(data)
      const list = res?.data?.records || []
      this.templates = list
    }
  }
}
</script>

<style lang="scss" scoped>
.date-durtion {
  align-items: flex-end;
}
.speator {
  padding: 0px 15px;
  height: 34px;
  background: #f8f8fa;
  box-shadow: 0px 0px 2px rgba(0, 38, 98, 0.15);
  margin-bottom: 8px;
  line-height: 35px;
}
</style>
