
<!--
 * @Author: your name
 * @Date: 2021-10-08 14:25:34
 * @LastEditTime: 2022-05-13 11:11:09
 * @LastEditors: zhaohuaxing 5359314+zhaohuaxing@user.noreply.gitee.com
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\replenishmentManagement\components\mtzReplenishmentOverview\components\search.vue
-->
<template>
  <iCard>
    <template v-slot:header>
      <div class="tableTitle">
        <span class="margin-right10">只看自己</span>
        <el-switch
          v-model="onlySeeMySelf"
          :active-value="true"
          :inactive-value="false"
        />
      </div>
      <div class="opration">
        <iButton @click="handleSure">{{ language('QUEREN', '确认') }}</iButton>
        <!-- <iButton @click="handleRedeploy"
                   v-show="!addFlag">{{language('DAOCHU', '导出')}}</iButton> -->
      </div>
    </template>

    <tableList
      class="margin-top20"
      :tableData="tableList"
      :tableTitle="tableTitle"
      :tableLoading="tableLoading"
      @handleSelectionChange="handleSelectionChange"
      index
    >
      <template slot="method" slot-scope="scope">
        <span>{{ scope.row.method == '1' ? '一次性补差' : '变价单补差' }}</span>
      </template>
      <template slot="effectFlag" slot-scope="scope">
        <span>{{ scope.row.effectFlag ? '生效' : '未生效' }}</span>
      </template>
    </tableList>
    <iPagination
      @size-change="handleSizeChange($event, getTableList)"
      @current-change="handleCurrentChange($event, getTableList)"
      :page-sizes="[50, 100, 200, 500, 1000]"
      :page-size="page.pageSize"
      :current-page="page.currPage"
      :total="page.totalCount"
      :layout="page.layout"
    >
    </iPagination>
  </iCard>
</template>

<script>
import { iCard, iButton, iPagination, icon, iMessage } from 'rise'
import tableList from '@/components/commonTable/index.vue'
import {
  initData,
  listByCondition
} from '@/api/mtz/annualGeneralBudget/chipChange.js'
import { getAppRecordByCondition } from '@/api/mtz/annualGeneralBudget/replenishmentManagement/chipLocation/details'
import { pageMixins } from '@/utils/pageMixins'
import { tableTitle } from './data'
export default {
  name: 'Search',
  componentName: 'theTable',
  components: {
    iCard,
    iButton,
    iPagination,
    tableList
  },
  props: {
    addFlag: {
      type: Boolean,
      default: false
    },
    mtzAppId: {
      type: String,
      default: ''
    },
    dateList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  watch: {},
  mixins: [pageMixins],
  data() {
    return {
      tableList: [],
      tableTitle,
      onlySeeMySelf: true,
      muilteList: [],
      tableLoading: false
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      // this.addFlag = this.addFlag || false
      // this.mtzAppId = this.mtzAppId || ""
      this.page.pageSize = 50
      this.getTableList()
    },
    getTableList() {
      this.tableLoading = true
      let searchForm = {}
      let searchForm_ = JSON.parse(
        JSON.stringify(this.$parent.$refs.theSearch.searchForm)
      )
      // 所有list都改为逗号分隔的字符串
      Object.keys(searchForm_).forEach((key) => {
        if (Array.isArray(searchForm_[key])) {
          searchForm[key] = searchForm_[key].join(',')
        } else {
          searchForm[key] = searchForm_[key]
        }
      })
      let params = {
        currentPage: this.page.currPage,
        pageSize: this.page.pageSize,
        onlySeeMySelf: this.onlySeeMySelf,
        ...searchForm
      }
      getAppRecordByCondition(params).then((res) => {
        if (res && res.code === '200') {
          this.tableList = res.data.records
          this.page.currPage = res.pageNum
          this.page.pageSize = res.pageSize
          this.page.totalCount = res.total
          this.tableLoading = false
        }
      })
    },
    handleSelectionChange(val) {
      this.muilteList = val
    },
    handleSure() {
      initData(this.muilteList.map((item) => item.id)).then((res) => {
        if (res && res.code === '200') {
          let data = res.data
          let routerPath = this.$router.resolve({
            path: '/mtz/annualGeneralBudget/ChipApplicationForm',
            query: {
              changeId: data
            }
          })
          this.$store.dispatch('setMtzChangeBtn', false)
          window.open(routerPath.href, '_blank')
        } else {
          iMessage.error(res.desZh)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
