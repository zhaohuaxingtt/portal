<template>
  <div class="partNumberPage">
        <el-form>
            <el-row :gutter="60">
                <el-col 
                    :span="6"
                    v-for="(x,index) in oneTwoPartNumber"
                    :key="index"
                    class="SearchOption"
                >
                <iFormItem :label="x.name">
                    <i-input v-model="formData[x.props]" disabled></i-input>
                </iFormItem>
                </el-col>
            </el-row>
        </el-form>
        <div class="oneTwoTable">
            <iTableCustom 
            @go-detail="handleSource"
            :data="oneTwoTableData"
            :columns="partNumber"/>
        </div>
         <!-- 分页标签 -->
        <iPagination
        v-update
        @size-change="handleSizeChange($event, oneTwoTableData)"
        @current-change="handleCurrentChange($event, oneTwoTableData)"
        background
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :current-page='page.currPage'
        :total="page.totalCount"/>
  </div>
</template>

<script>
import {
  iSearch,
  iInput,
  iSelect,
  iPage,
  iCard,
  iButton,
  iPagination,
  iFormItem,
  iDialog,
  iDatePicker,
  iTableCustom
} from 'rise'
import { tableSetting} from './data'
import { pageMixins } from '@/utils/pageMixins'
export default {
    components:{
    iSearch,
    iInput,
    iSelect,
    iPage,
    iCard,
    iButton,
    iTableCustom,
    iPagination,
    iFormItem,
    iDialog,
    iDatePicker
  },
  props:{
      itemData:{
          type:Object
      }
  },
  mixins: [pageMixins],
    data(){
        return {
            value:"",
            tableSetting,
            searchForm:[],
            formData:{},
            oneTwoTableData:[{receiptUser:'12323321'}]
        }
    },
    mounted(){
        this.tableSetting.map((x,index)=>{ 
            if(index!=0){
                this.searchForm.push(x)
            }
        })
    },
    methods:{
       handleSizeChange(){

       },
       handleCurrentChange(){

       },
        //来源详情 
       handleSource(){
           this.isShowSource=true
       }
    }
}
</script>

<style lang="scss" scoped>
    .partNumberPage{
        padding-bottom: 20px;
        .oneTwoTable{
            padding-top: 75px;
            border-top: 1px solid #E3E3E3;
        }
    }
     ::v-deep.customClass{
      .open-link-text{
        text-decoration: underline;
    }
  }
</style>