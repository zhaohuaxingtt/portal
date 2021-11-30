<!--维护供应商名单--->
<template>
  <i-page>
    <i-search @sure='queryMaintenanceSupplier' @reset='reset' class='margin-bottom20'>
      <el-form :model='queryForm'>
        <el-form-item :label="language('LK_YQ_GONGYINGSANGZHONGWENJIANCHEN', '供应商中文名简称')">
          <i-input v-model='queryForm.a'   :placeholder="language('LK_QINGSHURU','请输入')" clearable></i-input>
        </el-form-item>
        <el-form-item :label="language('LK_YQ_GONGYINGSANGYINGWENJIANCHEN', '供应商英文名简称')">
          <i-input v-model='queryForm.a'   :placeholder="language('LK_QINGSHURU','请输入')" clearable></i-input>
        </el-form-item>
        <el-form-item :label="language('LK_YQ_JITUANJIANCHEN', '集团简称')">
          <i-input v-model='queryForm.a'   :placeholder="language('LK_QINGSHURU','请输入')" clearable></i-input>
        </el-form-item>
        <el-form-item :label="language('LK_YQ_TIANJIAFANGSHI', '添加方式')">
          <i-select  v-model.trim="queryForm.c" :placeholder="language('LK_YQ_QINGXUNAZE','请选择')">

          </i-select>
        </el-form-item>
      </el-form>
    </i-search>
    <i-card>
      <span class="font18 font-weight">{{ language('LK_YQ_WEIHUYUQINGJIANCESHANG', '维护舆情检测商') }}</span>
      <div class="editControl floatright margin-bottom20">
        <i-button @click="addNewSupplier" > {{language('LK_YQ_XINZENG','新增')}}</i-button>
        <i-button @click="deleteSupplier" > {{language('LK_YQ_SHANCHU','删除')}}</i-button>
        <i-button @click="exportAllSupplier" > {{language('LK_YQ_DAOCHUQUANBU','导出全部')}}</i-button>
      </div>
      <tablelist
        height="400"
        index
        :selection="true"
        :tableData="maintenanceSupplierDatas"
        :tableTitle="MaintenanceSupplierColumns"
        :lang="true"
        :selectConfig="selectConfig"
        :indexConfig="indexConfig"
        v-loading="tableLoading"
        @handleSelectionChange="handleSelectionChange"
      >

      </tablelist>
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

  </i-page>

</template>

<script>
import { iSearch,iInput,iCard,iButton,iSelect,iPagination,iPage } from "rise";
import {selectConfig, indexConfig,MaintenanceSupplierColumns} from '../config/data'
import {pageMixins} from '@/utils/pageMixins'
import tablelist from 'rise/web/components/iFile/tableList';

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
    iPage,
    tablelist,
  },
  data(){
    return {
      MaintenanceSupplierColumns,
      selectConfig,
      indexConfig,
      maintenanceSupplierDatas:[],
      queryForm:{},
      tableLoading:false,
    }
  },
  methods:{
    handleSelectionChange(val){

    },
    //查询
    queryMaintenanceSupplier(){

    },
    reset(){

    },
    //新增供应商
    addNewSupplier(){
    this.maintenanceSupplierDatas.push({})
    },
    //删除供应商
    deleteSupplier(){

    },
    //导出全部
    exportAllSupplier(){

    }
  }
}
</script>

<style scoped>

</style>