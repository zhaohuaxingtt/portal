<template>
  <iPage>
    <pageHeader class="margin-bottom20">
      {{ pageTitle }}
    </pageHeader>
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
      <div class="flex-end-center margin-bottom20" v-if="form.status">
        <iButton v-show="!editAble" @click="editAble = true">
          {{ language('编辑') }}
        </iButton>
        <iButton v-show="editAble" @click="save">
          {{ language('保存') }}
        </iButton>
        <iButton v-show="editAble" @click="reset">
          {{ $t('POSITION.RESET') }}
        </iButton>
        <iButton v-show="editAble" @click="$router.go(-1)">
          {{ language('取消') }}
        </iButton>
      </div>
    </iCard>
  </iPage>
</template>

<script>
import {
  iPage,
  iCard,
  iFormItem,
  iSelect,
  iInput,
  iDatePicker,
  iButton,
  iMessage
} from 'rise'
import pageHeader from '@/components/pageHeader'
import { userSelect } from '@/components/remoteSelect'
import { fetchAgent, updateAgent } from '@/api/approval/agent'
import { queryTemplates } from '@/api/approval'

export default {
  name: 'ApprovalAgentAdd',
  components: {
    iPage,
    iCard,
    pageHeader,
    iFormItem,
    iSelect,
    iInput,
    iDatePicker,
    iButton,
    userSearch: userSelect
  },
  computed: {
    pageTitle() {
      if (this.$route.query.type === 'normal') {
        return this.language('编辑') + this.language('审批代理')
      }
      return this.language('编辑') + this.language('会议审批代理')
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

      /* const params = {
        pageNo: 1,
        pageSize: 1000
      }
      const data = {
        userID: this.$store.state.permission.userInfo.id
      }
      const res = await queryUndoApprovals(params, data)
      const list = res?.data?.records || []
      this.approvalTodos = list */
    },
    reset() {
      if (this.backData) {
        this.form = _.cloneDeep(this.backData)
      }
    },
    handleTaskIdChange(taskId, row) {
      const approvalTodoItem = this.approvalTodos.filter(
        (e) => e.taskId === taskId
      )
      if (approvalTodoItem && approvalTodoItem.length > 0) {
        row.processId = approvalTodoItem[0].instanceId
      }
    },
    save() {
      const submitData = {
        ...this.form,
        startTime: this.form.startTime.includes('00:00:00')
          ? this.form.startTime
          : this.form.startTime + ' 00:00:00',
        endTime: this.form.endTime.includes('23:59:59')
          ? this.form.endTime
          : this.form.endTime + ' 23:59:59'
      }
      this.loading = true
      updateAgent(submitData)
        .then((res) => {
          if (res.result) {
            iMessage.success(this.language('保存成功'))
            this.$router.go(-1)
          } else {
            iMessage.error(res.desZh || '保存失败')
          }
        })
        .catch((err) => {
          iMessage.error(err.desZh || '保存失败')
        })
        .finally(() => {
          this.loading = false
        })
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
