<template>
  <iCard collapse :title="language('请选择需要批量维护的色标零件')">
      <el-form label-position="left" label-width="160px">
        <el-row :gutter="24">
          <el-col span="8">
            <iFormItem :label='language("色标零件号")' class="color-list-search">
              <iInput v-model="colorStandardCode"></iInput>
            </iFormItem>
          </el-col>
          <el-col span="8">
            <iFormItem>
              <iButton style="margin-left:20px" @click="search" slot="label">{{language('查询')}}</iButton>
            </iFormItem>
          </el-col>
        </el-row>
      </el-form>
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
  iButton,
  iSelect,
  iInput
} from 'rise'
import iTableCustom from '@/components/iTableCustom'
import {COLOR_COLUMNS} from './data.js'
import { getColorListById} from '@/api/colorStandardParts'
export default {
  name:'colorStandardList',
  components:{iCard,iFormItem,iButton,iTableCustom,iSelect,iInput},
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
      colorStandardCode:[],
      selectedItems:[],
      partNumOptions:[],
      iniTableData:[]
    }
  },
  watch:{
    partNum(newVal,oldVal){
      const data = {
        partNum:newVal,
      }
       getColorListById(data).then((res) => {
        if(res.code == 200){
          const data = res.data
          if(data){
            this.colorListData = data
            this.iniTableData = data
            this.$refs.colorListTable.toggleAllSelection()
            this.partNumOptions= data.map((ele)=>{
              return {'label':ele.partNum5,'value':ele.partNum5}
            })
          }
          
        }else{
                this.$message.error(res.desZh)
            }
      })
    }
  },
  mounted(){
  },
  methods:{
    handleSelectionChange(val){
      this.selectedItems = val
    },
    getPartsList(){
      return this.selectedItems
    },
    search(){
      this.colorListData = []
      const input = this.colorStandardCode.split(',')
      let searchedData = []
      this.iniTableData.forEach((ele)=>{
        input.forEach((item)=>{
          if( ele.partNameZh.toLowerCase().includes(item.toLowerCase()) || ele.partNum5.toLowerCase().includes(item.toLowerCase())){
            searchedData.push(ele)
          }
        })
      })
      if(input.length == 0){
        this.colorListData = this.iniTableData
      }else{
        this.colorListData = Array.from(new Set(searchedData)) 
      }
      this.$refs.colorListTable.toggleAllSelection()
    }
  }

}
</script>

<style lang="scss" scoped>
.color-list-search{
  
}
::v-deep .el-form-item__label{
  margin-left: 26px;
}
::v-deep .el-form-item__content{
  display: flex;
  align-items: center;
}
::v-deep .el-select__tags{
  flex-wrap: nowrap;
  overflow: auto;
}
.divider{
    margin:0 0  20px 0;
}
</style>