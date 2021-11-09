<template>
  <div class="N-Tier">
      <filter-panel class="margin-bottom20" @search='search'/>
      <tableList ref="searchMethod" />
  </div>
</template>

<script>
import tableList from './components/tableList'
import filterPanel from './components/filter-panel'
export default {
    components:{tableList,filterPanel},
    methods:{
        search(val){
            this.$refs.searchMethod.search(val)
        }
    }
}
</script>

<style lang="scss" scoped>
.N-Tier{
    display: flex;
    height: 100%;
    flex-direction: column;
}
</style>