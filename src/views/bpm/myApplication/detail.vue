<template>
  <iPage class="approval-detail" v-loading="loading">
    <div class="page-header margin-bottom20 cus-task-detail-header">
      <div class="cus-approval-detail-title">
        <div class="cus-approval-detail-title-info">
          <div class="font18 font-weight">
            {{ form.itemName }}
            <span class="business-id">{{ form.businessId }}</span>
            ({{ form.stateMsg }})
          </div>
          <taskNavigation :queryType="queryType" :isFinished="finished" />
        </div>
        <div class="cus-task-detail-operations-div" style="padding-left: 40px">
          <el-row :gutter="20">
            <el-col :span="12">
              <processNodeAnchors />
            </el-col>
            <el-col :span="12">
              <div class="operation-btn">
                <viewFlow :detail="form" />
                <!-- 撤回 -->
                <iButton  v-if="buttonRecallVisible&&isBtn" @click="dialogRecallVisible = true">
                  {{ language('撤回') }}
                </iButton>
                <!-- 补充材料 -->

                <iButton v-if="buttonAppendVisible" @click="onAppendAttachment">
                  {{ language('补充材料') }}
                </iButton>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>

    <div :class="{'margin-top70': form.stateCode === mapApprovalType.APPEND_DATA}">
    <lastNode
      :form="form"
      v-if="form.stateCode === mapApprovalType.APPEND_DATA"
    />
    </div>

    <div :class="{'margin-top70': form.stateCode !== mapApprovalType.APPEND_DATA}">
      <baseForm :form="form" />
    </div>

    <detailProcessForm
      id="APPROVAL_DETAILS"
      :flow-form-url="flowFormUrl"
      :form-height="form.formHeight"
    />

    <i-card
      id="APPROVAL_FLOW"
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

    <i-card id="APPROVAL_RECORDS" :title="language('审批历史')" header-control collapse>
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
      :modelId="modelId"
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
import taskNavigation from '@/views/bpm/task/components/taskNavigation'
import processNodeAnchors from '@/views/bpm/task/components/processNodeAnchors'
import {
  dialogRecall,
  detailProcessForm,
  attachmentList,
  processNodeHorizontal,
  viewFlow
} from '../task/components'
import { excelExport } from '@/utils/filedowLoad'
import iTableCustom from '@/components/iTableCustom'
import { MAP_APPROVAL_TYPE, QUERY_DRAWER_TYPES } from '@/constants'
import { queryWorkflowDetail } from '@/api/approval/myApplication'
import { baseForm, lastNode, appentAttachment } from './component'
import { reloadOpener } from '@/utils'
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
    viewFlow,
    taskNavigation,
    processNodeAnchors
  },
  data() {
    return {
      modelId:"",
      form: {
        histories: []
      },
      isBtn:false,
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
    queryType() {
      if(this.finished) {
        return QUERY_DRAWER_TYPES.APPLICATION_FINISH
      } else {
        return QUERY_DRAWER_TYPES.APPLICATION_TODO
      }
    },
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
    },
    // 撤回按钮显示
    buttonRecallVisible() {
      const recallButton = Object.keys(this.form).includes('recallButton')
        ? this.form.recallButton
        : true
      return !this.finished && recallButton
    },
    // 补充材料按钮显示
    buttonAppendVisible() {
      return (
        !this.finished &&
        this.form.stateCode === this.mapApprovalType.APPEND_DATA
      )
    }
  },
  created() {
    if (this.$route.params.instanceId) {
      this.getDetail()
    }else{
      this.isBtn=true

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
              if(res.data.modelId){
                this.modelId = res.data.modelId;
              }
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
            this.isBtn=true

          })
          .catch((error) => {
            this.loading = false
            this.isBtn=true
            iMessage.error(error.desZh || '获取数据失败')
          })
      }
    },
    recallSuccess() {
      this.dialogRecallVisible = false
      setTimeout(() => {
        window.close()
      }, 3000)
      reloadOpener()
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
      reloadOpener()
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
  z-index: 98;
}
#flow-form {
  width: 100%;
  min-height: 1000px;
}
.business-id {
  margin: 0px 10px;
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
    .cus-task-detail-operations-div {
      padding-left: 40px;
      //display: flex;
      //justify-content: space-between;
    }
  }
  z-index: 100 !important;
}
.margin-top70 {
  margin-top: 70px;
}
.operation-btn {
  flex-grow: 1;
  min-width: 350px;
  text-align: right;
  display: flex;
  justify-content: end;
  align-items: center;
  height: 80px;
}
</style>
