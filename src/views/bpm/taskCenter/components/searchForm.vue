<template>
  <iSearch
    class="margin-bottom20"
    @sure="sure"
    @reset="reset"
    search-key="APPROVAL_AGENT"
    icon
  >
    <el-form @submit.native.prevent @keyup.enter.native="sure">
      <iFormItem :label="language('任务名称')">
        <iInput :placeholder="language('请输入')" v-model="data.name" />
      </iFormItem>
      <iFormItem :label="language('任务状态')">
        <iSelect :placeholder="language('请选择')" v-model="data.status">
          <el-option
            v-for="(item, index) in taskStatuses"
            :key="index"
            :value="item.value"
            :label="item.label"
          >
          </el-option>
        </iSelect>
      </iFormItem>
      <iFormItem :label="language('任务类型')">
        <iSelect :placeholder="language('请选择')" v-model="data.category">
          <el-option
            v-for="(item, index) in taskTypes"
            :key="index"
            :value="item.name"
            :label="item.value"
          >
          </el-option>
        </iSelect>
      </iFormItem>
      <iFormItem :label="language('任务起止时间')">
        <iDatePicker
          style="width: 300px"
          v-model="data.timeRanges"
          type="datetimerange"
          :range-separator="$t('SUPPLIER_ZHI')"
          :placeholder="''"
          value-format="yyyy-MM-dd HH:mm:ss"
          clearable
        />
      </iFormItem>
    </el-form>
  </iSearch>
</template>

<script>
import { iSearch, iInput, iSelect, iFormItem, iDatePicker } from 'rise'
import { TASK_STSTUESES } from './data'
import { queryFormUrls } from '@/api/approval/index'

export default {
  name: 'SearchFrom',
  components: { iSearch, iInput, iSelect, iFormItem, iDatePicker },
  props: {
    data: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      taskTypes: [],
      taskStatuses: TASK_STSTUESES
    }
  },
  created() {
    this.getTaskTypse()
  },
  methods: {
    sure() {
      this.$emit('search', this.data)
    },
    reset() {
      this.$emit('reset')
    },
    getTaskTypse() {
      const params = {
        type: 'dutySubType'
      }
      queryFormUrls(params).then(({ data }) => {
        const taskTypes = data.records
        taskTypes.unshift({
          value: '全部',
          name: '',
          id: 0
        })
        this.taskTypes = data.records
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
