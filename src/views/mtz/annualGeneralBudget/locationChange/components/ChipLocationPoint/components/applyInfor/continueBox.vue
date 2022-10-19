<!-- 沿用弹窗 -->
<template>
  <div style="padding-bottom: 30px">
    <div class="searchBox">
      <iSearch @sure="handleSubmitSearch" @reset="handleSearchReset">
        <el-form
          :inline="true"
          ref="searchForm"
          :model="searchForm"
          label-position="top"
          class="demo-form-inline leftBox"
        >
          <el-form-item
            style="marginright: 68px; width: 180px"
            :label="language('GUIZEBIANHAO', '规则编号')"
            class="formItem"
          >
            <iInput
              v-model="searchForm.ruleNo"
              :placeholder="language('QINGSHURU', '请输入')"
            >
            </iInput>
          </el-form-item>

          <el-form-item
            style="marginright: 68px; width: 180px"
            :label="language('补差方式', '补差方式')"
            class="formItem"
          >
            <i-select
              v-model="searchForm.method"
              clearable
              :placeholder="language('QINGSHURU', '请输入')"
            >
              <el-option
                v-for="item in methodList"
                :key="item.code"
                :label="item.message"
                :disabled="item.disabled"
                :value="item.code"
              >
              </el-option>
            </i-select>
          </el-form-item>

          <el-form-item
            style="marginright: 68px; width: 180px"
            :label="language('CAILIAOZU', '材料组')"
            class="formItem"
          >
            <iInput
              v-model="searchForm.materialGroup"
              :placeholder="language('QINGSHURU', '请输入')"
            >
            </iInput>
          </el-form-item>

          <el-form-item
            style="marginright: 68px; width: 180px"
            :label="language('LINGJIANHAO', '零件号')"
            class="formItem"
          >
            <iInput
              v-model="searchForm.partNum"
              :placeholder="language('QINGSHURU', '请输入')"
            >
            </iInput>
          </el-form-item>

          <el-form-item
            style="marginright: 68px; width: 180px"
            :label="language('LINGJIANMINGCHEN', '零件名称')"
            class="formItem"
          >
            <iInput
              v-model="searchForm.partName"
              :placeholder="language('QINGSHURU', '请输入')"
            >
            </iInput>
          </el-form-item>

          <el-form-item
            style="marginright: 68px; width: 180px"
            :label="language('GONGYINGSHANGSAPHAO', '供应商SAP号')"
            class="formItem"
          >
            <iInput
              v-model="searchForm.sapCode"
              :placeholder="language('QINGSHURU', '请输入')"
            >
            </iInput>
          </el-form-item>

          <el-form-item
            style="marginright: 68px; width: 180px"
            :label="language('GONGYINGSHANGMINGCHENG', '供应商名称')"
            class="formItem"
          >
            <iInput
              v-model="searchForm.supplierName"
              :placeholder="language('QINGSHURU', '请输入')"
            >
            </iInput>
          </el-form-item>

          <el-form-item
            style="marginright: 68px; width: 180px"
            :label="language('KESHI', '科室')"
          >
            <!-- multiple -->
            <custom-select
              v-model="searchForm.deptCode"
              :user-options="linieDeptId"
              clearable
              :placeholder="language('QINGXUANZE', '请选择')"
              display-member="message"
              value-member="message"
              value-key="message"
            >
            </custom-select>
          </el-form-item>

          <el-form-item
            style="marginright: 68px; width: 180px"
            :label="language('CAIGOUYUAN', '采购员')"
            class="formItem"
          >
            <custom-select
              v-model="searchForm.buyerName"
              :user-options="buyer"
              clearable
              :placeholder="language('QINGXUANZE', '请选择')"
              display-member="message"
              value-member="code"
              value-key="code"
            >
            </custom-select>
          </el-form-item>

          <el-form-item
            style="marginright: 68px; width: 180px"
            :label="language('是否生效', '是否生效')"
          >
            <i-select
              v-model="searchForm.effectFlag"
              clearable
              :placeholder="language('QINGXUANZE', '请选择')"
            >
              <el-option
                v-for="item in effectFlagList"
                :key="item.code"
                :label="item.message"
                :value="item.code"
              >
              </el-option>
            </i-select>
          </el-form-item>
          <el-form-item
            style="marginright: 68px; width: 180px"
            :label="language('YOUXIAOQIQI', '有效期起')"
          >
            <iDatePicker
              v-model="searchForm.startDate"
              type="date"
              value-format="yyyy-MM-dd hh:mm:ss"
            >
            </iDatePicker>
          </el-form-item>
          <el-form-item
            style="marginright: 68px; width: 180px"
            :label="language('YOUXIAOQIZHI', '有效期止')"
          >
            <iDatePicker
              v-model="searchForm.endDate"
              type="date"
              value-format="yyyy-MM-dd hh:mm:ss"
            >
            </iDatePicker>
          </el-form-item>
        </el-form>
      </iSearch>
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
      <template slot="effectFlag" slot-scope="scope">
        <span>{{
          scope.row.effectFlag == 0
            ? '无效'
            : scope.row.effectFlag == 1
            ? '有效'
            : ''
        }}</span>
      </template>
      <template slot="thresholdCompensationLogic" slot-scope="scope">
        <span>{{
          scope.row.thresholdCompensationLogic == 'A'
            ? '全额补差'
            : scope.row.thresholdCompensationLogic == 'B'
            ? '超额补差'
            : ''
        }}</span>
      </template>
      <template slot="compensationPeriod" slot-scope="scope">
        <span>{{
          scope.row.compensationPeriod == 'A'
            ? '年度'
            : scope.row.compensationPeriod == 'H'
            ? '半年度'
            : scope.row.compensationPeriod == 'Q'
            ? '季度'
            : scope.row.compensationPeriod == 'M'
            ? '月度'
            : ''
        }}</span>
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
  iPagination
} from 'rise'
import { pageMixins } from '@/utils/pageMixins'
import { continueBox } from './data.js'
import inputCustom from '@/components/inputCustom'
import tableList from '@/components/commonTable/index.vue'
import {
  getMtzNomiRuleBuyer,
  getDeptLimitLevel
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/details'

import { getAppRecordByCondition } from '@/api/mtz/annualGeneralBudget/replenishmentManagement/chipLocation/details'
// import { getDeptData } from '@/api/kpiChart/index'

export default {
  components: {
    iCard,
    iSelect,
    iDatePicker,
    iDialog,
    iButton,
    iTabs,
    iTabsList,
    inputCustom,
    iInput,
    iPagination,
    tableList,
    iSearch
  },
  props: ['detailObj', 'selectList'],
  mixins: [pageMixins],
  data() {
    return {
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
      },
      methodList: [
        {
          code: 0,
          message: '变价单补差'
        },
        {
          code: 1,
          message: '一次性补差',
          disabled: true
        }
      ],
      effectFlagList: [
        {
          code: 0,
          message: '无效'
        },
        {
          code: 1,
          message: '有效'
        }
      ],
      getLocationApplyStatus: [
        {
          code: 'A',
          message: '年度'
        },
        {
          code: 'H',
          message: '半年度'
        },
        {
          code: 'M',
          message: '月度'
        },
        {
          code: 'Q',
          message: '季度'
        }
      ],
      linieDeptId: [],
      buyer: []
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
        this.linieDeptId = res.data
      })
      getMtzNomiRuleBuyer({}).then((res) => {
        this.buyer = res.data
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
          console.log(res)
          this.tableData = res.data
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
