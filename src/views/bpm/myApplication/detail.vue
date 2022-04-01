<template>
  <iPage class="approval-detail" v-loading="loading">
    <div class="page-header margin-bottom20">
      <div class="font18 font-weight">
        {{ form.itemName }}
        <span class="business-id">{{ form.businessId }}</span>
        ({{ form.stateMsg }})
      </div>
      <div class="operation-btn">
        <viewFlow :detail="form" />
        <!-- 撤回 -->
        <iButton v-if="!finished" @click="dialogRecallVisible = true">
          {{ language('撤回') }}
        </iButton>
        <!-- 补充材料 -->

        <iButton
          v-if="!finished && form.stateCode === mapApprovalType.APPEND_DATA"
          @click="onAppendAttachment"
        >
          {{ language('补充材料') }}
        </iButton>

        <iButton @click="onAppendAttachment">
          {{ language('补充材料') }}
        </iButton>
      </div>
    </div>

    <lastNode
      :form="form"
      v-if="form.stateCode === mapApprovalType.APPEND_DATA"
    />

    <baseForm :form="form" />

    <detailProcessForm
      :flow-form-url="flowFormUrl"
      :form-height="form.formHeight"
    />

    <i-card
      :title="language('审批流程')"
      header-control
      collapse
      class="margin-bottom20"
    >
      <processNodeHorizontal
        v-if="form.panorama"
        :panorama="form.panorama"
        :state-code="form.stateCode"
        :isEnd="form.stateCode !== 3 && form.stateCode !== 4"
        :detail="form"
        :instance-id="$route.params.instanceId"
        use-from="page"
      />
    </i-card>

    <i-card :title="language('审批历史')" header-control collapse>
      <i-table-custom :data="form.histories" :columns="historyTableTitle" />
    </i-card>

    <dialogRecall
      v-if="dialogRecallVisible"
      :visible="dialogRecallVisible"
      :instance-id="$route.params.instanceId"
      @success="recallSuccess"
      @close="closeRecall"
    />

    <appentAttachment
      v-if="dialogAppendAttachVisible"
      :visible="dialogAppendAttachVisible"
      :instance-id="form.flowInstanceId"
      :task-nodes="appendAttachTaskNodes"
      @close="dialogAppendAttachVisible = false"
      @save="dialogAppendAttachVisible = false"
      @success="approvalUpAttachSuccess"
    />
  </iPage>
</template>

<script>
import { iPage, iCard, iMessage, iButton } from 'rise'
import {
  dialogRecall,
  detailProcessForm,
  attachmentList,
  processNodeHorizontal,
  viewFlow
} from '../task/components'
import { excelExport } from '@/utils/filedowLoad'
import iTableCustom from '@/components/iTableCustom'
import { MAP_APPROVAL_TYPE } from '@/constants'
import { queryWorkflowDetail } from '@/api/approval/myApplication'
import { baseForm, lastNode, appentAttachment } from './component'

