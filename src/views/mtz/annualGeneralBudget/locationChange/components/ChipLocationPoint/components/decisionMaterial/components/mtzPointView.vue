<!--
 * @Author: youyuan
 * @Date: 2021-10-28 16:45:22
 * @LastEditTime: 2021-11-10 13:43:16
 * @LastEditors: Please set LastEditors
 * @Description: mtz
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\locationChange\components\MtzLocationPoint\components\decisionMaterial\components\mtz.vue
-->
<!-- 这个文件没用，但是路由中存在，暂时保留，不删 -->
<template>
  <div ref="qrCodeDiv" class="sign_swap" style="padding-bottom:30px;">
    
  </div>
</template>

<script>

export default {
  components: {
    
  },
  props:{
  },
  data () {
    return {
      
    }
  },
  watch: {
    
  },
  created() {
    
  },
  computed: {
    
  },
  methods: {
    
  }
}
</script>

<style lang='scss' scoped>
$tabsInforHeight: 35px;

.sign_swap{
  position:fixed!important;
  left:0;
  right:0;
  top:0;
  right:0;
  width:100%;
  height:100%;
  z-index:2000;
  overflow-y:auto;
  background:white!important;
}
.tableTitle {
  display: inline-block;
  font-weight: bold;
  font-family: Arial;
  color: #000000;
  opacity: 1;
  font-size: 18px;
}
.headBox {
  position: relative;
  justify-content: space-between;
  width: 100%;
  .headTitle {
    display: inline-block;
    font-weight: bold;
    font-family: Arial;
    color: #000000;
    opacity: 1;
  }
  .buttonBox {
    position: absolute;
    right: 0;
  }
}
.applayDateBox1{
  display:flex;
  justify-content: space-between;
  align-items: center;
  flex-flow: wrap;
}
.applayDateBox {
  overflow-x: scroll;
  margin: 20px 0;
  padding-bottom: 20px;
  white-space: nowrap;
}
.applayDateIcon {
  margin-top: 10px;
  font-size: 30px;
}
.applayDateContentItem {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  padding: 0 20px;
  font-size: 16px;
  .applayDateDeptTitle {
    font-weight: bold;
  }
}
.applayDateContent {
    display: inline-block;
    background-color: #CDD4E2;
    height: 178px;
    width: 224px;
    margin: 0 10px;
    border-radius: 15px;
    text-align: center;
}
.tabsBoxInfor {
  margin-bottom: 10px;
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;
  .inforDiv {
    width: 29%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0;
    margin-bottom: 20px;
    span {
      font-size: 15px;
    }
    .inforText {
      font-size: 14px;
      padding:10px 10px;
      width: 68%;
      min-height: $tabsInforHeight;
      height:auto;
      background: #f8f8fa;
      text-align: center;
    }
  }
}
</style>
