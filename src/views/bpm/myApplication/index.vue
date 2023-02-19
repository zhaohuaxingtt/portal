<template>
  <iPage class="template">
    <pageHeader>
      {{ language('我的申请') }}
<!--      <template slot="actions">-->
<!--        <headerActions-->
<!--          :todo-total="todoTotal"-->
<!--          :finished="finished"-->
<!--          @toggle="toggleFinished"-->
<!--        />-->
<!--      </template>-->
    </pageHeader>
    <searchForm :finished="finished" :isSourceFindingPoint="true" @search="search" />
    <iCard>
      <div class="header-actions-div">
        <headerActions
          :todo-total="todoTotal"
          :finished="finished"
          @toggle="toggleFinished"
        />
      </div>
      <!-- <div class="operation-btn">
        <iButton
          v-show="!finished && recallButtonVisible"
          @click="recallDialogVisible = true"
          :disabled="selectTableData.length !== 1"
        >
          {{ language('撤回') }}
        </iButton>
      </div> -->
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
        use-from="popover"
      />
    </el-popover>
  </iPage>
</template>

<script>
import { iPage, iButton, iCard, iPagination, iMessage } from 'rise'
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
import { BPM_APPLY_HIDE_RECALL_CATEGORY_LIST } from '@/constants'
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
  computed: {
    routeParamCategory() {
      if (this.$route.query.modelTemplate) {
        const categoryList = JSON.parse(this.$route.query.modelTemplate)
        return categoryList
      }
      return []
    },
    recallButtonVisible() {
      if (this.routeParamCategory) {
        const categoryList = this.routeParamCategory
        if (!this.finished) {
          if (
            categoryList.length === 1 &&
            BPM_APPLY_HIDE_RECALL_CATEGORY_LIST.includes(categoryList[0])
          ) {
            return false
          }
        }
      }
      return true
    }
  },
  data() {
    return {
      tableListData: [],
      tableLoading: false,
      tableTitle: tableTitle,
      selectTableData: [],
      form: { ...dataSearchForm },
      recallDialogVisible: false,
      finished: false,
      todoTotal: 0,
      currentInstanceId: '',
      extraData: {
        mouseenter: this.customMouseenter,
        mouseleave: this.customMouseleave
      },
      templates: []
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
      let queryDataStr = ''
      const queryData = this.genQueryData()
      if(queryData) {
        queryDataStr = encodeURIComponent(JSON.stringify(queryData))
      }
      window.open(
        `/portal/#/bpm/myApply/detail/${item.instanceId}/${
          this.finished ? 'yes' : 'no'
        }/${queryDataStr}`
      )
      // this.showDialog = true
    },
    search(val, templates) {
      console.log('val', val, templates)
      this.templates = templates || []
      this.form = { ...val }
      this.page.currPage = 1
      this.getTableList()
    },
    genQueryData: function() {
      const data = {
        applyUserId: this.$store.state.permission.userInfo.id,
        isFinished: this.finished,
        ...filterEmptyValue(this.form),
        isAeko: false
      }
      if (
        data.categoryList &&
        data.categoryList.length === 1 &&
        data.categoryList[0] === ''
      ) {
        data.categoryList = this.templates.map((e) => e.name).filter((e) => e)
      }

      console.log('this.form.procProgress', this.form.procProgress)
      if (this.form.procProgress) {
        data['procProgress'] = this.form.procProgress.toString()
      } else {
        data['procProgress'] = '0'
      }
      return data
    },
    getTableList() {
      const params = {
        pageNum: this.page.currPage,
        pageSize: this.page.pageSize
      }
      // 接口需要收数组
      if (typeof this.form.categoryList === 'string') {
        this.form.categoryList = [this.form.categoryList]
      }
      const data = this.genQueryData()
      this.tableLoading = true

      queryApplications(params, data)
        .then((res) => {
          if (res.result) {
            this.tableLoading = false
            const { current, size, total, records } = res.data
            this.page.currPage = current
            this.page.pageSize = size
            this.page.totalCount = total || 0
            this.tableListData = records
            if (!this.finished) {
              this.todoTotal = total
            }
          } else {
            this.tableListData = []
            this.page.totalCount = 0
            this.todoTotal = 0
            iMessage.error(res.desZh || '获取失败')
          }
        })
        .catch((err) => {
          this.tableListData = []
          this.page.totalCount = 0
          this.todoTotal = 0
          iMessage.error(err.desZh || '获取失败')
        })
        .finally(() => (this.tableLoading = false))
    },
    recallSuccess() {
      this.recallDialogVisible = false

      this.getTableList()
    },
    closeRecall() {
      this.recallDialogVisible = false
    },
    customMouseenter($event, row) {
      const popover = this.$refs.popover
      if (popover) {
        popover.doClose()
      }
      setTimeout(() => {
        this.currentInstanceId = row.instanceId
        const ele = $event.toElement
        popover.referenceElm = ele
        popover.reference = ele
        popover.doShow()
      }, 200)
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
.header-actions-div {
  height: 50px;
  line-height: 50px;
  margin-left: -50px;
  ::v-deep .tab-badge {
    justify-content: start;
  }
}
</style>
