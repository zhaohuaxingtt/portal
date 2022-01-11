<template>
  <iPage>
    <pageHeader class="margin-bottom20">
      {{language( $route.query.id ? '编辑' : '新增' )}}{{ language('车型主数据') }}
    </pageHeader>

    <detailBase
      class="margin-bottom20"
      :base-form="baseForm"
      :product-factory-options="productFactoryOptions"
      v-loading="baseSaveLoading"
      @save-success="saveBaseFormSuccess"
      @reset="resetBaseForm"
    />

    <detailPlan
      :product-factory-options="selectedProductFactoryOptions"
      class="margin-bottom20"
      v-show="baseForm.id"
    />

    <detailConfig
      v-show="baseForm.id"
      :product-factory-options="selectedProductFactoryOptions"
    />
  </iPage>
</template>

<script>
import { iPage } from 'rise'
import pageHeader from '@/components/pageHeader'
import { detailBase, detailPlan, detailConfig } from './components'
import { fetchProcureFactorySelectVo } from '@/api/baseInfo'
import { fetchCarDetail } from '@/api/mainData/car'
export default {
  name: 'MainDataCarAdd',
  components: {
    iPage,
    pageHeader,
    detailBase,
    detailPlan,
    detailConfig
  },
  computed: {
    selectedProductFactoryOptions() {
      if (!this.baseForm.productFactory) {
        return []
      }
      return this.productFactoryOptions.filter((e) =>
        this.baseForm.productFactory.includes(e.id)
      )
    }
  },
  data() {
    return {
      baseForm: {
        aekoCartype: '',
        brandCode: '',
        calCartype: '',
        carPlatformCode: '',
        carTypeLevel: '',
        createBy: 0,
        description: '',
        isValid: true,
        modelNameZh: '',
        productCode: '',
        productFactory: '',
        productId: 0,
        sourceType: '',
        type: '',
        vwModelCode: '',
        isModify: false,
        eplModelCode: '',
        bkmModelCode: ''
      },
      productFactoryOptions: [], // 投产工厂
      baseSaveLoading: false
    }
  },
  created() {
    this.queryProcureFactorySelectVo()
    if (this.$route.query.id) {
      this.queryCarDetail()
    }
  },
  methods: {
    async queryCarDetail() {
      const { data } = await fetchCarDetail({ id: this.$route.query.id })
      const productFactory = data.productFactory
        ? data.productFactory.split(',')
        : data.productFactory
      const isModify = data.isModify || false
      this.baseForm = { ...data, isModify, productFactory }
    },
    async queryProcureFactorySelectVo() {
      const { data } = await fetchProcureFactorySelectVo()
      this.productFactoryOptions = data
    },
    saveBaseFormSuccess(data) {
      if (data) {
        this.baseForm = data
        if (data.productFactory) {
          this.baseForm.productFactory = data.productFactory.split(',')
        }
      }
    },
    resetBaseForm(data) {
      this.baseForm = data
    }
  }
}
</script>

<style lang="scss" scoped></style>
