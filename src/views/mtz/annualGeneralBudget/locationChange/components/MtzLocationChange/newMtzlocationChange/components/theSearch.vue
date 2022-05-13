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
    <iSearch @reset="handleSearchReset"
             @sure="handleSubmitSearch">
      <iFormGroup :inline="true"
                  :model="searchForm">
        <iFormItem label="零件号"
                   class="searchFormItem">
          <inputCustom v-model="searchForm.partnumList"
                       :editPlaceholder="language('QINGSHURU','请输入')"
                       :placeholder="language('QINGSHURU','请输入')"
                       style="width:100%"></inputCustom>
        </iFormItem>
        <iFormItem label="零件名"
                   class="searchFormItem">
          <custom-select v-model="searchForm.partNameList"
                         :user-options="mtzPartNameList"
                         style="width:100%"
                         multiple
                         clearable
                         :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                         display-member="message"
                         value-member="code"
                         value-key="code">
          </custom-select>
        </iFormItem>
        <iFormItem label="供应商SAP号"
                   class="searchFormItem">
          <custom-select v-model="searchForm.supplierSapList"
                         :user-options="mtzSupplierSapList"
                         style="width:100%"
                         multiple
                         clearable
                         :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                         display-member="message"
                         value-member="code"
                         value-key="code">
          </custom-select>
        </iFormItem>
        <iFormItem label="供应商名称"
                   class="searchFormItem">
          <custom-select v-model="searchForm.supplierNameList"
                         :user-options="mtzSupplierNameList"
                         style="width:100%"
                         multiple
                         clearable
                         :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                         display-member="message"
                         value-member="code"
                         value-key="code">
          </custom-select>
        </iFormItem>
        <iFormItem label="原材料牌号"
                   class="searchFormItem">
          <custom-select v-model="searchForm.materialCodeList"
                         :user-options="rawMaterialNos"
                         style="width:100%"
                         multiple
                         clearable
                         @change="handleChangmater"
                         :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                         display-member="message"
                         value-member="code"
                         value-key="code">
          </custom-select>
        </iFormItem>
        <iFormItem label="规则编号"
                   class="searchFormItem">
          <custom-select v-model="searchForm.ruleNoList"
                         :user-options="mtzRuleList"
                         style="width:100%"
                         multiple
                         clearable
                         @change="handleChangmater"
                         :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                         display-member="message"
                         value-member="code"
                         value-key="code">
          </custom-select>
        </iFormItem>
        <iFormItem label="科室"
                   class="searchFormItem">
          <custom-select v-model="searchForm.buyerDeptId"
                         :user-options="deptList"
                         style="width:100%"
                         multiple
                         clearable
                         @change="handleChangmater"
                         :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                         display-member="departNameEn"
                         value-member="departId"
                         value-key="departId">
          </custom-select>
        </iFormItem>
        <iFormItem label="采购员"
                   class="searchFormItem">
          <custom-select v-model="searchForm.buyerNameList"
                         :user-options="mtzUserList"
                         style="width:100%"
                         multiple
                         clearable
                         @change="handleChangmater"
                         :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                         display-member="message"
                         value-member="code"
                         value-key="code" />
        </iFormItem>
        <iFormItem label="市场价来源"
                   class="searchFormItem">
          <custom-select v-model="searchForm.marketSource"
                         :user-options="mtzSourceList"
                         style="width:100%"
                         multiple
                         clearable
                         @change="handleChangmater"
                         :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                         display-member="message"
                         value-member="code"
                         value-key="code" />
        </iFormItem>
        <iFormItem label="有效期起"
                   class="searchFormItem">
          <iDatePicker v-model="searchForm.startDate"
                       :disabled="editDisabled"
                       @change="handleChangeDate"
                       :placeholder="language('QINGXUANZE', '请选择')"
                       type="date"
                       style="width:100%"
                       format="yyyy-MM-dd"
                       value-format="yyyy-MM-dd" />
        </iFormItem>
        <iFormItem label="有效期止"
                   class="searchFormItem">
          <iDatePicker v-model="searchForm.endDate"
                       :disabled="editDisabled"
                       @change="handleChangeDate"
                       :picker-options="pickerOptions"
                       :placeholder="language('QINGXUANZE', '请选择')"
                       type="date"
                       style="width:100%"
                       format="yyyy-MM-dd"
                       value-format="yyyy-MM-dd" />
        </iFormItem>
        <iFormItem label="补差周期"
                   class="searchFormItem">
          <custom-select v-model="searchForm.compensationPeriod"
                         :user-options="mtzPeriodList"
                         style="width:100%"
                         multiple
                         clearable
                         @change="handleChangmater"
                         :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                         display-member="message"
                         value-member="code"
                         value-key="code" />
        </iFormItem>
        <iFormItem label="是否有效"
                   class="searchFormItem">
          <custom-select v-model="searchForm.effectFlag"
                         :user-options="effectFlagList"
                         style="width:100%"
                         clearable
                         :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                         display-member="message"
                         value-member="code"
                         value-key="code" />
        </iFormItem>
      </iFormGroup>
    </iSearch>
  </div>
