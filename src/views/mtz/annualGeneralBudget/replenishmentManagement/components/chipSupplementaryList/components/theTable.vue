<!--
 * @Author: your name
 * @Date: 2021-10-18 18:52:11
 * @LastEditTime: 2022-03-09 11:21:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\replenishmentManagement\components\supplementaryList\components\theTable1.vue
-->
<template>
  <iCard>
    <div slot="header" class="flex-between-center" style="width: 100%">
      <span>补差列表</span>
      <div class="opration">
        <iButton
          @click="sendSupplier"
          v-permission="PROTAL_MTZ_BUCHAGUANLI_BUCHALIEBIAO_FAQIGONGINGSHANG"
          >{{ language('FASONGGONGYINGSHANG', '发送供应商') }}</iButton
        >
        <iButton
          @click="handleClickEdit"
          v-permission="PROTAL_MTZ_BUCHAGUANLI_BUCHALIEBIAO_EDIT"
          >{{ language('BIANJI', '编辑') }}</iButton
        >
        <iButton
          @click="submit"
          v-permission="PROTAL_MTZ_BUCHAGUANLI_BUCHALIEBIAO_SUBMIT"
          >{{ language('TIJIAO', '提交') }}</iButton
        >
        <iButton
          @click="recall"
          v-permission="PROTAL_MTZ_BUCHAGUANLI_BUCHALIEBIAO_CHEHUI"
          >{{ language('CHEHUI ', '撤回') }}</iButton
        >
        <iButton
          @click="exportFile"
          v-permission="PROTAL_MTZ_BUCHAGUANLI_BUCHALIEBIAO_DAOCHU"
          >{{ language('DAOCHU ', '导出') }}</iButton
        >
      </div>
    </div>
    <el-table
      ref="moviesTable"
      :data="tableData"
      v-loading="loading"
      tooltip-effect="light"
      style="width: 100%"
      border
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="50" fixed> </el-table-column>
      <el-table-column type="index" label="#" width="50" fixed>
      </el-table-column>
      <el-table-column
        prop="bizNo"
        :label="language('BUCHADANHAO', '补差单号')"
        width="180"
        header-align="center"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span class="openPage" @click="openPage(scope.row)">
            {{ scope.row.bizNo }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="id"
        align="center"
        show-overflow-tooltip
        :label="language('PINGZHENGID', '凭证Id')"
        min-width="140"
      >
      </el-table-column>
      <el-table-column
        prop="mgroup"
        :label="language('CAILIAOZHONGLEI', '材料中类')"
        min-width="180"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="department"
        :label="language('KESHI', '科室')"
        width="80"
        align="center"
        header-align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="applicantBy"
        :label="language('SHENQINGREN', '申请人')"
        width="140"
        align="center"
        header-align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="supplier"
        show-overflow-tooltip
        align="center"
        header-align="center"
        :label="language('GONGYINGSHANG', '供应商')"
        width="180"
      >
        <template slot-scope="scope">
          <p>
            {{ scope.row.supplier ? scope.row.supplier.split('-')[0] : '' }}
          </p>
          <p>
            {{ scope.row.supplier ? scope.row.supplier.split('-')[1] : '' }}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        prop="approvedAmt"
        show-overflow-tooltip
        align="center"
        :label="
          language('SHIJIBUCHAJINEPINGZHENGJINE', '实际补差金额（凭证金额）')
        "
        width="210"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.approvedAmt | format }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="paidAmt"
                       show-overflow-tooltip
                       align="right"
                       header-align="center"
                       :label="language('YIZHIFUJINE','已支付金额')"
                       width="140">
        <template slot-scope="scope">
          <span>{{scope.row.approvedAmt|format}}</span>
        </template>
      </el-table-column> -->
      <el-table-column
        prop="monthFromTo"
        show-overflow-tooltip
        header-align="center"
        :label="language('BUCHASHIJIANDUAN', '补差时间段')"
        width="140"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="status"
        header-align="center"
        align="center"
        show-overflow-tooltip
        :label="language('DANJUZHUANGTAI', '单据状态')"
        width="140"
      >
        <template slot-scope="scope">
          <!-- <div v-if="scope.row.status=='审批中'||scope.row.status=='审批通过'||scope.row.status=='审批不通过'"> -->
          <div v-if="allowClickStatusList.indexOf(scope.row.status) > -1">
            <el-popover placement="right" trigger="click">
              <process-vertical :instanceId="scope.row.riseId" />
              <process-vertical :epmsId="scope.row.id" />
              <el-button type="text" slot="reference">
                {{ scope.row.status }}
              </el-button>
            </el-popover>
          </div>
          <div v-else>
            <span> {{ scope.row.status }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="remark"
        header-align="center"
        show-overflow-tooltip
        align="center"
        :label="('BEIZHU', '备注')"
        width="140"
      >
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="light"
            :content="scope.row.rejectReason"
            v-if="scope.row.rejectReason"
            placement="top"
          >
            <el-button type="text">{{
              language('JUPEILIYOU', '拒赔理由')
            }}</el-button>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        prop="fileList"
        width="140"
        header-align="center"
        :label="language('FUJIANQINGDAN', '附件清单')"
      >
        <template slot-scope="scope">
          <iButton
            type="text"
            v-if="scope.row.fileList.length !== 0"
            @click="openFile(scope.row.fileList)"
            >{{ language('FUJIANQINGDAN', '附件清单') }}</iButton
          >
        </template>
      </el-table-column>
    </el-table>
    <iPagination
      v-update
      @size-change="handleSizeChange($event, getmakeUpPageList)"
      @current-change="handleCurrentChange($event, getmakeUpPageList)"
      background
      :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      :layout="page.layout"
      :current-page="page.currPage"
      :total="page.totalCount"
    />
    <editDetailDialog
      :key="editModalParams.key"
      v-if="editModalParams.key"
      :dialogVisible="editModalParams.visible"
      :flag="editModalParams.flag"
      @close="editDetalClose"
      :selectData="editModalParams.data"
    />
    <el-dialog
      :title="language('FUJIANQINGDAN', '附件清单')"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <ul>
        <li
          class="fileList"
          v-for="item in fileList"
          :key="item.fileUrl"
          @click="fileDown(item.fileUrl)"
        >
          {{ item.fileName }}
        </li>
      </ul>
      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>
  </iCard>
</template>

<script>
import {
  makeUpPageList,
  sendSupplier,
  recall,
  payBalanceSubmit,
  approvalStatus,
  exportFile
} from '@/api/mtz/annualGeneralBudget/supplementaryList'
import { iCard, iButton, iPagination, iMessage } from 'rise'
import { pageMixins } from '@/utils/pageMixins'
import processVertical from './processVertical'
import editDetailDialog from '@/views/mtz/annualGeneralBudget/replenishmentManagement/components/mtzReplenishmentOverview/components/balancePaymentDialogEdit'
export default {
  components: {
    iCard,
    iButton,
    iPagination,
    editDetailDialog,
    processVertical
  },
  mixins: [pageMixins],
  data() {
    return {
      totalPrice: [],
      searchForm: {},
      tableData: [],
      muiltSelectList: [],
      editModalParams: {
        key: 0,
        visible: false,
        data: [],
        flag: false
      },
      loading: false,
      fileList: [],
      dialogVisible: false,
      allowClickStatusList: [
        '审批中',
        '审批退回',
        '审批不通过',
        'EPMS退回',
        'EPMS审批通过',
        '关闭'
      ]
    }
  },
  created() {
    console.log(this.$parent)
    this.init()
    this.getStatus()
  },
  methods: {
    init() {
      this.getmakeUpPageList()
    },
    getmakeUpPageList() {
      this.loading = true
      let search = []
      search = this.$parent.$children.filter((item) => {
        return item.$options._componentTag === 'theSearch'
      })
      this.searchForm = search[0].searchForm
      const req = {
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
        ...this.searchForm
      }
      makeUpPageList(req).then((res) => {
        if (res.code === '200') {
          this.tableData = res.data
          this.page.currPage = res.pageNum
          this.page.pageSize = res.pageSize
          this.page.totalCount = res.total || 0
          this.loading = false
        }
      })
    },
    openPage(val) {
      this.$emit('detail', val)
    },
    sendSupplier() {
      if (this.muiltSelectList.length === 0) {
        iMessage.error('请选择数据')
      }
      console.log(this.muiltSelectList[0].status)
      if (
        this.muiltSelectList[0].status === '草稿' ||
        this.muiltSelectList[0].status === '供应商拒绝' ||
        this.muiltSelectList[0].status === '审批不通过'
      ) {
        let params = []
        this.muiltSelectList.forEach((item) => {
          params.push(item.id)
        })
        sendSupplier(params).then((res) => {
          if (res.code === '200') {
            this.getmakeUpPageList()
            iMessage.success(res.desZh)
          } else {
            iMessage.error(res.desZh)
          }
        })
      } else {
        iMessage.error("'草稿、供应商拒绝、审批不通过状态可以提交")
      }
    },
    handleClickEdit() {
      if (this.muiltSelectList.length == 0) {
        return iMessage.warn(this.language('QZSXZYTSJ', '请至少选中一条数据'))
      }
      if (
        this.muiltSelectList[0].status === '草稿' ||
        this.muiltSelectList[0].status === '供应商拒绝' ||
        this.muiltSelectList[0].status == '审批不通过' ||
        this.muiltSelectList[0].status == '审批退回' ||
        this.muiltSelectList[0].status == 'RISE审批通过' ||
        this.muiltSelectList[0].status == '供应商确认'
      ) {
        this.editModalParams = {
          ...this.editModalParams,
          key: Math.random(),
          visible: true,
          data: this.muiltSelectList
        }
      } else {
        iMessage.error(
          "'草稿、供应商已拒绝、审批不通过、审批退回、RISE审批通过、供应商确认状态可以编辑"
        )
      }
    },
    submit() {
      if (this.muiltSelectList.length === 0) {
        iMessage.error('请选择数据')
      }
      if (
        this.muiltSelectList[0].status === '供应商确认' ||
        this.muiltSelectList[0].status === '审批退回' ||
        this.muiltSelectList[0].status === 'RISE审批通过'
      ) {
        let params = []
        this.muiltSelectList.forEach((item) => {
          params.push(item.id)
        })
        payBalanceSubmit(params).then((res) => {
          if (res.code === '200') {
            this.getmakeUpPageList()
            iMessage.success(res.desZh)
          } else {
            iMessage.error(res.desZh)
          }
        })
      } else {
        iMessage.error("'供应商确认、审批退回、RiSE审批通过状态可以提交")
      }
    },
    recall() {
      if (this.muiltSelectList.length === 0) {
        iMessage.error('请选择数据')
      }
      if (
        this.muiltSelectList[0].status === '草稿' ||
        this.muiltSelectList[0].status === '供应商确认中' ||
        this.muiltSelectList[0].status === '供应商拒绝' ||
        this.muiltSelectList[0].status === '审批不通过'
      ) {
        let params = []
        this.muiltSelectList.forEach((item) => {
          params.push(item.id)
        })
        recall(params).then((res) => {
          if (res.code === '200') {
            this.getmakeUpPageList()
            iMessage.success(res.desZh)
          } else {
            iMessage.error(res.desZh)
          }
        })
      } else {
        iMessage.error(
          "'草稿、供应商确认中、供应商拒绝、审批不通过状态可以撤回"
        )
      }
    },
    edit() {
      if (this.muiltSelectList.length === 0) {
        iMessage.error('请选择数据')
      }
    },
    handleSelectionChange(val) {
      console.log(val)
      if (val.length > 1) {
        var duoxuans = val.pop()
        this.muiltSelectList = val.pop()
        //清除所有选中
        this.$refs.moviesTable.clearSelection()
        //给最后一个加上选中
        this.$refs.moviesTable.toggleRowSelection(duoxuans)
      } else {
        this.muiltSelectList = val
      }
    },
    editDetalClose(val) {
      this.editModalParams.visible = val
    },
    getStatus(val) {
      approvalStatus({ id: '1000000002', isDeptLead: true }).then((res) => {
        if (res.code === '200') {
          let data = res.data
          // this.epmsList= data.
        }
      })
    },
    openFile(val) {
      this.fileList = val
      this.dialogVisible = true
    },
    handleClose(done) {
      done()
    },
    exportFile() {
      let search = []
      search = this.$parent.$children.filter((item) => {
        return item.$options._componentTag === 'theSearch'
      })
      this.searchForm = search[0].searchForm
      const req = {
        ...this.searchForm
      }
      exportFile(req).then((res) => {
        if (res?.code === '200') {
          iMessage.success(res.desZh)
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    fileDown(val) {
      window.open(val)
    }
  }
}
</script>

<style lang="scss" scoped>
.openPage {
  position: relative;
  color: $color-blue;
  font-size: 14px;
  cursor: pointer;
  width: 90%;
}
.fileList {
  cursor: pointer;
  color: rgb(55, 72, 231);
  margin-bottom: 10px;
  text-decoration: underline;
}
</style>
<style lang="scss">
.el-table__fixed-header-wrapper,
.el-table__fixed-body-wrapper {
  background-color: #fff;
}
</style>
