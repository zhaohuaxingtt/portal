<template>
  <div class="mtz-select">
    <i-search @sure="sure" @reset="reset">
      <iFormGroup label-position="top">
        <iFormItem
          v-for="(item, index) in ruleQueryFormData"
          :key="index"
          :label="language(item.key, item.name)"
          class="SearchOption"
        >
          <iMultiLineInput
            v-if="item.type == 'iMultiLineInput'"
            :placeholder="
              language(
                'partsprocure.PARTSPROCURE',
                '请输入零件号，多个逗号分隔'
              )
            "
            :title="language('LK_LINGJIANHAO', '零件号')"
            v-model="formData[item.props]"
          ></iMultiLineInput>
          <custom-select
            v-else-if="item.type == 'select'"
            v-model="formData[item.props]"
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
            v-model="formData[item.props]"
            v-else-if="item.type == 'date'"
            valueFormat="yyyy-MM-dd"
            type="date"
            :placeholder="language('QINGXUANZE', '请选择')"
          />
          <iInput
            v-else
            v-model="formData[item.props]"
            :placeholder="$t('staffManagement.INPUT_PLACEHOLDER')"
          ></iInput>
        </iFormItem>
      </iFormGroup>
    </i-search>
    <iCard class="OrganizationTable">
      <div class="export">
        <el-switch
          v-model="onlySeeMySelf"
          @change="changeSwitch"
          :inactive-text="language('ZHIKANZIJI', '只看自己')"
        />
        <div>
          <iButton
            @click="takeEffect(true)"
            v-permission="PORTAL_MTZ_SEARCH_MTZGUIZECHAXUN_SHENGXIAO"
            >{{ language('SHENGXIAO', '生效') }}</iButton
          >
          <iButton
            @click="takeEffect(false)"
            v-permission="PORTAL_MTZ_SEARCH_MTZGUIZECHAXUN_SHIXIAO"
            >{{ language('SHIXIAO', '失效') }}</iButton
          >
          <iButton
            @click="handleExportAll"
            v-permission="PORTAL_MTZ_SEARCH_MTZGUIZECHAXUN_DAOCHU"
            >{{ language('DAOCHU', '导出') }}</iButton
          >
          <button-table-setting
            @click="$refs.testTable.openSetting()"
          ></button-table-setting>
        </div>
      </div>
      <div>
        <iTableCustom
          ref="testTable"
          class="customClass"
          :loading="tableLoading"
          :data="tableListData"
          :columns="tableSetting"
          permissionKey="chip-database-query"
          @go-detail="handlecreatemtz"
          @go-partNumber="handlePartNumberDetail"
          @go-source="handleSource"
          @handle-selection-change="handleSelectChange"
        >
        </iTableCustom>
        <!-- 分页标签 -->
        <iPagination
          v-update
          @size-change="handleSizeChange($event, sure)"
          @current-change="handleCurrentChange($event, getList)"
          background
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :current-page="page.currPage"
          :total="page.totalCount"
        />
      </div>
    </iCard>
  </div>
</template>

<script>
import {
  iSearch,
  iInput,
  iSelect,
  iPage,
  iCard,
  iButton,
  iPagination,
  iFormItem,
  iFormGroup,
  iDialog,
  iDatePicker,
  iMessage,
  icon,
  iMultiLineInput
  // iTableCustom
} from 'rise'
import iTableCustom from '@/components/iTableCustom'
import { pageMixins } from '@/utils/pageMixins'
import { tableSetting, ruleQueryFormData } from './components/data'
import Detail from './components/detail'
import {
  rulePage,
  getDeptData,
  getMtzMarketSourceList,
  exportRuleData,
  ruleEntityEdit,
  queryDeptSectionForRule
} from '@/api/mtz/database/partsQuery'
import { selectDictByKeys } from '@/api/dictionary'
import buttonTableSetting from '@/components/buttonTableSetting'

