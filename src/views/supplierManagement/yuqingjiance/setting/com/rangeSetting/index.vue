<template>
  <iCard>
    <div class="flex_title">
      <span class="flex_span">{{$t("情感状态")}}</span>
      <el-checkbox-group
        v-model="checkVal"
        @change="handleCheckedCitiesChange"
      >
        <el-checkbox
          v-for="item in checkList"
          :key="item.value"
          :label="item.value"
          >{{ $t(item.name) }}</el-checkbox
        >
      </el-checkbox-group>
    </div>
    <div class="footer">
      <iButton @click="save" :loading="loading" v-permission="PORTAL_SUPPLIER_NAV_YUQINGJIANCE_SETTING_YUQINGLAQUFANWEI_SAVE">{{$t("LK_BAOCUN")}}</iButton>
      <iButton @click="cancel" v-permission="PORTAL_SUPPLIER_NAV_YUQINGJIANCE_SETTING_YUQINGLAQUFANWEI_CANCEL">{{$t("MT_QUXIAO")}}</iButton>
    </div>
  </iCard>
</template>

<script>
import { iCard,iButton,iMessage } from "rise"

import {
  getRange,
  updateRange
} from "@/api/supplierManagement/yuqingjiance"

export default{
  components:{
    iCard,
    iButton
  },
  data(){
    return{
      checkList:[
        {
          value:"1",
          name:"消极"
        },{
          value:"2",
          name:"中立"
        },{
          value:"3",
          name:"积极"
        },
      ],
      checkVal:[0],
      dataObj:{},
      loading:false,
    }
  },
  created(){
    this.getData();
  },
  methods:{
    getData(){
      getRange({}).then(res=>{
        if(res.result){
          this.dataObj = res.data;
          const list = res.data.emotionalState.split(",");
          this.checkVal = list;
        }
      })
    },
    save(){
      this.loading = true;
      if(this.checkVal.length<1){
        iMessage.warn(this.$t("情感状态不能为空"))
        this.loading = false;
      }else{
        const obj = {
          id:this.dataObj.id,
          emotionalState:this.checkVal.toString()
        }
        updateRange(obj).then(res=>{
          if(res.result){
            iMessage.success(res.desZh)
          }else{
            iMessage.success(res.desZh)
          }
          this.loading = false;
        }).catch(e=>{
          this.loading = false;
        })
      }
    },
    cancel(){
      this.getData();
    },
    handleCheckedCitiesChange(val){
      
    }
  }
}
</script>

<style lang="scss" scoped>
.flex_title{
  display: flex;
}
.flex_span{
  padding-right:15px;
}
.footer{
  margin-top:40px;
}
</style>