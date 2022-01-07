<template>
  <iPage>
    <pageHeader class="margin-bottom20">
      {{ pageTitle }}
    </pageHeader>
    <iCard v-loading="loading">
      <agentTable
        :data="agentList"
        :approval-todos="approvalTodos"
        @save="save"
        @add="addRow"
        @remove="removeRows"
      />
    </iCard>
  </iPage>
</template>

<script>
import { agentTable } from './components'
import { iPage, iCard, iMessage } from 'rise'
import pageHeader from '@/components/pageHeader'
import { addAgent } from '@/api/approval/agent'
import { queryTemplates } from '@/api/approval'

export default {
  name: 'ApprovalAgentAdd',
  components: { iPage, iCard, agentTable, pageHeader },
  computed: {
    pageTitle() {
      if (this.$route.query.type === 'normal') {
        return this.language('新建') + this.language('审批代理')
      }
      return this.language('新建') + this.language('会议审批代理')
    },
    agentType() {
      return this.$route.query.type === 'meeting' ? 2 : 1
    }
  },
  data() {
    return {
      agentList: [],
      approvalTodos: [],
      loading: false
    }
  },
  created() {
    this.queryUndoApprovals()
  },
  methods: {
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
    addRow() {
      this.agentList.push({
        assignee: this.$store.state.permission.userInfo.id,
        attorney: '',
        endTime: '',
        startTime: moment().format('YYYY-MM-DD'),
        status: true,
        category: '',
        type: this.agentType,
        endTimeOptions: {
          disabledDate(time) {
            return (
              moment(time).format('YYYY-MM-DD') <
              moment(new Date()).format('YYYY-MM-DD')
            )
          }
        }
      })
    },
    removeRows(rows) {
      this.agentList = this.agentList.filter((e) => !rows.includes(e))
    },
    save() {
      const agentList = this.agentList.map((e) => {
        return {
          ...e,
          startTime: e.startTime + ' 00:00:00',
          endTime: e.endTime + ' 23:59:59'
        }
      })
      this.loading = true
      addAgent(agentList)
        .then((res) => {
          if (res && res.result) {
            iMessage.success(this.language('保存成功'))
            this.$router.go(-1)
          } else {
            iMessage.error(res.desZh || '保存失败')
          }
        })
        .catch((err) => {
          iMessage.error(err.desZh || '保存失败')
        })
        .finally(() => (this.loading = false))
    }
  }
}
</script>

<style lang="scss" scoped></style>
