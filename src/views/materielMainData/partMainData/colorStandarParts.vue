<template>
  <iPage>
      <pageHeader>
        {{language('色标件-批量修改')}}
        <div slot="actions">
          <iButton @click="sure">{{language('确认')}}</iButton>
          <iButton @click="cancel">{{language('取消')}}</iButton>
        </div>
      </pageHeader>
      <colorPartsBasic style="margin-top:20px" @partNum='getPartNum' ref="colorPartsBasic"/>
      <colorPartsUnit style="margin-top:20px" />
      <colorPartsList style="margin-top:20px" :partNum='partNum' ref="colorPartsList"/>
      
  </iPage>
</template>

<script>
import {iPage,iButton} from 'rise'
import pageHeader from '@/components/pageHeader'
import {updateColorParts} from '@/api/colorStandardParts'
import {colorPartsBasic,colorPartsUnit,colorPartsList}  from './components/index.js'
export default {
  components:{
    iPage,
    colorPartsBasic,
    colorPartsUnit,
    colorPartsList,
    pageHeader,
    iButton
  },
  data(){
    return{
      partNum:'',
      basicCheck:0,
    }
  },
  methods:{
    getPartNum(val){
      this.partNum = val
    },
    sure(){
      const basic = this.$refs.colorPartsBasic.save()
      for (let key in  basic ){
        if(basic[key]){
          this.basicCheck++
        }
      }
      const list = this.$refs.colorPartsList.handleSelectionChange()
      
      if(this.basicCheck == 0 || (list != null &&  list.length == 0  )){
        this.$message.error(this.basicCheck == 0 ? '未勾选修改的内容，请最少选择一个需调整的内容继续操作' : '未勾选色标零件，请最少选中一行继续操作' )
      }
    }
  }


}
</script>

<style>

</style>