export default {
  name: 'BpmTaskApplyDetail',
  components: {
    iPage,
    iCard,
    iButton,
    iTableCustom,
    detailProcessForm,
    dialogRecall,
    appentAttachment,
    baseForm,
    lastNode,
    processNodeHorizontal,
    viewFlow
  },
  data() {
    return {
      form: {
        histories: []
      },
      loading: false,
      historyTableTitle: [
        {
          prop: 'endTime',
          label: '时间',
          i18n: 'APPROVAL.TIME',
          tooltip: false
        },
        {
          prop: 'activityName',
          label: '节点名称',
          i18n: 'APPROVAL.NODE_NAME',
          tooltip: false
        },
        {
          prop: 'assigneeName',
          label: '操作人',
          i18n: 'APPROVAL.OPRATION_USER',
          tooltip: false,
          customRender: (h, scope) => {
            const res = []
            if (scope.row.deptFullCode) {
              res.push(scope.row.deptFullCode)
            }
            if (scope.row.assigneeName) {
              res.push(scope.row.assigneeName)
            }
            return <span class="open-link-text">{res.join(' ')}</span>
          }
        },
        {
          prop: 'operation',
          label: '操作',
          i18n: 'APPROVAL.OPRATION',
          tooltip: false
        },
        {
          prop: 'oprateTime',
          label: '操作时长',
          i18n: 'APPROVAL.OPRATION_TIME',
          tooltip: false
        },
        {
          prop: 'attachmentEntityList',
          label: '附件',
          i18n: 'APPROVAL.ATTACH',
          tooltip: false,
          customRender: (h, scope) => {
            return <attachmentList data={scope.row.taskAttachments} />
          }
        },
        {
          prop: 'comment',
          label: '回复内容',
          i18n: 'APPROVAL.COMMENT_CONTENT',
          tooltip: false
        }
      ],
      dialogRecallVisible: false,
      dialogApprovalVisible: false,
      dialogAppendAttachVisible: false, // 上传附件弹窗
      agreeType: 1, // 审批结果 1同意；2拒绝；3补充材料
      taskDetail: {},
      flowFormUrl: '',
      attachColumns: [
        {
          type: 'selection',
          width: 50
        },
        {
          type: 'index',
          label: '编号',
          i18n: 'APPROVAL.NO',
          width: 80
        },
        {
          prop: 'name',
          label: '附件',
          i18n: 'APPROVAL.ATTACH',
          tooltip: false,
          customRender: (h, scope) => {
            return (
              <a href={scope.row.path} target="_blank" class="open-link-text">
                {scope.row.name}
              </a>
            )
          }
        }
      ],
      mapApprovalType: MAP_APPROVAL_TYPE
    }
  },
  computed: {
    finished() {
      return (
        this.$route.params &&
        this.$route.params.finished &&
        this.$route.params.finished === 'yes'
      )
    },
    appendAttachTaskNodes() {
      if (this.form.currentNode) {
        const { id, taskNodeName } = this.form.currentNode
        return this.form.histories.concat({
          id: id,
          activityName: taskNodeName
        })
      }
      return this.form.histories
    }
  },
  created() {
    if (this.$route.params.instanceId) {
      this.getDetail()
    }
  },
  methods: {
    approvalUpAttachSuccess() {
      this.dialogAppendAttachVisible = false
      this.getDetail()
    },
    getDetail() {
      this.loading = true
      const { instanceId } = this.$route.params
      const params = {
        processInstanceId: instanceId,
        currentUserId: this.$store.state.permission.userInfo.id
      }
      if (instanceId) {
        queryWorkflowDetail(params)
          .then((res) => {
            if (res.result) {
              const data = res.data
              this.form = { ...this.taskDetail, ...data }
              const histories = []

              if (data && data.historicVOList) {
                data.historicVOList.forEach((e) => {
                  const start = e.startTime && moment(e.startTime)
                  const end = e.endTime ? moment(e.endTime) : null
                  const time = start.format('YYYY-MM-DD HH:mm')
                  let oprateTime = null
                  if (start && end) {
                    oprateTime = moment.duration(end.diff(start)).humanize()
                  }
                  histories.push({ ...e, time, oprateTime })
                })
              }
              console.log('histories', histories)
              this.form.histories = histories
              this.flowFormUrl = data.formUrl
            } else {
              iMessage.error(res.desZh || '获取数据失败')
            }
            this.loading = false
          })
          .catch((error) => {
            this.loading = false
            iMessage.error(error.desZh || '获取数据失败')
          })
      }
    },
    recallSuccess() {
      this.dialogRecallVisible = false
      setTimeout(() => {
        window.close()
      }, 3000)
      if (window.opener) {
        window.opener.location.reload()
      }
    },
    closeRecall() {
      this.dialogRecallVisible = false
    },
    approvelSuccess() {
      // this.getDetail()
      this.dialogApprovalVisible = false
      setTimeout(() => {
        window.close()
      }, 3000)
      if (window.opener) {
        window.opener.location.reload()
      }
    },
    //导出
    exportTemplate() {
      if (this.selectTableData.length == 0)
        return iMessage.warn(this.$t('LK_QINGXUANZHEXUYAODAOCHUSHUJU'))
      excelExport(this.selectTableData, this.tableTitle)
    },
    // 补充材料
    onAppendAttachment() {
      this.dialogAppendAttachVisible = true
    }
  },
  watch: {
    $route() {
      this.getDetail()
    }
  }
}
</script>

<style lang="scss" scoped>
.approval-detail {
  position: relative;
  padding-top: 80px;
}
.el-link {
  line-height: 1em;
  &.is-underline {
    text-decoration: underline;
  }
}
.page-header {
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 40px;
  width: calc(100% - 188px);
  background: $color-background;
  padding: 40px 0px 0px 0px;
  z-index: 21;
}
#flow-form {
  width: 100%;
  min-height: 1000px;
}
.business-id {
  margin: 0px 10px;
}
</style>
