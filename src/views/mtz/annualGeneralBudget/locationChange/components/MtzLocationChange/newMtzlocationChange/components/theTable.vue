
<!--
 * @Author: your name
 * @Date: 2021-10-08 14:25:34
 * @LastEditTime: 2021-11-18 14:49:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\replenishmentManagement\components\mtzReplenishmentOverview\components\search.vue
-->
<template>
  <iCard>
    <template v-slot:header>
      <div class="tableTitle">
        <span class="margin-right10">只看自己</span>
        <el-switch v-model="onlySeeMySelf"
                   :active-value="true"
                   :inactive-value="false" />
      </div>
      <div class="opration">
        <iButton @click="handleSure">{{language('QUEREN', '确认')}}</iButton>
        <!-- <iButton @click="handleRedeploy"
                   v-show="!addFlag">{{language('DAOCHU', '导出')}}</iButton> -->
      </div>
    </template>
    <iTableCustom :data="tableList"
                  :columns="TABLE_COLUMNS"
                  :loading="tableLoading"
                  index
                  @go-detail="goDetail"
                  @handle-selection-change="handleSelectionChange">
    </iTableCustom>
    <iPagination @size-change="handleSizeChange($event, getTableList)"
                 @current-change="handleCurrentChange($event, getTableList)"
                 :page-sizes="page.pageSizes"
                 :page-size="page.pageSize"
                 :current-page="page.currPage"
                 :total="page.totalCount"
                 :layout="page.layout">
    </iPagination>
  </iCard>
</template>

<script>
import { iCard, iButton, iPagination, icon, iMessage } from 'rise'

import { mtzBasePricePageList, addGenericAppChange, saveGenericAppChange } from '@/api/mtz/annualGeneralBudget/mtzChange.js'
import { pageMixins } from "@/utils/pageMixins"
import { TABLE_COLUMNS } from "./data"
import iTableCustom from '@/components/iTableCustom'
export default {
  name: "Search",
  componentName: "theTable",
  components: {
    iCard,
    iButton,
    iPagination,
    iTableCustom,

  },
  props: {
    addFlag: {
      type: Boolean,
      default: false
    },
    mtzAppId: {
      type: String,
      default: ""
    }
  },
  watch: {
    addFlag (val) {
      console.log(val, 222)
    }
  },
  mixins: [pageMixins],
  data () {
    return {
      tableList: [],
      TABLE_COLUMNS,
      onlySeeMySelf: true,
      muilteList: [],
      // addFlag: false,
      // mtzAppId: "",
      tableLoading: false
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      // this.addFlag = this.addFlag || false
      // this.mtzAppId = this.mtzAppId || ""
      this.getTableList()
    },
    getTableList () {
      this.tableLoading = true
      let params = {
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
        onlySeeMySelf: this.onlySeeMySelf,
        ...this.$parent.$refs.theSearch.searchForm
      }
      mtzBasePricePageList(params).then(res => {
        if (res && res.code === '200') {
          this.tableList = res.data
          this.page.currPage = res.pageNum
          this.page.pageSize = res.pageSize
          this.page.totalCount = res.total
          this.tableLoading = false
        }
      })
    },
    handleSelectionChange (val) {
      this.muilteList = val
    },
    handleSure () {
      if (this.muilteList.length === 0) {
        iMessage.error(this.language('QINGXUANZESHUJU', '请选择数据！'))
        return
      }
      let params = {
        isDeptLead: true,
        mtzBasePriceList: []
      }
      let selectList = this.muilteList.map(item => {
        return {
          dosage: item.dosage || "",
          endDate: item.endDate || "",
          mtzBasePriceId: item.id || "",
          startDate: item.startDate || ""
        }
      })
      params.mtzBasePriceList = selectList
      if (this.addFlag) {
        params.mtzAppId = this.mtzAppId
        saveGenericAppChange(params).then(res => {
          if (res && res.code === '200') {
            // let data = res.data
            // let routerPath = this.$router.resolve({
            //   path: '/mtz/annualGeneralBudget/MTZapplicationForm',
            //   query: {
            //     mtzAppId: this.mtzAppId || '',
            //     isView: false
            //   }
            // })
            this.$emit('close', false);
            this.$store.dispatch('setMtzChangeBtn', false);
            // window.open(routerPath.href, '_blank')
          } else {
            iMessage.error(res.desZh)
          }
        })
      } else {
        addGenericAppChange(params).then(res => {
          if (res && res.code === '200') {
            let data = res.data
            let routerPath = this.$router.resolve({
              path: '/mtz/annualGeneralBudget/MTZapplicationForm',
              query: {
                mtzAppId: data.mtzAppId || '',
                isView: false
              }
            })
            this.$store.dispatch('setMtzChangeBtn', false);
            window.open(routerPath.href, '_blank')
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
