<!--
 * @Author: your name
 * @Date: 2021-10-28 14:51:25
 * @LastEditTime: 2021-10-28 16:44:27
 * @LastEditors: Please set LastEditors
 * @Description: 公共步骤条封装
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\locationChange\components\MtzLocationPoint\components\commonFlow.vue
-->
<template>
  <div>
    <div slot="header"
      class="flex-between-center"
      style="width:100%">
      <!-- <span class="title_name">MTZ申请单-100386 申请单名-采购员-科室</span> -->
      <span class="title_name">{{ commonTitle }} - {{locationId}}</span>
      <div class="opration">
        <iButton @click="submit">{{ language('TIJIAO', '提交') }}</iButton>
        <iButton >{{ language('DAOCHURS', '导出RS') }}</iButton>
      </div>
    </div>
    <div class="stepBoxMap">
      <div class="stepBox">
        <div class="stepBox_div" v-for="(item,index) in topImgList" :key="index" @click="handleClickStep(item)">
          <img class="car_img"
              :src="Number(locationNow-index-1)>0?require('@/assets/images/icon/bingo.png'):Number(locationNow-index-1)==0?require('@/assets/images/icon/car-conduct.png'):require('@/assets/images/icon/car-bingo.png')"
              :fit="fit"/>
          <span :class="Number(locationNow-index-1)<0?'car_span_color':''">{{ language(item.key, item.name)}}</span>
        </div>
      </div>
      <hr width="100%" style="border:1px dashed #CDD3E2;height:1px" />
      <hr :width="(locationNow-1)*50 + '%'" style="border:1px dashed #1660F1;height:1px" />
    </div>
    <iDialog
      :title="language('XUANZEHUIYI', '选择会议')"
      :visible.sync="mtzAddShow"
      v-if="mtzAddShow"
      width="90%"
      @close='closeDiolog'
    >
      <subSelect @close="closeBingo"></subSelect>
    </iDialog>
    <div class="margin-top20">
      <router-view/>
    </div>
  </div>
</template>

<script>
import { iButton,iDialog } from "rise"
import { topImgList } from './data'
import subSelect from './subSelect'
export default {
  components:{
    iButton,
    iDialog,
    subSelect
  },
  props: {
    mtzApplayNum: {
      type: String,
      default: ''
    },
    mtzApplayName: {
      type: String,
      default: ''
    },
    user: {
      type: String,
      default: ''
    },
    dept: {
      type: String,
      default: ''
    },
    params: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      locationId:this.$route.query.id,
      topImgList,
      locationNow: this.$route.query.currentStep || 1,
      mtzAddShow:false,
    }
  },
  computed: {
    commonTitle() {
      // MTZ申请单-100386 申请单名-采购员-科室
      return this.language('MTZSHENGQINGDAN', 'MTZ申请单') + (this.mtzApplayNum ? '-' + this.mtzApplayNum : '') + (' ' + this.mtzApplayName || '') + (this.user ? '-' + this.user : '') + (this.dept ? '-' + this.dept : '')
    }
  },
  created() {

  },
  methods: {
    // 提交
    submit(){
      this.mtzAddShow = true;
      // this.$router.go(-1);
    },
    // 点击步骤
    handleClickStep(data) {
      this.locationNow = data.id
      this.$router.push({
        path: data.url,
        query: {
          currentStep: data.id,
          id:this.$route.query.id,
        }
      })
    },
    closeDiolog(){
      this.mtzAddShow = false;
    },
    closeBingo(val){
      console.log(val);
      this.closeDiolog()
    }
  }
}
</script>

<style lang='scss' scoped>
.title_name{
  font-size: 20px;
  font-weight: bold;
}
.opration{
  margin-right: 100px;
}
.stepBoxMap{
  width: 100%;
  height:85px;
  margin:30px auto 0;
  position: relative;
  hr{
    position: absolute;
    top:23%;
  }
}
.stepBox{
  z-index: 10;
  position: absolute;
  top:0;
  left:0;
  width: 100%;
  height:100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .stepBox_div{
    text-align: center;
    width: 14%;
    background:#f8f9fa;

    .car_img{
      width:45px;
      display: block;
      margin:0 auto;
      cursor: pointer;
    }
    span{
      display: inline-block;
      font-size: 20px;
      font-weight: bold;
      margin-top:10px;
      color:#5d5d5d;
    }
    .car_span_color{
      color:#CDD3E2!important;
    }
  }
}
 
</style>
