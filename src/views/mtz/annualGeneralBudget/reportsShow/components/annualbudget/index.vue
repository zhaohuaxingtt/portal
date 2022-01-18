<!--
 * @Author: YoHo
 * @Date: 2021-12-24 15:14:51
 * @LastEditTime: 2021-12-27 17:24:32
 * @LastEditors: YoHo
 * @Description: 
-->
<template>
  <div>
    <div class="headerNav-sub">
      <iTabsList type="card" v-model="tab" @tab-click="handleTabClick">
        <el-tab-pane
          lazy
          v-for="(item, index) in subNavList"
          :key="index"
          :label="language(item.key, item.name)"
          :name="item.code"
        ></el-tab-pane>
      </iTabsList>
      <iButton v-if="showBtn" class="export" @click="exportReport"
        >导出</iButton
      >
      <!-- 品牌导出 -->
      <iButton v-show="showPinpai" class="export" @click="exportReportPP">导出</iButton>
      <iButton v-show="showCar" class="export" @click="exportReportCAR">导出</iButton>
    </div>
    <router-view ref="child"></router-view>
  </div>
</template>

<script>
import { iTabsList, iButton } from 'rise'
import { subNavListOne,subNavListtwo } from '@/views/mtz/annualGeneralBudget/reportsShow/config/config'

export default {
  name: 'index',
  components: {
    iTabsList,
    iButton
  },
  data() {
    return {
      tab: '1',
      subNavList:[],
      showBtn: false,
      showPinpai:false,
      showCar:false,
    }
  },
  created() {
    if(this.$store.state.permission.userInfo.deptDTO.level=='K2' || this.$store.state.permission.userInfo.deptDTO.level=='K3'){
      this.subNavList=subNavListtwo
    }
    else{
      this.subNavList=subNavListOne
    }
    if (this.$route.name == 'materialGroup') {
      this.tab = '1'
    }
    if (this.$route.name == 'classMaterial') {
      this.tab = '2'
    }
    if (this.$route.name == 'department') {
      this.tab = '3'
    }
    if (this.$route.name == 'brand') {
      this.tab = '4'
      this.showPinpai = true;
    }
    if (this.$route.name == 'model') {
      this.tab = '5'
      this.showCar = true;
    }
  },
  mounted() {
    this.show()
  },
  methods: {
    show() {
      this.showBtn =
        typeof this.$refs.child?.exportReport == 'function' || false
    },
    handleTabClick(tab) {
      console.log(this.$refs.child)
      let item = this.subNavList.find((item) => item.code == tab.name)
      if (item != null && item.path != this.$route.path) {
        this.$router.replace({
          path: item.path
        })
      }
    },
    exportReport() {
      if (typeof this.$refs.child.exportReport == 'function') {
        this.$refs.child.exportReport()
      }
    },
    exportReportPP(){
      this.$refs.child.Upload();
    },
    exportReportCAR(){
      this.$refs.child.Upload();
    }
  }
}
</script>

<style lang="scss" scoped>
.headerNav-sub {
  position: relative;
  .export {
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>