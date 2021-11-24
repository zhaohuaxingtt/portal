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
      <colorPartsUnit style="margin-top:20px"  ref="colorPartsUnit"/>
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
      //获取选中item partNum
      partItems:[],
      passCheck:false
    }
  },
  methods:{
    getPartNum(val){
      this.partNum = val
    },
    sure(){
      //获取基本信息
      const basic = this.$refs.colorPartsBasic.save()
      const basicContent = this.$refs.colorPartsBasic.getFormContent()
      for (let key in  basic ){
        if(basic[key]){
          this.basicCheck++
        }
      }
      //获取选中的色标
      const list = this.$refs.colorPartsList.getPartsList()
      if(list){
        this.partItems = list.map((ele)=>{
          return ele.partNum5
        })
      }

      //获取unit id 和 计量单位选项
      const unitId = this.$refs.colorPartsUnit.getUnitId()
      const unitConverseDtos = this.$refs.colorPartsUnit.getUnitItems()
      //判断是否通过检验
      
      if(this.basicCheck == 0 || (list != null &&  list.length == 0  )){
        this.$message.error(this.basicCheck == 0 ? '未勾选修改的内容，请最少选择一个需调整的内容继续操作' : '未勾选色标零件，请最少选中一行继续操作' )
        
      }else{
        this.passCheck = true
      }
      const data = {
       ...basicContent,
       'partNum':this.partItems,
        unitId,
        unitConverseDtos
      }
      console.log(this.passCheck,'------');
      if( this.passCheck){

        this.$confirm('确认是否修改选中色标修改','提示',{
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'warning'
        }).then(()=>{
          updateColorParts(data).then((res)=>{
            if(res.code == 200){
              this.$message.success('批量修改成功')
              // this.initial()
              this.cancel()
            }else{
              this.$message.error(res.desZh)
            }
          })
        }).catch(()=>{})
      }

      
    },
    initial(){
      this.passCheck = false
      this.basicCheck = 0
      this.partItems = []
    },
    cancel(){
      window.close()
    }
  }


}
</script>

<style>

</style>