<!--
 * @Author: your name
 * @Date: 2021-10-08 14:25:34
 * @LastEditTime: 2022-03-01 22:10:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\replenishmentManagement\components\mtzReplenishmentOverview\components\search.vue
-->
<template>
  <div>
    <iCard>
      <template v-slot:header>
        <span>
          {{ language('LIEBIAOXIANGQING', '列表详情') }}
        </span>
        <div>
          <iButton @click="addChip">{{
            language('XINJIANCHIPBIANGENGSHENQING', '新建芯片补差变更申请')
          }}</iButton>
          <iButton @click="recall">{{ language('CHEHUI', '撤回') }}</iButton>
          <iButton @click="del">{{ language('SHANCHU', '删除') }}</iButton>
        </div>
      </template>
      <el-table
        :data="tableData"
        ref="moviesTable"
        v-loading="loading"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="60"> </el-table-column>
        <el-table-column label="#" type="index" width="60"> </el-table-column>
        <el-table-column
          prop="mtzAppId"
          align="center"
          show-overflow-tooltip
          width="240"
          label="申请单号"
        >
          <template slot-scope="scope">
            <div>
              <iButton
                type="text"
                v-if="scope.row.viewDetailsFlag"
                @click="detail(scope.row)"
                >{{ scope.row.mtzAppId }}</iButton
              >
              <p v-else>{{ scope.row.mtzAppId }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="appName"
          align="center"
          label="申请单名称"
          show-overflow-tooltip
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="appStatus"
          align="center"
          label="申请状态"
          show-overflow-tooltip
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="buyerName"
          align="center"
          label="采购员"
          show-overflow-tooltip
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="buyerDeptName"
          align="center"
          label="科室"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="updateDate"
          align="center"
          label="审批完成时间"
          show-overflow-tooltip
        >
        </el-table-column>
      </el-table>
      <iPagination
        @size-change="handleSizeChange($event, getTableList)"
        @current-change="handleCurrentChange($event, getTableList)"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :current-page="page.currPage"
        :total="page.totalCount"
        :layout="page.layout"
      >
      </iPagination>
    </iCard>
    <new-chipLocation-change
      :dialogVisible="dialogVisible"
      @close="close"
    ></new-chipLocation-change>
  </div>
</template>

<script>
import { iCard, iButton, iPagination, iMessage } from 'rise'
import newChipLocationChange from '../../newChipLocationChange'
import {
  getPageList,
  deleteData,
  recall,
  mtzRecall
} from '@/api/mtz/annualGeneralBudget/chipChange'
import { pageMixins } from '@/utils/pageMixins'
export default {
  name: 'Search',
  componentName: 'theTable',
  components: {
    iCard,
    iButton,
    iPagination,
    newChipLocationChange
  },
  watch: {},
  mixins: [pageMixins],
  data() {
    return {
      tableData: [],
      loading: false,
      muilteList: [],
      dialogVisible: false
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.$nextTick(() => {
        this.getTableList()
      })
    },
    addChip() {
      this.dialogVisible = true
    },
    //获取列表
    getTableList() {
      this.loading = true
      let params = {
        currentPage: this.page.currPage,
        pageSize: this.page.pageSize,
        ...this.$parent.$refs.theSearch.searchForm
      }
      getPageList(params).then((res) => {
        try {
          if (res?.code === '200') {
            this.tableData = res.data.records
            this.page.totalCount = res.data.total
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
    detail(val) {
      let routerPath = this.$router.resolve({
        path: '/mtz/annualGeneralBudget/ChipApplicationForm',
        query: {
          appId: val.appId || ''
        }
      })
      this.$store.dispatch('setMtzChangeBtn', false)
      window.open(routerPath.href, '_blank')
    },
    handleSelectionChange(val) {
      this.muilteList = val
    },
    del() {
      if (this.muilteList.length === 0) {
        iMessage.warn(this.language('QINGXUANZESHUJU', '请选择数据'))
        return
      }
      if (this.muilteList[0].appStatus === '草稿') {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            deleteData(this.muilteList.map((item) => item.appId)).then(
              (res) => {
                if (res && res.code === '200') {
                  iMessage.success(res.desZh)
                  this.getTableList()
                } else {
                  iMessage.error(res.desZh)
                }
              }
            )
          })
          .catch(() => {})
      } else {
        iMessage.warn(
          this.language('CAOGAOZHUANGTAICAINENGSHANCHU', '草稿状态才能删除')
        )
      }
    },
    recall() {
      if (this.muilteList.length === 0) {
        iMessage.warn(this.language('QINGXUANZESHUJU', '请选择数据'))
        return
      }
      recall(this.muilteList.map((item) => item.appId)).then((res) => {
        if (res && res.code === '200') {
          iMessage.success(res.desZh)
          this.getTableList()
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    close(val) {
      this.dialogVisible = val
    }
  }
}
</script>

<style lang="scss" scoped></style>
