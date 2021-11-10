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
        return this.$t('APPROVAL.NEW') + this.$t('APPROVAL.APPROVAL_AGENT')
      }
      return (
        this.$t('APPROVAL.NEW') + this.$t('APPROVAL.APPROVAL_AGENT_MEETING')
      )
    },
    agentType() {
      return this.$route.query.type === 'normal' ? 2 : 1
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
      queryTemplates(data).then(res => {
        const { data } = res.data
        this.approvalTodos = data
      })
      /* 
      const params = {
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
      this.agentList = this.agentList.filter(e => !rows.includes(e))
    },
    save() {
      const agentList = this.agentList.map(e => {
        return {
          ...e,
          startTime: e.startTime + ' 00:00:00',
          endTime: e.endTime + ' 23:59:59'
        }
      })
      this.loading = true
      addAgent(agentList)
        .then(res => {
          if (res && res.result) {
            iMessage.success(this.$t('APPROVAL.SAVE_SUCCESSFUL'))
            this.$router.go(-1)
          }
        })
        .finally(() => (this.loading = false))
    }
  }
}
</script>

<style lang="scss" scoped></style>
