<template>
  <div>
    <search
      @sure="handleSubmitSearch"
      @reset="handleSearchReset"
      :searchFormData="QueryFormData"
      :searchForm="searchForm"
      :options="options"
    />
  </div>
</template>

<script>
import search from '../../../components/search.vue'
import { getDeptLimitLevel } from '@/api/mtz/annualGeneralBudget/replenishmentManagement/chipLocation/details'
import { QueryFormData } from './data.js'
export default {
  name: 'Search',
  componentName: 'searchBox',
  components: {
    search
  },
  data() {
    return {
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
        effectFlag: true, // 只查询生效
        startDate: '',
        endDate: ''
      },
      options: {
        effectFlagList: [
          {
            value: '',
            label: '全部',
            labelEn: 'All'
          },
          {
            value: false,
            label: '未生效',
            labelEn: 'Not Effect'
          },
          {
            value: true,
            label: '生效',
            labelEn: 'Effect'
          }
        ],
        methodList: [
          {
            value: '',
            label: '全部',
            labelEn: 'All'
          },
          {
            value: 1,
            label: '一次性补差',
            labelEn: 'One time difference',
            disabled: true
          },
          {
            value: 2,
            label: '变价单补差',
            labelEn: 'Intending to single senders'
          }
        ],
        deptList: []
      }
    }
  },
  created() {
    this.init()
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
        effectFlag: true, // 只查询生效
        startDate: '',
        endDate: ''
      }
      this.$parent.$refs.theTable.init()
    },
    handleSubmitSearch() {
      this.$parent.$refs.theTable.init()
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
