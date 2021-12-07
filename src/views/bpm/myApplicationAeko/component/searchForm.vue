<template>
  <iSearch
    class="margin-bottom20"
    style="margin-top: 20px"
    @sure="sure"
    @reset="reset"
    :search-key="PARTSPROCURE_CONFIRM"
  >
    <el-form ref="searchFrom">
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
          <iFormItem
            :label="language('任务起止日期')"
            class="form-item-date"
            ref="dateFormItem"
          >
            <iDatePicker
              v-model="date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width: 100%"
              @change="handleDateChange"
            />
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
import { BPM_APPROVAL_TYPE_OPTIONS } from '@/constants'
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
      date: '',
      dOptions: BPM_APPROVAL_TYPE_OPTIONS
    }
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
    sure() {
      const searchData = { ...this.form }
      if (this.date && this.date.length === 2) {
        searchData.startTime = this.date[0]
        searchData.endTime = this.date[1]
      }
      this.$emit('search', searchData)
    },
    reset() {
      this.form = { ...searchForm }

      this.date = ''
      this.$emit('search', this.form)
    },
    handleDateChange(e) {
      console.log('handleDateChange', e)
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
