
<!--
 * @Author: your name
 * @Date: 2021-10-08 14:25:34
 * @LastEditTime: 2021-11-09 11:07:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\replenishmentManagement\components\mtzReplenishmentOverview\components\search.vue
-->
<template>
  <div>
    <iCard>
      <template v-slot:header>
        <span>
          {{language('LIEBIAOXIANGQING','列表详情')}}
        </span>
        <div>
          <iButton @click="addMTZ">{{language('XINJIANMTZBIANGENGSHENQING','新建MTZ变更申请')}}</iButton>
          <iButton @click="recall">{{language('CHEHUI','撤回')}}</iButton>
          <iButton @click="del">{{language('SHANCHU','删除')}}</iButton>
        </div>

      </template>
      <el-table :data="tableData"
                ref="moviesTable"
                v-loading="loading"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection"
                         width="60">
        </el-table-column>
        <el-table-column label="#"
                         type="index"
                         width="60">
        </el-table-column>
        <el-table-column prop="mtzAppId"
                         align="center"
                         show-overflow-tooltip
                         width="240"
                         label="申请单号">
          <template slot-scope="scope">
            <div>
              <iButton type=text
                       @click="detail(scope.row.mtzAppId)">{{scope.row.mtzAppId}}</iButton>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="appName"
                         align="center"
                         label="申请单名称"
                         show-overflow-tooltip
                         width="180">

        </el-table-column>
        <el-table-column prop="appStatus"
                         align="center"
                         label="申请状态"
                         show-overflow-tooltip
                         width="180">

        </el-table-column>
        <el-table-column prop="buyerName"
                         align="center"
                         label="采购员"
                         show-overflow-tooltip
                         width="180">

        </el-table-column>
        <el-table-column prop="buyerDeptName"
                         align="center"
                         label="科室"
                         show-overflow-tooltip>

        </el-table-column>
        <el-table-column prop="updateDate"
                         align="center"
                         label="审批完成时间"
                         show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <iPagination @size-change="handleSizeChange($event, getTableList)"
                   @current-change="handleCurrentChange($event, getTableList)"
                   :page-sizes="page.pageSizes"
                   :page-size="page.pageSize"
                   :current-page="page.currPage"
                   :total="page.totalCount"
                   :layout="page.layout">
      </iPagination>
    </iCard>
  </div>
</template>

<script>
import { iCard, iButton, iPagination, icon, iMessage } from 'rise'
import { pageList, mtzDel, mtzRecall } from '@/api/mtz/annualGeneralBudget/mtzChange'
import { pageMixins } from "@/utils/pageMixins"
export default {
  name: "Search",
  componentName: "theTable",
  components: {
    iCard,
    iButton,
    iPagination,
  },
  watch: {
  },
  mixins: [pageMixins],
  data () {
    return {
      tableData: [],
      loading: false,
      muilteList: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.$nextTick(() => {
        this.getTableList()
      });
    },
    addMTZ () {
      let routeData = this.$router.resolve({
        path: `/mtz/annualGeneralBudget/newMtzLocationChange`
      })
      window.open(routeData.href, '_blank')
    },
    //获取列表
    getTableList () {
      this.loading = true
      let params = {
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
        ...this.$parent.$refs.theSearch.searchForm
      }
      pageList(params).then(res => {
        try {
          if (res && res.code === '200') {
            this.tableData = res.data
            this.page.currPage = res.pageNum;
            this.page.pageSize = res.pageSize;
            this.page.totalCount = res.total;
            this.loading = false
          } else {
            iMessage.error(res.desZh)
            this.loading = false
          }
        } catch (err) {
          console.log(err)
          this.loading = false
        }

      })
    },
    detail (val) {
      let routerPath = this.$router.resolve({
        path: '/mtz/annualGeneralBudget/MTZapplicationForm',
        query: {
          mtzAppId: val || '',
        }
      })
      window.open(routerPath.href, '_blank')
    },
    handleSelectionChange (val) {
      this.muilteList = val
    },
    del () {
      let ids = this.muilteList.map(item => item.mtzAppId)
      mtzDel({ ids }).then((res) => {
        if (res && res.code === '200') {
          iMessage.success(res.desZh)
          this.getTableList()
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    recall () {
      let ids = this.muilteList.map(item => item.mtzAppId)
      mtzRecall({ ids }).then((res) => {
        if (res && res.code === '200') {
          iMessage.success(res.desZh)
          this.getTableList()
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
