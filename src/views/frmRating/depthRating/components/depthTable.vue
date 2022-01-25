<template>
  <iCard>
    <div class="margin-bottom20 clearFloat">
      <div class="floatright">
        <!-- 移除集团 -->
        <iButton @click="moveGroup">{{$t('SPR_FRM_DEP_REMOVEGROUP')}}</iButton>
        <!-- 加入集团 -->
        <iButton @click="openJoinGroup">{{$t('SPR_FRM_DEP_ADDGROUP')}}</iButton>
        <!-- 新建集团 -->
        <iButton @click="openAddGroup">{{$t('SPR_FRM_DEP_NEWGROUP')}}</iButton>
        <!-- 预计完成时间 -->
        <iButton @click="openOverTime">{{ $t('SPR_FRM_DEP_YJWCSJ') }}</iButton>
        <!-- 提交深评报告审核 -->
        <iButton @click="postExamine">{{ $t('SPR_FRM_DEP_SUBDERFR') }}</iButton>
        <!-- 提交清单审批 -->
        <iButton @click="openEndRating">{{ $t('SPR_FRM_DEP_SUBLFA') }}</iButton>
        <!-- 报告分发 -->
        <iButton @click="openReport">{{$t('SPR_FRM_DEP_REPORTDISN')}}</iButton>
        <!-- 终止 -->
        <iButton @click="openEnd">{{ $t('SPR_FRM_DEP_END') }}</iButton>
        <!-- 导出 -->
        <iButton @click="exportsTable">{{ $t('SPR_FRM_DEP_EXPORT') }}</iButton>
      </div>
    </div>
    <tableList :tableData="tableListData"
               :tableTitle="tableTitle"
               :tableLoading="tableLoading"
               :index="true"
               :fixed="true"
               @handleSelectionChange="handleSelectionChange">
      <!-- 供应商名称 -->
      <template #name="scope">
        <p class="openPage"
           @click="jumpViewSuppliers(scope.row)">
          {{ scope.row.name }}
        </p>
      </template>
      <!-- 状态 -->
      <template #status="scope">
        <span v-if="scope.row.status == '信息收集' || scope.row.status == '财务经营与分析' ||scope.row.status == '访谈与调查' || scope.row.status == '报告完成'">
          <iSelect class="selectCenter"
                   @change="changeStatus(scope.row)"
                   v-model="scope.row.status">
            <el-option value="信息收集"
                       label="信息收集"></el-option>
            <el-option value="访谈与调查"
                       label="访谈与调查"></el-option>
            <el-option value="财务经营与分析"
                       label="财务经营与分析"></el-option>
            <el-option value="报告完成"
                       label="报告完成"></el-option>

          </iSelect>
        </span>
        <span v-else-if="scope.row.status == '清单驳回' || scope.row.status == '报告驳回'">
          <el-tooltip :content="scope.row.returnReason"
                      placement="top"
                      effect="light">
            <span>{{ scope.row.status }}</span>
          </el-tooltip>
        </span>
        <span v-else>{{ scope.row.status }}</span>
      </template>
      <!-- 附件 -->
      <template #upload="scope">
        <span class="openPage"
              @click="openUpload(scope.row.id)">{{$t('LK_SHANGCHUAN')}}</span>
      </template>
      <!-- 访谈内容 -->
      <template #interView="scope">
        <span class="openPage"
              @click="jumpInterView(scope.row.id)">{{$t('LK_CHAKAN')}}</span>
      </template>
      <!-- 深评报告 -->
      <template #depthReport="scope">
        <span class="openPage"
              @click="jumpDepthReport(scope.row)">{{$t('LK_CHAKAN')}}</span>
      </template>
      <!-- 财务分析 -->
      <template #financialAnalysis="scope">
        <span class="openPage"
              @click="jumpFinancialAnalysis(scope.row)">{{$t('LK_CHAKAN')}}</span>
      </template>
      <!-- 深评结果 -->
      <template #deepCommentResult="scope">
        <icon v-if="scope.row.deepCommentResult == 'GREEN'"
              symbol
              name="iconlvdeng"></icon>
        <icon v-else-if="scope.row.deepCommentResult == 'YELLOW'"
              symbol
              name="iconhuangdeng"></icon>
        <icon v-else-if="scope.row.deepCommentResult == 'RED'"
              symbol
              name="iconhongdeng"></icon>
        <span v-else-if="!scope.row.deepCommentResult"></span>
      </template>
      <!-- 备注 -->
      <template #remarks="scope">
        <span class="openPage"
              v-if="scope.row.remarks"
              @click="openRemark(scope.row)">{{ $t('LK_CHAKAN') }}</span>
        <span class="openPage"
              v-else
              @click="openRemark(scope.row)">{{$t('LK_TIANJIA')}}</span>
      </template>
    </tableList>
    <iPagination v-update
                 @size-change="handleSizeChange($event, getTableList)"
                 @current-change="handleCurrentChange($event, getTableList)"
                 background
                 :page-sizes="page.pageSizes"
                 :page-size="page.pageSize"
                 :layout="page.layout"
                 :current-page="page.currPage"
                 :total="page.totalCount" />
    <!-- 新建集团 -->
    <messageBox v-model="addGroup"
                :maxlength="50"
                :title="$t('SPR_FRM_DEP_NEWGROUP')"
                :tip="$t('SPR_FRM_DEP_INPUTGROUPNAME')"
                @sure="sure"
                :error="$t('SPR_FRM_DEP_GROUPNOTNAME')"></messageBox>
    <!-- 查看备注 -->
    <messageBox ref="remark"
                v-model="remark"
                type="textarea"
                :required="false"
                :title="$t('SPR_FRM_DEP_REMARKS')"
                @sure="sureRemark"></messageBox>
    <!-- 报告分发 -->
    <changeItem ref="report"
                v-model="report"
                :tip="$t('SPR_FRM_DEP_QXZFFDX')"
                multiple
                :title="$t('SPR_FRM_DEP_REPORTDISN')"
                @sure="sureChangeItems"></changeItem>
    <!-- 预计完成时间 -->
    <overTime v-model="overTimeShow"
              :tip="$t('SPR_FRM_DEP_YJWCSJ')"
              :title="$t('SPR_FRM_DEP_QXZYJWCSJ')"
              @sure="sureChangeTime"></overTime>
    <!-- 终止审批页面 -->
    <endRatingList :disabled="endDisabled"
                   v-model="endRating"
                   @getTableList="getTableList"
                   ref="endRating"></endRatingList>
    <!-- 上传附件 -->
    <upload v-model="uploadShow"
            ref="upload"></upload>
    <!-- 加入集团 -->
    <joinGroup v-model="joinGroupShow"
               @addGroup="addOrMoveGroup"
               :financialSuppleData="financialSuppleData"
               :ids="getIds()"
               ref="joinGroup"></joinGroup>
  </iCard>
