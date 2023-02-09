<!--
 * @Author: your name
 * @Date: 2021-10-08 14:25:34
 * @LastEditTime: 2023-02-09 13:36:43
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\replenishmentManagement\components\chipReplenishmentOverview\components\search.vue
-->
<template>
  <search
    @reset="handleSearchReset"
    @sure="handleSubmitSearch"
    :searchFormData="searchFormData"
    :searchForm="searchForm"
    :options="options"
  >
  </search>
</template>

<script>
import {
  iCard,
  iButton,
  iMessage,
  iSearch,
  iDatePicker,
  iFormGroup,
  iFormItem
} from 'rise'
import {
  getTaskPrimarySupplierList,
  getTaskSecondSupplierList
} from '@/api/mtz/annualGeneralBudget/chipReplenishment'
import search from '../../components/search'
import { searchFormData } from './data'

export default {
  componentName: 'searchBox',
  components: {
    iCard,
    iButton,
    iSearch,
    iDatePicker,
    iFormGroup,
    iFormItem,
    search
  },
  data() {
    return {
      searchForm: {},
      searchFormData,
      options: {
        fsupplierList: [], //一次件供应商编号
        ssupplierList: [] //二次件供应商编号
      },
    }
  },
  created() {
    this.init()
    this.searchForm.compDate = this.getTime()
    this.searchForm.makeStartDate = window
      .moment(this.searchForm.compDate[0])
      .format('yyyy-MM-DD 00:00:00')
    this.searchForm.makeEndDate = window
      .moment(this.searchForm.compDate[1])
      .format('yyyy-MM-DD 23:59:59')
  },
  mounted() {},
  methods: {
    getTime() {
      var date = new Date()
      var year = date.getFullYear()
      var month =
        date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1
      var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      return [
        year - 2 + '-01-01 00:00:00',
        year + '-' + month + '-' + day + ' 00:00:00'
      ]
    },
    init() {
      this.getTaskPrimarySupplierList()
      this.getTaskSecondSupplierList()
    },
    
    // 获取芯片一次件供应商
    getTaskPrimarySupplierList() {
      getTaskPrimarySupplierList().then((res) => {
        if (res?.code == 200) {
          this.options.fsupplierList = JSON.parse(JSON.stringify(res.data))
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    // 获取芯片二次件供应商
    getTaskSecondSupplierList() {
      getTaskSecondSupplierList().then((res) => {
        if (res?.code == 200) {
          this.options.ssupplierList = JSON.parse(JSON.stringify(res.data))
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    // handleMaterialCode(codes) {
    //   this.$emit('materialCodes', codes)
    // },
    handleChange(val) {
      this.searchForm.compStartDate = window.moment(val[0]).format('yyyy-MM-DD')
      this.searchForm.compEndDate = window.moment(val[1]).format('yyyy-MM-DD')
    },
    handleChangeFsupplier() {},
    handleSubmitSearch() {
      console.log(this.$parent)
      this.$parent.$refs.theTable.getTableList()
    },
    handleSearchReset() {
      this.searchForm = {}
      this.searchFormData.forEach(item=>{
        if(item.showAll) this.searchForm[item.props] = ''
      })
      this.compDate = []
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
</style>
