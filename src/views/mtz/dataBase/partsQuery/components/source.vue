<template>
  <div class="partNumberPage">
        <div class="export"><iButton>导出</iButton></div>
        <div class="oneTwoTable">
            <iTableCustom 
            :data="oneTwoTableData"
            :columns="sourceData"/>
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
import { tableSetting,sourceData } from './data'
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
            sourceData,
            formData:{},
            oneTwoTableData:[]
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

       }
    }
}
</script>

<style lang="scss" scoped>
    .partNumberPage{
        padding-bottom: 20px;
        .export{
            margin-bottom: 20px;
            display: flex;
            justify-content: flex-end;
        }
    }
    
</style>