import {
  getAppRecordByCondition,
  partEnable,
  exportAppRecordByCondition
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/chipLocation/details'
export default {
  components: {
    iSearch,
    iInput,
    icon,
    iSelect,
    iPage,
    iCard,
    iButton,
    iTableCustom,
    iPagination,
    iFormItem,
    iFormGroup,
    iDialog,
    iDatePicker,
    Detail,
    buttonTableSetting,
    iMultiLineInput
  },
  mixins: [pageMixins],
  data() {
    return {
      options: {
        effectFlagList: [
          {
            value: 'false,true',
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
            value: '1,2',
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
      onlySeeMySelf: false,
      isShow: false, //零件号
      formData: {
        ruleNo: '',
        method: '',
        materialGroup: '',
        partNum: '',
        partName: '',
        sapCode: '',
        supplierName: '',
        deptCode: '',
        buyerName: '',
        effectFlag: true,
        startDate: '',
        endDate: ''
      }, //表单数据
      tableListData: [], //表格数据
      tableSetting,
      ruleQueryFormData,
      getMtzMarketSourceListDrop: [],
      sendersCycle: [],
      selectedData: []
    }
  },
  mounted() {
    this.getList()
    queryDeptSectionForRule({}).then((res) => {
      this.$set(
        this.options,
        'deptList',
        res.data.map((item) => ({
          value: item.departId,
          label: item.departNameEn
        }))
      )
    }) //初始化科室
    getMtzMarketSourceList().then((res) => {
      this.getMtzMarketSourceListDrop = res.data
    })
  },
  methods: {
    changeSwitch() {
      this.sure()
    },
    handlecreatemtz(row) {
      if (row.sourceCode !== '初始化') {
        let routeData = this.$router.resolve({
          path: '/mtz/annualGeneralBudget/locationChange/ChipLocationPoint/overflow',
          query: {
            currentStep: 1,
            appId: row.sourceId
          }
        })
        window.open(routeData.href)
      }
    },
    handlePartNumberDetail() {
      this.isShow = true
    },
    handleSource() {
      this.isShowSource = true
    },
    getList() {
      getAppRecordByCondition({
        onlySeeMySelf: this.onlySeeMySelf,
        pageSize: this.page.pageSize,
        currentPage: this.page.currPage,
        ...this.formData
      }).then((res) => {
        if (res?.code == '200') {
          this.tableListData = res.data.records
          this.page.totalCount = res.data.total || 0
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    sure() {
      this.page.currPage = 1
      this.getList()
    },
    reset() {
      this.page.currPage = 1
      this.page.pageSize = 10
      this.formData = {
        ruleNo: '',
        method: '',
        materialGroup: '',
        partNum: '',
        partName: '',
        sapCode: '',
        supplierName: '',
        deptCode: '',
        buyerName: '',
        effectFlag: true,
        startDate: '',
        endDate: ''
      }
      this.getList()
    },
    handleExportAll() {
      exportAppRecordByCondition(this.formData).then((res) => {
        let url = window.URL.createObjectURL(res)
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        let fname = '芯片补差规则.xlsx'
        link.setAttribute('download', fname)
        document.body.appendChild(link)
        link.click()
        link.parentNode.removeChild(link)
      })
    },
    // 选择数据
    handleSelectChange(e) {
      this.selectedData = e
    },
    // 生效/失效
    takeEffect(x) {
      if (this.selectedData.length > 0) {
        let ids = this.selectedData.map((y) => y.id)
        partEnable(ids, { effectFlag: x }).then((res) => {
          if (res.result) {
            this.getList()
            iMessage.success(res.desZh)
            // this.$message(res.desZh)
          } else {
            // this.$message({type:'warning',message:res.desZh})
            iMessage.error(res.desZh)
          }
        })
      } else {
        // this.$message({type:'warning',message:"请至少勾选一条数据"})
        iMessage.warn(
          this.language('QINGZHISHAOXUANZHONGYITIAOSHUJU', '请至少选中一条数据')
        )
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.routerpage {
  overflow: hidden;
}
.OrganizationTable {
  margin-top: 20px;
}
.export {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  ::v-deep .el-switch__label {
    font-weight: bold;
    color: #000;
  }
  .export_title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .tt {
    margin-right: 10px;
    font-size: 18px;
    font-weight: bold;
  }
}
// .SearchOption {
//   margin-bottom: 20px !important;
// }
.open-link-text {
  text-decoration: underline;
}
.mtz-select {
  margin-top: 25px;
}
::v-deep.customClass {
  .open-link-text {
    text-decoration: underline;
  }
}
::v-deep .el-form-item {
  flex-direction: column;
}
</style>