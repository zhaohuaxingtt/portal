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
      <iButton>{{$t("LK_BAOCUN")}}</iButton>
      <iButton>{{$t("MT_QUXIAO")}}</iButton>
    </div>
  </iCard>
</template>

<script>
import { iCard,iButton } from "rise"
export default{
  components:{
    iCard,
    iButton
},
  data(){
    return{
      checkList:[
        {
          value:0,
          name:"消极"
        },{
          value:1,
          name:"中立"
        },{
          value:2,
          name:"积极"
        },
      ],
      checkVal:[0]
    }
  },
  methods:{
    handleCheckedCitiesChange(val){
      console.log(val);
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