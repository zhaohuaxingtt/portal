<template>
  <iPage>
      <search @search-table-list='searchTableList'/>
      <table-list ref="tableList"/>
  </iPage>
</template>

<script>
import {iPage} from 'rise'
import {
    search,
    tableList
} from './components/index'
export default {
    components:{
        iPage,
        search,
        tableList,
    },
    methods:{
        searchTableList(val){
            this.$refs.tableList.search(val)
        }
    }
}
</script>

<style>

</style>