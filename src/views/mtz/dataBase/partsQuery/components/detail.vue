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
        <div class="export">
            <iButton @click="exoprtTemplate">导出</iButton>
        </div>
        <div class="oneTwoTable">
            <iTableCustom 

            @go-detail="handleSource"
            :data="oneTwoTableData"
            :columns="partNumber"/>
        </div>
         <!-- 分页标签 -->
        <iPagination
        v-update
        @size-change="handleSizeChange($event, historyPage)"
        @current-change="handleCurrentChange($event, historyPage)"
        background
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :current-page='page.currPage'
        :total="page.totalCount"/>
        <iDialog :visible.sync="isShowSource" title="aaaaaa" width="80%" append-to-body>
              <Source />
        </iDialog>
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
  iTableCustom,
  iMessage
} from 'rise'
import { tableSetting,oneTwoPartNumber,partNumber } from './data'
import { pageMixins } from '@/utils/pageMixins'
import {historyExport,historyPage} from '@/api/mtz/database/partsQuery'
import Source from './source'
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
    iDatePicker,
    Source
  },
  props:{
      itemData:{
          type:Object
      },
      clickData:{
          type:Object
      }
  },
  mixins: [pageMixins],
    data(){
        return {
            isShowSource:false,
            value:"",
            tableSetting,
            searchForm:[],
            oneTwoPartNumber,
            partNumber,
            formData:{},
            oneTwoTableData:[]
        }
    },
    mounted(){
        this.formData={...this.clickData}
        this.historyPage()
    },
    methods:{
        historyPage(){
        // 一二次零件号
        historyPage({pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
        assemblyPartnum:this.clickData.assemblyPartnum,
        assemblySupplierSap:this.clickData.assemblySupplierSap,
        materialCode:this.clickData.materialCode,
        ruleNo:this.clickData.ruleNo}).then(res=>{
          if(res.result){
            this.oneTwoTableData=res.data
            this.page.currPage = res.pageNum;
            this.page.pageSize = res.pageSize;
            this.page.totalCount = res.total || 0;
          }else{
            this.$message({type:'error',message:res.desZh})
          }
        })
      },

      //来源详情 
      handleSource(){
          this.isShowSource=true
      },
       exoprtTemplate(){
           historyExport({
              assemblyPartnum:this.clickData.assemblyPartnum,
              assemblySupplierSap:this.clickData.assemblySupplierSap,
              materialCode:this.clickData.materialCode,
              ruleNo:this.clickData.ruleNo
           })
       },
       
    }
}
</script>

<style lang="scss" scoped>
    .partNumberPage{
        padding-bottom: 20px;
        .oneTwoTable{
            
        }
    }
     ::v-deep.customClass{
      .open-link-text{
        text-decoration: underline;
    }
  }
  .export{
      padding: 25px 0;
      border-top: 1px solid #E3E3E3;
      width: 100%;
      display: flex;
      justify-content: flex-end;
  }
</style>