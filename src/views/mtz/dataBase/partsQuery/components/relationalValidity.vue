<template>
  <div class="partNumberPage">
        <div class="searchoptions">
            <el-form>
                <el-row :gutter="30">
                    <el-col 
                        :span="6"
                        v-for="(x,index) in relationalValidityFormData"
                        :key="index"
                        class="SearchOption"
                    >
                    <iFormItem :label="x.name">
                        <i-input v-model="formData[x.props]" :placeholder="language('QINGSHURU', '请输入')"></i-input>
                    </iFormItem>
                    </el-col>
                </el-row>
                
            </el-form>
            <div>
                <iButton @click="sure">{{language('CHAXUN', '查询')}}</iButton>    
                <iButton @click="reset">{{language('CHONGZHI', '重置')}}</iButton> 
            </div>  
        </div>  
        
        <div class="oneTwoTable">
            <div class="table-tittle">
                <div>
                  关系列表
                  <el-tooltip content="以下高亮零件为本次上传的一二次件关系与历史记录的差异部分，请确认！" placement="top" effect="light">
                    <i class="el-icon-warning-outline titleIcon"></i>
                  </el-tooltip>
                </div>
                <div>
                  <iButton @click="partEnable">{{language('SHENGXIAO', '生效')}}</iButton>    
                  <iButton @click="partDisable">{{language('SHIXIAO', '失效')}}</iButton> 
                </div> 
            </div>
            <!-- <iTableCustom 
            ref="customTable"
            @go-detail="handleSource"
            :data="oneTwoTableData"
            :columns="relationalValidityTableSetting"
            :stripe="false"
            @handle-selection-change="handleSelectChange"/> -->
            <el-table
            ref="customTable"
            :data="oneTwoTableData"
            :row-class-name="rowStyle"
            :stripe="false"
            @selection-change="handleSelectChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
            type="index"
            label="#"
            width="55">
            </el-table-column>
            <el-table-column
              v-for="(item, index) in relationalValidityTableSetting"
              :key="index"
              :prop="item.prop"
              :label="item.label"
              align="center"
              header-align="center">
            </el-table-column>
            <template >
              
            </template>
            </el-table>

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
import { tableSetting,relationalValidityFormData,relationalValidityTableSetting } from './data'
import { pageMixins } from '@/utils/pageMixins'
import {bomRelPage,partDisable,partEnable} from '@/api/mtz/database/partsQuery'
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
            relationalValidityFormData,
            relationalValidityTableSetting,
            formData:{},
            oneTwoTableData:[],
            selectedData:[],
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
        //来源详情 
       handleSource(){
           this.isShowSource=true
       },
       getList(){
           bomRelPage({pageNo: this.page.currPage,pageSize: this.page.pageSize,...this.formData}).then(res=>{
               if(res.result){
                  this.oneTwoTableData=res.data
                  this.page.currPage = res.pageNum;
                  this.page.pageSize = res.pageSize;
                  this.page.totalCount = res.total || 0;
               }
           })
       },
      rowStyle({ row }) {
        return row.isHighlight ? "highlight" : "notHighlight";
      },
       sure(){
           this.getList()
       },
       reset(){
           this.formData={}
           this.getList()
       },
       handleSelectChange(e){
           this.selectedData=e
       },
        // 失效
        partDisable(){
          if(this.selectedData.length == 0) {
            return iMessage.warn(this.language('QZSXZYTSJ', '请至少选中一条数据'))
          }
          
          if(this.selectedData.find(item => {return item.isValid == '否'})) {
            return iMessage.warn(this.language('SHIXIAOMSG', '失效的状态不能点击【失效】按钮，请重新选择”'))
          }
          partDisable({ids:this.selectedData.map(x=>{return x.id})}).then(res=>{
            if(res && res.code == 200){
              this.getList()
              iMessage.success(res.desZh)
            } else iMessage.error(res.desZh)
          })
        },
        // 生效
        partEnable(){
          if(this.selectedData.length == 0) {
            return iMessage.warn(this.language('QZSXZYTSJ', '请至少选中一条数据'))
          }
          if(this.selectedData.find(item => {return item.isValid == '是'})) {
            return iMessage.warn(this.language('SHENGXIAOMSG', '生效的状态不能点击【生效】按钮，请重新选择”'))
          }
          partEnable({ids:this.selectedData.map(x=>{return x.id})}).then(res=>{
            if(res && res.code == 200){
              this.getList()
              iMessage.success(res.desZh)
            } else iMessage.error(res.desZh)
          })
        }
    }
}
</script>

<style lang="scss" scoped>
    .partNumberPage{
        padding-bottom: 20px;
    }
     ::v-deep.customClass{
      .open-link-text{
        text-decoration: underline;
    }
  }
  .searchoptions{
      display: flex;
      justify-content: space-between;
      align-items:center;
  }
  .table-tittle{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 0;
      border-top: 1px solid #E3E3E3;
      div:first-child{
          font-size: 18px;
          font-weight: bold;
          color: #000;
      }
      .titleIcon {
        color: #A0BFFC; 
        font-size: 18px;
        margin-top: 2px; 
        margin-left: 10px;
      }
  }
::v-deep .el-table .highlight{
  background-color: #e0eafd;
}
::v-deep .el-table .notHighlight {
  background-color: #fff;
}

</style>