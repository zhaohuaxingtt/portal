<!--
 * @Author: your name
 * @Date: 2021-10-08 14:25:34
 * @LastEditTime: 2022-05-13 14:18:43
 * @LastEditors: zhaohuaxing 5359314+zhaohuaxing@user.noreply.gitee.com
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\replenishmentManagement\components\mtzReplenishmentOverview\components\search.vue
-->
<template>
  <div>
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
</template>

<script>
import {
  iCard,
  iButton,
  iMessage,
  iSearch,
  iDatePicker,
  iInput,
  iFormGroup,
  iMultiLineInput,
  iFormItem
} from 'rise'
import inputCustom from '@/components/inputCustom'
import { fetchRemoteDept } from '@/api/mtz/annualGeneralBudget/annualBudgetEdit'
import {
  mtzBasePricePageFilterSource,
  mtzBasePricePageFilterSupplierName,
  mtzBasePricePageFilterSupplierSap,
  mtzBasePricePageFilterUser
} from '@/api/mtz/annualGeneralBudget/chipChange'
import { getDeptLimitLevel } from '@/api/mtz/annualGeneralBudget/replenishmentManagement/chipLocation/details'
import { getRawMaterialNos } from '@/api/mtz/annualGeneralBudget/mtzReplenishmentOverview'
import { continueBox, QueryFormData } from './data.js'
export default {
  name: 'Search',
  componentName: 'searchBox',
  components: {
    iCard,
    iButton,
    iSearch,
    iDatePicker,
    iInput,
    inputCustom,
    iMultiLineInput,
    iFormGroup,
    iFormItem
  },
  data() {
    return {
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
      QueryFormData,

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
      deptList: [],
      rawMaterialNos: [],
      mtzSupplierSapList: [],
      mtzSupplierNameList: [],
      mtzUserList: [],
      mtzSourceList: [],
      effectFlagList: [
        {
          message: '全部',
          code: ''
        },
        {
          message: '生效',
          code: 1
        },
        {
          message: '失效',
          code: 0
        }
      ]
      // pickerOptions: {}
    }
  },
  created() {
    this.init()
  },
  computed: {
    pickerOptions() {
      let that = this
      return {
        disabledDate: (time) => {
          if (that.searchForm.startDate) {
            let startTime = that.searchForm.startDate.replace(/-/g, '/')
            return time.getTime() < new Date(startTime)
          }
        }
      }
    }
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
    },
    // 获取部门数据
    getDeptData() {
      fetchRemoteDept({}).then((res) => {
        if (res && res.code == 200) {
          this.deptList = res.data
        } else iMessage.error(res.desZh)
      })
    },
    //原材料编号
    getRawMaterialNos(key) {
      getRawMaterialNos({
        keyWords: key || ''
      }).then((res) => {
        if (res.code === '200') {
          this.rawMaterialNos = res.data
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    //供应商SAP号
    mtzBasePricePageFilterSupplierSap() {
      mtzBasePricePageFilterSupplierSap().then((res) => {
        if (res.code === '200') {
          this.mtzSupplierSapList = res.data
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    //供应商名称
    mtzBasePricePageFilterSupplierName() {
      mtzBasePricePageFilterSupplierName().then((res) => {
        if (res.code === '200') {
          this.mtzSupplierNameList = res.data
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    //采购员
    mtzBasePricePageFilterUser() {
      mtzBasePricePageFilterUser().then((res) => {
        if (res.code === '200') {
          this.mtzUserList = res.data
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    //市场价来源
    mtzBasePricePageFilterSource() {
      mtzBasePricePageFilterSource().then((res) => {
        if (res.code === '200') {
          this.mtzSourceList = res.data
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    handleSearchReset() {
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
      this.$parent.$refs.theTable.getTableList()
    },
    handleSubmitSearch() {
      this.$parent.$refs.theTable.getTableList()
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-form-item__content {
  width: 100%;
  line-height: 2.5rem !important;
}
::v-deep .el-form-item {
  flex-direction: column;
}
</style>