</template>

<script>
import {
  iCard,
  iButton,
  iPagination,
  iMessageBox,
  iSelect,
  iMessage,
  icon
} from 'rise'
import tableList from '@/components/commonTable'
import { pageMixins } from '@/utils/pageMixins'
import resultMessageMixin from '@/mixins/resultMessageMixin'
import { tableTitle } from './data'
import messageBox from '@/components/messageBox'
import changeItem from './changeItem'
import endRatingList from './endRatingList'
import upload from './upload'
import joinGroup from './joinGroup'
import {
  depSupplierList,
  //   termination,
  depSupplier,
  addOrMoveGroup,
  newGroup,
  reportIssue,
  batch,
  depSupplierDown
} from '@/api/frmRating/depthRating'
import { getSummarize } from '@/api/frmRating/depthRating/depthReport.js'
import { postExamine } from '@/api/frmRating/depthRating/depthReport'
import { excelExport } from '@/utils/filedowLoad'
import overTime from './overTime'
export default {
  componentName: 'depthTable',
  mixins: [pageMixins, resultMessageMixin],
  components: {
    iCard,
    icon,
    iButton,
    iSelect,
    tableList,
    iPagination,
    messageBox,
    changeItem,
    endRatingList,
    upload,
    joinGroup,
    overTime
  },
  props: {
    financialSuppleData: {
      type: Array,
      default: () => []
    },
    form: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      tableListData: [],
      fromGroup: [], //下拉框数据
      currentSelect: [], //当前选择的数据
      tableTitle,
      tableLoading: true,
      addGroup: false, //新建集团
      remark: false, //备注
      report: false, //报告分发
      reportContent: '', //选中报告分发
      endRating: false, //终止审批
      uploadShow: false, //上传附件
      joinGroupShow: false, //加入集团
      currentId: '', //当前选中的ID
      overTimeShow: false, //选择完成时间
      endDisabled: false, //是否是终止深评
      languageName: 'zh',
    }
  },
  watch: {
    '$i18n.locale': {
      handler (newValue) {
        this.languageName = newValue
      }
    }
  },
  created () {
    this.getTableList()
  },
  methods: {
    handleSelectionChange (currentSelect) {
      this.currentSelect = currentSelect
    },
    // 搜索
    search () {
      this.page.currPage = 1
      this.getTableList()
    },
    // 获取深评列表
    getTableList () {
      let data = {
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
        ...this.form
      }
      depSupplierList(data).then((res) => {
        if (res.data) {
          this.page.currPage = res.pageNum
          this.page.totalCount = res.total
          this.tableListData = res.data
          this.tableLoading = false
        }
      })
    },
    // 获取当前选中的ids
    getIds () {
      let ids = []
      this.currentSelect.map((res) => {
        ids.push(res.id)
      })
      return ids
    },
    // 改变状态值
    changeStatus (row) {
      const data = {
        id: row.id,
        status: row.status
      }
      if (row.status == '报告完成') {
        getSummarize(row.id, 'en').then((result) => {
          if (result.data) {
            if (
              (result.data.deepCommentRatingResults == '' ||
                result.data.deepCommentRatingResults == null) &&
              (result.data.trackFrequencyAgain == '' ||
                result.data.trackFrequencyAgain == null)
            ) {
              iMessage.warn(
                'QINGTIANXIEZHUANGTAIYUHOUXUGENZONGPINLV',
                '请填写状态与后续跟踪频率'
              )
              this.getTableList()
            } else {
              depSupplier(data).then((res) => {
                this.resultMessage(res, () => {
                  this.getTableList()
                })
              })
            }
          }
        })
      } else {
        depSupplier(data).then((res) => {
          this.resultMessage(res, () => {
            this.getTableList()
          })
        })
      }
    },
    //新加集团
    openAddGroup () {
      if (this.isSelect()) return
      this.addGroup = true
    },
    // 新加集团确认
    sure (remark) {
      let data = {
        idList: this.getIds(),
        financialSupplementName: remark
      }
      newGroup(data).then((res) => {
        this.resultMessage(res, () => {
          this.addGroup = false
          this.getTableList()
          this.$emit('groupNameList')
        })
      })
    },
    // 查看备注
    openRemark (row) {
      this.currentId = row.id
      this.$refs.remark.changeBackmark(row.remarks)
      this.remark = true
    },
    // 修改备注
    sureRemark (remark) {
      let data = {
        id: this.currentId,
        remarks: remark
      }
      depSupplier(data).then((res) => {
        this.resultMessage(res, () => {
          this.remark = false
        })
        this.tableLoading = true
        this.getTableList()
      })
    },
    // 报告分发
    openReport () {
      if (this.isSelect()) return
      let result = this.currentSelect.every((item) => item.status == '生效')
      if (!result) {
        // iMessage.error(this.$t('SPR_FRM_DEP_CHECKDCSTATUS'))
        iMessage.error(
          this.language(
            'WEISHENGXIAODEBAOGAOBUNENGDAINJIBAOGAOFENFA',
            '未生效的报告，不能点击报告分发'
          )
        )
        return
      }
      let deepCommentResult = this.currentSelect[0].deepCommentResult
      let relevantDept = this.currentSelect[0].relevantDept
      let result1 = this.currentSelect.every(
        (item) => item.deepCommentResult == deepCommentResult
      )
      let result2 = this.currentSelect.every(
        (item) => item.relevantDept == relevantDept
      )
      if (result1 && result2) {
        this.$refs.report.reportIssueUser(this.currentSelect[0].id)
        this.report = true
      } else {
        iMessage.error(this.$t('SPR_FRM_FRMGL_BGFFMESSAGE'))
      }
    },
    // 报告分发确认
    sureChangeItems (ids) {
      let supplierIdList = []
      this.currentSelect.forEach((res) => {
        let obj = {}
        obj.supplierId = res.id
        obj.supplierName = res.name
        supplierIdList.push(obj)
      })
      let data = {
        reciveIds: ids,
        reportUrl: '/supplier/frmrating/depthRating/depthReport?id=',
        supplierList: supplierIdList
      }
      reportIssue(data).then((res) => {
        this.resultMessage(res, () => {
          this.report = false
          this.getTableList()
        })
      })
    },
    // 终止
    openEnd () {
      if (this.isSelect()) return
      // 判断是否满足终止条件
      let result = this.currentSelect.every(
        (item) =>
          item.status == '报告驳回' ||
          item.status == '信息收集' ||
          item.status == '财务经营与分析' ||
          item.status == '清单审批驳回' ||
          item.status == '访谈与调查' ||
          item.status == '报告审批驳回' ||
          item.status == '报告审批中' ||
          item.status == '清单审批中'
      )
      if (!result) {
        iMessage.error(this.$t('SPR_FRM_DEP_STOPMSG'))
        return
      }
      iMessageBox(`是否终止该供应商的深入评级？`)
        .then(() => {
          this.endDisabled = true
          this.endRating = true
          let statusList = [
            '报告驳回',
            '信息收集',
            '财务经营与分析',
            '清单审批驳回',
            '访谈与调查',
            '报告完成',
            '报告审批驳回',
            '报告审批中',
            '清单审批中'
          ]
          this.$refs.endRating.getTableList(this.getIds(), statusList)
          // termination({idList:this.getIds()}).then(res=>{
          // 	this.resultMessage(res,()=>{
          // 		this.endDisabled=true
          // 		this.endRating=true
          // 	})
          // })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 判断是否选择了供应商
    isSelect () {
      if (this.currentSelect.length == 0) {
        iMessage.error('请选择需要操作的供应商数据')
        return true
      }
    },
    // 上传附件
    openUpload (id) {
      this.$refs.upload.getTableList(id)
      this.uploadShow = true
    },
    // 打开加入集团
    openJoinGroup () {
      if (this.isSelect()) return
      let result = this.currentSelect.find(
        (item) => item.deepCommentSupplierName
      )
      if (result) {
        iMessage.error(this.$t('SPR_FRM_DEP_COMMET'))
        return
      }
      let result1 = this.currentSelect.every(
        (item) =>
          item.status == '历史' ||
          item.status == '终止' ||
          item.status == '终止审批中'
      )
      if (result1) {
        iMessage.warn(
          this.language(
            'LISHIZHONGZHIZHONGZHISHENPIZHONGBUNENGJIARUJITUAN',
            '历史、终止、终止审批中不能加入集团'
          )
        )
        return
      }
      this.$refs.joinGroup.getTableList()
      this.joinGroupShow = true
    },
    // 移除集团
    moveGroup () {
      if (this.isSelect()) return
      let result = this.currentSelect.every(
        (item) => item.deepCommentSupplierName
      )
      if (!result) {
        iMessage.error(this.$t('请选择未加入集团的供应商'))
        return
      }
      let data = {
        isJoin: false, //true 加入， false 移除
        deepSupplierIdList: this.getIds() //加入时深评供应商主键，移除不用传
      }
      this.addOrMoveGroup(data)
    },
    // 加入集团 移除集团
    addOrMoveGroup (data) {
      addOrMoveGroup(data).then((res) => {
        if (data.isJoin) {
          this.joinGroupShow = false
        }
        if (res?.code === '200') {
          iMessage.success(
            this.language('YICONGDABAOJITUANZHONGYICHU', '已从打包集团中移除')
          )
          this.getTableList()
        } else {
          iMessage.error(res.desZh)
        }
        // this.resultMessage(res, () => {
        //   this.getTableList()
        // })
      })
    },
    // 提交清单审批
    openEndRating () {
      if (this.isSelect()) return
      let result = this.currentSelect.every(
        (item) => item.status == '草稿' || item.status == '清单审批驳回'
      )
      if (result) {
        this.endDisabled = false
        this.endRating = true
        let statusList = ['草稿', '清单审批驳回']
        this.$refs.endRating.getTableList(this.getIds(), statusList)
      } else {
        iMessage.error(this.$t('SPR_FRM_DEP_CHECKSPSTATUS'))
      }
    },
    // 跳转供应商财务数据
    jumpViewSuppliers (row) {
      this.$router.push({
        path: '/supplier/view-suppliers',
        query: {
          supplierToken: row.supplierToken,
          current: 18,
          supplierType: 4,
          supplierId: row.supplierId
        }
      })
    },
    // 跳转访谈清单
    jumpInterView (id) {
      // this.$router.push('/supplier/frmrating/depthRating/interView')
      let routeData = this.$router.resolve({
        name: 'supplierFrmDepthRatingInterView',
        query: { id: id }
      })
      window.open(routeData.href)
    },
    // 查看财报分析
    jumpFinancialAnalysis (row) {
      // this.$router.push('/supplier/frmrating/depthRating/financialAnalysis')
      let routeData = this.$router.resolve({
        name: 'depthRatingFinancialAnalysis',
        query: {
          id: row.id,
          name: row.name
        }
      })
      window.open(routeData.href)
    },
    //查看深评报告
    jumpDepthReport (row) {
      // this.$router.push('/supplier/frmrating/depthRating/depthReport')
      let routeData = this.$router.resolve({
        name: 'depthReport',
        query: {
          id: row.id,
          name: row.name,
          status: row.status
        }
      })
      window.open(routeData.href)
    },
    // 导出
    exportsTable () {
      // if (this.isSelect()) return
      depSupplierDown({
        ...this.form,
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
        lang: this.languageName
      })
    },
    // 预计完成时间
    openOverTime () {
      if (this.isSelect()) return
      this.overTimeShow = true
    },
    // 修改预计完成时间
    sureChangeTime (date) {
      let data = {
        ids: this.getIds(),
        estimateCompleteMonth: date
      }
      batch(data).then((res) => {
        this.resultMessage(res, () => {
          this.overTimeShow = false
          this.getTableList()
        })
      })
    },
    // 提交深评报告审核
    postExamine () {
      if (this.isSelect()) return
      //    let result = this.currentSelect.every(
      //     (item) =>
      //       item.status == '报告完成' ||
      //       item.status == '报告审批驳回'
      //   )
      //       if (!result) {
      //     iMessage.error(this.language('只能提交报告完成、报告审批驳回的供应商数据'))
      //     return
      //   }
      let data = {
        ids: this.getIds()
      }
      postExamine(data).then((res) => {
        this.resultMessage(res, () => {
          this.getTableList()
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
.openPage {
  color: $color-blue;
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
  width: 100px;
  @include text_;
}
.selectCenter {
  ::v-deep .el-input__inner {
    text-align: center;
  }
}
::v-deep .el-table {
  .el-table__header {
    background-color: $color-table-header;
  }
  .is-leaf {
    background-color: rgb(231, 239, 254);
  }
  tbody {
    tr:nth-of-type(even) {
      .el-table-column--selection {
        background-color: rgb(231, 239, 254);
      }
    }
  }
}
</style>
