<!--
 * @Author: HS   批量调整
 * @FilePath: \front-portal\src\views\meeting\managementHall\gpcscMeeting\component\batchAdjustment.vue
-->
<template>
  <div class="box">
    
      <draggable v-model="syllable">
        <div v-for="(item , idx) in syllable" :key="idx" class="divheight">
          <icon symbol class="icon" name="iconshunxubiaoqian" /> {{item}}
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
import {  resortThemen} from '@/api/meeting/details'
import { findThemenById } from '@/api/meeting/gpMeeting'
export default {
  components: {
    iButton,
    draggable,
    icon,
    iMessage
  },
  data(){
    return {
      syllable:[],
      oldArr:[]
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
         this.oldArr=res.themens
        //  res.themens.presenterDept
        // 去重  留下不同的股别
        var arr = []
        var data = [...res.themens]
        for(let val of data){
            arr.push(val.presenterDept)
        }
        this.syllable = new Set(arr)
        return 
        var newArr = [];
        var newArr2 = [];
        for(var i =0;i<arr.length-1;i++){
            if(newArr.indexOf(arr[i]) == -1){
                newArr.push(arr[i]);
                newArr2.push(data[i]);
            }
        }
        data= newArr2;
        console.log(data);
        this.syllable=data
        //  this.syllable=res.themens
         console.log(this.syllable);
        }) .catch((err) => {
          console.log(err)
        })
      
    },
     // 保存
     //meetingService/resortThemen
    handleSave(){
        // 保存接口数据操作  处理没有操作的数据  找相同的股别push在新数组 不用的push在后面
        let finnallyData = []
        this.syllable.forEach(x=>{
          this.oldArr.forEach(y=>{ 
            x==y.presenterDept?finnallyData.push(y):''
          })
        })
        console.log(finnallyData)

      // 处理传给后端的值
      let resortThemens =[]
      finnallyData.forEach((x,index)=>{
        resortThemens.push({itemNo:index+1,themenId:x.id})
      })
      const datas = {
        meetingId:this.$route.query.id,
        resortThemens:resortThemens
      }
      console.log(datas,'传给后端参数');
      resortThemen(datas).then((res) => {
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