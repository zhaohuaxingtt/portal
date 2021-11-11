<template>
  <iPage class="relation">
    <pageHeader>
      Mtz材料组关联关系列表
    </pageHeader>

    <theRelationFilter class="margin-top20" @search="search" />

    <theRelationTabs ref="theRelationTabs" />
  </iPage>
</template>

<script>
import pageHeader from '@/components/pageHeader'
import { iPage } from 'rise'
import { theRelationFilter, theRelationTabs } from './components'
export default {
  name: 'mtzMaterielGroupRelation',
  components: { iPage, theRelationFilter, pageHeader, theRelationTabs },
  methods: {
    search(val) {
      this.$refs.theRelationTabs.search(val)
    }
  }
}
</script>

<style lang="scss" scoped></style>
