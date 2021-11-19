<template>
  <div>
    <theSearch
      @searchTableList="handleResetDate"
      @handleSearchReset="handleSearchReset"
      :userNewsClassify='userNewsClassify'
      :form="form"
    />
    <theTable
      ref="theTable"
      :page="page"
      :total="page.total"
      :tableListData="tableListData"
      :tableLoading="tableLoading"
      :newsClassifyCode="newsClassifyCode"
      @handleChangePage="handleChangePage"
      @flushTable="handleFlushTable"
      @handleChangeSize="handleChangeSize"
    />
  </div>
</template>

<script>
import { iCard } from "rise";
import theSearch from "./components/theSearch.vue";
import theTable from "./components/theTable.vue";
import { pageMixins } from "@/utils/pageMixins";
import {
  getSupplierInfo,
} from "@/api/news/uploadFile";
import {findTopicPage,findAdminPermission} from "@/api/news/news";
export default {
    mixins: [pageMixins],
  components: {
    theSearch,
    theTable,
  },
  data() {
    return {
      form: {
        name:'',
        category:null,
        status:null,
        startPublishDate:null,
        endPublishDate:null,
        },
      tableListData:[],
      selectTableList:[],
      userNewsClassify:[],
      newsClassifyCode:[],
      tableLoading:false,
    };
  },
  mounted(){
    this.handleResetDate();
    findAdminPermission().then(res=>{
      this.userNewsClassify = res?.filter(item=>{return item.code<4});
      this.newsClassifyCode = this.userNewsClassify?.map((item) => item.code);
    })
  },
  methods: {
    handleResetDate(){
      this.page.currPage = 1;
      this.page.pageSize=10;
      let params={
        ...this.form,
        pageNum:1,
        pageSize:10
        }
      this.query(params);
    },
    handleChangePage(e){
      this.page.currPage = e;
      let param = {
        ...this.form,
        pageNum: this.page.currPage,
        pageSize: this.page.pageSize,
      };
      this.query(param);
    },
    handleChangeSize(e){
      this.page.currPage = 1;
      this.page.pageSize=e;
      let param = {
        ...this.form,
        pageNum: this.page.currPage,
        pageSize: this.page.pageSize,
      };
      this.query(param);
    },
    handleSearchReset() {
      this.form = {};
      this.handleResetDate();
    },
    handleFlushTable(){
      this.handleResetDate();
    },
    query(e){
      this.tableLoading=true;
      findTopicPage(e).then((res) => {
        this.tableListData=res?.data
        this.page.total = res?.total;
        this.tableLoading=false;
      });
      
    }
  },
};
</script>
<style lang="scss" scoped>
</style>
