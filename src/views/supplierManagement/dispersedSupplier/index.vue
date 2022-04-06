<template>
  <div>
    <iSearch @sure="sure"
             @reset="reset"  class="margin-bottom20">
      <el-form class="form">
        <el-form-item :label="$t('TERMS_GONGYINGSHANGMINGCHENG')">
          <iInput :placeholder="language('请输入')"
                  v-model="form.supplierName"></iInput>
        </el-form-item>
        <el-form-item :label="$t('SUPPLIER_LINGSHIHAO')">
          <iInput :placeholder="language('请输入')"
                  v-model="form.svwTempCode"></iInput>
        </el-form-item>
        <el-form-item :label="$t('SUPPLIER_SAPHAO')">
          <iInput :placeholder="language('请输入')"
                  v-model="form.sapCode"></iInput>
        </el-form-item>

        <el-form-item :label="language('GONGYINGSHANGBIAOQIAN', '供应商标签')">
          <iSelect multiple
                   collapse-tags
                   filterable
                   clearable
                   :placeholder="language('请选择')"
                   v-model="form.tagNameList">
            <el-option v-for="item in tagdropDownList"
                       :key="item.code"
                       :label="item.message"
                       :value="item.code">
            </el-option>
          </iSelect>
        </el-form-item>
      </el-form>
    </iSearch>

    <iCard>
        <template slot="header-control">
            <i-button @click="exportsTableAdd" v-if="showExportsButton" v-permission="SUPPLIER_CHANGEHISTORY_TABLE_EXPORT">{{ $t('LK_XINZENG') }}</i-button>
            <i-button @click="exportsTable" v-if="!showExportsButton" v-permission="SUPPLIER_CHANGEHISTORY_TABLE_EXPORT">{{ $t('LK_DAOCHU') }}</i-button>
            <i-button @click="exportsTable" v-if="!showExportsButton" v-permission="SUPPLIER_CHANGEHISTORY_TABLE_EXPORT">{{ $t('MAIL.CANCEL') }}</i-button>

            <i-button @click="tagTab"
                    v-permission="PORTAL_SUPPLIER_GONGYINGSHANGBIAOQIAN">{{ language('GONGYINGSHANGBIAOQIANKU', '供应商标签库') }}</i-button>
            <i-button @click="setTagBtn"
                        v-permission="PORTAL_SUPPLIER_BIAOQIANSHEZHI">{{ language('BIAOQIANSHEZHI', '标签设置') }}</i-button>
            <i-button @click="synchro">{{ language('TONGBUSAP', '同步SAP') }}</i-button>
        </template>
        
        <tableList :tableData="tableListData"
                :tableTitle="tableTitle"
                :tableLoading="tableLoading"
                @handleSelectionChange="handleSelectionChange"
                :openPageProps="'nameZh'"
                @openPage="openPage"
                border
                :fixed="true"
                :index="true"
                :openPageGetRowData="true"
                :highlightCurrentRow="true"
                >
          <template slot="yewuType">
            <span>{{$t("FENSANCAIGOU")}}</span>
          </template>
          <template slot="supplierType" slot-scope="scope">
            <span>{{scope.row.supplierType == "GP"?$t('YIBANGONGYINGSHANG'):''}}</span>
          </template>
        </tableList>
        <iPagination v-update
                   @size-change="handleSizeChange($event, getTableList)"
                   @current-change="handleCurrentChange($event, getTableList)"
                   background
                   :page-sizes="page.pageSizes"
                   :page-size="page.pageSize"
                   :layout="page.layout"
                   :current-page="page.currPage"
                   :total="page.totalCount" />
    </iCard>
  </div>
</template>

<script>
import tableList from '@/components/commonTable'
import { iSearch,iSelect,iInput,iCard,iButton,iPagination } from "rise";
import { pageMixins } from '@/utils/pageMixins'

import { dropDownTagName,pageInner} from '@/api/supplierManagement/supplierTag/index'
import { tableTitle } from "./data"

export default {
    name:"",
    mixins: [pageMixins],
    components:{
        iSearch,
        iSelect,
        iInput,
        iCard,
        iButton,
        tableList,
        iPagination
    },
    data(){
        return{
            tableListData:[],
            tableTitle:tableTitle,
            tableLoading:false,
            form:{
                supplierName:"",
                svwTempCode:"",
                vwCode:"",
                sapCode:"",
                tagNameList:[],
            },
            tagdropDownList: [],
            showExportsButton:true,
        }
    },
    created(){
      this.changTag();
      this.getTableList();
    },
    methods:{
      exportsTableAdd(){
        this.$router.push({path: '/supplier/supplierListDis/supplierDisDetails', query: {subSupplierType: "GP"}})
      },
      openPage(params){
        this.$router.push({path: '/supplier/supplierListDis/supplierDisDetails', query: {
          supplierType: "GP",
          subSupplierType: "GP",
          subSupplierId: params.subSupplierId || '',
        }})
      },
      handleSelectionChange(){

      },
      changTag () {
          this.form.tagNameList = []
          //获取标签列表
          dropDownTagName({ isMeRelated: 0 }).then((res) => {
              if (res && res.code == 200) {
              this.tagdropDownList = res.data
              }
          })
      },
      getTableList(){
        this.tableLoading = true;
        var data = {
          ...this.form,
          pageNo: this.page.currPage,
          pageSize: this.page.pageSize,
        }
        pageInner(data).then(res=>{
          if(res.result){
            this.tableListData = res.data.list;
            this.page.currPage = res.pageNum
            this.page.pageSize = res.pageSize
            this.page.totalCount = res.total

          }else{
            
          }
          this.tableLoading = false;
        })
      },
      sure(){
        this.getTableList();
      },
      reset(){
        this.form = {
          socialcreditNo:"",
          svwTempCode:"",
          vwCode:"",
          sapCode:"",
          tagNameList:[],
        }
      },

    }
}
</script>

<style>

</style>