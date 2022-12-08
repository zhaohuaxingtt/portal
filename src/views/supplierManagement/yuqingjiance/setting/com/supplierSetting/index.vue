<template>
  <div>
    <iSearch
      @sure="sure"
      @reset="reset"
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
                            v-for="item of deptList"
                            :key="item.name">
                </el-option>
            </iSelect>
        </el-form-item>
        <el-form-item :label="$t('添加来源')">
            <iSelect :placeholder="$t('LK_QINGXUANZE')" v-model="form.addType">
                <el-option :value="item.value"
                            :label="$i18n.locale === 'zh'  ? item.label : item.labelE"
                            v-for="item of addFrom"
                            :key="item.value">
                </el-option>
            </iSelect>
        </el-form-item>
        <el-form-item :label="$t('添加时间起止')">
            <iDatePicker value-format="yyyy-MM-dd"
              type="daterange"
              v-model="time" />
        </el-form-item>
      </el-form>
    </iSearch>

    <iCard class="margin-top20" :title="$t('舆情供应商清单')">
      <template v-slot:header-control>
        <iButton @click="handleNotRated">{{ $t('MT_BIANJI') }}</iButton><!-- 编辑 -->
        <iButton @click="handleNotRated">{{ $t('LK_TIANJIA') }}</iButton><!-- 添加 -->
        <iButton @click="download" :loading="loading">{{ $t('LK_XZMB') }}</iButton><!-- 下载导入模板 -->
        <!-- 导入 -->
        <el-upload class="upload"
                   style="display:inline-block;margin:0 10px;"
                   :show-file-list="false"
                   name="multipartFile"
                   with-credentials
                   :on-success="handleAvatarSuccess"
                   :http-request="myUpload">
          <iButton>{{ $t('DAORU') }}</iButton>
        </el-upload>
        <iButton @click="downloadAll" :loading="downloadAllLoading">{{ $t('SUPPLIER_DAOCHUQUANBU') }}</iButton><!-- 到处全部 -->
        <iButton @click="delBtn">{{ $t('MT_SHANCHU') }}</iButton><!-- 删除 -->
      </template>
      <tableList
        :tableData="tableListData"
        :tableTitle="tableSetTitle"
        :tableLoading="tableLoading"
        border
        @handleSelectionChange="handleSelectionChange"
        :index="true">
        <template #addType="scope">
          <span>{{(scope.row.addType==1?"手动添加":scope.row.addType==2?"初步评级":scope.row.addType==3?"手工导入":"")}}</span>
        </template>

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
import { iSearch,iInput,iSelect,iDatePicker,iCard,iButton,iPagination,iMessage } from "rise"
import {
  pageList,
  getTemplate,
  sentimentSupplierImport,
  sentimentSupplierExport,
  deleteByIds
} from "@/api/supplierManagement/yuqingjiance"
import { pageMixins } from '@/utils/pageMixins'
import tableList from '@/components/commonTable/index.vue';
import { tableSetTitle } from "../data"
import resultMessageMixin from '@/mixins/resultMessageMixin';
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
  },
  mixins: [pageMixins,resultMessageMixin],
  data(){
    return{
      downloadAllLoading:false,
      loading:false,
      tableLoading:false,
      tableSetTitle,
      tableListData:[],
      form:{
          supplierName:"",
          agencyCode:'',
          dept:"",
          addType:"",
      },
      time:[],
      deptList:[
        
      ],
      addFrom:[
        {
          value:"1",
          label:"手动添加",
          labelE:"Add Manually"
        },{
          value:"2",
          label:"初步评级",
          labelE:"Preliminary rating"
        },{
          value:"3",
          label:"手工导入",
          labelE:"Manual import"
        },
      ],
      selfOnly:true,
      selectData:[],
    }
  },
  created(){
    this.getData();
  },
  methods:{
    delBtn(){
      if(this.selectData.length<1){
        return iMessage.error(this.$t("请选择需删除的舆情供应商清单"))
      }
      const list = this.selectData.map(function(e){
        return e.id
      })
      deleteByIds({
        ids:list
      }).then(res=>{
        if(res?.result){
          iMessage.success(this.$t(res.desZh))
          this.getData();
        }else{
          iMessage.error(this.$t(res.desZh))
        }
      }).catch(e=>{

      })
    },
    downloadAll(){
      this.downloadAllLoading = true;
      const obj = {
        ...this.form,
        beginTime:this?.time[0]?this.time[0]:"",
        endTime:this?.time[1]?this.time[1]:"",
      }
      sentimentSupplierExport(obj).then(res=>{
        this.downloadAllLoading = false;
      }).catch(e=>{
        this.downloadAllLoading = false;
      })
    },
    async myUpload (content) {
      const loading = this.$loading({
        lock: true,
      });
      const formData = new FormData();
      formData.append('file', content.file);
      const res = await sentimentSupplierImport(formData);
      loading.close()
      this.resultMessage(res, () => {
        this.getData();
      })
    },
    handleAvatarSuccess(){

    },
    download(){
      this.loading = true;
      getTemplate().then(res=>{
        this.loading = false;
      }).catch(e=>{
        this.loading = false;
      })
    },
    getData(){
      this.tableLoading = true;
      const obj = {
        ...this.form,
        beginTime:this?.time[0]?this.time[0]:"",
        endTime:this?.time[1]?this.time[1]:"",
        size:this.page.pageSize,
        current:this.page.currPage,
      }
      pageList(obj).then(res=>{
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
    },
    sure(){
      this.page.currPage = 1;
      this.page.pageSize = 10;
      this.getData();
    },
    reset(){
      this.form = {
        supplierName:"",
        agencyCode:'',
        dept:"",
        addType:"",
      }
      this.time = [];
      this.page.currPage = 1;
      this.page.pageSize = 10;
      this.getData();
    },
    handleSelectionChange(val){
      this.selectData = val;
    },
  }
}
</script>

<style lang="scss" scoped>
::v-deep .cell>div{
  span:first-child{
    margin-right:0!important;
  }
}
</style>