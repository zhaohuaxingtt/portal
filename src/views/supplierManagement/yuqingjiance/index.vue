<!--舆情检测-->
<template>
 <iPage >
   <iNavMvp :list="tabRouterList" class="margin-bottom20" routerPage :lev="1" />
   <!--搜索区-->
   <i-search class="margin-bottom20 margin-top10" @sure='queryPublicOpinionDetection' @reset='resetQuery'>
    <el-form :model='queryForm'>
       <el-form-item :label="language('LK_YQ_GONGYINGSANGMINGCHEN', '供应商名称')">
         <i-input v-model='queryForm.a'   :placeholder="language('LK_QINGSHURU','请输入')" clearable></i-input>
       </el-form-item>
      <el-form-item :label="language('LK_YQ_TONGYISHEHUIXINYONGDAIMA', '统一社会信用代码')">
        <i-input v-model='queryForm.b'   :placeholder="language('LK_QINGSHURU','请输入')" clearable></i-input>
      </el-form-item>
      <el-form-item :label="language('LK_YQ_XIANGGUANKESHI', '相关科室')">
        <i-select  v-model.trim="queryForm.c" :placeholder="language('LK_YQ_QINGXUNAZE','请选择')">

        </i-select>
      </el-form-item>
      <el-form-item :label="language('LK_YQ_SHIFOUMINGAN', '是否敏感')">
        <i-select  v-model.trim="queryForm.c" :placeholder="language('LK_YQ_QINGXUNAZE','请选择')">

        </i-select>
      </el-form-item>
      <el-form-item :label="language('LK_YQ_NEIRONGFENLEI', '内容分类')">
        <i-select  v-model.trim="queryForm.c" :placeholder="language('LK_YQ_QINGXUNAZE','请选择')">

        </i-select>
      </el-form-item>

      <el-form-item :label="language('LK_YQ_FABURIQIQI', '发布日期起')">
        <iDatePicker   v-model.trim="queryForm.c" :placeholder="language('LK_YQ_QINGXUANZE','请选择')">

        </iDatePicker>
      </el-form-item>
      <el-form-item :label="language('LK_YQ_FABURIQIZHI', '发布日期止')">
        <iDatePicker   v-model.trim="queryForm.c" :placeholder="language('LK_YQ_QINGXUANZE','请选择')">

        </iDatePicker>
      </el-form-item>
    </el-form>

   </i-search>
   <!---数据展示区-->
   <i-card>
     <span class="font18 font-weight">{{ language('LK_YQ_XIANGQINGLIEBIAO', '详情列表') }}</span>
     <div class="editControl floatright margin-bottom20">
       <span  class=" margin-left10 margin-right10">
            <Upload
              hideTip
              :buttonText="language('LK_YQ_DAORU','导⼊')"
              :onHttpUploaded="onHttpUploaded"
              :accept="'.xlsx,.xls'"
            />
          </span>
       <i-button @click="" > {{language('LK_YQ_DAOCHUQUANBU','导出全部')}}</i-button>
       <i-button @click="" > {{language('LK_YQ_SHANCHU','删除')}}</i-button>
       <i-button @click="" > {{language('LK_YQ_FABUYUQINGZHOUBAO','发布舆情周报')}}</i-button>
       <i-button @click="" > {{language('LK_YQ_FENXIYUQINGJIEGUO','分析舆情结果')}}</i-button>
       <i-button @click="maintenanceSupplier" > {{language('LK_YQ_WEIHUGONGYINGSHANGMINGDAN','维护供应商名单')}}</i-button>
     </div>
     <tablelist
       height="400"
       index
       :selection="true"
       :tableData="publicOpinionDetectionDatas"
       :tableTitle="publicOpinionDetectionColumns"
       :lang="true"
       :selectConfig="selectConfig"
       :indexConfig="indexConfig"
       v-loading="tableLoading"
       @handleSelectionChange="handleSelectionChange"
     ></tablelist>
     <div class="pagination">
       <iPagination v-update class="pagination"
                    @size-change="handleSizeChange($event, )"
                    @current-change="handleCurrentChange($event, )"
                    background
                    :current-page="page.currPage"
                    :page-sizes="page.pageSizes"
                    :page-size="page.pageSize"
                    :layout="page.layout"
                    :total="page.totalCount"/>
     </div>
   </i-card>
 </iPage>
</template>

<script>
import { iSearch,iInput,iCard,iButton,iSelect,iPagination,iDatePicker,iPage,iNavMvp } from "rise";
import {selectConfig, indexConfig,publicOpinionDetectionColumns} from './config/data'
import tablelist from 'rise/web/components/iFile/tableList';
import {pageMixins} from '@/utils/pageMixins'
import { tabRouterList } from '../../frmRating/data';
import Upload from '@/components/Upload'

export default {
  name: 'index',
  mixins: [pageMixins],
  components:{
    iSearch,
    iInput,
    iCard,
    iButton,
    iSelect,
    iPagination,
    iDatePicker,
    tablelist,
    iPage,
    iNavMvp,
    Upload
  },
  data(){
    return {
      tabRouterList,
      selectConfig,
      indexConfig,
      queryForm:{},
      tableLoading:false,
      publicOpinionDetectionColumns,
      publicOpinionDetectionDatas:[],
    }
  },
  methods:{
    //查询
    queryPublicOpinionDetection(){

    },
    //重置
    resetQuery(){

    },
    handleSelectionChange(val){

    },
    onHttpUploaded(formData,content){
      const newFormData = new FormData()
      newFormData.append('file', content.file)
    },
    //维护供应商
    maintenanceSupplier(){
      let routeData = this.$router.resolve({
        path: `/supplier/maintenancesupplier`,
      })
      window.open(routeData.href, '_blank')
    },
  }
}
</script>

<style scoped>

</style>