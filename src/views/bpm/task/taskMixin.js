import { MAP_APPROVAL_TYPE } from '@/constants'
import { completeApproval } from '@/api/approval/myApproval'
import { iMessage } from 'rise'
export default {
  data() {
    return {
      approvalTypeMap: MAP_APPROVAL_TYPE,
      loading: false
    }
  },
  methods: {
    /**
     * 详情查看，在待办和已办中通用
     * @param row
     * @param taskType
     */
    goDetail(row, taskType, queryData) {
      if (row.formUrl && row.formUrl.indexOf('vhttp') === 0) {
        const url = row.formUrl.substring(1, row.formUrl.length)
        window.location.href = url
      } else {
        const { instanceId, taskId } = row
        const finished = taskType === 1 ? 'yes' : 'no'

        let queryDataStr = ''
        if(queryData) {
          queryDataStr = encodeURIComponent(JSON.stringify(queryData))
        }
        if (taskType === 1) {
          window.open(
            `/portal/#/bpm/finishList/detail/${instanceId}/${taskId}/${finished}/${queryDataStr}`
          )
        } else {
          window.open(
            `/portal/#/bpm/todoList/detail/${instanceId}/${taskId}/${finished}/${queryDataStr}`
          )
        }
      }
    },
    /**
     * 审批，在待办和详情中通用
     * @param row
     * @param type
     * @param queryTable
     */
    complete(row, type, queryTable) {
      if (
        type === this.approvalTypeMap.REFUSE ||
        type === this.approvalTypeMap.APPREND_DATA
      ) {
        this.goDetail(row, 0)
      } else {
        const data = {
          agree: type,
          taskAssignee: this.$store.state.permission.userInfo.id,
          taskId: row.taskId,
          variables: {},
          comment: '【同意】'
        }
        this.loading = true
        completeApproval(data)
          .then((res) => {
            this.loading = false
            if (res.result && res.data) {
              iMessage.success(this.language('审批成功'))
              if (queryTable) {
                queryTable()
              }
            } else {
              iMessage.error(res.desZh || this.language('审批失败'))
            }
          })
          .finally((err) => {
            this.loading = false
          })
      }
    }
  }
}