</template>

<script>
import { iCard, iButton, iMessage, iSearch, iDatePicker, iInput, iFormGroup, iFormItem } from 'rise'
import inputCustom from '@/components/inputCustom'
import { fetchRemoteDept } from '@/api/mtz/annualGeneralBudget/annualBudgetEdit'
import { mtzBasePricePageFilterPartName, mtzBasePricePageFilterPeriod, mtzBasePricePageFilterRule, mtzBasePricePageFilterSource, mtzBasePricePageFilterSupplierName, mtzBasePricePageFilterSupplierSap, mtzBasePricePageFilterUser } from '@/api/mtz/annualGeneralBudget/mtzChange'
import { getRawMaterialNos } from '@/api/mtz/annualGeneralBudget/mtzReplenishmentOverview'
export default {
  name: "Search",
  componentName: "searchBox",
  components: {
    iCard,
    iButton,
    iSearch,
    iDatePicker,
    iInput,
    inputCustom,
    iFormGroup,
    iFormItem
  },
  data () {
    return {
      searchForm: {},
      deptList: [],
      rawMaterialNos: [],
      mtzPartNameList: [],
      mtzSupplierSapList: [],
      mtzSupplierNameList: [],
      mtzRuleList: [],
      mtzUserList: [],
      mtzPeriodList: [],
      mtzSourceList: [],
      effectFlagList: [
        {
          message: "全部",
          code: ""
        },
        {
          message: "有效",
          code: 1
        },
        {
          message: "无效",
          code: 0
        }
      ]
      // pickerOptions: {}
    }
  },
  created () {
    this.init()
  },
  computed: {
    pickerOptions () {
      let that = this
      return {
        disabledDate: time => {
          if (that.searchForm.startDate) {
            let startTime = that.searchForm.startDate.replace(/-/g, '/');
            return time.getTime() < new Date(startTime)
          }
        }
      }
    }
  },
  methods: {
    init () {
      this.getDeptData()
      this.getRawMaterialNos()
      this.mtzBasePricePageFilterPartName()
      this.mtzBasePricePageFilterSupplierSap()
      this.mtzBasePricePageFilterSupplierName()
      this.mtzBasePricePageFilterRule()
      this.mtzBasePricePageFilterUser()
      this.mtzBasePricePageFilterPeriod()
      this.mtzBasePricePageFilterSource()
    },
    // 获取部门数据
    getDeptData () {
      fetchRemoteDept({}).then(res => {
        if (res && res.code == 200) {
          this.deptList = res.data
        } else iMessage.error(res.desZh)
      })
    },
    //原材料编号
    getRawMaterialNos (key) {
      getRawMaterialNos({
        keyWords: key || ""
      }).then(res => {
        if (res.code === '200') {
          this.rawMaterialNos = res.data
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    //零件名
    mtzBasePricePageFilterPartName () {
      mtzBasePricePageFilterPartName().then(res => {
        if (res.code === '200') {
          this.mtzPartNameList = res.data
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    //供应商SAP号
    mtzBasePricePageFilterSupplierSap () {
      mtzBasePricePageFilterSupplierSap().then(res => {
        if (res.code === '200') {
          this.mtzSupplierSapList = res.data
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    //供应商名称
    mtzBasePricePageFilterSupplierName () {
      mtzBasePricePageFilterSupplierName().then(res => {
        if (res.code === '200') {
          this.mtzSupplierNameList = res.data
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    //规则编号
    mtzBasePricePageFilterRule () {
      mtzBasePricePageFilterRule().then(res => {
        if (res.code === '200') {
          this.mtzRuleList = res.data
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    //采购员
    mtzBasePricePageFilterUser () {
      mtzBasePricePageFilterUser().then(res => {
        if (res.code === '200') {
          this.mtzUserList = res.data
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    //补差周期
    mtzBasePricePageFilterPeriod () {
      mtzBasePricePageFilterPeriod().then(res => {
        if (res.code === '200') {
          this.mtzPeriodList = res.data
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    //市场价来源
    mtzBasePricePageFilterSource () {
      mtzBasePricePageFilterSource().then(res => {
        if (res.code === '200') {
          this.mtzSourceList = res.data
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    handleSearchReset () {
      this.searchForm.partNameList = []
      this.searchForm.partnumList = []
      this.searchForm.supplierSapList = []
      this.searchForm.supplierNameList = []
      this.searchForm.materialCodeList = []
      this.searchForm.ruleNoList = []
      this.searchForm.buyerDeptId = []
      this.searchForm.marketSource = []
      this.searchForm.buyerNameList = []
      this.searchForm.compensationPeriod = []
      this.searchForm.endDate = ""
      this.searchForm.startDate = ""
      this.$parent.$refs.theTable.getTableList()
    },
    handleSubmitSearch () {
      console.log(this.$parent)
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
