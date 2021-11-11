<!--
 * @Author: your name
 * @Date: 2021-10-08 14:25:34
 * @LastEditTime: 2021-11-11 11:37:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\replenishmentManagement\components\mtzReplenishmentOverview\components\search.vue
-->
<template>
  <div>
    <iSearch @reset="handleSearchReset"
             @sure="handleSubmitSearch">
      <el-form :model="searchForm">
        <el-form-item label="申请单号"
                      class="searchFormItem">
          <input-custom v-model="searchForm.mtzAppId"
                        style="width:100%"
                        :editPlaceholder="language('QINGSHURU','请输入')"
                        :placeholder="language('QINGSHURU','请输入')"> </input-custom>
        </el-form-item>
        <el-form-item label="申请状态"
                      class="searchFormItem">
          <custom-select v-model="searchForm.appStatus"
                         :user-options="statusList"
                         style="width:100%"
                         multiple
                         clearable
                         :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                         display-member="message"
                         value-member="code"
                         value-key="code">
          </custom-select>
        </el-form-item>
        <el-form-item label="采购员"
                      class="searchFormItem">
          <input-custom v-model="searchForm.buyerId"
                        style="width:100%"
                        :editPlaceholder="language('QINGSHURU','请输入')"
                        :placeholder="language('QINGSHURU','请输入')"> </input-custom>
        </el-form-item>
        <el-form-item label="科室"
                      class="searchFormItem">
          <custom-select v-model="searchForm.buyerDeptId"
                         style="width:100%"
                         :user-options="deptList"
                         multiple
                         clearable
                         :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                         display-member="existShareName"
                         value-member="existShareId"
                         value-key="existShareId">
          </custom-select>
        </el-form-item>
        <el-form-item label="审批完成时间"
                      class="searchFormItem">
          <iDatePicker v-model="searchForm.resolutionPassTime"
                       @change="handleChangeDate"
                       :placeholder="language('QINGXUANZESHIJIAN', '请选择时间')"
                       type="date"
                       style="width:100%"
                       format="yyyy-MM"
                       value-format="yyyy-MM-dd">
          </iDatePicker>
        </el-form-item>
        <el-form-item label="原材料牌号"
                      class="searchFormItem">
          <custom-select v-model="searchForm.materialCode"
                         style="width:100%"
                         :user-options="RawMaterialNos"
                         multiple
                         clearable
                         :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                         display-member="message"
                         value-member="code"
                         value-key="code">
          </custom-select>
        </el-form-item>
        <el-form-item label="零件号"
                      class="searchFormItem">
          <input-custom v-model="searchForm.assemblyPartnum"
                        style="width:100%"
                        :editPlaceholder="language('QINGSHURU','请输入')"
                        :placeholder="language('QINGSHURU','请输入')"> </input-custom>
        </el-form-item>
      </el-form>
    </iSearch>
  </div>
</template>

<script>
import { iCard, iButton, iMessage, iSearch, iDatePicker, iInput } from 'rise'
import { getDeptData } from '@/api/kpiChart/index'
import { getLocationApplyStatus } from '@/api/mtz/annualGeneralBudget/mtzChange'
import { getRawMaterialNos } from '@/api/mtz/annualGeneralBudget/mtzReplenishmentOverview'
import inputCustom from '@/components/inputCustom'
export default {
  name: "Search",
  componentName: "searchBox",
  components: {
    iCard,
    iButton,
    iSearch,
    iDatePicker,
    iInput,
    inputCustom
  },
  data () {
    return {
      searchForm: {},
      deptList: [],
      statusList: [],
      RawMaterialNos: [],
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.getRawMaterialNos()
      this.getDeptData()
      this.getLocationApplyStatus()
    },
    //申请状态下拉
    getLocationApplyStatus () {
      getLocationApplyStatus({ keyWords: "" }).then(res => {
        if (res && res.code === '200') {
          this.statusList = res.data
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    // 获取部门数据
    getDeptData () {
      getDeptData({}).then(res => {
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
          this.RawMaterialNos = res.data
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    handleSearchReset () {

    },
    handleSubmitSearch () {
      this.$parent.$refs.theTable.getTableList()
    }
  }

}
</script>

<style lang="scss" scoped>
// ::v-deep .el-form-item__content {
//   width: 100%;
// }
::v-deep .el-form-item__content {
  line-height: 2.5rem !important;
}
</style>
