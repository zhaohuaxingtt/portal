<template>
  <iPage class="approval-detail" v-loading="loading">
    <div class="page-header margin-bottom20 cus-task-detail-header">
      <div class="cus-approval-detail-title">
        <div class="cus-approval-detail-title-info">
          <detailTitle :form="form" />
          <taskNavigation />
        </div>
        <div style="padding-left: 40px">
          <el-row :gutter="20">
          <el-col :span="8">
            <processNodeAnchors />
          </el-col>
          <el-col :span="8">
            <div class="operation-btn">
              <!--        <viewFlow :detail="form" />-->
              <!-- 批准 -->
              <iButton
                v-if="!finished && (buttons.批准 || buttons.无异议)"
                :loading="loading"
                :disabled="canApprove"
                @click="onComplete(mapApprovalType.AGREE, language('批准'))"
              >
                {{ buttons.批准 ? language('批准') : language('无异议') }}
              </iButton>
              <!-- 拒绝 -->
              <iButton
                v-if="!finished && buttons.拒绝"
                :loading="loading"
                :disabled="canApprove"
                @click="onComplete(mapApprovalType.REFUSE, language('拒绝'))"
              >
                {{ language('拒绝') }}
              </iButton>
              <!-- 补充材料 -->
              <iButton
                v-if="!finished && (buttons.补充材料 || buttons.有异议)"
                :disabled="canApprove"
                :loading="loading"
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

          </el-col>
        </el-row>
        </div>
      </div>
    </div>

    <!-- 补充材料 -->
    <lastNode :form="form" />

    <!-- 基础信息 -->
    <baseForm :form="form" :divide-to-tow="true" />

    <detailProcessForm
      id="APPROVAL_DETAILS"
      :flow-form-url="flowFormUrl"
      :form-height="form.formHeight"
      :form="form"
    />

    <!-- <i-card
      :title="language('审批流程')"
      header-control
      collapse
      class="margin-bottom20"
    >
      <processNodeHorizontal
        v-if="form.panorama"
        :panorama="form.panorama"
        :state-code="form.stateCode"
      />
    </i-card> -->

    <i-card id="APPROVAL_FLOW" :title="language('审批流')" class="margin-top20" header-control collapse>
      <viewFlow :detail="form" :withIButton="false" />
    </i-card>

    <i-card id="APPROVAL_RECORDS" :title="language('审批历史')" class="margin-top20" header-control collapse>
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
  attachmentList,
  detailProcessForm,
  lastNode,
  baseForm,
  viewFlow,
  taskNavigation,
  processNodeAnchors,
  detailTitle
} from './components'
import { excelExport } from '@/utils/filedowLoad'
import iTableCustom from '@/components/iTableCustom'
import { MAP_APPROVAL_TYPE, BPM_CATEGORY_RENAME_YIYI_LIST } from '@/constants'
import { queryWorkflowDetail } from '@/api/approval/myApplication'
import {
  completeApproval,
  stageCompleteApproval
} from '@/api/approval/myApproval'
import { reloadOpener } from '@/utils'
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
    viewFlow,
    taskNavigation,
    processNodeAnchors,
    detailTitle
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
          label: '附件',
          i18n: 'APPROVAL.ATTACH',
          tooltip: false,
          customRender: (h, scope) => {
            if (scope.row.taskAttachments) {
              return (
                <attachmentList
                  key={scope.row.id}
                  data={scope.row.taskAttachments}
                />
              )
            }
            return ''
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
      processUrlPortal: process.env.VUE_APP_POINT_PORTAL,
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
    },
    // 已审批的数据不再显示审批按钮
    canApprove() {
      return ['同意', '拒绝', '补充材料'].includes(this.form.stateMsg)
    }
  },
  created() {
    this.pageType = this.$route.params.pageType
    if (this.$route.params.instanceId) {
      this.getDetail()
    }
  },
  methods: {
    replaceUrl() {
      console.log('replaceUrl')
      const { instanceId, taskId } = this.$route.params
      this.$router.replace({
        name: 'bpmTaskFinishDetail',
        params: {
          instanceId,
          taskId,
          finished: 'yes'
        }
      })
    },
    getDetail() {
      const { instanceId } = this.$route.params
      const params = {
        processInstanceId: instanceId,
        currentUserId: this.$store.state.permission.userInfo.id
      }
      if (instanceId) {
        this.loading = true
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
              this.$message.success(res.desZh || this.language('操作成功'))

              reloadOpener()
              this.replaceUrl()
            } else {
              this.$message.error(res.desZh || this.language('操作失败'))
            }
          })
          .catch((err) => {
            console.log('审批结果ERR', err)
            this.loading = false
            this.$message.error(err.desZh || this.language('操作失败'))
          })
      } else {
        this.dialogApprovalVisible = true
        this.dialogApprovalTitle = title
      }
    },
    approvelSuccess() {
      reloadOpener()
      this.dialogApprovalVisible = false
      this.replaceUrl()
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
  //padding-top: 80px;
  padding-top: 175px;
}
.cus-task-detail-header {
  top: 0 !important;
  padding-top: 0 !important;
  //margin-top: 65px;
  margin-top: 0 !important;
  width: calc(100% - 6.25rem) !important;
  background-color: rgb(247, 247, 247) !important;
  .cus-approval-detail-title {
    width: 100%;
    .cus-approval-detail-title-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
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
  z-index: 98;
}
#flow-form {
  width: 100%;
}

.operation-btn {
  flex-grow: 1;
  min-width: 350px;
  text-align: right;
}
</style>
