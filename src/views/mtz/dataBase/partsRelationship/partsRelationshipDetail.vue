<template>
  <div class="partNumberPage">
    <el-form :label-position="labelPosition">
      <el-row :gutter="60">
        <el-col 
          :span="6"
          v-for="(x,index) in partsRelationshipDetailFormData"
          :key="index"
        >
          <el-form-item :label="x.key ? language(x.key, x.name) : x.name" label-width="120px">
            <i-input v-model="bomInfo[x.props]" disabled :placeholder="language('QINGSHURU', '请输入')"></i-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="export"><iButton @click="exportAll">导出</iButton></div>
    <div class="oneTwoTable">
      <tableList
        ref="commonTable"
        :tableData="oneTwoTableData"
        :tableTitle="partsRelationshipDetailTableSetting"
        :index="true"
        :openPageGetRowData="true"
        @handleSelectionChange="handleSelectionChange"
      />
    </div>
      <!-- 分页标签 -->
    <iPagination
    v-update
    @size-change="handleSizeChange($event, getList)"
    @current-change="handleCurrentChange($event, getList)"
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
  iInput,
  iButton,
  iPagination
} from 'rise'
import { partsRelationshipDetailFormData,partsRelationshipDetailTableSetting } from './data'
import { pageMixins } from '@/utils/pageMixins'
import {partPageByBomInfoId,partExportByBomInfoId} from '@/api/mtz/database/partsQuery'
import tableList from '@/components/commonTable';
export default {
  components:{
    iInput,
    iButton,
    iPagination,
    tableList
  },
  props:{
      itemData:{
          type:Object
      },
      bomInfo:{
          type:Object
      }
  },
  mixins: [pageMixins],
    data(){
      return {
        value:"",
        searchForm:[],
        partsRelationshipDetailFormData,
        partsRelationshipDetailTableSetting,
        formData:{},
        oneTwoTableData:[],
        labelPosition: 'left'
      }
    },
    mounted(){
       this.getList()
    },
    methods:{
       handleSizeChange(){

       },
       handleCurrentChange(){

       },
       getList(){
           let dataArr = []
            dataArr.push(this.bomInfo.id)
           partPageByBomInfoId({pageNo: this.page.currPage,pageSize: this.page.pageSize,bomInfoId:dataArr}).then(res=>{
               this.oneTwoTableData=res.data
               this.page.currPage = res.pageNum;
                this.page.pageSize = res.pageSize;
                this.page.totalCount = res.total || 0;
           })
       },
       exportAll(){
           let dataArr = []
            dataArr.push(this.bomInfo.id)
           partExportByBomInfoId({bomInfoId:dataArr})
       }
    }
}
</script>

<style lang="scss" scoped>
    .partNumberPage{
        padding-bottom: 20px;
        .export{
            margin-bottom: 20px;
            padding-top: 20px;
            border-top: 1px solid #E3E3E3;
            display: flex;
            justify-content: flex-end;
        }
    }
</style>