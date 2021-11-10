<template>
  <div class="parts-material-group">
    <filterPanel @search="searchTableList"></filterPanel>
    <part-material-list :materialForm="materialForma" ref="PartMaterial"></part-material-list>
  </div>
</template>

<script>
import  filterPanel  from './components/filterPanel'
import PartMaterialList from './components/partMaterialList.vue'
import {PART_MATERIAL_DATA} from './components/data'

export default {
  components: { filterPanel,PartMaterialList },
  data() {
    return {
      materialForma: {}
    }
  },
  created() {
    this.searchTableList()
  },
  methods:{
    searchTableList(val) {
      this.materialForma ={ ...val}
    }
  }
}
</script>

<style lang="scss" scoped>
  .parts-material-group{
    display: flex;
    height: 100%;
    flex-direction: column;
  }
</style>