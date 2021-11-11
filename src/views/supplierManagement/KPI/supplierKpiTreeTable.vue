<template>
  <div>
      <div class="tabs">
                   <div :class="!isShowImgKpi?'current':''" @click="isShowImgKpi=false">查看</div>
                   <div :class="isShowImgKpi?'current':''" @click="isShowImgKpi=true">维护</div>
               </div>
           <template v-if="!isShowImgKpi">
               <Viewkpi />
           </template>
           <template v-if="isShowImgKpi">
               <ImgKpi style="margin-top:20px" />
           </template>
  </div>
</template>

<script>
import ImgKpi from './imgKpi'
import Viewkpi from './view'
export default {
    components:{
        ImgKpi,
        Viewkpi
    },
    data(){
        return {
            isShowImgKpi:false,      
        }
    },
    created(){
        
    },
    mounted(){
        
    },
    methods:{
        
    }
}
</script>

<style lang="scss" scoped>
.tabs{
        width: 208px;
        height: 35px;
        background: #F5F6F7;
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.08);
        opacity: 1;
        border-radius: 10px;
        display: flex;
        justify-content: space-between;
        line-height: 35px;
        div:first-child{
            width: 104px;
            height: 35px;
            text-align: center;
            cursor: pointer;
            border-radius: 10px 0 0 10px;
        }
        div:last-child{
            width: 104px;
            height: 35px;
            text-align: center;
            cursor: pointer;
            border-radius: 0 10px 10px 0;
        }
        .current{
            background: #fff!important;
            color: #1660F1!important;
            font-weight: bold!important;
            
        }
    }
</style>