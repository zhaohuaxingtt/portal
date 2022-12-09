<template>
  <div style="padding-bottom: 20px;">
    <iSearch
      @sure="sure"
      @reset="reset"
      >
      <el-form>
        <el-form-item :label="$t('LK_GONGYINGSHANGMINGCHENG1')">
            <iInput :placeholder="$t('LK_QINGSHURU')" v-model="form.supplierName"></iInput>
        </el-form-item>
        <el-form-item :label="$t('UnifySocialCreditCode')">
            <iInput :placeholder="$t('LK_QINGSHURU')" v-model="form.socialcreditNo"></iInput>
        </el-form-item>
      </el-form>
    </iSearch>

    <iCard class="margin-top20">
      <template v-slot:header-control>
        <iButton @click="addBingo" :loading="addLoading">{{ $t('LK_TIANJIA') }}</iButton><!-- 添加 -->
        <iButton @click="cancelClose">{{ $t('MT_QUXIAO') }}</iButton><!-- 取消 -->
      </template>
      <tableList
        :tableData="tableListData"
        :tableTitle="tableSTitle"
        :tableLoading="tableLoading"
        border
        @handleSelectionChange="handleSelectionChange"
        :index="true">
      </tableList>
      <iPagination
          v-update
          class='pagination'
          @size-change='handleSizeChange($event,getData)'
          @current-change='handleCurrentChange($event,getData)'
          background
          :current-page='page.currPage'
          :page-sizes='page.pageSizes'
          :page-size='page.pageSize'
          :layout='page.layout'
          :total='page.totalCount'
        />
    </iCard>
  </div>
</template>

<script>
import { iSearch,iInput,iSelect,iDatePicker,iCard,iButton,iPagination,iMessage } from "rise";
import { pageMixins } from '@/utils/pageMixins'
import { tableSTitle } from "../data"
import tableList from '@/components/commonTable/index.vue';

import {
    addSentimentSuppler,
    getSupplierList
} from "@/api/supplierManagement/yuqingjiance"

export default {
    mixins: [pageMixins],
    components:{
        iSearch,
        iInput,
        iSelect,
        iDatePicker,
        iCard,
        iButton,
        iPagination,
        tableList
    },
    data(){
        return{
            tableSTitle,
            tableListData:[],
            form:{
                supplierName:"",
                socialcreditNo:"",
            },
            tableLoading:false,
            addLoading:false,
            selectList:[],
        }
    },
    created(){
        this.getData();
    },
    methods:{
        sure(){
            this.page.pageSize = 10;
            this.page.currPage = 1;
            this.getData();
        },
        reset(){
            this.form = {
                supplierName:"",
                socialcreditNo:"",
            }
            this.page.pageSize = 10;
            this.page.currPage = 1;
            this.getData();
        },
        addBingo(){
            this.addLoading = true;
            if(this.selectList.length<1){
                iMessage.error(this.$t("请选择需要添加的舆情供应商"))
                this.addLoading = false;
            }else{
                const list = this.selectList.map(function(e){
                    return e.id
                });
                addSentimentSuppler({
                    ids:list
                }).then(res=>{
                    if(res.result){
                        iMessage.success(this.$t(res.desZh))
                        this.$emit("addSave")
                    }else{
                        iMessage.error(this.$t(res.desZh))
                    }
                    this.addLoading = false;
                }).catch(e=>{
                    this.addLoading = false;
                })
            }
        },
        cancelClose(){
            this.$emit("addCancel")
        },
        handleSelectionChange(val){
            this.selectList = val;
        },
        getData(){
            this.tableLoading = true;
            const obj = {
                ...this.form,
                size:this.page.pageSize,
                current:this.page.currPage,
            }
            getSupplierList(obj).then(res=>{
                if(res.result){
                    this.tableListData = res.data;
                    this.page.pageSize = res.pageSize
                    this.page.currPage = res.pageNum
                    this.page.totalCount = res.total
                }
                this.tableLoading = false;
            }).catch(e=>{
                this.tableLoading = false;
            })
        }
    }
}
</script>

<style>

</style>