<template>
  <iCard collapse :title="language('色标零件清单')">
      <el-form label-position="left" label-width="150px">
        <el-row :gutter="24">
          <el-col span="8">
            <iFormItem :label='language("编号")' class="color-list-search">
              <iSelect v-model="colorStandardCode" multiple >
                <el-option
                  v-for="item in partNumOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >

                </el-option>
              </iSelect>
              <iButton style="margin-left:20px" @click="search">{{language('查询')}}</iButton>
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
  iButton,
  iSelect
} from 'rise'
import iTableCustom from '@/components/iTableCustom'
import {COLOR_COLUMNS} from './data.js'
import { getColorListById} from '@/api/colorStandardParts'
export default {
  name:'colorStandardList',
  components:{iCard,iFormItem,iButton,iTableCustom,iSelect},
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
      this.iniTableData.forEach((ele)=>{
        this.colorStandardCode.forEach((item)=>{
          if( ele.partNum5 == item){
            this.colorListData.push(ele)
          }
        })
      })
      if(this.colorStandardCode.length == 0){
        console.log('this.colorStandardCode',this.colorStandardCode);
        this.colorListData = this.iniTableData
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
  margin-left: 20px;
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