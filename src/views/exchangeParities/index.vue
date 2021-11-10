<template>
  <iPage>
      <theListPanel @search='search'/>
      <theListTable ref="listTable"/>
  </iPage>
</template>

<script>
import {
    theListTable,
    theListPanel,
} from './components'
import {iPage} from 'rise'
export default {
    name:'exchange-parities',
    components:{theListTable,theListPanel,iPage},
    data(){
        return {
            
        }
    },
    methods:{
        search(val){
            this.$refs.listTable.search(val)
        }
    }
}
</script>

<style>

</style>