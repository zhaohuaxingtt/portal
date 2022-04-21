<template>
  <div>
    <base-info-card class="margin-bottom20" v-if="$route.query.subSupplierType == 'GP'" />
    <sys-search @getTableList="getTableList"/>
    <base-info-card v-if="this.supplierType > 3" class="margin-top20"/>
    <sys-table class="margin-top20" ref="sysTable"/>
  </div>
</template>

<script>
import baseInfoCard from '@/views/generalPage/components/baseInfoCard'
import sysSearch from './components/sysSearch'
import sysTable from './components/sysTable'

export default {
  components: {
    baseInfoCard,
    sysSearch,
    sysTable
  },
  methods: {
    getTableList(otherParams) {
      this.$refs.sysTable.getTableList(otherParams)
    }
  }
}
</script>

<style scoped>

</style>