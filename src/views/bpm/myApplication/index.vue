<template>
  <iPage class="template">
    <pageHeader>
      我的申请
      <template slot="actions">
        <headerActions
          :todo-total="todoTotal"
          :finished="finished"
          @toggle="toggleFinished"
        />
      </template>
    </pageHeader>
    <searchForm :finished="finished" @search="search" />
    <iCard>
      <div class="operation-btn">
        <iButton
          v-show="!finished"
          @click="recallDialogVisible = true"
          :disabled="selectTableData.length !== 1"
        >
          {{ $t('APPROVAL.RECALL') }}
        </iButton>
      </div>
      <i-table-custom
        :key="finished.toString()"
        :loading="tableLoading"
        :data="tableListData"
        :columns="tableTitle"
        :extraData="extraData"
        @go-detail="openPage"
        @handle-selection-change="handleSelectionChange"
      />
      <iPagination
        v-update
        @size-change="handleSizeChange($event, getTableList)"
        @current-change="handleCurrentChange($event, getTableList)"
        background
        :current-page="page.currPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount"
      />
    </iCard>
    <dialogRecall
      v-if="recallDialogVisible"
      :visible="recallDialogVisible"
      :instance-id="selectTableData && selectTableData[0].instanceId"
      @success="recallSuccess"
      @close="closeRecall"
    />
    <el-popover ref="popover" placement="right" trigger="hover">
      <processNodeVertical
        v-if="currentInstanceId"
        :instanceId="currentInstanceId"
      />
    </el-popover>
  </iPage>
</template>

<script>
import { iPage, iButton, iCard, iPagination } from 'rise'
import { pageMixins } from '@/utils/pageMixins'
import { tableTitle, searchForm as dataSearchForm } from './component/data'
import filters from '@/utils/filters'
import { dialogRecall } from '../task/components'
import iTableCustom from '@/components/iTableCustom'
import pageHeader from '@/components/pageHeader'
import { searchForm, headerActions } from './component'
import { queryApplications } from '@/api/approval/myApplication'
import { filterEmptyValue } from '@/utils'
import { processNodeVertical } from '../task/components'
export default {
  mixins: [pageMixins, filters],
  components: {
    iPage,
    iButton,
    iCard,
    iPagination,
    dialogRecall,
    iTableCustom,
    searchForm,
    pageHeader,
    headerActions,
    processNodeVertical
  },
  data() {
    return {
      tableListData: [],
      tableLoading: false,
      tableTitle: tableTitle,
      selectTableData: [],
      form: {},
      recallDialogVisible: false,
      finished: false,
      todoTotal: 0,
      currentInstanceId: '',
      extraData: {
        mouseenter: this.customMouseenter,
        mouseleave: this.customMouseleave
      }
    }
  },
  created() {
    if (this.$route.query.modelTemplate) {
      this.form.categoryList = JSON.parse(this.$route.query.modelTemplate)
    }
    this.getTableList()
  },
  methods: {
    toggleFinished(isFinished) {
      this.finished = isFinished
      this.page.currPage = 1
      this.form = { ...dataSearchForm }
      if (isFinished) {
        this.tableTitle = tableTitle.filter((e) => e.type !== 'selection')
      } else {
        this.tableTitle = tableTitle
      }
      this.getTableList()
    },
    //表格选中值集
    handleSelectionChange(val) {
      this.selectTableData = val
    },
    //打开详情页
    openPage(item) {
      window.open(
        `/portal/#/bpm/myApply/detail/${item.instanceId}/${
          this.finished ? 'yes' : 'no'
        }`
      )
      // this.showDialog = true
    },
    search(val) {
      this.form = { ...val }
      this.page.currPage = 1
      this.getTableList()
    },
    getTableList() {
      const params = {
        pageNum: this.page.currPage,
        pageSize: this.page.pageSize
      }
      const data = {
        applyUserId: this.$store.state.permission.userInfo.id,
        isFinished: this.finished,
        ...filterEmptyValue(this.form),
        isAeko: false
      }
      console.log('this.form.procProgress', this.form.procProgress)
      if (this.form.procProgress) {
        data['procProgress'] = this.form.procProgress.toString()
      } else {
        data['procProgress'] = '0'
      }
      this.tableLoading = true
      queryApplications(params, data)
        .then((res) => {
          this.tableLoading = false
          const { current, size, total, records } = res.data
          this.page.currPage = current
          this.page.pageSize = size
          this.page.totalCount = total || 0
          this.tableListData = records
          if (!this.finished) {
            this.todoTotal = total
          }
        })
        .catch(() => (this.tableLoading = false))
    },
    recallSuccess() {
      this.recallDialogVisible = false

      this.getTableList()
    },
    closeRecall() {
      this.recallDialogVisible = false
    },
    customMouseenter($event, row) {
      this.currentInstanceId = row.instanceId
      const ele = $event.toElement
      const popover = this.$refs.popover
      popover.referenceElm = ele
      popover.reference = ele
      popover.doShow()
    },
    customMouseleave() {
      const popover = this.$refs.popover
      if (popover) {
        popover.doClose()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.operation-btn {
  float: right;
  display: flex;
  margin-bottom: 22px;
  text-align: right;
}
.page-header {
  display: flex;
  justify-content: space-between;
  .types {
    font-size: 18px;
    .type-link {
      line-height: 1em;
    }
  }
  .divider {
    margin: 0px 30px;
  }
}
</style>
