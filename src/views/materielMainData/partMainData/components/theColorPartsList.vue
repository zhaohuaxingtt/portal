<template>
  <iCard collapse :title="language('色标零件清单')">
      <el-form label-position="left" label-width="150px">
        <el-row :gutter="24">
          <el-col span="8">
            <iFormItem :label='language("编号")' class="color-list-search">
              <iInput v-model="colorStandardCode"></iInput>
              <iButton style="margin-left:20px">{{language('查询')}}</iButton>
            </iFormItem>
          </el-col>
        </el-row>
      </el-form>
      <el-divider class="divider" ></el-divider>
      <h4 style="margin:0 0 20px 20px">{{language('色标件清单')}}</h4>
      <iTableCustom 
        ref="colorListTable"
        :loading='loading'
        :data='colorListData'
        :columns="columns"
        @handle-selection-change="handleSelectionChange"
      />
  </iCard>
</template>

<script>
import {
  iCard,
  iFormItem,
  iInput,
  iButton
} from 'rise'
import iTableCustom from '@/components/iTableCustom'
import {COLOR_COLUMNS} from './data.js'
import { getColorListById} from '@/api/colorStandardParts'
export default {
  name:'colorStandardList',
  components:{iCard,iFormItem,iInput,iButton,iTableCustom},
  props:{
    partNum:{
      type:String,
      default:''
    }
  },
  data(){
    return{
      colorListData:[],
      loading:false,
      columns:COLOR_COLUMNS,
      colorStandardCode:[]
    }
  },
  watch:{
    partNum(newVal,oldVal){
      const data = {
        partNum:newVal,
        codes:this.colorStandardCode
      }
       getColorListById(data).then((res) => {
        if(res.code == 200){
          const data = res.data
          this.colorListData = data
        }else{
                this.$message.error(res.desZh)
            }
      })
    }
  },
  mounted(){
    // if(this.partNum){
    //   const data = {
    //     partNum:this.partNum,
    //     codes:this.colorStandardCode
    //   }
    //   getColorListById(data).then((res) => {
    //     if(res.code == 200){
    //     }else{
    //             this.$message.error(res.desZh)
    //         }
    //   })
    // }
  },
  methods:{
    handleSelectionChange(val){
      return [val,this.colorListData]
    }
  }

}
</script>

<style lang="scss" scoped>
.color-list-search{
  
}
::v-deep .el-form-item__label{
  margin-left: 20px;
}
::v-deep .el-form-item__content{
  display: flex;
  align-items: center;
}
.divider{
    margin:0 0  20px 0;
}
</style>