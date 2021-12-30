<template>
  <div>
    <!--搜索区--->
    <i-search class='margin-bottom20' @sure='myQueryContractList' @reset='restQueryForm' :icon='true' :resetKey='QUEREN'
              :searchKey='REST' v-permission.auto='ELECTRONIC_SIGNATURE_SEARCHAREA|电子签章搜索区'>
      <el-form :model='queryForm' ref='queryFormRef'>
        <!-- 编号 -->
        <el-form-item :label="language('LK_BIANHAO', '编号')" prop='docNo'>
          <i-input
            v-model.trim='queryForm.docNo'
            :placeholder="language('LK_QINGSHURU','请输入')"
            clearable
          ></i-input>
        </el-form-item>
        <!-- 合同类型 -->
        <el-form-item :label="language('LK_HETONGLEIXING', '合同类型')" prop='type'>
          <i-select v-model.trim='queryForm.type' :placeholder="language('LK_QINGXUANZE','请选择')">
            <el-option v-for='(item, index) in contractTypeSelectDatas' :value='item.code'
                       :label='item.name' :key='index'></el-option>
          </i-select>
        </el-form-item>


        <!-- 合同描述 -->
        <el-form-item :label="language('LK_HETONGMIAOHSHU', '合同描述')" prop='docTitle'>
          <i-input
            v-model.trim='queryForm.docTitle'
            :placeholder="language('LK_QINGSHURU','请输入')"
            clearable
          ></i-input>
        </el-form-item>

        <!-- 科室 -->
        <el-form-item :label="language('LK_KESHI', '科室')" prop='deptName'>
          <i-input
            v-model.trim='queryForm.deptName'
            :placeholder="language('LK_QINGSHURU','请输入')"
            clearable
          ></i-input>
        </el-form-item>

        <!-- 供应商 -->
        <el-form-item :label="language('LK_GONGYINGSHANG', '供应商')" prop='supplierName'>
          <i-input
            v-model.trim='queryForm.supplierName'
            :placeholder="language('LK_QINGSHURU','请输入')"
            clearable
          ></i-input>
        </el-form-item>
        <!-- 采购员 -->
        <el-form-item :label="language('LK_CAIGOUYUAN', '采购员')" prop='purchaseUserName'>
          <i-input
            v-model.trim='queryForm.purchaseUserName'
            :placeholder="language('LK_QINGSHURU','请输入')"
            clearable
          ></i-input>
        </el-form-item>

        <!-- 印章类型 -->
        <el-form-item :label="language('LK_YINZHANGLEIXING', '印章类型')" prop='docTypeNo'>
          <i-select v-model.trim='queryForm.docTypeNo' :placeholder="language('LK_QINGXUANZE','请选择')">
            <el-option v-for='(item, index) in sealtypes' :value='item.docTypeNo'
                       :label='item.signName' :key='index'></el-option>
          </i-select>
        </el-form-item>
        <!-- 签署状态 -->
        <el-form-item :label="language('LK_QIANSHUZHUANGTAI', '签署状态')" prop='signStatus'>
          <i-select v-model.trim='queryForm.signStatus' :placeholder="language('LK_QINGXUANZE','请选择')">
            <el-option v-for='(item, index) in signStatusSelectDatas' :value='item.code'
                       :label='item.name' :key='index'></el-option>
          </i-select>
        </el-form-item>

      </el-form>
    </i-search>
    <i-card>
      <div class='floatright margin-bottom20'>
        <i-button @click=''> {{ language('LK_QIANSHU', '签署') }}</i-button>
        <i-button @click='revokeContract'> {{ language('LK_CHEXIAO', '撤销') }}</i-button>
      </div>
      <i-table-custom :columns='sinatureColumns'
                      :data='sinaturedatas'
                      :extraData='extraData'
                      :loading='tabloading'
                      @handle-selection-change='handleSelectionChange'
                      @open-docNo='openDocNo'
                      @open-page='openPage'></i-table-custom>

      <iPagination v-update class='pagination'
                   @size-change='handleSizeChange($event, loadContractList)'
                   @current-change='handleCurrentChange($event,loadContractList )'
                   background
                   :current-page='page.currPage'
                   :page-sizes='page.pageSizes'
                   :page-size='page.pageSize'
                   :layout='page.layout'
                   :total='page.totalCount' />
    </i-card>
  </div>

</template>

<script>
import { iSearch, iInput, iCard, iButton, iSelect, iPagination, iTableCustom } from 'rise'
import { sinatureColumns } from '@/views/electronicsignature/config/data'
import { pageMixins } from '@/utils/pageMixins'
import {
  queryContractList,
  queryEnumeration,
  querySealtype,
  cancelContract,
} from '@/api/electronicsignature'

