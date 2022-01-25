<template>
  <i-page>
      <page-header class="title">{{language('离线下载')}}</page-header>
      <Search ref="theSearch" @search='search'/>
      <TableList ref="theTableList" />
  </i-page>
</template>

<script>
import pageHeader from '@/components/pageHeader'
import {
    Search,
    TableList
} from './components/index.js'
import {iPage} from 'rise'
export default {
    components:{
        pageHeader,
        iPage,
        Search,
        TableList,
    },
    data(){
        return{
            searchContent:{}
        }
    },
    created(){ 
    },
    methods:{
        search(val){
            this.$refs.theTableList.search(val)
        }
    }
}
</script>

<style>

</style>