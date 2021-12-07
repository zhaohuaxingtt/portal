<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-09-08 18:58:00
 * @LastEditors: zbin
 * @Descripttion: your project
-->
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
        <iSelect
          :placeholder="language('请选择')"
          v-model="data.processingStatus"
        >
          <el-option
            v-for="(item, index) in taskStatuses"
            :key="index"
            :value="item.code"
            :label="item.message"
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
import { getProcessStatusEnum } from '@/api/supplierManagement/supplyChainRisk/index.js'

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
      taskStatuses: []
    }
  },
  created() {
    this.getProcessStatusEnum()
  },
  methods: {
    async getProcessStatusEnum() {
      const res = await getProcessStatusEnum()
      this.taskStatuses = res.data
    },
    sure() {
      if (this.data.timeRanges) {
        this.data.startDateTime = this.data.timeRanges[0]
        this.data.endDateTime = this.data.timeRanges[1]
      } else {
        this.data.startDateTime = ''
        this.data.endDateTime = ''
      }
      this.$emit('search', this.data)
    },
    reset() {
      this.$emit('reset')
    }
  }
}
</script>

<style lang="scss" scoped></style>
