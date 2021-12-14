<template>
  <iCard>
    <div class="margin-bottom20 clearFloat">
      <div class="floatright">
        <!--导出-->
        <iButton
          @click="download"
          v-if="isAuth(whiteBtnList, 'ACHIEVEMENTMGT_SPARE_TRACK_DOWN')"
        >
          {{ language('导出') }}
        </iButton>
      </div>
    </div>
    <tableList
      class="basetable"
      :header="true"
      :state="state"
      :config="true"
      :monthTitle="monthTitle"
      label="跟踪进度"
      :tableData="tableListData"
      :tableTitle="tableTitle"
      :tableLoading="tableLoading"
      @handleSelectionChange="handleSelectionChange"
    >
    </tableList>
    <iPagination
      v-update
      @size-change="handleSizeChange($event, getTableList)"
      @current-change="handleCurrentChange($event, getTableList)"
      background
      :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      :layout="page.layout"
      :current-page="page.currPage"
      :total="page.totalCount"
    >
    </iPagination>
  </iCard>
</template>

<script>
import { iCard, iButton, iPagination, iMessage } from 'rise'
import tableList from './table'
import { pageMixins } from '@/utils/pageMixins'
import resultMessageMixin from '@/mixins/resultMessageMixin'
import { tableTitle, monthTitle, getRequest } from './data'
import { toThousands, delcommafy } from '@/utils'
import isAuth from '@/utils/isAuth'
import {
  querySpTrackDetail, // 跟踪明细list
  exportSpTrackDetail, // 导出功能
  querySum
} from '@/api/achievement'

export default {
  mixins: [pageMixins, resultMessageMixin],
  components: {
    iCard,
    iButton,
    tableList,
    iPagination,
    iMessage
  },
  data() {
    return {
      tableListData: [],
      tableTitle,
      monthTitle,
      tableLoading: false,
      selectTableData: [],
      trackId: '',
      listId: [],
      trackTypeList: [],
      isAuth,
      whiteBtnList: this.$store.state.permission.whiteBtnList
    }
  },
  props: ['formData', 'title'],
  created() {
    let obj = getRequest()
    this.trackId = obj.id
    this.getTableList()
  },
  computed: {
    state() {
      return this.$store.state.permission.userInfo.roleList.some(
        (item) => item.code == 'BZZL' || item.fullNameZh == '部长助理'
      )
    }
  },
  methods: {
    // 点击搜索组件按钮callback
    handleSearch(data) {
      this.page.currPage = 1
      this.getTableList()
    },
    handleSelectionChange(val) {
      this.listId = []
      this.selectTableData = val
      if (this.selectTableData.length) {
        this.selectTableData.forEach((item) => {
          this.listId.push(item.id)
        })
      }
    },
    handleSizeChange(e) {
      this.page.pageSize = e
      this.getTableList()
    },
    handleCurrentChange(e) {
      this.page.currPage = e
      this.getTableList()
    },
    async getTableList() {
      this.tableLoading = true
      const searchItem = this.$parent.$children.filter((item) => {
        return item.$attrs.name === 'theSearch'
      })
      let searchForm = JSON.parse(JSON.stringify(searchItem[0].form))
      searchForm.trackId = this.trackId
      try {
        const req = {
          currentPage: this.page.currPage,
          pageSize: this.page.pageSize,
          trackId: this.trackId,
          ...searchForm
        }
        const res = await querySpTrackDetail(req)
        const head = await querySum(req)
        if (head.result) {
          this.$emit('setHead', head.data)
        }
        if (res.result) {
          this.tableListData = res.data.records
          this.tableListData.map((item) => {
            if (item.partProperty == 1) {
              this.$set(item, '_partProperty', '配件')
            } else {
              this.$set(item, '_partProperty', '附件')
            }
            if (item.supplierCode && item.supplierName) {
              this.$set(
                item,
                '_supplierName',
                item.supplierCode + '-' + item.supplierName
              )
            }
            if (item.supplierPercent) {
              this.$set(item, '_supplierPercent', item.supplierPercent + '%')
            }
            if (item.preYearPrice) {
              item.preYearPrice = toThousands(item.preYearPrice)
            }
            if (item.yearAmount) {
              item.yearAmount = toThousands(item.yearAmount)
            }
            if (item.yearForecastVolume) {
              item.yearForecastVolume = toThousands(item.yearForecastVolume)
            }
            if (item.lasting) {
              item.lasting = toThousands(item.lasting)
            }
            if (item.average) {
              item.average = toThousands(item.average)
            }
          })
          this.page = {
            ...this.page,
            currPage: res.data.current,
            pageSize: res.data.size,
            totalCount: res.data.total
          }
        } else {
          this.resultMessage(res)
          this.tableListData = []
        }
        this.tableLoading = false
      } catch {
        this.tableListData = []
        this.tableLoading = false
      }
    },

    // 导出
    download() {
      this.formData.trackId = this.trackId
      this.formData.currentPage = 1
      this.formData.downName = this.title
      exportSpTrackDetail(this.formData).then((res) => {
        if(res.result) {
          let remark = res.data.remark
          iMessage.success(remark)
        }
      }).catch(() => {
      })
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-form-item {
  margin-top: 0;
  margin-bottom: 0;
}
</style>
