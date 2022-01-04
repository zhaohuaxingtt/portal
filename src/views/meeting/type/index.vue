<template>
  <iPage>
    <div class="header">{{ $t('MT_HUIYILEIXINGGUANLI') }}</div>
    <searchForm @search="search" />
    <iCard>
      <actionButtons
        :selected-row="selectedTableData"
        @add="newTemplate"
        @edit="editMeeting"
        @delete="deleteMeeting"
        @export="exportMeeting"
        :canDelete="canDelete"
      />
      <iTableML
        tooltip-effect="light"
        :data="tableData"
        @selectionChange="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          min-width="50"
          align="center"
        ></el-table-column>
        <el-table-column
          type="index"
          width="68"
          align="center"
          :label="$t('MT_XUHAO2')"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="left"
          :label="$t('MT_LEIXINGMINGCHENG')"
          ><template slot-scope="scope">
            <span
              :class="'open-link-text cursor'"
              @click="handleGoDetail(scope.row)"
              >{{ scope.row.name }}</span
            >
          </template></el-table-column
        >
        <el-table-column
          show-overflow-tooltip
          align="left"
          :label="$t('MT_HUIYIGUANLIYUAN')"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.userNames }}</span>
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="left"
          :label="$t('MT_HUIYIXINXIMIAOSHU')"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.meetingInfoDesc }}</span>
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="left"
          :label="$t('MT_SHENGCHENGHUIYIMINGCHENGHOUZHUI')"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.meetingNameSuffix }}</span>
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="left"
          :label="$t('MT_SUOSHUFENLEI')"
        >
          <template slot-scope="scope">
            <span>{{ $t(categoryObj[scope.row.category]) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          width="163"
          :label="$t('MT_MORENYITISHICHANG')"
          ><template slot-scope="scope">
            <span>{{ scope.row.duration }}</span>
          </template></el-table-column
        >
        <el-table-column
          show-overflow-tooltip
          width="163"
          :label="$t('MT_SHIFOUCHUFASHENPILIU')"
          ><template slot-scope="scope">
            <span>{{
              scope.row.isTriggerApproval ? $t('MT_SHI') : $t('MT_FOU')
            }}</span>
          </template></el-table-column
        >
      </iTableML>
      <iPagination
        v-update
        @size-change="handleSizeChange($event, query)"
        @current-change="handleCurrentChange($event, query)"
        background
        :current-page="page.currPage"
        :page-size="page.pageSize"
        layout="prev, pager, next, jumper"
        :prev-text="$t('MT_SHANGYIYE')"
        :next-text="$t('MT_XIAYIYE')"
        :total="page.totalCount"
      />
    </iCard>
    <meetingTypeDetailDialog
      v-if="openDetailDialog"
      :openDialog="openDetailDialog"
      :id="id"
      @closeDialog="closeDetailDialog"
      :approvalProcess="approvalProcess"
    />
    <meetingTypeDialog
      :openDialog="openDialog"
      @closeDialog="closeDialog"
      :selectedTableData="selectedTableData"
      :editOrAdd="editOrAdd"
      v-if="openDialog"
      @flushTable="flushTable"
      :approvalProcess="approvalProcess"
    />
  </iPage>
</template>
<script>
import { iPage, iCard, iPagination, iMessage } from 'rise'
import iTableML from '@/components/iTableML'
import { downloadAllExport } from '@/utils/downloadAll'

// import axios from '@/utils/axios.download'
import {
  getMettingType,
  batchDeleteMeeting,
  getApprovalProcess
} from '@/api/meeting/type'
import { pageMixins } from '@/utils/pageMixins'
import {
  actionButtons,
  searchForm,
  meetingTypeDialog,
  meetingTypeDetailDialog
} from './component'
// import { excelExportCustom } from "@/utils/filedowLoad";
import { tableColumns } from './component/data'
import axios from '@/utils/axios'
// import iTableCustom from "@/components/iTableCustom";
export default {
  mixins: [pageMixins],
  components: {
    iPage,
    iCard,
    iPagination,
    searchForm,
    actionButtons,
    iTableML,
    meetingTypeDialog,
    meetingTypeDetailDialog
  },
  data() {
    return {
      request: () => {},
      canDelete: true,
      tooltip: true,
      tableLoading: false,
      tableColumns: tableColumns,
      selectedTableData: [],
      form: {},
      tableData: [],
      openDialog: false,
      openDetailDialog: false,
      id: -1,
      editOrAdd: 'add',
      approvalProcess: [],
      categoryObj: {
        // "01": "通用会议",
        // "02": "生产采购CSC",
        // "03": "一般采购CSG",
        '01': 'MT_TONGYONGHUIYI',
        '02': 'MT_SHENGCHANCAIGOUSCC',
        '03': 'MT_YIBANCAIGOUCSG'
      }
    }
  },
  created() {
    this.request = axios()
    this.query()
  },
  methods: {
    flushTable() {
      this.query()
    },
    newTemplate() {
      this.editOrAdd = 'add'
      this.openDialog = true
    },
    editMeeting() {
      this.editOrAdd = 'edit'
      this.openDialog = true
    },
    closeDialog(bol) {
      this.openDialog = bol
    },
    closeDetailDialog(bol) {
      this.openDetailDialog = bol
    },
    search(val) {
      this.form = { ...val }
      this.page.currPage = 1
      this.query()
    },
    query() {
      const data = {
        ...this.form,
        pageNum: this.page.currPage,
        pageSize: this.page.pageSize
      }
      this.tableLoading = true
      getMettingType(data)
        .then((res) => {
          this.tableLoading = false
          const { data, pageNum, total, pages } = res
          this.page.currPage = pageNum
          // this.page.pageSize = pageSize;
          this.page.totalCount = total
          this.page.pages = pages
          this.tableData = data
        })
        .catch(() => {
          this.tableLoading = false
        })
    },
    // 表格选中值集
    handleSelectionChange(val) {
      this.selectedTableData = val
      this.canDelete = !this.selectedTableData.some((item) => {
        return item.name === 'CSC' || item.name === 'Pre CSC'
      })
    },
    // 删除
    deleteMeeting() {
      // console.log("删除");
      const ids = []
      this.selectedTableData.forEach((e) => ids.push(e.id))
      if (ids.length == 0) {
        this.$message.error(this.$t('MT_QINGXUANZEXUYAOSHANCHUDEHUIYILEIXING'))
      } else {
        this.$confirm(this.$t('MT_SHIFOUSHANCHUGAIHUIYILEIXING'), this.$t('MT_TISHI'), {
          confirmButtonText: this.$t('MT_SHI'),
          cancelButtonText: this.$t('MT_FOU'),
          type: 'warning'
        }).then(() => {
          batchDeleteMeeting({ ids: ids })
            .then(() => {
              this.$message.success(this.$t('MT_SHANCHUCHENGGONG'))
              this.query()
            })
            .catch(() => {
              // this.$message.error("删除失败!");
            })
        })
      }
    },
    // 导出
    exportMeeting() {
      /* if (this.selectedTableData.length == 0)
        return iMessage.warn(this.$t("LK_QINGXUANZHEXUYAODAOCHUSHUJU")); */
      // excelExportCustom(this.tableData, this.tableColumns);
      const data = {
        ...this.form,
        pageNum: 1,
        pageSize: 999
      }
      downloadAllExport({
        // url: '/rise-meeting/meetingTypeService/exportMeetingType',
        url: '/meetingApi/meetingTypeService/exportMeetingType',
        filename: this.$t('MT_HUIYILEIXINGLIEBIAO'),
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        // type: "application/x-xls",
        // type: 'application/vnd.ms-excel',
        data,
        callback: (e) => {
          if (e) {
            iMessage.success(this.$t('MT_DAOCHUCHENGGONG'))
          } else {
            iMessage.error(this.$t('MT_DAOCHUSHIBAI'))
          }
        }
      })
    },

    // 查询
    sure() {
      this.page.pageNum = 1
      this.query()
    },

    handleGoDetail(e) {
      this.id = e.id
      this.openDetailDialog = true
    }
  },
  mounted() {
    getApprovalProcess().then((res) => {
      this.approvalProcess = res.data[0].subDictResultVo
      console.log('this.approvalProcess', this.approvalProcess)
    })
  }
}
</script>
<style lang="scss" scoped>
/* .iframe {
  width: auto;
  height: auto;
} */
.header {
  font-size: 18px;
  font-weight: bold;
}
</style>
