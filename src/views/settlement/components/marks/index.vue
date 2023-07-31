<!--
 * @Author: 舒杰
 * @Date: 2021-02-25 11:24:15
 * @LastEditTime: 2021-08-30 14:02:30
 * @LastEditors: 舒杰
 * @Description: 备注
 * @FilePath: \front-order\src\views\okm\components\marks\index.vue
-->
<template>
      <iDialog :title="title" :visible.sync="value" width="600px" @close='clearDiolog' top="30vh">
        <div class="changeContent">
          <!-- <span class="fontSize14">{{ language('QSRBZ','请输入备注') }}：</span> -->
          <iInput v-model='notes' type="textarea" rows="8"></iInput>
        </div>
        <span slot="footer" class="dialog-footer">
          <iButton @click="$emit('input',false)">{{language('LK_QUXIAO','取 消')}}</iButton>
          <iButton @click="sureChangeItems">{{language('LK_QUEREN','确认')}}</iButton>
        </span>
      </iDialog>
</template>
<script>
import {iInput,iButton,iDialog} from 'rise'
export default{
  components:{iButton,iDialog,iInput},
  props:{
    value:{type:Boolean},
    title:{type:String,default:"备注"},
  },
  data(){
      return {
      notes:"",
    }
  },
  methods:{
    clearDiolog(){
      this.notes = ""
      this.$emit('input',false)
    },
    sureChangeItems(){
      this.$emit('sure',this.notes)
    },
    getMarkdefalut(mark){
      this.notes=mark
    }
  }
}
</script>
<style lang='scss' scoped>
  .changeContent{
    display: flex;
    padding-bottom: 20px;
    span{
      display: inline-block;
      width: 140px;
      font-size: 14px;
      height: 35px;
      line-height: 35px;
    }
  }
</style>
