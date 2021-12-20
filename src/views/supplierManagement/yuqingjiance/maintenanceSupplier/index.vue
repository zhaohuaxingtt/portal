<!--维护供应商名单--->
<template>
  <i-page>
    <i-search @sure='queryMaintenanceSupplier' @reset='reset' class='margin-bottom20'>
      <el-form :model='queryForm' ref="MaintenanceSupplierQueryFormRef">
        <el-form-item :label="language('LK_YQ_GONGYINGSANGZHONGWENJIANCHEN', '供应商中文名简称')" prop='shortNameZh'>
          <i-input v-model='queryForm.shortNameZh'   :placeholder="language('LK_QINGSHURU','请输入')" clearable></i-input>
        </el-form-item>
        <el-form-item :label="language('LK_YQ_GONGYINGSANGYINGWENJIANCHEN', '供应商英文名简称')" prop='shortNameEn'>
          <i-input v-model='queryForm.shortNameEn'   :placeholder="language('LK_QINGSHURU','请输入')" clearable></i-input>
        </el-form-item>
        <el-form-item :label="language('LK_YQ_JITUANJIANCHEN', '集团简称')" prop='groupAbb'>
          <i-input v-model='queryForm.groupAbb'   :placeholder="language('LK_QINGSHURU','请输入')" clearable></i-input>
        </el-form-item>
        <el-form-item :label="language('LK_YQ_TIANJIAFANGSHI', '添加方式')" prop='addType'>
          <i-select  v-model.trim="queryForm.addType" :placeholder="language('LK_YQ_QINGXUNAZE','请选择')">
            <el-option
              v-for="item in addTypes"
              :key="item.code"
              :label="item.name"
              :value="item.code">
            </el-option>
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
        <template #nameZh='scope'>
          <i-input v-if='scope.row.isEdit' v-model='scope.row.nameZh'></i-input>
          <span v-else>{{scope.row.nameZh}}</span>
        </template>
        <template #shortNameZh='scope'>
          <i-input v-if='scope.row.isEdit' v-model='scope.row.shortNameZh'></i-input>
          <span v-else>{{scope.row.shortNameZh}}</span>
        </template>
        <template #nameEn='scope'>
          <i-input v-if='scope.row.isEdit' v-model='scope.row.nameEn'></i-input>
          <span v-else>{{scope.row.nameEn}}</span>
        </template>
        <template #shortNameEn='scope'>
          <i-input v-if='scope.row.isEdit' v-model='scope.row.shortNameEn'></i-input>
          <span v-else>{{scope.row.shortNameEn}}</span>
        </template>
        <template #socialcreditNo='scope'>
          <i-input v-if='scope.row.isEdit' v-model='scope.row.socialcreditNo'></i-input>
          <span v-else>{{scope.row.socialcreditNo}}</span>
        </template>
        <template #opinionGroup='scope'>
          <i-input v-if='scope.row.isEdit' v-model='scope.row.opinionGroup'></i-input>
          <span v-else>{{scope.row.opinionGroup}}</span>
        </template>
        <template #groupAbb='scope'>
          <i-input v-if='scope.row.isEdit' v-model='scope.row.groupAbb'></i-input>
          <span v-else>{{scope.row.groupAbb}}</span>
        </template>
        <template #opinionGroupEn='scope'>
          <i-input v-if='scope.row.isEdit' v-model='scope.row.opinionGroupEn'></i-input>
          <span v-else>{{scope.row.opinionGroupEn}}</span>
        </template>
        <template #shareholder='scope'>
          <i-input v-if='scope.row.isEdit' v-model='scope.row.shareholder'></i-input>
          <span v-else>{{scope.row.shareholder}}</span>
        </template>
        <template #addType='scope'>
          <span>{{scope.row.addType?(scope.row.addType==1||scope.row.addType=='手动添加'?'手动添加':'初步评级'):''}}</span>
        </template>
        <template #EP5='scope'>
          <a class="link-underline" @click='editeMaintenanceSupplier(scope.row)' v-if='scope.row.addType==1&&!scope.row.isEdit'>编辑</a>
          <a class="link-underline" @click='saveMaintenanceSupplier(scope.row)'  v-if='scope.row.addType==1&&scope.row.isEdit'>保存</a>
        </template>


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
import {
  addNewOpinionSupplier,
  deleteOpinionSupplier,
  queryopinionSupplier,
  updateOpinionSupplier
} from '@/api/supplierManagement/publicOpinionMonitoring'

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
      selectMaintenanceSupplierDatas:[],
      queryForm:{
        pageNo:1,
        pageSize:10,
        addType:null,//添加方式
        groupAbb:null,//集团简称
        shortNameEn:null,//供应商简称（英）
        shortNameZh:null,//供应商简称（中）
      },
      tableLoading:false,
      addTypes:[
        {code:null,name:'全部'},
        {code:1,name:'手动添加'},
        {code:2,name:'初步评级'}
      ],


    }
  },
  created() {
    this.loadMaintenanceSupplier()
  },
  methods:{

    handleSelectionChange(val){
    this.selectMaintenanceSupplierDatas=val
    },
    //查询
    queryMaintenanceSupplier(){
      this.loadMaintenanceSupplier()
    },
    loadMaintenanceSupplier(){
      this.queryForm.current = this.page.currPage
      this.queryForm.size = this.page.pageSize
      queryopinionSupplier(this.queryForm).then(res=>{
        if(res.code==200){
          this.maintenanceSupplierDatas = res.data.map(v=>{
            return {...v,isEdit:false}
          })
        }
        this.page.totalCount = res.total
      })
    },
    reset(){
      this.$refs.MaintenanceSupplierQueryFormRef.resetFields()
      this.loadMaintenanceSupplier()
    },
    //新增供应商
    addNewSupplier(){
    this.maintenanceSupplierDatas.push({isEdit:true,addType:1})
    },
    //编辑供应商
    editeMaintenanceSupplier(row){
      row.isEdit = !row.isEdit;
    },
    //保存
    saveMaintenanceSupplier(row){
      if(row.id){//修改
        updateOpinionSupplier(row).then(res=>{
          if(res.code==200){
            this.$message.success(res.desZh)
            this.loadMaintenanceSupplier()
          }else{
            this.$message.error(res.desZh)
          }
        })
      }else{//添加
        addNewOpinionSupplier(row).then(res=>{
          if(res.code==200){
            this.$message.success(res.desZh)
            this.loadMaintenanceSupplier()
          }else{
            this.$message.error(res.desZh)
          }
        })
      }

    },
    //删除供应商
    deleteSupplier(){
      if(this.selectMaintenanceSupplierDatas.length<=0||this.selectMaintenanceSupplierDatas==null){
        return this.$message.error(this.language('LK_YQ_QINGZHISHAOXUANZEYITIAOSHUJU','请至少选择一条数据'))
      }
      let ids=this.selectMaintenanceSupplierDatas.map(item=>item.id).join(',')
      this.$confirm('确认要删除选中的供应商信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteOpinionSupplier(ids).then(res=>{
          if(res.code==200){
            this.$message.success(res.desZh)
            this.loadMaintenanceSupplier()
          }else{
            this.$message.error(res.desZh)
          }
        })
      }).catch(() => {
      });
    },
    //导出全部
    exportAllSupplier(){

    }
  }
}
</script>

<style scoped>

</style>