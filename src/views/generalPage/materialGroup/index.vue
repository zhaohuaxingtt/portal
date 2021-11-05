<template>
  <div>
    <base-info-card v-if="this.supplierType === 4" />
    <material-search class="margin-top20" @getTableList='getTableList' />
    <material-table class="margin-top20" ref="materialTable" />
    <controlled-record class="margin-top20" />
  </div>
</template>

<script>
import baseInfoCard from '@/views/generalPage/components/baseInfoCard'
import materialSearch from './components/materialSearch'
import materialTable from './components/materialTable'
import controlledRecord from './components/controlledRecord'
import { generalPageMixins } from '@/views/generalPage/commonFunMixins'

export default {
  mixins: [generalPageMixins],
  components: {
    baseInfoCard,
    materialSearch,
    materialTable,
    controlledRecord
  },
  data() {
    return {

    }
  },
  methods: {
    async getTableList(form) {
      this.$refs.materialTable.getTableList(form)
    }
  }
}
</script>

<style scoped>
</style>