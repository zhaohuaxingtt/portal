<!--
 * @Author: your name
 * @Date: 2021-10-08 14:25:34
 * @LastEditTime: 2023-03-29 18:03:35
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\overview\index.vue
-->
<template>
  <div v-if="false">
    <search
      @sure="handleSubmitSearch"
      @reset="handleSearchReset"
      :searchFormData="searchFormData"
      :searchForm="searchForm"
      :options="options"
    />
    <el-row :gutter="10" class="margin-top20">
        <el-col span="6" v-for="i in 4" :key="i">
            <iCard>
                {{i}}
            </iCard>
        </el-col>
    </el-row>
    <el-row :gutter="10" class="margin-top20">
        <el-col span="12">
            <iCard><barCharts/></iCard>
        </el-col>
        <el-col span="12">
            <iCard><barCharts/></iCard>
        </el-col>
    </el-row>
  </div>
  <div v-else>
    overview page
  </div>
</template>

<script>
import { iCard } from "rise";
import { searchFormData } from './data.js'
import search from '../locationChange/components/components/search.vue'
import barCharts from "./components/barCharts";
import { getDeptAndBuyerByChipNom } from '@/api/mtz/annualGeneralBudget/replenishmentManagement/chipLocation/details'
export default {
  name: 'Search',
  componentName: 'searchBox',
  components: {
    iCard,
    barCharts,
    search
  },
  props: {
    statusList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      searchForm: {
        changeNos: [],
        statusList: [],
        linieIds: [],
        deptCodes: [],
        partNum: [],
        makeType: '',
        approvalDateStart: '',
        approvalDateEnd: '',
        resolutionPassTime: []
      },
      searchFormData,
      options: {
        statusList: [],
        makeTypeList: [
          {
            value: '',
            label: '全部',
            labelEn: 'All'
          },
          {
            value: '1',
            label: '芯片补差',
            labelEn: 'Chip'
          },
          {
            value: '2',
            label: 'MTZ'
          }
        ],
        deptList: [],
        linieList: []
      }
    }
  },
  watch: {
    statusList: {
      handler(val) {
        this.options.statusList = val
      },
      immediate: true,
      deep: true
    },
    'searchForm.resolutionPassTime'(val) {
      if (Array.isArray(val) && val.length) {
        this.searchForm.approvalDateStart = val[0]
        this.searchForm.approvalDateEnd = window
          .moment(val[1])
          .format('YYYY-MM-DD 23:59:59')
      } else {
        this.searchForm.approvalDateStart = ''
        this.searchForm.approvalDateEnd = ''
      }
    }
  },
  created() {
    this.getDeptData()
  },
  methods: {
    // 获取部门数据
    getDeptData() {
      getDeptAndBuyerByChipNom({ appType: '2' }).then((res) => {
        this.depBuyerAll = res.data
        let deptObj = {}
        let linieObj = {}
        res.data.forEach((e) => {
          if (e.deptCode) {
            deptObj[e.deptCode] = { value: e.deptCode, label: e.deptCode }
          }
          if (e.buyerId) {
            linieObj[e.buyerId] = { value: e.buyerId, label: e.buyerName }
          }
        })
        this.options.deptList = Object.values(deptObj)
        this.options.linieList = Object.values(linieObj)
      })
    },

    handleSearchReset() {
      this.searchForm = {
        changeNos: [],
        statusList: [],
        linieIds: [],
        deptCodes: [],
        partNum: [],
        makeType: '',
        approvalDateStart: '',
        approvalDateEnd: '',
        resolutionPassTime: []
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
::v-deep .el-form-item {
  flex-direction: column;
}
</style>
