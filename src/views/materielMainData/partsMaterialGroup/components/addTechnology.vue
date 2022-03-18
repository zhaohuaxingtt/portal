<template>
  <iPage class="addTechnology">
    <div class="page-header">
      <div>
        <span class="font18 font-weight" v-if='!this.$route.query.stuffId' > {{language('新增工艺组')}} </span>
        <span class="font18 font-weight" v-else > {{language(formData.stuffCode)}} {{language(formData.stuffName)}} </span>

      </div>
      <div class="ibutton-end" v-if="!this.$route.query.readOnly">
        <div v-if='viewSta'>
          <iButton @click="edit" >{{language('编辑')}}</iButton>
        </div>
        <div v-else>
          <iButton @click="save('formData')">{{language('保存')}}</iButton>
          <iButton @click="closeWindow">{{language('取消')}}</iButton>
        </div>
        
      </div>
    </div>
    <iCard class="margin-top20"  >
      <el-form
        :model="formData"
        label-position="left"
        label-width="115px"
        :rules="rules"
        ref="formData"
        class="validate-required-form"
      >
        <el-row :gutter="20">
          <el-col :span="6">
            <iFormItem
              :label="language('工艺组编号')"
              prop="stuffCode"
            >
              <iInput
                :placeholder="language('请输入')"
                v-model="formData.stuffCode"
                :disabled='viewSta'
              ></iInput>
            </iFormItem>
          </el-col>
          <el-col :span="6">
            <iFormItem
              :label="language('工艺组名称')"
              prop="stuffName"
            >
              <iInput
                :placeholder="language('请输入')"
                v-model="formData.stuffName"
                :disabled='viewSta'
              ></iInput>
            </iFormItem>
          </el-col>
          <el-col :span="6">
            <iFormItem
              :label="language('工艺组名称(德)')"
              prop="stuffNameDe"
            >
              <iInput
                :placeholder="language('请输入')"
                v-model="formData.stuffNameDe"
                :disabled='viewSta'
              ></iInput>
            </iFormItem>
          </el-col>
          <el-col :span="6">
            <iFormItem :label="language('工艺组说明')">
              <iInput
                :placeholder="language('请输入')"
                v-model="formData.stuffMemo"
                :disabled='viewSta'
              ></iInput>
            </iFormItem>
          </el-col>
        </el-row>
      </el-form>
      <div v-if="stuffId!=''">
        <el-divider />
        <div style="display:flex;justify-content: flex-end">
        </div>
        <div class="iButton-end margin-bottom20"  v-if="!this.$route.query.readOnly">
          <iButton @click="tabelEdit"  v-show="tabelSta">{{language('编辑')}}</iButton>
          <iButton @click="SaveNewSupplier" v-show='!tabelSta'>{{language('保存')}}</iButton>
          <iButton @click="addNew">{{language('新增')}}</iButton>
          <iButton @click="delrte" :disabled='selectTableData.length == 0'>{{language('删除')}}</iButton>
          <iButton @click="downLoadSupplier">{{language('下载供应商模版')}}</iButton>
          <!-- <iButton @click="inportTechnology">导入</iButton> -->
          <el-upload
            action="1"
            :show-file-list="false"
            with-credentials
            :http-request="importData"
            accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          >
            <iButton class="importSupplier">{{language('导入')}}</iButton>
          </el-upload>
          <iButton @click="exportTechnology">{{language('导出')}}</iButton>
        </div>
        <iTableCustom
          :data="tableData"
          :columns="tableColumns"
          :extra-data="extraData"  
          min-height="395px"
          @handle-selection-change="handleSelectionChange"
        >
        </iTableCustom>
        <iPagination
          v-update
          @size-change="handleSizeChange($event, initBdlSupplier)"
          @current-change="handleCurrentChange($event, initBdlSupplier)"
          background
          :current-page="page.currPage"
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :total="page.totalCount"
          @
        >
        </iPagination>
        <i-selector-dialog
          :title="language('供应商选择')"
          :show.sync="newAddDialogVisible"
          @change="handleCallback"
          @closedia="handleClose"
          :filter="selectorQuery"
          :tableSetting="supplierChoose"
          :search-method="handleSupplierSearch"
          v-model='suppliersName'
          tag-label="nameZh"
          hiddenRight
          ref="selectSupplier"
        >
        </i-selector-dialog>
      </div>
    </iCard>
  </iPage>
