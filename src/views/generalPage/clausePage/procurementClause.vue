<!--
 * @Author: moxuan
 * @Date: 2021-04-13 17:30:36
 * @LastEditTime: 2022-01-25 19:03:31
 * @LastEditors: YoHo
 * @Description: 采购条款预览
 * @FilePath: \rise\src\views\ws3\generalPage\mainSubSuppliersAndProductNames\index.vue
-->
<template>
  <div>
    <div class="pageTitle">
      <span>
        {{baseInfo.termsName}}
      </span>
      <div v-if="!isOrder && !readOnly" class="btn-box">
        <uploadButton class="margin-right10" button-text="上传其他采购条款" :supplierId="supplierId" :userId="userId" :upload="termsUpload"  :before-upload="beforeUpload" />
        <iButton @click="updataApply" :disabled="signWay=='off_line'">发起审批</iButton>
      </div>
    </div>
      <div class="query" v-if="!readOnly">
        <div>
          <div class="query-item">
            <iLabel label="条款类型" class="label" :required="true" icons="iconxinxitishi" tip="若需上传标准采购条款\附件采购条款请联系条款管理员。" slot="label"></iLabel>
            <iSelect v-model="termsCode" @change="getProcurementInfo">
              <el-option :value="item.code" :label="item.value" v-for="item in typeList" :key="item.code"></el-option>
            </iSelect>
          </div>
          <div class="query-item">
            <iLabel label="签署方式" class="label" :required="true" :icons="signStatus?'iconxinxitishi':'icontishi-cheng'" :tip="signStatus? tipInfo[0] : tipInfo[1]" slot="label"></iLabel>
            <iSelect v-model="signWay">
              <el-option :value="item.code" :label="item.value" v-for="item in signWayList" :key="item.code"></el-option>
            </iSelect>
          </div>
        </div>
        <div class="text-right">
          <iButton @click="sync">确认并同步供应商</iButton>
        </div>
      </div>
      <div class="changeContent" v-loading="loading">
        <pdf ref="pdf" :src="baseInfo.placeHolderTermsTextUrl"></pdf>
      </div>
      <div class="margin-top20" v-if="showTable">
        <div class="flex-content">
          <H2>相关附件</H2>
        </div>
        <iCard class="margin-top10">
          <el-table :data="tableData" @selection-change="handleSelectionChange">
            <el-table-column type='selection' width="50" align='center'></el-table-column>
            <el-table-column label="序号" type="index" width="80"></el-table-column>
            <!-- 比预期设计少了一个上传人 -->
            <template v-for="item in attachmentTableTitle">
              <el-table-column v-if="item.prop=='attachmentName'" :minWidth="item.minWidth||item.width" :label="item.name" :prop="item.prop" :key="item.prop" >
                <template slot-scope="scope">
                  <span class="openLinkText underline" @click="filePreview(scope.row)">{{scope.row.attachmentName}}</span>
                </template>
              </el-table-column>
              <el-table-column v-else :minWidth="item.minWidth||item.width" :label="item.name" :prop="item.prop" :key="item.prop" ></el-table-column>
            </template>
          </el-table>
        </iCard>
      </div>
    <i-dialog 
      :title="`提交${supplierTitle}采购条款审批`"
      :visible.sync="updataValue"
      width="70%">
      <div class="flex-content">
        <span class="remark-title">审批事项备注</span>
        <iButton @click="submit">提交审批</iButton>
      </div>
      <div class="margin-top20">
        <iInput type='textarea' placeholder="请输入" maxlength="200" v-model="remark"></iInput>
      </div>
      <div class="flex-content margin-top20">
        <H3>审批附件</H3>
        <div>
          <uploadButton class="margin-right10" :upload="uploadAttach" />
          <!-- <iButton @click="downloadEnclosure">下载</iButton> -->
          <iButton @click="deleteFile">删除</iButton>
        </div>
      </div>
      <div class="padding-bottom20 margin-top20">
        <el-table :data="tableListData" @selection-change="secondHandleSelectionChange">
          <el-table-column type='selection' width="50" align='center'></el-table-column>
          <el-table-column label="序号" type="index" width="80"></el-table-column>
          <template v-for="item in TableTitle">
            <el-table-column v-if="item.prop=='fileName'" :minWidth="item.minWidth||item.width" :label="item.name" :prop="item.prop" :key="item.prop" >
              <template slot-scope="scope">
                <!-- 预览 -->
              <!-- <span class="openLinkText underline" @click="filePreview(scope.row)">{{scope.row.fileName}}</span> -->
              <!-- 下载 -->
              <a class="openLinkText underline" :href="scope.row.fileUrl">{{scope.row.fileName}}</a>
            </template>
            </el-table-column>
            <el-table-column v-else :minWidth="item.minWidth||item.width" :label="item.name" :prop="item.prop" :key="item.prop" ></el-table-column>
          </template>
        </el-table>
      </div>
    </i-dialog>
  </div>
