<!-- 沿用弹窗 -->
<template>
  <div style="padding-bottom: 30px">
    <div class="searchBox">
      <i-search @sure="handleSubmitSearch" @reset="handleSearchReset">
        <el-form
          :inline="true"
          :model="searchForm"
          label-position="top"
          class="search-form"
        >
          <el-form-item
            v-for="(item, index) in QueryFormData"
            :key="index"
            :label="language(item.key, item.name)"
            class="SearchOption"
          >
            <inputCustom
              v-if="item.type == 'inputCustom'"
              v-model="searchForm[item.props]"
              :editPlaceholder="language('QINGSHURU', '请输入')"
              :placeholder="language('QINGSHURU', '请输入')"
              style="width: 100%"
            ></inputCustom>
            <iMultiLineInput
              v-else-if="item.type == 'iMultiLineInput'"
              :placeholder="
                language(
                  'partsprocure.PARTSPROCURE',
                  '请输入零件号，多个逗号分隔'
                )
              "
              :title="language('LK_LINGJIANHAO', '零件号')"
              v-model="searchForm[item.props]"
            ></iMultiLineInput>
            <custom-select
              v-else-if="item.type == 'select'"
              v-model="searchForm[item.props]"
              :user-options="options[item.selectOption]"
              :multiple="item.multiple || false"
              style="width: 100%"
              filterable
              collapse-tags
              :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
              display-member="label"
              value-member="value"
              value-key="value"
            />
            <iDatePicker
              v-model="searchForm[item.props]"
              v-else-if="item.type == 'date'"
              valueFormat="yyyy-MM-dd"
              type="date"
              :placeholder="language('QINGXUANZE', '请选择')"
            />
            <iInput
              v-else
              v-model="searchForm[item.props]"
              :placeholder="$t('staffManagement.INPUT_PLACEHOLDER')"
            ></iInput>
          </el-form-item>
        </el-form>
      </i-search>
    </div>
    <el-divider class="margin-top20"></el-divider>
    <div class="BtnTitle">
      <span>{{ language('GUIZEXIANGQING', '规则详情') }}</span>
      <div>
        <iButton @click="save">{{ language('YANYONG', '沿用') }}</iButton>
      </div>
    </div>
    <tableList
      class="margin-top20"
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
            value: item.code,
            label: item.message
          }))
        )
      })

      this.getTableList()
    },
    getTableList() {
      this.loading = true
      let params = {
        ...this.searchForm,
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
  margin-top: 30px;
  margin-bottom: 30px;
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
