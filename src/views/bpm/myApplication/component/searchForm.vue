<template>
  <iSearch
    class="margin-bottom20"
    style="margin-top: 20px"
    @sure="sure"
    @reset="reset"
    :search-key="PARTSPROCURE_CONFIRM"
  >
    <el-form>
      <el-row :gutter="20">
        <el-col :span="6">
          <iFormItem :label="language('单据编号')">
            <iInput
              :placeholder="language('请输入')"
              v-model="form.businessId"
            />
          </iFormItem>
        </el-col>
        <el-col :span="6">
          <iFormItem :label="language('单据类型')">
            <iSelect
              :placeholder="language('请选择')"
              multiple
              collapse-tags
              v-model="form.itemType"
            >
              <el-option
                v-for="(item, index) in dOptions"
                :key="index"
                :value="item.value"
                :label="item.label"
              >
              </el-option>
            </iSelect>
          </iFormItem>
        </el-col>
        <el-col :span="12">
          <iFormItem :label="language('任务名称')" style="width: 80%">
            <iSelect
              :placeholder="language('请选择')"
              v-model="form.categoryList"
              multiple
              collapse-tags
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

        <el-col :span="12">
          <iFormItem :label="language('任务起止日期')" class="form-item-date">
            <iDatePicker
              v-model="date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width: 100%"
            >
            </iDatePicker>
          </iFormItem>
        </el-col>
        <el-col :span="6">
          <iFormItem :label="language('审批进度')">
            <iSelect
              :placeholder="language('请选择')"
              v-model="form.procProgress"
              multiple
              collapse-tags
              @change="handleProcProgressChange"
            >
              <el-option
                v-for="(item, index) in approvalStatus"
                :key="index"
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
import { iSearch, iInput, iSelect, iFormItem, iDatePicker } from 'rise'
import {
  searchForm,
  approvalToDoStatus,
  approvalFinishedStatus,
  approvalTypes
} from './data'
import { queryModelTemplate } from '@/api/approval/myApproval'
import { AEKO_CATEGORY_LIST, BPM_APPROVAL_TYPE_OPTIONS } from '@/constants'
export default {
  name: 'searchForm',
  props: {
    finished: {
      type: Boolean,
      default: false
    }
  },
  components: {
    iSearch,
    iInput,
    iSelect,
    iFormItem,
    iDatePicker
  },
  data() {
    return {
      form: { ...searchForm },
      approvalTypes,
      templates: [],
      date: '',
      dOptions: BPM_APPROVAL_TYPE_OPTIONS
    }
  },
  created() {
    if (this.$route.query.modelTemplate) {
      this.form.categoryList = JSON.parse(this.$route.query.modelTemplate)
    }
    this.queryModelTemplate()
  },
  computed: {
    approvalStatus() {
      return this.finished ? approvalFinishedStatus : approvalToDoStatus
    }
  },
  watch: {
    finished() {
      Vue.set(this.form, 'procProgress', '')
    }
  },
  methods: {
    async queryModelTemplate() {
      const data = {
        pageNo: 1,
        pageSize: 100,
        type: 'modelTemplate'
      }
      const res = await queryModelTemplate(data)
      const list = res?.data?.records || []
      list.unshift({ name: '', value: '全部' })
      this.templates = list.filter((e) => !AEKO_CATEGORY_LIST.includes(e.name))
    },
    sure() {
      const searchData = { ...this.form }
      if (this.date) {
        searchData.startTime = this.date[0]
        searchData.endTime = this.date[1]
      }
      this.$emit('search', searchData)
    },
    reset() {
      this.date = ''
      this.form = { ...searchForm }
      this.$emit('search', this.form)
    },
    handleProcProgressChange(val) {
      if (val.length > 0) {
        if (val[val.length - 1] === 0) {
          Vue.set(this.form, 'procProgress', [0])
        } else {
          if (val.indexOf(0) > -1) {
            Vue.set(
              this.form,
              'procProgress',
              val.filter((e) => e !== 0)
            )
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.form-item-date {
  width: 586px !important;
}
</style>
