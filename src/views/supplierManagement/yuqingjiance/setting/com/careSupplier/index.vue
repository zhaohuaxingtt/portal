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
            <iInput :placeholder="$t('LK_QINGSHURU')" v-model="form.code"></iInput>
        </el-form-item>
        <el-form-item :label="$t('SUPPLIER_KESHI')">
            <iSelect :placeholder="$t('LK_QINGXUANZE')" v-model="form.keshi">
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
              v-model="form.createTime" />
        </el-form-item>
      </el-form>
    </i-search>
    <iCard class="margin-top20" :title="$t('我关注的供应商')">
      <template v-slot:header-control>
        <iButton @click="add" >{{language("TIANJIA", "添加")}}</iButton>
        <iButton @click="del" >{{ $t("移除") }}</iButton>
      </template>

      <tableList
        class="margin-top20"
        :tableData="tableData"
        :tableTitle="tableTitle"
        :tableLoading="loading"
        border
        @handleSelectionChange="handleSelectionChange"
        :index="true">
          <template slot="ap8pAmt" slot-scope="scope">
            <span class="color">取消订阅</span>
            <!-- <span class="color">订阅</span> -->
            &nbsp;|&nbsp; 
            <span class="color">移除</span>
          </template>
      </tableList>
      <iPagination @size-change="handleSizeChange($event, getTableList)"
                    @current-change="handleCurrentChange($event, getTableList)"
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
import { iSearch,iInput,iSelect,iDatePicker,iCard,iButton,iPagination } from "rise"
import tableList from '@/components/commonTable/index.vue';
import { pageMixins } from "@/utils/pageMixins"
import { tableTitle } from "../data";
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
      tableData:[
        {

        }
      ],
      tableTitle,
      form:{
        supplierName:"",
        code:"",
        keshi:"",
        createTime:"",
      },
      keshiList:[]
    }
  },
  methods:{
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