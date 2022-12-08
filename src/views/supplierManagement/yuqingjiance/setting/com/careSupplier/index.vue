<template>
  <div>
    <i-search
      class='margin-bottom20 margin-top10'
      @sure='sure'
      @reset='reset'
    >
      <el-form>
        <el-form-item :label="$t('LK_GONGYINGSHANGMINGCHENG1')">
            <iInput :placeholder="$t('LK_QINGSHURU')" v-model="form.supplierName"></iInput>
        </el-form-item>
        <el-form-item :label="$t('组织机构代码')">
            <iInput :placeholder="$t('LK_QINGSHURU')" v-model="form.agencyCode"></iInput>
        </el-form-item>
        <el-form-item :label="$t('SUPPLIER_KESHI')">
            <iSelect :placeholder="$t('LK_QINGXUANZE')" v-model="form.dept">
                <el-option :value="item.name"
                            :label="$i18n.locale === 'zh'  ? item.name : item.nameEn"
                            v-for="item of keshiList"
                            :key="item.name">
                </el-option>
            </iSelect>
        </el-form-item>
        <el-form-item :label="$t('发布日期起止')">
            <iDatePicker value-format="yyyy-MM-dd"
              type="daterange"
              v-model="releaseTime" />
        </el-form-item>
      </el-form>
    </i-search>
    <iCard class="margin-top20" :title="$t('我关注的供应商')">
      <template v-slot:header-control>
        <iButton @click="add" >{{language("TIANJIA", "添加")}}</iButton>
        <iButton @click="del" >{{ $t("移除") }}</iButton>
      </template>

      <tableList
        :tableData="tableData"
        :tableTitle="tableTitle"
        :tableLoading="loading"
        border
        @handleSelectionChange="handleSelectionChange"
        :index="true">
          <template slot="subscribeStatus" slot-scope="scope">
            <span>{{(scope.row.subscribeStatus == 1?"已订阅":scope.row.subscribeStatus == 2?"未订阅":"")}}</span>
          </template>
          <template slot="ap8pAmt" slot-scope="scope">
            <span class="color" v-if="(scope.row.subscribeStatus == 1)" @click="subscribe(scope.row,2)">取消订阅</span>
            <span class="color" v-else @click="subscribe(scope.row,1)">订阅</span>
            &nbsp;|&nbsp; 
            <span class="color">移除</span>
          </template>
      </tableList>
      <iPagination @size-change="handleSizeChange($event, getData)"
                    @current-change="handleCurrentChange($event, getData)"
                    :page-sizes="page.pageSizes"
                    :page-size="page.pageSize"
                    :current-page="page.currPage"
                    :total="page.totalCount"
                    :layout="page.layout">
      </iPagination>
    </iCard>
  </div>
</template>

<script>
import { iSearch,iInput,iSelect,iDatePicker,iCard,iButton,iPagination,iMessage,iMessageBox } from "rise"
import tableList from '@/components/commonTable/index.vue';
import { pageMixins } from "@/utils/pageMixins"
import { tableTitle } from "../data";

import {
  sentimentUserSupplierPageList,
  updateSubscribe,
} from "@/api/supplierManagement/yuqingjiance"

export default {
  components:{
    iSearch,
    iInput,
    iSelect,
    iDatePicker,
    iCard,
    iButton,
    tableList,
    iPagination
  },
  mixins: [pageMixins],
  data(){
    return{
      loading:false,
      tableData:[],
      tableTitle,
      form:{
        supplierName:"",
        agencyCode:"",
        dept:"",
        createTime:"",
      },
      keshiList:[],
      releaseTime:[],
    }
  },
  created(){
    this.getData();
  },
  methods:{
    subscribe(val,type){
      if(type == 1){
        this.setDY(val,type)
      }else{
        iMessageBox(this.$t("确认取消订阅？")).then(() => {
          this.setDY(val,type)
        }).catch((err) => {
          console.log(err)
        })
      }
    },
    setDY(val,type){
      const obj = {
        id:val.id,
        subscribeStatus:type
      };
      updateSubscribe(obj).then(res=>{
        if(res?.result){
          iMessage.success(this.$t(res.desZh))
          this.getData();
        }else{
          iMessage.error(this.$t(res.desZh))
        }
      }).catch(e=>{
        iMessage.error(this.$t("APPROVAL.OPERATION_FAILED"))
      })
    },
    getData(){
      this.loading = true;
      const obj = {
        ...this.form,
        beginTime:this?.releaseTime[0]?this?.releaseTime[0]:"",
        endTime:this?.releaseTime[1]?this?.releaseTime[1]:"",
        size:this.page.pageSize,
        current:this.page.currPage,
      }
      sentimentUserSupplierPageList(obj).then(res=>{
        if(res?.result){
          this.tableData = res.data;
          this.page.currPage = res.pageNum;
          this.page.pageSize = res.pageSize;
          this.page.totalCount = res.total;
        }
        this.loading = false;
      }).catch(e=>{
        this.loading = false;
      })
    },
    handleSelectionChange(val){

    },
    getTableList(){

    },
    sure(){

    },
    reset(){

    },
    add(){

    },
    del(){

    }
  }
}
</script>

<style lang="scss" scoped>
.color{
  color:#1660f1;
  cursor: pointer;
  font-weight: bold;
}
</style>