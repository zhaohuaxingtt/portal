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
      <i-table-custom
        :loading="tableLoading"
        :data="tableListData"
        :columns="tableTitle"
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
  </iPage>
</template>

<script>
import { iPage, iCard, iPagination } from 'rise'
import { pageMixins } from '@/utils/pageMixins'
import { tableTitle, searchForm as dataSearchForm } from './component/data'
import filters from '@/utils/filters'
import iTableCustom from '@/components/iTableCustom'
import pageHeader from '@/components/pageHeader'
import { searchForm, headerActions } from './component'
import { queryApplications } from '@/api/approval/myApplication'
import { filterEmptyValue } from '@/utils'
import { AEKO_CATEGORY_LIST } from '@/constants'
export default {
  mixins: [pageMixins, filters],
  components: {
    iPage,
    iCard,
    iPagination,
    iTableCustom,
    searchForm,
    pageHeader,
    headerActions
  },
  data() {
    return {
      tableListData: [],
      tableLoading: false,
      tableTitle: tableTitle,
      selectTableData: [],
      form: {},
      finished: false,
      todoTotal: 0
    }
  },
  created() {
    this.getTableList()
  },
  methods: {
    toggleFinished(isFinished) {
      this.finished = isFinished
      this.page.currPage = 1
      this.form = { ...dataSearchForm }
      this.getTableList()
    },
    //表格选中值集
    handleSelectionChange(val) {
      this.selectTableData = val
    },
    //打开详情页
    openPage(item) {
      window.open(
        `/portal/#/bpm/myAekoApply/detail/${item.instanceId}/${
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
        categoryList: [...AEKO_CATEGORY_LIST],
        isAeko: false
      }

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
