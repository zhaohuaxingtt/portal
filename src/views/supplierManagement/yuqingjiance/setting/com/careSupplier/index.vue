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
            <iSelect :placeholder="$t('LK_QINGXUANZE')" v-model="form.dept" filterable clearable>
                <el-option :value="item.deptId"
                            :label="item.commodity"
                            v-for="item of keshiList"
                            :key="item.deptId">
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
        <iButton @click="addSupplier" v-permission="PORTAL_SUPPLIER_NAV_YUQINGJIANCE_SETTING_WOGUANZHU_ADD">{{language("TIANJIA", "添加")}}</iButton>
        <iButton @click="delSupplier" v-permission="PORTAL_SUPPLIER_NAV_YUQINGJIANCE_SETTING_WOGUANZHU_DEL">{{ $t("移除") }}</iButton>
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
            <span class="color" v-if="(scope.row.subscribeStatus == 1)" @click="subscribe(scope.row,2)" v-permission="PORTAL_SUPPLIER_NAV_YUQINGJIANCE_SETTING_WOGUANZHU_DINGYUE">取消订阅</span>
            <span class="color" v-else @click="subscribe(scope.row,1)" v-permission="PORTAL_SUPPLIER_NAV_YUQINGJIANCE_SETTING_WOGUANZHU_DINGYUE">订阅</span>
            &nbsp;|&nbsp; 
            <span class="color" @click="removeSupplier(scope.row)" v-permission="PORTAL_SUPPLIER_NAV_YUQINGJIANCE_SETTING_WOGUANZHU_DEL">移除</span>
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

    <iDialog
      :title="$t('添加关注供应商')"
      :visible.sync="addSupplierType"
      v-if="addSupplierType"
      width="90%"
      @close="closeDiolog"
    >
      <addSupplierDialog @addSave="addSave" @addCancel="closeDiolog"></addSupplierDialog>
    </iDialog>
  </div>
</template>

<script>
import { iSearch,iInput,iSelect,iDatePicker,iCard,iButton,iPagination,iMessage,iMessageBox,iDialog } from "rise"
import tableList from '@/components/commonTable/index.vue';
import { pageMixins } from "@/utils/pageMixins"
import { tableTitle } from "../data";
import addSupplierDialog from "./addSupplierDialog";

import {
  sentimentUserSupplierPageList,
  updateSubscribe,
  deleteUserSupplier,
  getDeptList
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
    iPagination,
    iDialog,
    addSupplierDialog
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
      },
      keshiList:[],
      releaseTime:[],
      addSupplierType:false,
      selectList:[],
    }
  },
  created(){
    this.init();
  },
  methods:{
    async init(){
      await this.getDept();
      this.getData();
    },
    getDept(){
      getDeptList().then(res=>{
        if(res.result){
            this.keshiList = res.data;
        }
      })
    },
    removeSupplier(row){
      iMessageBox(this.$t("确认移除")).then(() => {
        const list = [row].map(function(e){
          return e.id;
        });
        deleteUserSupplier({
          ids:list
        }).then(res=>{
          if(res.result){
            iMessage.success(res.desZh)
            this.getData();
          }else{
            iMessage.error(res.desZh)
          }
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    addSave(){
      this.addSupplierType = false;
      this.getData();
    },
    closeDiolog(){
      this.addSupplierType = false;
    },
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
      this.selectList = val;
    },
    sure(){
      this.page.currPage = 1;
      this.page.pageSize = 10;
      this.getData();
    },
    reset(){
      this.form = {
        supplierName:"",
        agencyCode:"",
        dept:"",
      }
      this.releaseTime = [];
      this.page.currPage = 1;
      this.page.pageSize = 10;
      this.getData();
    },
    addSupplier(){
      this.addSupplierType = true;
    },
    delSupplier(){
      if(this.selectList.length>0){
        const list = this.selectList.map(function(e){
          return e.id;
        });
        deleteUserSupplier({
          ids:list
        }).then(res=>{
          if(res.result){
            iMessage.success(res.desZh)
            this.getData();
          }else{
            iMessage.error(res.desZh)
          }
        })
      }else{
        iMessage.error(this.$t("请选择需要移除的供应商"))
      }
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
::v-deep .cell>div{
  span:first-child{
    margin-right:0!important;
  }
}
</style>