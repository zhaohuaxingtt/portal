<template>
  <div>
    <iCard v-loading="loading">
      <el-form label-width="110px" label-position="left">
        <el-row :gutter="30">
          <el-col :span="6" v-if="form.businessId">
            <iFormItem :label="language('代理号')">
              <iInput :value="form.businessId" disabled />
            </iFormItem>
          </el-col>
          <el-col :span="6">
            <iFormItem :label="language('授权人')">
              <iInput
                :placeholder="language('请输入')"
                :value="form.assigneeName"
                disabled
              />
            </iFormItem>
          </el-col>
          <el-col :span="6">
            <iFormItem :label="language('代理人')">
              <userSearch
                v-model="form.attorney"
                :disabled="!editAble"
                :default-options="[
                  { nameZh: form.attorneyName, id: form.attorney }
                ]"
              />
            </iFormItem>
          </el-col>
          <el-col :span="6">
            <iFormItem :label="language('代理内容')">
              <iSelect
                :placeholder="language('请选择')"
                v-model="form.category"
                :disabled="!editAble"
              >
                <el-option
                  v-for="item in approvalTodos"
                  :key="item.category"
                  :value="item.category"
                  :label="item.modelName"
                />
              </iSelect>
            </iFormItem>
          </el-col>
          <el-col :span="6">
            <iFormItem label="是否有效">
              <iSelect
                :placeholder="language('请选择')"
                v-model="form.status"
                :disabled="!editAble"
              >
                <el-option
                  v-for="(item, index) in statusList"
                  :key="index"
                  :value="item.value"
                  :label="item.label"
                />
              </iSelect>
            </iFormItem>
          </el-col>
          <el-col :span="6">
            <iFormItem :label="language('代理开始时间')">
              <iDatePicker
                v-model="form.startTime"
                :placeholder="language('请选择')"
                style="width: 100%"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                :disabled="!editAble"
                default-time="00:00:00"
                :picker-options="startTimeOptions"
                @change="startTimeChange"
              />
            </iFormItem>
          </el-col>
          <el-col :span="6">
            <iFormItem :label="language('代理结束时间')">
              <iDatePicker
                v-model="form.endTime"
                :placeholder="language('请选择')"
                style="width: 100%"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                :disabled="!editAble"
                :picker-options="endTimeOptions"
                default-time="23:59:59"
              />
            </iFormItem>
          </el-col>
        </el-row>
      </el-form>
    </iCard>
  </div>
</template>

<script>
import { iCard, iFormItem, iSelect, iInput, iDatePicker } from 'rise'

import { userSelect } from '@/components/remoteSelect'
import { fetchAgent } from '@/api/approval/agent'
import { queryTemplates } from '@/api/approval'

export default {
  name: 'ApprovalAgentAdd',
  components: {
    iCard,
    iFormItem,
    iSelect,
    iInput,
    iDatePicker,
    userSearch: userSelect
  },
  computed: {
    pageTitle() {
      if (this.$route.query.type === 'normal') {
        return this.language('审批代理')
      }
      return this.language('会议审批代理')
    },
    agentType() {
      return this.$route.query.type === 'normal' ? 2 : 1
    }
  },
  data() {
    return {
      editAble: false,
      approvalTodos: [],
      form: {},
      selectedRows: [],
      loading: false,
      statusList: [
        {
          value: true,
          label: '有效'
        },
        {
          value: false,
          label: '失效'
        }
      ],
      backData: null,
      endTimeOptions: {
        disabledDate(time) {
          return (
            moment(new Date(time)).format('YYYY-MM-DD') <
            moment(new Date()).format('YYYY-MM-DD')
          )
        }
      },
      startTimeOptions: {
        disabledDate(time) {
          return (
            new Date(time).getTime() <
            new Date().getTime() - 24 * 60 * 60 * 1000
          )
        }
      }
    }
  },
  created() {
    this.fetchAgent()
    this.queryUndoApprovals()
    this.backData = _.cloneDeep(this.form)
  },
  methods: {
    startTimeChange(val) {
      this.endTimeOptions = {
        disabledDate(time) {
          return (
            moment(new Date(time)).format('YYYY-MM-DD') <
            moment(new Date(val + ' 00:00:00')).format('YYYY-MM-DD')
          )
        }
      }
    },
    async fetchAgent() {
      this.loading = true
      const { data } = await fetchAgent(this.$route.params.id).finally(
        () => (this.loading = false)
      )
      if (data) {
        this.form = data
        this.endTimeOptions = {
          disabledDate(time) {
            return (
              moment(time).format('YYYY-MM-DD') <
              moment(new Date(data.startTime)).format('YYYY-MM-DD')
            )
          }
        }
        this.backData = _.cloneDeep(data)
      }
    },
    async queryUndoApprovals() {
      const data = {
        pageNo: 1,
        pageSize: 1000,
        type: this.agentType
      }
      this.tableLoading = true
      queryTemplates(data).then((res) => {
        const { data } = res.data
        this.approvalTodos = data
      })
    },
    reset() {
      if (this.backData) {
        this.form = _.cloneDeep(this.backData)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.agent-user-select {
  position: relative;
  .agent-user-select-icon {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    z-index: 9;
    font-size: 18px;
    .icon {
      font-size: 16px;
    }
  }
}
</style>
