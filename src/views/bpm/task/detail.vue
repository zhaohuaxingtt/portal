<template>
  <iPage class="approval-detail" v-loading="loading">
    <div class="page-header margin-bottom20">
      <div class="font18 font-weight">
        {{ form.itemName }}
        <span class="business-id">{{ form.businessId }}</span> ({{
          form.stateMsg
        }})
      </div>
      <div class="operation-btn">
        <!-- 批准 -->
        <iButton
          v-if="(!finished && buttons.批准) || buttons.无异议"
          @click="onComplete(mapApprovalType.AGREE, $t('APPROVAL.APPROVEL'))"
        >
          {{ buttons.批准 ? language('批准') : language('无异议') }}
        </iButton>
        <!-- 拒绝 -->
        <iButton
          v-if="!finished && buttons.拒绝"
          @click="onComplete(mapApprovalType.REFUSE, $t('APPROVAL.REFUSE'))"
        >
          {{ $t('APPROVAL.REFUSE') }}
        </iButton>
        <!-- 补充材料 -->
        <iButton
          v-if="!finished && (buttons.补充材料 || buttons.有异议)"
          @click="
            onComplete(
              mapApprovalType.APPEND_DATA,
              buttons.补充材料
                ? language('补充材料', '补充材料')
                : language('有异议', '有异议')
            )
          "
        >
          {{
            buttons.补充材料
              ? language('补充材料', '补充材料')
              : language('有异议', '有异议')
          }}
        </iButton>
      </div>
    </div>

    <!-- 补充材料 -->
    <lastNode :form="form" />

    <!-- 基础信息 -->
    <baseForm :form="form" />

    <detailProcessForm
      :flow-form-url="flowFormUrl"
      :form-height="form.formHeight"
    />

    <i-card
      :title="$t('APPROVAL.FLOW_INFO')"
      header-control
      collapse
      class="margin-bottom20"
    >
      <!-- <process-horizontal
        v-if="form.panorama"
        :panorama="form.panorama"
        :state-code="form.stateCode"
      /> -->
      <processNodeHorizontal
        v-if="form.panorama"
        :panorama="form.panorama"
        :state-code="form.stateCode"
      />
    </i-card>

    <i-card
      :title="$t('APPROVAL.MORE_APPROVAL_HISTORY')"
      header-control
      collapse
    >
      <i-table-custom :data="form.histories" :columns="historyTableTitle" />
    </i-card>

    <dialogApproval
      v-if="dialogApprovalVisible"
      :visible="dialogApprovalVisible"
      :item="taskDetail"
      :type="agreeType"
      :title="dialogApprovalTitle"
      @success="approvelSuccess"
      @close="dialogApprovalVisible = false"
    />

    <dialogAppendAttachment
      v-if="dialogAppendAttachVisible"
      :visible="dialogAppendAttachVisible"
      :attach-columns="attachColumns"
      :instance-id="form.flowInstanceId"
      :task-nodes="form.histories"
      @close="dialogAppendAttachVisible = false"
      @save="dialogAppendAttachVisible = false"
    />
  </iPage>
</template>

<script>
import { iPage, iCard, iMessage, iButton } from 'rise'
import {
  dialogApproval,
  dialogAppendAttachment,
  attachmentList as AttachmentList,
  detailProcessForm,
  lastNode,
  baseForm,
  processNodeHorizontal
} from './components'
import { excelExport } from '@/utils/filedowLoad'
import iTableCustom from '@/components/iTableCustom'
import { MAP_APPROVAL_TYPE, BPM_CATEGORY_RENAME_YIYI_LIST } from '@/constants'
import { queryWorkflowDetail } from '@/api/approval/myApplication'
import {
  completeApproval,
  stageCompleteApproval
} from '@/api/approval/myApproval'

export default {
  name: 'UndoTaskDetail',
  components: {
    iPage,
    iCard,
    iButton,
    iTableCustom,
    detailProcessForm,
    dialogApproval,
    dialogAppendAttachment,
    lastNode,
    baseForm,
    processNodeHorizontal
  },
  data() {
    return {
      pageType: 'application',
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
          tooltip: false
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
            return <AttachmentList data={scope.row.taskAttachments} />
          }
        },
        {
          prop: 'comment',
          label: '回复内容',
          i18n: 'APPROVAL.COMMENT_CONTENT',
          tooltip: false
        }
      ],
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
              <span
                href={scope.row.filePath}
                target="_blank"
                class="open-link-text"
              >
                {scope.row.fileName}
              </span>
            )
          }
        }
      ],
      mapApprovalType: MAP_APPROVAL_TYPE,
      exportLoading: false
    }
  },
  computed: {
    finished() {
      // 状态3,4审批中
      return (
        this.$route.params &&
        this.$route.params.finished &&
        this.$route.params.finished === 'yes'
      )
    },
    buttons() {
      if (this.form.button) {
        return JSON.parse(this.form.button)
      }
      return {}
    }
  },
  created() {
    this.pageType = this.$route.params.pageType
    if (this.$route.params.instanceId) {
      this.getDetail()
    }
  },
  methods: {
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
    onComplete(type, title) {
      this.agreeType = type
      this.taskDetail = {
        applyUserId: this.form.ownerId,
        instanceId: this.$route.params.instanceId,
        itemContent: this.form.itemContent,
        itemName: this.form.itemName,
        module: this.form.module,
        taskId: this.$route.params.taskId,
        procDefKey: this.form.procDefKey
      }
      if (type === MAP_APPROVAL_TYPE.AGREE) {
        const data = {
          agree: type,
          taskAssignee: this.$store.state.permission.userInfo.id,
          taskId: this.$route.params.taskId,
          variables: {},
          comment: BPM_CATEGORY_RENAME_YIYI_LIST.includes(this.form.procDefKey)
            ? '【无异议】'
            : '【同意】'
        }
        delete data['module']
        this.loading = true
        const approvalResult = BPM_CATEGORY_RENAME_YIYI_LIST.includes(
          this.form.procDefKey
        )
          ? stageCompleteApproval(data)
          : completeApproval(data)

        approvalResult
          .then((res) => {
            this.loading = false
            if (res.result) {
              this.$message.success(this.$t('APPROVAL.OPERATION_SUCCESSFUL'))
              setTimeout(() => {
                window.close()
              }, 3000)
              if (window.opener) {
                window.opener.location.reload()
              }
            } else {
              this.$message.error(
                res.desZh || this.$t('APPROVAL.OPERATION_FAILED')
              )
            }
          })
          .catch((err) => {
            this.loading = false
            this.$message.error(
              err.desZh || this.$t('APPROVAL.OPERATION_FAILED')
            )
          })
      } else {
        this.dialogApprovalVisible = true
        this.dialogApprovalTitle = title
      }
    },
    approvelSuccess() {
      // this.getDetail()
      this.dialogApprovalVisible = false
      this.$router.go(-1)
    },
    //导出
    exportTemplate() {
      if (this.selectTableData.length == 0) {
        return iMessage.warn(this.$t('LK_QINGXUANZHEXUYAODAOCHUSHUJU'))
      }
      this.exportLoading = true
      excelExport(this.selectTableData, this.tableTitle).finally(
        () => (this.exportLoading = false)
      )
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
  margin: 0px 20px;
}
</style>
