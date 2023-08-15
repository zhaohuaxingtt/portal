<!--
 * @Author: your name
 * @Date: 2021-11-03 14:28:17
 * @LastEditTime: 2021-11-16 20:04:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\replenishmentManagement\components\applicationForm\index.vue
-->
<template>
  <div>
    <div class="contentBox">
      <iTabsList v-model="tabsValue"
                 @tab-click="tableChange"
                 type="card"
                 slot="components"
                 calss="margin-top20 iTabsList">
        <el-tab-pane :name="1"
                     :label="language('BUCHADIANHUIZONG','补差单汇总')"></el-tab-pane>
        <el-tab-pane :name="2"
                     :label="language('BUCHADANMINGXI','补差单明细')"></el-tab-pane>
        <el-tab-pane :name="3"
                     :label="language('BUCHADANMINGXIGUIJINSHU','补差单明细（贵金属）')"></el-tab-pane>
      </iTabsList>
      <iCard>
        <tabs1 v-if="tabsValue == 1"
               v-on:closeDiolog1="closeDiolog"></tabs1>
        <tabs2 v-show="tabsValue == 2"
               v-on:closeDiolog2="closeDiolog"></tabs2>
        <tabs3 v-show="tabsValue == 3"
               v-on:closeDiolog3="closeDiolog"></tabs3>
      </iCard>
    </div>

  </div>
</template>

<script>
import { iCard, iButton, iTabsList, iPage } from 'rise'
import tabs1 from './components/tabs1'
import tabs2 from './components/tabs2'
import tabs3 from './components/tabs3'

export default {
  components: {
    tabs1,
    tabs2,
    tabs3,
    iTabsList,
    iCard,
    iPage,
    iButton
  },
  data () {
    return {
      tabsValue: 1,
    }
  },
  methods: {
    tableChange (val) {
      if (val.name !== this.tabsValue) {
        this.tabsValue = val.name;
      }
    },
    closeDiolog () {
      this.$emit('dialogShowFun', '');
    },
  }
}
</script>

<style lang='scss' scoped>
$boxShadow: #e6e6e6;
$tabsInforHeight: 35px;

.searchBox {
  position: relative;
  display: flex;
  justify-content: space-between;
  .searchButton {
    position: absolute;
    right: 0;
    top: 50px;
    z-index: 100;
  }
}
.contentBox {
  margin-top: 20px;
  padding-bottom: 30px;
}

.leftBox {
  margin-right: 200px;
}
.title {
  justify-content: space-between;
  font-size: 20px;
  font-weight: bold;
  line-height: 23px;
}
</style>