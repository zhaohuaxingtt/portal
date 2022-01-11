<!--
 * @Author: HS   批量调整
 * @FilePath: \front-portal\src\views\meeting\managementHall\gpcscMeeting\component\batchAdjustment.vue
-->
<template>
  <div class="box">
    
      <draggable v-model="syllable">
        <div v-for="(item , idx) in syllable" :key="idx" class="divheight">
          <icon symbol class="icon" name="iconshunxubiaoqian" /> {{item.presenterDept}}
        </div>
      </draggable>
      <div class="btn">
        <iButton @click="handleSave">保存</iButton>
        <iButton @click="handleReset">重置</iButton>
        <iButton @click="handleOut">退出</iButton>
      </div>
  </div>
</template>

<script>
import {icon, iButton , iMessage} from 'rise'
import draggable from "vuedraggable";
import { findThemenById ,resortThemen} from '@/api/meeting/details'
export default {
  components: {
    iButton,
    draggable,
    icon,
    iMessage
  },
  data(){
    return {
      syllable:[]
    }
  },
  created() {  
    this.queryMeetingInfoById()
  },
  methods:{
    // 数据请求  
    //meetingApi/meetingService/findById
    queryMeetingInfoById() {
      const data = {
        id:this.$route.query.id
      }
      findThemenById(data) .then((res) => {
         console.log(res.themens);
         this.syllable=res.themens
        }) .catch((err) => {
          console.log(err)
        })
    },
     // 保存
     //meetingService/resortThemen
    handleSave(){
      let resortThemens =[]
      this.syllable.forEach((x,index)=>{
        resortThemens.push({itemNo:index+1,themenId:x.id})
      })
      const data = {
        meetingId:this.$route.query.id,
        resortThemens:resortThemens
      }
      resortThemen(data).then((res) => {
         if (res) {
             iMessage.success('保存成功')
            this.$emit('flushTable')
            this.$emit('close')
          } 
      })
    },
    //重置
    handleReset(){
      this.queryMeetingInfoById()
    },
    //退出
    handleOut(){
      this.$emit('close')
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