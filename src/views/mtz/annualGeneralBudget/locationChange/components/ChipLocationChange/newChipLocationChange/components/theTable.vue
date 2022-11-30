
<!--
 * @Author: your name
 * @Date: 2021-10-08 14:25:34
 * @LastEditTime: 2022-11-30 10:02:37
 * @LastEditors: 余继鹏 917955345@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\replenishmentManagement\components\mtzReplenishmentOverview\components\search.vue
-->
<template>
  <iCard>
    <template v-slot:header>
      <div class="tableTitle">
        <span class="margin-right10">{{ $t('ZHIKANZIJI') }}</span>
        <el-switch
          v-model="onlySeeMySelf"
          :active-value="true"
          :inactive-value="false"
        />
      </div>
      <div class="opration">
        <iButton @click="handleSure">{{ language('QUEREN', '确认') }}</iButton>
      </div>
    </template>

    <tableList
      :tableData="tableList"
      :tableTitle="tableTitle"
      :tableLoading="tableLoading"
      @handleSelectionChange="handleSelectionChange"
      index
    >
      <template slot="method" slot-scope="scope">
        <span>{{ scope.row.method == '1' ? '一次性补差' : '变价单补差' }}</span>
      </template>
      <template slot="effectFlag" slot-scope="scope">
        <span>{{ scope.row.effectFlag ? '生效' : '未生效' }}</span>
      </template>
      <template slot="startDate" slot-scope="scope">
        <span>{{ getDay(scope.row.startDate) }}</span>
      </template>
      <template slot="endDate" slot-scope="scope">
        <span>{{ getDay(scope.row.endDate) }}</span>
      </template>
      <template slot="updateDate" slot-scope="scope">
        <span>{{ getDay(scope.row.updateDate) }}</span>
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
  </iCard>
</template>

<script>
import { iCard, iButton, iPagination, iMessage } from 'rise'
import tableList from '@/components/commonTable/index.vue'
import { initData, addRule } from '@/api/mtz/annualGeneralBudget/chipChange.js'
import { getAppRecordByCondition } from '@/api/mtz/annualGeneralBudget/replenishmentManagement/chipLocation/details'
import { pageMixins } from '@/utils/pageMixins'
import { tableTitle } from './data'
export default {
  name: 'Search',
  componentName: 'theTable',
  components: {
    iCard,
    iButton,
    iPagination,
    tableList
  },
  props: {
    addFlag: {
      type: Boolean,
      default: false
    },
    dateList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  watch: {},
  mixins: [pageMixins],
  data() {
    return {
      tableList: [],
      tableTitle,
      onlySeeMySelf: true,
      muilteList: [],
      tableLoading: false
    }
  },
  created() {
    this.init()
  },
  methods: {
    getDay(date) {
      return date ? date.split(' ')[0] : date
    },
    init() {
      this.page.currPage = 1
      this.getTableList()
    },
    getTableList() {
      this.tableLoading = true
      let searchForm = {}
      let searchForm_ = JSON.parse(
        JSON.stringify(this.$parent.$refs.theSearch.searchForm)
      )
      // 所有list都改为逗号分隔的字符串
      Object.keys(searchForm_).forEach((key) => {
        if (Array.isArray(searchForm_[key])) {
          searchForm[key] = searchForm_[key].join(',')
        } else {
          searchForm[key] = searchForm_[key]
        }
      })
      if (searchForm.startDate)
        searchForm.startDate = window
          .moment(searchForm.startDate)
          .format('YYYY-MM-DD 00:00:00')
      if (searchForm.endDate)
        searchForm.endDate = window
          .moment(searchForm.endDate)
          .format('YYYY-MM-DD 23:59:59')
      let params = {
        currentPage: this.page.currPage,
        pageSize: this.page.pageSize,
        onlySeeMySelf: this.onlySeeMySelf,
        ...searchForm
      }
      getAppRecordByCondition(params).then((res) => {
        if (res && res.code === '200') {
          this.tableList = res.data.records
          this.page.totalCount = res.data.total
          this.tableLoading = false
        }
      })
    },
    handleSelectionChange(val) {
      this.muilteList = val
    },
    handleSure() {
      if(!this.muilteList.length) return iMessage.warn(
            this.language(
              'LK_QINGXUANZEZHISHAOYITIAOSHUJU',
              '请选择至少一条数据'
            )
          )
      // 新增
      if(this.addFlag){
        // 不能直接添加，需调用新增接口
        console.log('====此处需调用新增接口====')
        let params = this.muilteList.map(item=>{
          console.log(item);
          return {
            chipId: this.$route.query.changeId,
            partName:item.oncePartName,
            partNum:item.oncePartNum,
            sapCode:item.onceSapCode,
            supplierId:item.supplierId,
            supplierName:item.onceSupplierName,
            ...item
          }
      })
        addRule(params).then(res=>{
          if (res.code == 200 && res.result) {
              iMessage.success(this.language(res.desEn, res.desZh))
              this.$emit('close')
              this.$emit('addItem',this.muilteList)
            } else {
              iMessage.error(this.language(res.desEn, res.desZh))
            }
        })
      // 新建
      }else{
        initData(this.muilteList.map((item) => item.id)).then((res) => {
          if (res && res.code === '200') {
            let data = res.data
            let routerPath = this.$router.resolve({
              path: '/mtz/annualGeneralBudget/ChipApplicationForm',
              query: {
                changeId: data
              }
            })
            this.$store.dispatch('setMtzChangeBtn', false)
            window.open(routerPath.href, '_blank')
            this.$emit('close')
          } else {
            iMessage.error(res.desZh)
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
