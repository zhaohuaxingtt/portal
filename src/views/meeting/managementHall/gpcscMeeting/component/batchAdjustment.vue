<!--
 * @Author: HS   批量调整
 * @FilePath: \front-portal\src\views\meeting\managementHall\gpcscMeeting\component\batchAdjustment.vue
-->
<template>
  <div class="box">
    
      <draggable v-model="syllable">
        <div v-for="(item , idx) in syllable" :key="idx" class="divheight">
          <icon symbol class="icon" name="iconshunxubiaoqian" /> {{item.name}}
        </div>
      </draggable>
      <div class="btn">
        <iButton @click="handleSave">保存</iButton>
        <iButton>重置</iButton>
        <iButton>退出</iButton>
      </div>
  </div>
</template>

<script>
import {icon, iButton} from 'rise'
import draggable from "vuedraggable";
export default {
  components: {
    iButton,
    draggable,
    icon
  },
  data(){
    return {
      syllable:[{id:1,name:'11'},{id:2,name:'22'},{id:3,name:'33'}]
    }
  },
  methods:{
    handleSave(){
      console.log(this.syllable)
    }
  }
 
}
</script>

<style lang="scss" scoped>
    .box{
      cursor: move;
      .divheight{
        width: 100%;
        height: 30px;
        line-height: 30px;
        text-align: left;
        background-color: #f9fafe;
        margin-bottom: 20px;
        border-radius: 4px;
        padding: 0 8px;
        .icon{
          margin-right: 20px;
        }
      }
    }
    .btn{
      text-align: right;
      margin-top: 30px;
    }
</style>