export default {
  name: 'SignatureHome',
  mixins: [pageMixins],
  components: {
    iSearch,
    iInput,
    iButton,
    iSelect,
    iPagination,
    iCard,
    iTableCustom
  },
  props: ['type'],
  data() {
    return {
      queryForm: {
        deptName: '',//科室名称
        docNo: '',//业务合同编号
        docTitle: '',//合同标题
        purchaseUserName: '',//采购员名
        signStatus: '',//签署状态，0：未签署；1：乙方认证；2：乙方签署；3：甲方签署 4:签署完成 5:撤销中 6：已撤销
        type: '',//合同类型，0:模具合同；1：采购条款；2：预警信
        docTypeNo: '',//文件类型编码//印章类型
        supplierName:'',
        current: 1,
        size: 10

      },
      sinatureColumns,
      sinaturedatas: [],
      sealtypes: [],//印章类型
      extraData: {},
      signStatusSelectDatas:[],
      contractTypeSelectDatas:[],
      selSinaturedatas:[],
      tabloading:false,

    }
  },
  created() {
    this.loadSealtype()
    this.loadEnumeration()
    this.loadContractList()
  },
  methods: {
    restQueryForm() {
      this.$refs.queryFormRef.resetFields()
      this.loadContractList()
    },
    //获取印章
    loadSealtype() {
      querySealtype().then(res => {
        if (res.code == 200) {
          this.sealtypes = res.data
          this.extraData.sealtypes = this.sealtypes
        }
      })
    },
    //签署状态、合同类型下拉数据
    loadEnumeration() {
      queryEnumeration().then(res => {
        if (res.code == 200) {
          let mySignStatusSelectData = res.data.signStatusSelectData
          this.signStatusSelectDatas = mySignStatusSelectData.map(item => {
            return { code: Number(Object.keys(item)[0]), name: Object.values(item)[0] }
          })
          this.extraData.signStatusSelectDatas=this.signStatusSelectDatas
          let myContractTypeSelectData = res.data.contractTypeSelectData
          this.contractTypeSelectDatas = myContractTypeSelectData.map(item => {
            return { code: Number(Object.keys(item)[0]), name: Object.values(item)[0] }
          })
          this.extraData.contractTypeSelectDatas=this.contractTypeSelectDatas

        }
      })
    },
    handleSelectionChange(row){
     this.selSinaturedatas=row
    },
    myQueryContractList() {
      this.page.currPage = 1
      this.queryForm.size = this.page.pageSize
      this.loadContractList()
    },
    loadContractList() {
      this.queryForm.current = this.page.currPage
      this.queryForm.size = this.page.pageSize
      let reqData = { businessScenarios: this.type, data: this.queryForm }
      this.tabloading=true
      queryContractList(reqData).then(res => {
        let { code, data } = res
        this.tabloading=false
        if (code == 200) {
          this.sinaturedatas = data.records
        } else {
          this.$message.error(res.desZh)
        }
      })

    },
    //点击编号
    openDocNo(row) {
      console.log(row)

    },
    //查看
    openPage(row) {
      console.log(row)
    },
    //撤销
    revokeContract(){

     if(this.selSinaturedatas.length<=0){
       return this.$message.warning(this.language('LK_BAOQIANNINDANQIANHAIWEIXUANZEXUYAOCHEXIAODEHETONG','抱歉，您当前还未选择需要撤销的合同'))
     }
     if(this.selSinaturedatas.length > 1){
       return this.$message.warning(this.language('LK_BAOQIANNINDANGQIANZHINENGXUANZEYITIAOYO','抱歉，您当前您只能选择一条哟'))
     }
     if(this.selSinaturedatas[0].signStatus!=3){
       return this.$message.warning(this.language('LK_BAOQIANNINZHINENGCHEXIAOHETONGZHUANGTAIWEIDAIJIAFANGQIANSHUDEHETONGYO','抱歉，您只能撤销合同状态为待甲方签署的合同哟'))
     }
     let item=this.selSinaturedatas[0]
     let reqData={companyNumber:item.companyNumber,docNo:item.docNo,docTypeNo:item.docTypeNo}
      this.$confirm('是否确认撤销?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        cancelContract(reqData).then(res=>{
          if(res.code==200){
            this.$message.success(res.desZh)
            this.loadContractList()
          }else{
            this.$message.error(res.desZh)
          }
        })
      }).catch(() => {

      });



    }
  }

}
</script>

<style scoped>

</style>