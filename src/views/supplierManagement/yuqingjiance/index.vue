<!--舆情检测-->
<template>
  <iPage>
    <iNavMvp
      :list='tabRouterList'
      class='margin-bottom20'
      routerPage
      :lev='1'
    />
    <!--搜索区-->
    <i-search
      class='margin-bottom20 margin-top10'
      @sure='queryPublicOpinionDetection'
      @reset='resetQuery'
    >
      <el-form :model='queryForm' ref='queryOpinionMonitoringFormRef'>
        <el-form-item :label="language('LK_YQ_GONGYINGSANGMINGCHEN', '供应商名称')" prop='name'>
          <i-input
            v-model='queryForm.name'
            :placeholder="language('LK_QINGSHURU', '请输入')"
            clearable
          ></i-input>
        </el-form-item>
        <el-form-item :label="language('LK_YQ_TONGYISHEHUIXINYONGDAIMA', '统一社会信用代码')" prop='socialcreditNo'>
          <i-input
            v-model='queryForm.socialcreditNo'
            :placeholder="language('LK_QINGSHURU', '请输入')"
            clearable
          ></i-input>
        </el-form-item>
        <el-form-item :label="language('LK_YQ_XIANGGUANKESHI', '相关科室')" prop='existSectionName'>
          <i-select
            v-model.trim='queryForm.existSectionName'
            :placeholder="language('LK_YQ_QINGXUNAZE', '请选择')"
          >
          </i-select>
        </el-form-item>
        <el-form-item :label="language('LK_YQ_SHIFOUMINGAN', '是否敏感')" prop='isSensitive'>
          <i-select
            v-model.trim='queryForm.isSensitive'
            :placeholder="language('LK_YQ_QINGXUNAZE', '请选择')"
          >
            <el-option
              v-for="item in sensitives"
              :key="item.code"
              :label="item.name"
              :value="item.code">
            </el-option>
          </i-select>
        </el-form-item>
        <el-form-item :label="language('LK_YQ_NEIRONGFENLEI', '内容分类')" prop='contentClassification'>
          <i-select
            class="multipleSelect"
            v-model.trim='queryForm.contentClassification'
            multiple
            collapse-tags
            :placeholder="language('LK_YQ_QINGXUNAZENEIRONGFENLEI', '请选择内容分类')"
          >
            <el-option
              v-for="item in classifications"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </i-select>
        </el-form-item>

        <el-form-item :label="language('LK_YQ_FABURIQIQI', '发布日期起')" prop='releaseDateStart'>
          <iDatePicker
            v-model.trim='queryForm.releaseDateStart'
            :picker-options="expireTimeOption"
            type="date"
            value-format="yyyy-MM-dd"
            :placeholder="language('LK_YQ_QINGXUANZE', '请选择')"
          >
          </iDatePicker>
        </el-form-item>
        <el-form-item :label="language('LK_YQ_FABURIQIZHI', '发布日期止')" prop='releaseDateEnd'>
          <iDatePicker
            v-model.trim='queryForm.releaseDateEnd'
            :picker-options="expireTimeOption"
            type="date"
            value-format="yyyy-MM-dd"
            :placeholder="language('LK_YQ_QINGXUANZE', '请选择')"
          >
          </iDatePicker>
        </el-form-item>
      </el-form>
    </i-search>
    <!---数据展示区-->
    <i-card>
      <span class='font18 font-weight'>{{
          language('LK_YQ_XIANGQINGLIEBIAO', '详情列表')
        }}</span>
      <div class='editControl floatright margin-bottom20'>
        <span class='margin-left10 margin-right10' v-permission="PORTAL_SUPPLIER_NAV_YUQINGJIANCE_DAORU">
          <Upload
            hideTip
            :buttonText="language('LK_YQ_DAORU', '导⼊')"
            :onHttpUploaded='onHttpUploaded'
            :accept="'.xlsx,.xls'"
          />
        </span>
        <i-button @click='' v-permission="PORTAL_SUPPLIER_NAV_YUQINGJIANCE_DAOCHUQUANBU">
          {{ language('LK_YQ_DAOCHUQUANBU', '导出全部') }}
        </i-button>
        <i-button @click='deleteOpinionMonitoring()' v-permission="PORTAL_SUPPLIER_NAV_YUQINGJIANCE_DEL"> {{ language('LK_YQ_SHANCHU', '删除') }}</i-button>
        <i-button @click='' v-permission="PORTAL_SUPPLIER_NAV_YUQINGJIANCE_FABUYUQINGZHOUBAO">
          {{ language('LK_YQ_FABUYUQINGZHOUBAO', '发布舆情周报') }}
        </i-button>
        <i-button @click='updateItemDate()' v-permission="PORTAL_SUPPLIER_NAV_YUQINGJIANCE_FENXIYUQINGJIEGUO">
          {{ language('LK_YQ_FENXIYUQINGJIEGUO', '分析舆情结果') }}
        </i-button>
        <i-button @click='maintenanceSupplier()' v-permission="PORTAL_SUPPLIER_NAV_YUQINGJIANCE_WHGYSMD">{{ language('LK_YQ_WEIHUGONGYINGSHANGMINGDAN', '维护供应商名单') }}</i-button>
      </div>


      <tablelist
        height='400'
        index
        :selection='true'
        :tableData='publicOpinionDetectionDatas'
        :tableTitle='publicOpinionDetectionColumns'
        :lang='true'
        :selectConfig='selectConfig'
        :indexConfig='indexConfig'
        v-loading='tableLoading'
        @handleSelectionChange='handleSelectionChange'
      >
        <template #name='scope'>
          <a class="link-underline" @click='updateItemData(scope.row)'>{{scope.row.name}}</a>
        </template>
      </tablelist>
      <div class='pagination'>
        <iPagination
          v-update
          class='pagination'
          @size-change='handleSizeChange($event,loadPublicOpinionDetection)'
          @current-change='handleCurrentChange($event,loadPublicOpinionDetection)'
          background
          :current-page='page.currPage'
          :page-sizes='page.pageSizes'
          :page-size='page.pageSize'
          :layout='page.layout'
          :total='page.totalCount'
        />
      </div>
    </i-card>
    <!-- 弹窗 -->
    <yuqingjianceDialog v-if='opinionMonitoringId' :opinionMonitoringId='opinionMonitoringId' v-model='dialogVisble' @refrshPage='loadPublicOpinionDetection'></yuqingjianceDialog>

  </iPage>
