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
        <iButton @click="handleNotRated">{{ $t('LK_XZMB') }}</iButton><!-- 下载导入模板 -->
        <iButton @click="handleNotRated">{{ $t('DAORU') }}</iButton><!-- 导入 -->
        <iButton @click="handleNotRated">{{ $t('SUPPLIER_DAOCHUQUANBU') }}</iButton><!-- 到处全部 -->
        <iButton @click="handleNotRated">{{ $t('MT_SHANCHU') }}</iButton><!-- 删除 -->
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
import { iSearch,iInput,iSelect,iDatePicker,iCard,iButton,iPagination } from "rise"
import {
  pageList
} from "@/api/supplierManagement/yuqingjiance"
import { pageMixins } from '@/utils/pageMixins'
import tableList from '@/components/commonTable/index.vue';
import { tableSetTitle } from "../data"
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
  mixins: [pageMixins],
  data(){
      return{
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
      }
  },
  created(){
    this.getData();
  },
  methods:{
      getData(){
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
        })
      },
      sure(){
        this.getData();
      },
      reset(){

      },
      handleSelectionChange(){

      },
      handleOpenPage(){
          
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