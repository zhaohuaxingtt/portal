<!-- 沿用弹窗 -->
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
        <iButton @click="save">{{ language('YANYONG', '沿用') }}</iButton>
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
import {
  iInput,
  iCard,
  iSearch,
  iSelect,
  iDatePicker,
  iMessage,
  iDialog,
  iButton,
  iTabs,
  iTabsList,
  iFormGroup,
  iFormItem,
  iPagination,
  iMultiLineInput
} from 'rise'
import iTableCustom from '@/components/iTableCustom'
import search from '../../../components/search.vue'
import { pageMixins } from '@/utils/pageMixins'
import { continueBox, QueryFormData } from './data.js'
import tableList from '@/components/commonTable/index.vue'
import inputCustom from '@/components/inputCustom'
import {
  getAppRecordByCondition,
  getDeptLimitLevel
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/chipLocation/details'

export default {
  components: {
    search,
    iCard,
    iSelect,
    iDatePicker,
    iDialog,
    iButton,
    iTabs,
    iTabsList,
    iInput,
    iPagination,
    iFormGroup,
    iFormItem,
    tableList,
    iMultiLineInput,
    inputCustom,
    iTableCustom,
    iSearch
  },
  props: ['detailObj', 'selectList'],
  mixins: [pageMixins],
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
    this.init()
  },
  mounted() {
    this.$nextTick(() => {
      this.$el.querySelector('.el-icon-arrow-up').click()
    })
  },
  methods: {
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
          .format('YYYY-01-01 00:00:00')
      if (searchForm.endDate)
        searchForm.endDate = window
          .moment(searchForm.endDate)
          .format('YYYY-01-01 23:59:59')
      let params = {
        ...searchForm,
        pageSize: this.page.pageSize,
        currentPage: this.page.currPage
      }
      getAppRecordByCondition(params).then((res) => {
        if (res?.code == 200) {
          this.tableData = res.data.records
          this.page.totalCount = res.data.total
          this.loading = false
        } else {
          iMessage.error(res.desZh)
        }
      })
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
        sapCode: '',
        supplierName: '',
        deptCode: '',
        buyerName: '',
        effectFlag: '',
        startDate: '',
        endDate: ''
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
        iMessage.error(this.language('QXZYTSJJXGL', '请选择一条数据进行关联！'))
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
