<template>
  <iSearch
    class="margin-bottom20"
    @sure="sure"
    @reset="reset"
    search-key="APPROVAL_AGENT"
  >
    <el-form>
      <iFormItem :label="language('授权人')">
        <userSearch v-model="data.assignee" />
      </iFormItem>
      <iFormItem :label="language('代理人')">
        <userSearch v-model="data.attorney" />
      </iFormItem>
      <iFormItem :label="language('是否有效')">
        <iSelect :placeholder="language('请选择')" v-model="data.status">
          <el-option
            v-for="(item, index) in agentStatuses"
            :key="index"
            :value="item.value"
            :label="item.label"
          >
          </el-option>
        </iSelect>
      </iFormItem>
    </el-form>
  </iSearch>
</template>

<script>
import { iSearch, iSelect, iFormItem } from 'rise'
import { AGENT_TYPES, AGENT_STSTUESES } from './data'
import { userSelect } from '@/components/remoteSelect'
export default {
  name: 'SearchFrom',
  components: { iSearch, iSelect, iFormItem, userSearch: userSelect },
  props: {
    data: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      agentTypes: AGENT_TYPES,
      agentStatuses: AGENT_STSTUESES
    }
  },
  methods: {
    sure() {
      this.$emit('search')
    },
    reset() {
      this.$emit('reset')
    }
  }
}
</script>

<style lang="scss" scoped></style>