</template>

<script>
import {iCard, iDialog, iFormGroup, iFormItem, iLabel, iText, iInput, iSelect, iButton, iMessage} from 'rise'
import uploadButton from './upload'
import { attachmentTableTitle, procurementDialogTableTitle as TableTitle } from "./data";
import deleteMixin from '@/mixins/deleteMixin'
import { termsTypeById, signWaySelector, purchaseTermsById, termsUpload, syncSupplierById, approveTerms, attachList, uploadAttach, certificate, saveTerms, deleteAttach} from '@/api/frmRating/overView/overView.js'
import { generalPageMixins } from '@/views/generalPage/commonFunMixins'
import clauseDialog from "./clauseDialog";
import pdf from "./pdf";

export default {
  mixins: [deleteMixin, generalPageMixins],
  components: {
    iCard,
    iDialog,
    iFormGroup,
    iFormItem,
    iLabel,
    iText,
    iInput,
    iSelect,
    iButton,
    uploadButton,
    clauseDialog,
    pdf
  },
  data() {
    return {
      loading:false,
      show:false,
      baseInfo:{},
      tipInfo:{
        '0':'该供应商已完成电子签章认证，建议线上签署。',
        '1':'该供应商未完成电子签章认证，建议线下签署。',
      },
      termsCode:'Terms_CG', // 默认标准采购条款
      typeList:[],
      signStatus:false,    // 电子签章认证状态
      signWay:'on_line',  // 默认电子签章
      signWayList:[],
      attachmentTableTitle,
      TableTitle,
      tableData: [],
      tableListData:[], // 审批流中的附件
      selectionArr:[],  // 勾选的条款附件
      selectedTableData:[], // 勾选的审批中的附件
      updataValue:false,
      showTable:true,  // 是否显示底部相关附件
      remark:'' // 提交审批备注
    }
  },
  computed:{
    readOnly(){
      return this.$route.query.readOnly || false
    },
    isOrder(){  // 合同管理跳转过来
      return this.$route.query.isOrder || false
    },
    // 供应商名称
    supplierTitle(){
      return this.$store.state.baseInfo.baseMsg.supplierDTO.nameZh || ''
    },
    supplierId(){
      // return 123
      return this.$route.query.supplierId || '-1'
    },
    userId(){
      return this.$store.state.permission.userInfo.id
    },
    userName(){
      return this.$store.state.permission.userInfo.nameZh
    }
  },
  created(){
    console.log(this.$store.state.permission.userInfo);
    this.getProcurementInfo()
    if(!this.readOnly){
      this.getSelectData()
      certificate({supplierIds:this.supplierId}).then(res=>{
        console.log(res);
      })
    }
  },
  methods: {
    clearDiolog() {
      this.$emit("input", false);
    },
    getSelectData(){
      this.termsTypeById()
      this.signWaySelector()
    },
    // 获取条款类型下拉项
    termsTypeById(){
      termsTypeById(this.supplierId).then(res=>{
        console.log(res);
        if(res?.code=='200'){
          this.typeList = res.data
        }
      })
    },
    // 获取签署方式下拉项
    signWaySelector(){
      signWaySelector().then(res=>{
        console.log(res);
        if(res?.code=='200'){
          this.signWayList = res.data
        }
      })
    },
    // 发起审批
    updataApply(){
      if(!this.baseInfo.syncSupplier){
        iMessage.error('请先同步供应商')
        return
      }
      if(this.termsCode!='Terms_OTHERCG'){
        let params = {
          userId:this.userId,
          supplierId: this.supplierId,
          termsId:'',
          termsCode: this.termsCode,
          signWay:this.signWay,
          remark:'',
        }
        saveTerms(params).then(res=>{
          if(res?.code=='200'){
            this.baseInfo = res.data
          }
        })
      }
      this.updataValue = true
      this.attachList()
    },
    // 签署
    sign(){
      console.log('签署');
    },
    // 归档
    filing(){
      console.log('归档');
    },
    // 同步供应商
    sync(){
      this.$confirm('请确认此条款内容无误，并与供应商达成一致。', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.syncSupplier()
      }).catch(()=>{})
    },
    syncSupplier(){
      let params = {
        supplierId: this.supplierId,
        termsCode: this.termsCode,
        signWay: this.signWay,
        userId: this.userId
      }
      console.log(params);
      syncSupplierById(params).then(res=>{
        if(res?.code=='200'){
          iMessage.success(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        }
      })
    },
    // 复选框调整
    handleSelectionChange(val){
      this.selectionArr = val
    },
    // 复选框调整
    secondHandleSelectionChange(val){
      this.selectedTableData = val
    },
    // 获取条款相关信息
    getProcurementInfo(){
      let params = {
        supplierId: this.supplierId,
        termsCode: this.termsCode,
      }
      this.loading = true
      purchaseTermsById(params).then(res=>{
        console.log(res);
        this.baseInfo = res.data[0]
        this.$refs.pdf.loading()
        this.loading = false
        this.tableData = this.baseInfo.attachments || []
      })
    },
    // 删除相关附件
    deleteAttach(){
      let fileIdList = this.selectionArr.map(i=>i.id)
      let params = {
        fileIdList:fileIdList,
        supplierId:this.supplierId
      }
      deleteAttach(params).then(res=>{
        console.log(res);
      })
    },
    // 提交申请
    submit(){
      let params = {
        supplierId:this.supplierId,
        termsCode:this.termsCode,
        signWay:this.signWay,
        remark: this.remark,
        termsId: this.baseInfo.id,
        userId: this.userId
      }
      approveTerms(params).then(res=>{
        if(res?.code=='200'){
          this.updataValue = false
          iMessage.success(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        }else{
          iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        }
      })
      console.log(params);
    },
    // 上传其它采购条款
    termsUpload(content){
      const formData = new FormData();
      formData.append('file', content.file);
      formData.append('supplierId', this.supplierId);
      formData.append('userId', this.userId);
      termsUpload(formData).then(res=>{
        if(res?.code=="200"){
          iMessage.success(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
          // 上传之后直接查询其它条款
          this.termsTypeById()
          this.termsCode = 'Terms_OTHERCG'
          this.getProcurementInfo()
        }else{
          iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        }
      })
    },
    // 获取审批流中的附件列表
    attachList(){
      let tableListData = []
      let params={
        supplierId: this.supplierId,
        termsId: this.baseInfo.id
      }
      attachList(params).then(res=>{
        console.log(res);
        if(res?.code=='200'){
          tableListData = res.data
        }else{
          iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        }
        this.tableListData = tableListData
      })
    },
    // 上传审批附件
    async uploadAttach (content) {
      const formData = new FormData();
      formData.append('file', content.file);
      formData.append('termsId', this.baseInfo.id);
      formData.append('userId', this.userId);
      formData.append('userName', this.userName);
      uploadAttach(formData).then(res=>{
        console.log(res);
        if(res?.code=='200'){
          this.attachList()
        }
      })
    },
    // 删除审批附件
    deleteFile() {
      const fileIdList = this.selectedTableData.map((e) => e.fileId)
      if (fileIdList.length === 0) {
        iMessage.error('请选择需要删除的附件')
        return false
      }
      let params = {
        fileIdList:fileIdList,
        supplierId:this.supplierId
      }
      deleteAttach(params).then((res) => {
        if(res?.code=='200'){
          iMessage.success(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
          this.attachList()
        }else{
          iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        }
      })
    },
    // 文件预览
    filePreview(row) {
      let query = {
        id:row.id
      }
      const router =  this.$router.resolve({path: '/clausepage/preview', query})
      window.open(router.href,'_blank')
    }
  }
}
</script>

<style scoped lang="scss">
.query{
  width: 100%;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  .query-item{
    display: inline-flex;
    white-space: nowrap;
    &+.query-item{
      margin-left: 20px;
    }
    .label{
      white-space: nowrap;
      margin-right: 10px;
    }
  }
}
.pageTitle {
    font-size: 20px;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
.text-right{
  text-align: right;
}
.form-group{
  text-align: right;
}
.openLinkText {
  color: $color-blue;
}
.changeContent {
  height: 1000px;
}
.flex-content{
  display: flex;
  justify-content: space-between;
  align-items: center;
  .remark-title{
    font-size: 16px;
    font-weight: 600;
  }
}
</style>
\ No newline at end of file
