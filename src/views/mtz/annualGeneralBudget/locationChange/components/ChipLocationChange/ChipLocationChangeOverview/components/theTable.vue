<!--
 * @Author: your name
 * @Date: 2021-10-08 14:25:34
 * @LastEditTime: 2022-12-24 13:01:15
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\locationChange\components\ChipLocationChange\ChipLocationChangeOverview\components\theTable.vue
-->
<template>
  <div>
    <iCard>
      <template v-slot:header>
        <span class="headTitle">{{ $t('XIANGQINGLIEBIAO') }}</span>
        <div>
          <iButton @click="addChip" v-permission="PORTAL_CHIP_CHANGE_ADD">{{
            language('XINJIANCHIPBIANGENGSHENQING', '新建芯片补差变更申请')
          }}</iButton>
          <iButton @click="openRecall" v-permission="PORTAL_CHIP_CHANGE_CHEHUI">{{
            language('CHEHUI', '撤回')
          }}</iButton>
          <iButton @click="del" v-permission="PORTAL_CHIP_CHANGE_SHANCHU">{{ language('SHANCHU', '删除') }}</iButton>
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
          prop="appNo"
          align="center"
          show-overflow-tooltip
          width="240"
          :label="$t('SHENQINGDANHAO')"
        >
          <template slot-scope="scope">
            <div>
              <iButton type="text" @click="detail(scope.row)">{{
                scope.row.appNo
              }}</iButton>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="appName"
          align="center"
          :label="$t('SHENQINGDANMINGCHENG')"
          show-overflow-tooltip
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="status"
          align="center"
          :label="$t('SHENQINGZHUANGTAI')"
          show-overflow-tooltip
          width="180"
        >
          <template slot-scope="scope">
            {{ getStatus(scope.row.status) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="linieName"
          align="center"
          :label="$t('CAIGOUYUAN')"
          show-overflow-tooltip
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="depteCode"
          align="center"
          :label="$t('KESHI')"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="approvalTime"
          align="center"
          :label="$t('审批完成时间')"
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
    <iDialog
      :title="language('CHEHUIYUANYIN', '撤回原因')"
      :visible.sync="reasonShow"
      v-if="reasonShow"
      width="40%"
    >
      <div>
        <div class="tanc_book">
          <iInput v-model="reason" type="textarea" :rows="10"></iInput>
        </div>
        <div slot="footer" class="dialog-footer">
          <iButton @click="recall">{{ language('QUEREN', '确认') }}</iButton>
          <iButton @click="cancel">{{ language('QUXIAO', '取消') }}</iButton>
        </div>
      </div>
    </iDialog>
  </div>
</template>

<script>
import { iCard, iButton, iPagination, iMessage, iDialog, iInput } from 'rise'
import newChipLocationChange from '../../newChipLocationChange'
import {
  getPageList,
  recall,
  deleteApproval
} from '@/api/mtz/annualGeneralBudget/chipChange'
import { pageMixins } from '@/utils/pageMixins'
export default {
  name: 'Search',
  componentName: 'theTable',
  components: {
    iCard,
    iButton,
    iPagination,
    newChipLocationChange,
    iDialog,
    iInput
  },
  watch: {},
  mixins: [pageMixins],
  props: {
    statusList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      tableData: [],
      loading: false,
      muilteList: [],
      dialogVisible: false,
      reasonShow: false,
      reason: ''
    }
  },
  mounted() {
    this.getTableList()
  },
  methods: {
    // 申请状态
    getStatus(status) {
      let item = this.statusList.find((item) => item.value == status) || {}
      return this.$getLabel(item.label, item.labelEn)
    },
    addChip() {
      this.dialogVisible = true
    },
    //获取列表
    getTableList() {
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
      this.loading = true
      let params = {
        currentPage: this.page.currPage,
        pageSize: this.page.pageSize,
        ...searchForm
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
    // 跳转详情
    detail(val) {
      let routerPath = this.$router.resolve({
        path: '/mtz/annualGeneralBudget/ChipApplicationForm',
        query: {
          changeId: val.id
        }
      })
      this.$store.dispatch('setMtzChangeBtn', false)
      window.open(routerPath.href, '_blank')
    },
    handleSelectionChange(val) {
      this.muilteList = val
    },
    // 删除
    del() {
      if (this.muilteList.length === 0) {
        iMessage.warn(this.language('QINGXUANZESHUJU', '请选择数据'))
        return
      }
      if (this.muilteList[0].status === 'NEW') {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            deleteApproval(this.muilteList.map((item) => item.id)).then(
              (res) => {
                if (res?.code === '200') {
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
    openRecall() {
      if (this.muilteList.length === 0)
        return iMessage.warn(this.language('QINGXUANZESHUJU', '请选择数据'))
      this.reasonShow = true
    },
    cancel() {
      this.reasonShow = false
    },
    // 撤回
    recall() {
      recall(
        this.muilteList.map((item) => item.id),
        { reason: this.reason }
      ).then((res) => {
        if (res?.code === '200') {
          iMessage.success(res.desZh)
          this.reasonShow = false
          this.getTableList()
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    close() {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.tanc_book {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  span {
    font-size: 16px;
  }
}
.dialog-footer {
  padding-bottom: 30px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.headTitle {
  display: inline-block;
  font-weight: bold;
  color: #000000;
}
</style>
