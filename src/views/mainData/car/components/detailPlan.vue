<template>
  <iCard :title="$t('车型产量计划')" header-control collapse>
    <detailPlanList
      class="margin-bottom20"
      :data="detailPlanData"
      :loading="detailPlanLoading"
      :all-product-factory-ids="allProductFactoryIds"
      v-bind="$attrs"
      @add-version="addVersion"
      @save-success="savePlanDataSuccess"
      @reset="resetDetailPlanData"
    />
    <el-divider v-show="detailPlanItems.length > 0" />

    <!-- 详细产量计划 -->

    <div
      v-for="(item, index) in detailPlanItems"
      :key="index"
      class="detail-plan-item"
    >
      <detailPlanModify
        :key="index"
        :data="item.data"
        :mode="item.mode"
        :default-product-factory="item.productFactory"
        :rise-version-code="item.riseVersionCode"
        :all-product-factory-ids="allProductFactoryIds"
        v-bind="$attrs"
        @save-success="savePlanModifySuccess"
        @product-factory-change="val => (item.productFactory = val)"
        @version-change="val => (item.data = val)"
        @version-remove="removeVersion(index)"
        @reset="val => (item.data = val)"
      />
    </div>
  </iCard>
</template>

<script>
import { iCard } from 'rise'
import detailPlanList from './detailPlanList'
import detailPlanModify from './detailPlanModify'
import {
  fetchCartypeOutputPlanVersion,
  fetchCartypeOutPutPlan
} from '@/api/mainData/car'
export default {
  name: 'detailPlan',
  inheritAttrs: true,
  components: { iCard, detailPlanList, detailPlanModify },
  computed: {
    allProductFactoryIds() {
      const allProductFactory = this.detailPlanItems.map(e => e.productFactory)
      return [...new Set(allProductFactory)]
    },
    triggerQueryPlan() {
      return this.$store.state.mainData.mainDataQueryPlan
    }
  },
  watch: {
    triggerQueryPlan() {
      this.queryCartypeOutputPlanVersion()
    }
  },
  data() {
    return {
      detailPlanItems: [],
      detailPlanData: [],
      detailPlanItemsVersions: {}
    }
  },
  created() {
    this.queryCartypeOutputPlanVersion()
  },
  methods: {
    resetDetailPlanData(val) {
      this.detailPlanData = val
    },
    // 查询列表
    async queryCartypeOutputPlanVersion() {
      this.detailPlanLoading = true
      const { data } = await fetchCartypeOutputPlanVersion({
        cartypeId: this.$route.query.id
      }).finally(() => (this.detailPlanLoading = false))
      this.detailPlanData = data || []
      this.detailPlanItems = []
      this.detailPlanItemsVersions = {}
      this.queryCartypeOutPutPlanDetails(this.detailPlanData)
    },
    // 查询详情
    async queryCartypeOutPutPlanDetails(detailPlanData) {
      const len = detailPlanData.length
      for (let i = 0; i < len; i++) {
        const item = detailPlanData[i]
        if (item.isValid) {
          const reqData = {
            cartypeId: this.$route.query.id,
            riseVersionCode: item.riseVersionCode,
            productFactory: item.productFactory
          }
          this.queryCartypeOutPutPlanDetailItem(
            reqData,
            item.productFactory,
            item.riseVersionCode
          )
        }
      }
    },
    async queryCartypeOutPutPlanDetailItem(
      reqData,
      productFactory,
      riseVersionCode
    ) {
      this.detailPlanLoading = true
      const itemData = {
        data: [],
        mode: 'EDIT',
        productFactory,
        riseVersionCode
      }
      const { data } = await fetchCartypeOutPutPlan(reqData).finally(
        () => (this.detailPlanLoading = false)
      )

      if (data) {
        const sortData = data.sort((a, b) => (a.years > b.years ? 1 : -1))
        itemData.data = sortData
        this.detailPlanItems.push(itemData)
      }
      return data
    },
    addVersion() {
      const nowYear = new Date().getFullYear()
      const newItems = [
        {
          years: nowYear,
          output: 0,
          createBy: this.$store.state.permission.userInfo.id
        }
      ]
      for (let i = 1; i < 10; i++) {
        newItems.push({
          years: nowYear + i,
          output: 0,
          createBy: this.$store.state.permission.userInfo.id
        })
      }
      this.detailPlanItems.push({
        data: newItems,
        mode: 'ADD',
        productFactory: ''
      })
    },
    removeVersion(index) {
      this.detailPlanItems.splice(index, 1)
    },
    savePlanModifySuccess() {
      this.queryCartypeOutputPlanVersion()
    },
    savePlanDataSuccess() {
      this.queryCartypeOutputPlanVersion()
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-plan-item {
  margin-bottom: 30px;
}
</style>
