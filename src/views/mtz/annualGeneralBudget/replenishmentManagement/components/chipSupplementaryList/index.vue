<!--
 * @Author: your name
 * @Date: 2021-10-06 21:19:28
 * @LastEditTime: 2021-10-18 19:19:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\replenishmentManagement\components\supplementaryList\index.vue
-->
<template>
  <div>
    <theSearch></theSearch>
    <theTable class="margin-top20"
              @detail="handleDetail"></theTable>
    <search :detailObj="detailObj"
            v-if="dialogShow"
            v-on:dialogShowFun="dialogShowFun" />
  </div>
</template>
  
<script>
import { iPage, iDialog } from 'rise'
import search from "./components/search";
import theSearch from './components/theSearch'
import theTable from './components/theTable'
export default {
  name: '',
  components: {
    iPage,
    theSearch,
    search,
    theTable,
  },
  data () {
    return {
      detailObj: {},
      dialogShow: false
    }
  },
  methods: {
    handleDetail (val) {
      this.detailObj = val,
        this.dialogShow = true;
    },
    dialogShowFun () {
      this.dialogShow = false;
    },
  },
  created () {
    console.log(this.$store)
  }


};
</script>

<style lang="scss"  scoped>
</style>
