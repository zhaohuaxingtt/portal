<template>
  <div>
    <base-info-card class="margin-bottom20"/>
    <iCard tabCard>
      <template slot="header-control">
        <iButton v-permission="SUPPLIER_CAIGOUFENLEI_TABLE_ADD" @click="add" v-if="showExportsButton" :disabled="disabled">
          {{ $t('LK_XINZENG') }}
        </iButton>
        <iButton v-permission="SUPPLIER_CAIGOUFENLEI_TABLE_DEL" @click="del" v-if="showExportsButton">
          {{ $t('delete') }}
        </iButton>
        <iButton v-permission="SUPPLIER_CAIGOUFENLEI_TABLE_SAVE" @click="save" v-if="showExportsButton">
          {{ $t('LK_BAOCUN') }}
        </iButton>
      </template>
<!--      v-permission="SUPPLIER_BAKN_TABLE"-->
      <table-list :tableData="tableListData" :tableTitle="tableTitle"
                  :tableLoading="tableLoading" @handleSelectionChange="handleSelectionChange" :input-props="inputProps"
                  :index="true"
                  ref="commonTable"
                  border
      >
        <template #procureCagetoryName="scope">
          <iSelect v-model="scope.row.procureCagetoryId" :placeholder="$t('LK_QINGXUANZE')" @change="choise($event,scope.row)">
            <el-option 
              :disabled="item.disabled"
              :value="item.procureCagetoryId"
              :label="item.procureCagetoryName"
              v-for="(item,index) of procureCagetoryList"
              :key="index"
            ></el-option>
          </iSelect>
        </template>
      </table-list>
    </iCard>
  </div>
</template>

<script>
import baseInfoCard from '@/views/generalPage/components/baseInfoCard'
import tableList from '@/components/commonTable';
import { gpProcureRelList,getProcureCategory,gpProcureRelSaveOrUpdate,gpProcureRelDelete } from "@/api/supplier360/purchaseClassification"
import { tableTitle } from "./data";
import { iButton,iCard,iSelect,iMessage } from "rise";

import { generalPageMixins } from '@/views/generalPage/commonFunMixins'

export default {
  mixins: [generalPageMixins],
  components: {
    baseInfoCard,
    tableList,
    iButton,
    iCard,
    iSelect
  },
  data() {
    return {
        tableTitle,
        tableListData:[],
        tableLoading:false,
        inputProps:[],
        choiseList:[],
        procureCagetoryList:[],
        disabled:false,
    }
  },
  created(){
    this.getData();
  },
  methods: {
    getData(){
      this.getList();
    },
    getList(){
      gpProcureRelList(this.$route.query.supplierId).then(res=>{
        if(res.result){
          
          this.tableListData = res.data;

          getProcureCategory().then(res=>{
            this.procureCagetoryList = res.data;

            this.refreshSelect();
          })
        }
      })
    },
    add(){
      this.tableListData.push({
        bigCategoryCode:"",
        bigCategoryName:"",
        procureCagetoryCode:"",
        procureCagetoryName:"",
        procureCagetoryId: "",
        supplierId:this.$route.query.supplierId
      })
    },
    del(){
      var number = [];
      // var list = _.cloneDeep(this.tableListData)
      // for(var i=list.length-1;i>=0;i--){
      //   for(var j=0;j<this.choiseList.length;j++){
      //     if(list[i].procureCagetoryId == this.choiseList[j].procureCagetoryId){
      //       if(list[i])
      //       list.splice(i,1);
      //     }
      //   }
      // }
      this.choiseList.forEach(e=>{
        if(e.id){
          number.push(e.id)
        }
      })

      gpProcureRelDelete(number).then(res=>{
        if(res.result){
          iMessage.success("删除成功")

          gpProcureRelList(this.$route.query.supplierId).then(res=>{
            this.tableListData = res.data;
            this.refreshSelect();
          })
        }
      })
    },
    refreshSelect(){
      this.procureCagetoryList.forEach((ele,index)=>{
        this.procureCagetoryList[index].disabled = false;
        this.tableListData.forEach(e=>{
          if(ele.procureCagetoryId == e.procureCagetoryId){
            this.procureCagetoryList[index].disabled = true;
          }
        })
      })
    },
    save(){
      var data = this.tableListData;
      gpProcureRelSaveOrUpdate(data).then(res=>{
        if(res.result) iMessage.success("保存成功")
        this.getList();
      })
    },
    choise(val,data){
      for(var i=0;i<this.procureCagetoryList.length;i++){
        if(val == this.procureCagetoryList[i].procureCagetoryId){
          // this.$set(this.tableListData,index,{
          data.bigCategoryCode = this.procureCagetoryList[i].bigCategoryCode,
          data.bigCategoryName = this.procureCagetoryList[i].bigCategoryName,
          data.procureCagetoryCode = this.procureCagetoryList[i].procureCagetoryCode,
          data.procureCagetoryId = this.procureCagetoryList[i].procureCagetoryId,
          data.procureCagetoryName = this.procureCagetoryList[i].procureCagetoryName,
          data.supplierId = this.$route.query.supplierId
          // })
          this.refreshSelect();
          break;
        }
      }
    },
    handleSelectionChange(val){
      this.choiseList = val;
    },
  }
}
</script>

<style scoped>
</style>