</template>

<script>
import {
  iSearch,
  iInput,
  iCard,
  iButton,
  iSelect,
  iPagination,
  iDatePicker,
  iPage,
  iNavMvp
} from 'rise'
import {
  selectConfig,
  indexConfig,
  publicOpinionDetectionColumns
} from './config/data'
import tablelist from 'rise/web/components/iFile/tableList'
import { pageMixins } from '@/utils/pageMixins'
import { tabRouterList } from '../../frmRating/data'
import yuqingjianceDialog from './components/yuqingjianceDialog'
import Upload from '@/components/Upload'
import {
  deleteOpinionMonitorings,
  getContentCategory,
  importOpinionMonitorings,
  queryPublicOptionMonitoring
} from '@/api/supplierManagement/publicOpinionMonitoring'

export default {
  name: 'index',
  mixins: [pageMixins],
  components: {
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
    yuqingjianceDialog,
    Upload
  },
  data() {
    return {
      tabRouterList,
      selectConfig,
      indexConfig,
      queryForm: {
        pageNo: 1,
        pageSize: 10,
        title: null,//标题
        socialcreditNo: null,//统一社会编码
        shortName: null,//供应商简称
        releaseDateStart: null,//发布日期起
        releaseDateEnd: null,//发布日期止
        name: null,//供应商名称
        isSensitive: null,//是否敏感
        existSectionName: null,//相关科室名称(逗号隔开)
        existSectionId: null,//相关科室ID(逗号隔开)
        contentClassification: [],//内容分类

      },
      tableLoading: false,
      publicOpinionDetectionColumns,
      publicOpinionDetectionDatas: [],
      dialogVisble: false,
      classifications:[],//内容分类
      sensitives:[{code:null,name:'全部'},{code:0,name:'否'},{code:1,name:'是'}],
      expireTimeOption: {
        disabledDate (date) {
          //disabledDate 文档上：设置禁用状态，参数为当前日期，要求返回 Boolean
          return date.getTime() > Date.now();
        }
      },
      selectPublicOpinionDetectionDatas:[],//选中结果集合
      opinionMonitoringId:null,
    }
  },
  created() {
    this.loadPublicOpinionDetection()
    this.loadContentCategory()
  },
  methods: {
    //查询
    queryPublicOpinionDetection() {
      if(this.queryForm.releaseDateStart&&this.queryForm.releaseDateEnd){
        if(this.queryForm.releaseDateEnd<this.queryForm.releaseDateStart){
          return this.$message.error('发布日期起不能大于发布日期止')
        }
      }

      this.page.currPage=1
      this.loadPublicOpinionDetection()
    },
    //重置
    resetQuery() {
      this.$refs.queryOpinionMonitoringFormRef.resetFields()
    },
    //查询舆情监测列表
    loadPublicOpinionDetection() {
      this.queryForm.current = this.page.currPage
      this.queryForm.size = this.page.pageSize
      queryPublicOptionMonitoring(this.queryForm).then(res => {
        if (res.code == 200) {
          this.publicOpinionDetectionDatas = res.data
        }
        this.page.totalCount = res.total
      })
    },

    handleSelectionChange(val) {
     this.selectPublicOpinionDetectionDatas=val
    },
    onHttpUploaded(formData, content) {
      const newFormData = new FormData()
      newFormData.append('file', content.file)
      importOpinionMonitorings(newFormData).then(res=>{
        if(res.code==200){
          this.$message.success(res.desZh)
        }else{
          this.$message.error(res.desZh)
        }
      })
    },
    //维护供应商
    maintenanceSupplier() {
      let routeData = this.$router.resolve({
        path: `/supplier/maintenancesupplier`
      })
      window.open(routeData.href, '_blank')
    },
    updateItemData(row) {
      this.dialogVisble = true
      this.opinionMonitoringId=row.id
    },
    //获取内容分类
    loadContentCategory(){
      getContentCategory().then(res=>{
       if(res.code==200){
         this.classifications=res.data
       }
      })
    },
    //删除
    deleteOpinionMonitoring(){
      if(this.selectPublicOpinionDetectionDatas.length<=0){
        return this.$message.warning('请先选择需要删除的数据')
      }
      let ids=this.selectPublicOpinionDetectionDatas.map(item=>item.id).join(',')
      this.$confirm('确认要删除选中的舆情信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteOpinionMonitorings(ids).then(res=>{
          if(res.code==200){
            this.$message.success(res.desZh)
            this.loadPublicOpinionDetection()
          }else{
            this.$message.error(res.desZh)
          }
        })
      })

    }

  }
}
</script>

<style scoped>
</style>