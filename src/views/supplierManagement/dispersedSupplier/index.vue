<template>
  <div>
    <iSearch @sure="sure"
             @reset="reset"  class="margin-bottom20">
      <el-form class="form">
        <el-form-item :label="$t('TERMS_GONGYINGSHANGMINGCHENG')">
          <iInput :placeholder="language('请输入')"
                  v-model="form.socialcreditNo"></iInput>
        </el-form-item>
        <el-form-item :label="$t('SUPPLIER_LINGSHIHAO')">
          <iInput :placeholder="language('请输入')"
                  v-model="form.svwTempCode"></iInput>
        </el-form-item>
        <el-form-item v-if="form.supplierType === 'PP'"
                      :label="$t('ZHENGSHIHAO')">
          <iInput :placeholder="language('请输入')"
                  v-model="form.vwCode">
          </iInput>
        </el-form-item>
        <el-form-item :label="$t('SUPPLIER_SAPHAO')">
          <iInput :placeholder="language('请输入')"
                  v-model="form.sapCode"></iInput>
        </el-form-item>

        <el-form-item :label="language('GONGYINGSHANGBIAOQIAN', '供应商标签')">
          <iSelect multiple
                   collapse-tags
                   filterable
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
            <i-button @click="exportsTable" v-if="showExportsButton" v-permission="SUPPLIER_CHANGEHISTORY_TABLE_EXPORT">{{ $t('LK_XINZENG') }}</i-button>
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
        </tableList>
    </iCard>
  </div>
</template>

<script>
import tableList from '@/components/commonTable'
import { iSearch,iSelect,iInput,iCard,iButton } from "rise";
import { dropDownTagName} from '@/api/supplierManagement/supplierTag/index'
import { tableTitle } from "./data"

export default {
    name:"",
    components:{
        iSearch,
        iSelect,
        iInput,
        iCard,
        iButton,
        tableList
    },
    data(){
        return{
            tableListData:[],
            tableTitle:tableTitle,
            tableLoading:false,
            form:{
                socialcreditNo:"",
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

    },
    methods:{
        openPage(params){
            let routeData = this.$router.resolve({
                path: '/supplier/supplierListDis/supplierDisDetails',
                query: {
                    supplierType: this.form.supplierType || '',
                    subSupplierType: "GP",
                    subSupplierId: params.subSupplierId || '',
                    isShowAll: params.isShowAll || '',
                }
            })
            window.open(routeData.href)
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
        sure(){

        },
        reset(){

        },

    }
}
</script>

<style>

</style>