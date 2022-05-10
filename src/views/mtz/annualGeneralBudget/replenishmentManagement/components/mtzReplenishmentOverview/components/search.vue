<!--
 * @Author: your name
 * @Date: 2021-10-08 14:25:34
 * @LastEditTime: 2022-05-10 14:58:56
 * @LastEditors: zhaohuaxing 5359314+zhaohuaxing@user.noreply.gitee.com
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\replenishmentManagement\components\mtzReplenishmentOverview\components\search.vue
-->
<template>
  <div>
    <iSearch @reset="handleSearchReset"
             @sure="handleSubmitSearch">
      <iFormGroup :inline="true"
                  :row="5"
                  :model="searchForm">
        <iFormItem style="marginRight:68px"
                   :label="language('YICIJIANGONGYINGSHANG', '一次件供应商')">
          <custom-select v-model="searchForm.firstSuppliers"
                         :user-options="fsupplierList"
                         multiple
                         clearable
                         :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                         display-member="codeMessage"
                         value-member="code"
                         value-key="code">
          </custom-select>
          <!-- <el-select v-model="searchForm.firstSupplier"
                     @change="handleChangeFsupplier"
                     :placeholder="language('QINGXUANZE', '请选择')">
            <el-option v-for="item in fsupplierList"
                       :key="item.code"
                       :label="item.message"
                       :value="item.code">
            </el-option>
          </el-select> -->
        </iFormItem>
        <iFormItem style="marginRight:68px"
                   :label="language('ERCIJIANGONGYINGSHANG', '二次件供应商')">
          <custom-select v-model="searchForm.secondSuppliers"
                         :user-options="ssupplierList"
                         multiple
                         clearable
                         @change="handleMaterialCode"
                         :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                         display-member="codeMessage"
                         value-member="code"
                         value-key="code">
          </custom-select>
          <!-- <el-select v-model="searchForm.secondSupplier"
                     :placeholder="language('QINGXUANZE', '请选择')">
            <el-option v-for="item in ssupplierList"
                       :key="item.code"
                       :label="item.message"
                       :value="item.code">
            </el-option>
          </el-select> -->
        </iFormItem>
        <iFormItem style="marginRight:68px"
                   :label="language('BUCHASHIJIANDUAN', '补差时间段')">
          <iDatePicker v-model="value1"
                       type="daterange"
                       format="yyyy-MM-dd"
                       value-format="yyyy-MM-dd"
                       @change="handleChange"
                       range-separator="至"
                       start-placeholder="开始日期"
                       end-placeholder="结束日期">
          </iDatePicker>
        </iFormItem>
        <!-- <iFormItem class="searchButton">
          <iButton @click="handleSubmitSearch">{{language('CX', '查询')}}</iButton>
          <iButton @click="handleSearchReset">{{language('CZ', '重置')}}</iButton>
        </iFormItem> -->
      </iFormGroup>
    </iSearch>
  </div>
</template>

<script>
import { iCard, iButton, iMessage, iSearch, iDatePicker, iFormGroup, iFormItem } from 'rise'
import { getMtzSupplierList } from '@/api/mtz/annualGeneralBudget/mtzReplenishmentOverview'
import { getNowFormatDate } from "./util";

export default {
  name: "Search",
  componentName: "searchBox",
  components: {
    iCard,
    iButton,
    iSearch,
    iDatePicker,
    iFormGroup,
    iFormItem
  },
  data () {
    return {
      searchForm: {
        secondSuppliers: [],
        firstSuppliers: [],
        compStartDate: "",
        compEndDate: ""
      },
      value1: [],
      fsupplierList: [],
      ssupplierList: []
    }
  },
  created () {
    this.init()
    this.value1 = this.getTime();

    this.searchForm.compStartDate = window.moment(this.value1[0]).format('yyyy-MM-DD')
    this.searchForm.compEndDate = window.moment(this.value1[1]).format('yyyy-MM-DD')
  },
  mounted () {
  },
  methods: {
    getTime () {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
      var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      console.log(month)
      return [year + "-01-01 00:00:00", year + "-" + month + "-" + day + " 00:00:00"];
      // return window.moment(new Date()).format('yyyy-MM-DD')
    },
    init () {
      getMtzSupplierList({}).then(res => {
        if (res.code === '200') {
          this.fsupplierList = res.data
          this.ssupplierList = res.data
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    handleMaterialCode (codes) {
      this.$emit('materialCodes', codes)
    },
    handleChange (val) {
      this.searchForm.compStartDate = window.moment(val[0]).format('yyyy-MM-DD')
      this.searchForm.compEndDate = window.moment(val[1]).format('yyyy-MM-DD')
    },
    handleChangeFsupplier () {

    },
    handleSubmitSearch () {
      console.log(this.$parent)
      this.$parent.$refs.theTable.getTableList()
    },
    handleSearchReset () {
      this.searchForm = {
        secondSuppliers: [],
        firstSuppliers: [],
        compStartDate: "",
        compEndDate: "",
      }
      this.value1 = ""
      this.$parent.$refs.theTable.getTableList()
    }
  }

}
</script>

<style lang="scss" scoped>
.searchButton {
  margin-top: 50px;
  float: right;
  z-index: 100;
}
// ::v-deep .el-date-editor .el-range-separator {
//   width: 6%;
//   line-height: 32px;
// }
// ::v-deep .el-date-editor .el-range__icon {
//   line-height: 32px;
// }
// ::v-deep .el-range-editor.el-input__inner {
//   padding: 0 10px;
//   align-items: center;
// }
</style>