</template>
<script>
import {
  iButton,
  iPage,
  iSelect,
  iCard,
  iFormItem,
  iInput,
  iPagination,
  iMessage
} from 'rise'
// import { fetchRoles } from '@/api/role'
import iTableCustom from '@/components/iTableCustom'
import { SUPPLIER_TECHNOLOGY, SUPPLIER_CHOOSE } from './data'
import iSelectorDialog from '@/components/iSelector/iSelectorDialog.vue'
import { pageMixins } from '@/utils/pageMixins'
import {technologySave, searchBdlTableList, searchTechnologyForm, seaveBdl, deleteBdl, downloadSupplierModel, importBdl, exportBdl, dataDic} from '@/api/materiel/partsMaterialGroup'
import { getBasicList, } from "@/api/basic/basic";
export default {
  components: {
    iButton,
    iPage,
    iSelect,
    iCard,
    iFormItem,
    iInput,
    iTableCustom,
    iPagination,
    iSelectorDialog,
    
  },
  data() {
    return {
      //form控制按钮显示
      viewSta:true,
      //tabel控制按钮显示
      tabelSta:true,
      // formDataLabel: {
      //   stuffCode: '工艺组编号',
      //   stuffName: '工艺组名称',
      //   stuffNameDe: '工艺组名称(德)',
      //   stuffMemo: '工艺组说明',
      //   inputPlaceholder: '请输入',
      //   iSelectPlaceholder: '请选择'
      // },
      formData: {
        stuffCode: '',
        stuffName: '',
        stuffNameDe: '',
        stuffMemo: '',
      },
      iniFormData:{
        stuffCode: '',
        stuffName: '',
        stuffNameDe: '',
        stuffMemo: '',
      },
      modelOptions: [],
      rules: {
        stuffCode: [
          { required: true, message: '请输入工艺组编号', trigger: 'blur' }
        ],
        stuffName: [
          { required: true, message: '请输入工艺组名称', trigger: 'blur' }
        ],
        stuffNameDe: [
          { required: true, message: '工艺组名称(德)', trigger: 'blur' }
        ],
      },
      tableColumns: SUPPLIER_TECHNOLOGY,
      tableData: [],
      newAddDialogVisible: false,
      selectorQuery: [
        {
          value: 'supplierName',
          label: '供应商中文名',
          type: 'input'
        },
        {
          value: 'sapCode',
          label: 'SAP号',
          type: 'input'
        },
        {
          value: 'svwCode',
          label: 'SVW号',
          type: 'input'
        },
        {
          value: 'supplierType',
          label: '供应商类型',
          type: 'select',
          initVal:'PP',
          options: [
            // {
            //   label:'一般',
            //   value:'GP'
            // },
            {
              label:'生产',
              value:'PP'
            },
            {
              label:'共用',
              value:'PD'
            },
          ]
        },
        {
          value: 'formalStatus',
          label: '供应商身份',
          type: 'select',
          options: [
            {
              label:'正式',
              value:'1'
            },
            {
              label:'临时',
              value:'0'
            },
            {
              label:'蓄水池',
              value:'2'
            }
          ]
        },
      ],
      supplierChoose: SUPPLIER_CHOOSE,
      isShowBdlSupplier:false,
      selectTableData: [],
      suppliersName: [],
      extraData: {
        cdlOption:'',
        bdlOption:'',
        tabelSta:false
      },
      tablenewData:[],
      stuffId:'',
      originalData: [],
      categoryId: '',
      tabelListLength:''
    }
  },
  mixins: [pageMixins],
  created() {
    if(this.$route.query.stuffId) {
      this.stuffId = this.$route.query.stuffId
      this.viewSta = true
    }else{
      this.viewSta = false
    }
    this.initTechnology()
    this.initBdlSelect()
    this.initCbdSelect()
  },
  computed:{
    isAdd() {
      return this.tableData.filter((item)=>{
        return !item.id
      }).length !== 0
    },
  },
  methods: {
    handleClose(){
      if(this.isAdd) {
        this.tabelSta = false
      }
    },
    tabelEdit(){
      this.tabelSta = false
      this.extraData.tabelSta = true
    },
    edit(){
      this.viewSta = false
    },
    initBdlSupplier() {
      let data= {
        stuffId:this.stuffId,
        size: this.page.pageSize,
        current: this.page.currPage
      }
      if( this.stuffId!=''){
        searchBdlTableList(data).then(res => {
          if(res.code == 200) {
            if(res.data.length > 0){
              this.tableData = res.data
              this.tabelListLength = this.tableData.length
              for(let item of this.tableData){
                for(let val of  this.extraData.bdlOption){
                  if(item.bdlType == val.code){
                    item.bdlType = val.name
                  }
                }
              }
              this.tableData.forEach((item) =>{
                item.supplierId = item.supplierSubId
              })
              this.originalData = _.cloneDeep(res.data)
              this.page.totalCount = res.total
              this.isShowBdlSupplier = true
            }else{
              this.tableData = []
            }
          }
        })
      }
    },
    initBdlSelect() {
      let keys = 'BDL_TYPE'
      let parentId = -1
      dataDic(keys,parentId).then(res => {
        if(res.code == 200) {
          this.extraData.bdlOption = res.data.BDL_TYPE
          this.initBdlSupplier()
        }
      })
    },
    initCbdSelect() {
      let keys = 'cbd_level'
      let parentId = -1
      dataDic(keys,parentId).then(res => {
        if(res.code == 200) {
          this.extraData.cdlOption = res.data.cbd_level
        }
      })
    },
    initTechnology() {
     let id = this.$route.query.stuffId
      searchTechnologyForm(id).then(res => {
        this.formData.stuffCode = res.data.stuffCode
        this.formData.stuffName = res.data.stuffName
        this.formData.stuffNameDe = res.data.stuffNameDe
        this.formData.stuffMemo = res.data.stuffMemo
        this.formData.moldBudgetType = res.data.moldBudgetType
        this.iniFormData.stuffCode = JSON.parse(JSON.stringify(res.data.stuffCode))
        this.iniFormData.stuffName = JSON.parse(JSON.stringify(res.data.stuffName))
        this.iniFormData.stuffNameDe = JSON.parse(JSON.stringify(res.data.stuffNameDe))
        this.iniFormData.stuffMemo = JSON.parse(JSON.stringify(res.data.stuffMemo))
        this.iniFormData.moldBudgetType = JSON.parse(JSON.stringify(res.data.moldBudgetType))

      })
    },
 
    addNew() {
      // if(!this.tabelSta){
        // this.tabelSta = false
        this.newAddDialogVisible = true
        
        // this.extraData.tabelSta = true
        this.suppliersName = []
      // }

    },
    changeSupplierVisible() {
      this.newAddDialogVisible = false
    },
    async handleSupplierSearch(val) {
      const pms ={
        ...val,
        // spiReportId:
        pageNo:val.current,
        // supplierType:'PP'
        // pageSize:val.size
      }
      const res =  await getBasicList(pms)
      return res
    },
    save(formName) {
      this.categoryId = this.$route.query.categoryId
      this.$refs[formName].validate((valid) => {
          if (valid) {
            let data={}
            if(this.$route.query.stuffId){
              data = {
                categoryId:this.categoryId,
                id:this.$route.query.stuffId,
                ...this.formData
              }
            }else{
              data = {
                categoryId:this.categoryId,
                ...this.formData
              }
            }
            technologySave(data).then(res => {
              if(res.code == '200') {
                this.isShowBdlSupplier = true
                this.stuffId = res.data
                // window.close()
                if(window.opener){
                    window.opener.location.reload()
                }
                iMessage.success('保存成功')
                // this.$route.query.stuffId =res.data
                this.$router.replace({query:{...this.$route.query,stuffId:this.stuffId}})
                this.viewSta = true
                this.initTechnology()
              }
              if(res.code == '1') {
                iMessage.error(res.desZh)
              }
            })
          } else {
            return false;
          }
        })
    },
    handleSelectionChange(val) {
      this.selectTableData = val
    },
    delrte() {
      this.$confirm('是否删除已选中数据','提示',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
      }).then(()=>{
        let ids = []
        let deletenNoInterface = []
        let deleetnNeedInterface = []
        this.selectTableData.forEach(val =>{
          if(val.id) {
            deleetnNeedInterface.push(val)
          } else {
            deletenNoInterface.push(val)
          }
        })
        deleetnNeedInterface.forEach(val =>{
          ids.push(val.id)
        })
        deletenNoInterface.forEach(val =>{
          this.tableData = this.tableData.filter((item) => {
            if(item.uniqueId !== val.uniqueId ) {
                return item
            }
          })
        })
        if(ids.length !== 0) {
          deleteBdl(ids).then(res => {
            if( res.code == 200 ) {
              iMessage.success('删除成功')
              this.initBdlSupplier()

            } 
            if( res.code == 1 ) {
              iMessage.error(res.desZh)
            }
          })
        }
      })
      
    },
    downLoadSupplier() {
      downloadSupplierModel()
    },
    importData(file) {
      let formData = new FormData()
      formData.append('file', file.file)
      formData.append('stuffId', this.stuffId)
      importBdl(formData).then(res =>{
        if(res.code == 200) {
          iMessage.success('导入成功')
          this.initBdlSupplier()
        } else if(res.code == 1){
          iMessage.error(res.desZh)
        }
      })
    },
    exportTechnology() {
      let data= this.formData
      let item
      for(item in data) {
        if(data[item] == null) {
          data[item] = ''
        }
      }
      data.stuffId = this.$route.query.stuffId
      data.isEffect = true
      exportBdl(data).then(res=>{
        if(res.code == 1) {
          iMessage.error('导出失败')
        }
      })
    },
    handleCallback(val) { 
      let data =val
      val.forEach((val,index) => {
        data[index].supplierName = val.nameZh
        data[index].supplierId = val.subSupplierId
        data[index].stuffId = this.stuffId
      })

      data.forEach(val => {
          delete val.id
      })
      //拼接两个数组
      let newData = [...this.tableData]
      newData.unshift(...data)
      this.tableData = newData
    
    },
    SaveNewSupplier() {
      let data = []
      let dataOld = [ ...this.tableData]
      //两个数组取出不同的地方
      for(let i = 0 ; i < dataOld.length ; i++ ) {
          if(dataOld[i].id === undefined) {
            data.push(dataOld[i])
          } else {
            for( let j = 0 ; j < this.originalData.length; j++) {
              if(this.originalData[j].id === dataOld[i].id) {
                if(dataOld[i].cbdLevel != this.originalData[j].cbdLevel || dataOld[i].bdlType != this.originalData[j].bdlType ) {
                    data.push(dataOld[i])
                }
              }
            }
          }
      }
      if(data != []) {
          seaveBdl(data).then(res => {
            if(res.code == 200){
              this.initBdlSupplier()
              this.tabelSta = true
              this.extraData.tabelSta = false
              iMessage.success('保存成功')
            }
            if(res.code == 1) {
              iMessage.error(res.desZh)
            }
          })
      }
    },
    closeWindow(){
      if(this.$route.query.stuffId){
        if(JSON.stringify(this.formData) != JSON.stringify(this.iniFormData)){
          this.$confirm('数据有改动，是否取消此次的改动','提示',{
            confirmButtonText:'确定',
            cancelButtonText:'取消',
            type:'warning'
          }).then(()=>{
            this.viewSta = true
            this.initTechnology()
          })
        }else{
          this.viewSta = true
        }
      }else{
        window.close()
      }
    },

  }
}
</script>
<style lang="scss" scoped>
.page-header {
  display: flex;
  justify-content: space-between;
}
.iButton-end{
  display: flex;
  justify-content: flex-end;
}
.importSupplier{
   margin: 0px 10px;
}
</style>