<!-- 选择规则 -->
<template>
  <div style="padding-bottom: 30px">
    <div class="searchBox">
      <search
        @sure="handleSubmitSearch"
        @reset="handleSearchReset"
        :searchForm="searchForm"
        :searchFormData="QueryFormData"
        :options="options"
      />
    </div>
    <el-divider class="margin-top20"></el-divider>
    <div class="BtnTitle">
      <span>{{ language('GUIZEXIANGQING', '规则详情') }}</span>
      <div>
        <iButton @click="save">{{ language('XUANZE', '选择') }}</iButton>
      </div>
    </div>
    <tableList
      :tableData="tableData"
      :tableTitle="tableTitle"
      :tableLoading="loading"
      @handleSelectionChange="handleSelectionChange"
      :index="true"
    >
      <template slot="method" slot-scope="scope">
        <span>{{ scope.row.method == '1' ? '一次性补差' : '变价单补差' }}</span>
      </template>
      <template slot="effectFlag" slot-scope="scope">
        <span>{{ scope.row.effectFlag ? '生效' : '未生效' }}</span>
      </template>
      <template slot="startDate" slot-scope="scope">
        <span>{{ getDay(scope.row.startDate) }}</span>
      </template>
      <template slot="endDate" slot-scope="scope">
        <span>{{ getDay(scope.row.endDate) }}</span>
      </template>
      <template slot="updateDate" slot-scope="scope">
        <span>{{ getDay(scope.row.updateDate) }}</span>
      </template>
    </tableList>
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
  </div>
</template>

<script>
import { iMessage, iButton, iPagination } from 'rise'
import search from '@/views/mtz/annualGeneralBudget/locationChange/components/components/search.vue'
import { pageMixins } from '@/utils/pageMixins'
import { continueBox, QueryFormData } from './data.js'
import tableList from '@/components/commonTable/index.vue'
import {
  getAppRecordByCondition,
  getDeptLimitLevel
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/chipLocation/details'

export default {
  components: {
    search,
    iButton,
    iPagination,
    tableList
  },
  mixins: [pageMixins],
  props: {
    sapCode: String,
    supplierName: String,
    dateRange: Array
  },
  data() {
    return {
      QueryFormData,
      options: {
        effectFlagList: [
          {
            value: '',
            label: '全部'
          },
          {
            value: false,
            label: '未生效'
          },
          {
            value: true,
            label: '生效'
          }
        ],
        methodList: [
          {
            value: '',
            label: '全部'
          },
          {
            value: 1,
            label: '一次性补差',
            disabled: true
          },
          {
            value: 2,
            label: '变价单补差'
          }
        ],
        deptList: []
      },
      loading: false,
      tableTitle: continueBox,
      tableData: [],
      changeData:[],
      searchForm: {
        ruleNo: '',
        method: '',
        materialGroup: '',
        partNum: '',
        partName: '',
        sapCode: '',
        supplierName: '',
        deptCode: '',
        buyerName: '',
        effectFlag: '',
        startDate: '',
        endDate: ''
      }
    }
  },
  created() {
    this.searchForm.sapCode = this.sapCode
    this.searchForm.supplierName = this.supplierName
    this.searchForm.startDate = this.dateRange[0]
    this.searchForm.endDate = this.dateRange[1]
    this.init()
  },
  mounted() {
    this.$nextTick(() => {
      this.$el.querySelector('.el-icon-arrow-up').click()
    })
  },
  methods: {
    getDay(date) {
      return date ? date.split(' ')[0] : date
    },
    init() {
      getDeptLimitLevel({}).then((res) => {
        this.$set(
          this.options,
          'deptList',
          res.data.map((item) => ({
            value: item.message,
            label: item.message
          }))
        )
      })

      this.getTableList()
    },
    getTableList() {
      this.loading = true
      let searchForm = {}
      // 所有list都改为逗号分隔的字符串
      Object.keys(this.searchForm).forEach((key) => {
        if (Array.isArray(this.searchForm[key])) {
          searchForm[key] = this.searchForm[key].join(',')
        } else {
          searchForm[key] = this.searchForm[key]
        }
      })
      if (searchForm.startDate)
        searchForm.startDate = window
          .moment(searchForm.startDate)
          .format('YYYY-MM-DD 00:00:00')
      if (searchForm.endDate)
        searchForm.endDate = window
          .moment(searchForm.endDate)
          .format('YYYY-MM-DD 23:59:59')
      let params = {
        ...searchForm,
        pageSize: this.page.pageSize,
        currentPage: this.page.currPage
      }
      delete params.supplierName
      getAppRecordByCondition(params)
        .then((res) => {
          if (res?.code == 200) {
            this.tableData = res.data.records
            this.page.totalCount = res.data.total
          } else {
            iMessage.error(res.desZh)
          }
        })
        .finally(() => (this.loading = false))
    },
    // 重置
    handleSearchReset(form) {
      this.page.currPage = 1
      this.searchForm = {
        ruleNo: '',
        method: '',
        materialGroup: '',
        partNum: '',
        partName: '',
        sapCode: this.sapCode,
        supplierName: this.supplierName,
        deptCode: '',
        buyerName: '',
        effectFlag: '',
        startDate: this.dateRange[0],
        endDate: this.dateRange[1]
      }
      this.getTableList()
    },
    // 确定
    handleSubmitSearch() {
      this.page.currPage = 1
      this.getTableList()
    },
    handleSelectionChange(val) {
      this.changeData = val
    },
    save() {
      if (this.changeData.length == 0) {
        iMessage.error(this.language('QINGXUANZEYITIAOSHUJU', '请选择一条数据'))
        return false
      }
      this.$emit('addDialogData', this.changeData)
    }
  }
}
</script>

<style lang='scss' scoped>
.search-form {
  ::v-deep .el-form-item__label {
    padding-bottom: 0;
  }
}
.searchBox {
  position: relative;
  display: flex;
  justify-content: space-between;
  .searchButton {
    position: absolute;
    right: 0;
    top: 50px;
    z-index: 100;
  }
}

.BtnTitle {
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > span {
    font-size: 18px;
    font-weight: bold;
  }
}

::v-deep .el-form {
  display: flex;
  flex-wrap: wrap;
}
::v-deep .cardBody {
  margin: 0 !important;
  padding: 0 !important;
}
::v-deep .card {
  box-shadow: 0 0 0px rgb(27 29 33 / 0%);
}
</style>
