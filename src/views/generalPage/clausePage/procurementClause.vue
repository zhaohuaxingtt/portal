<!--
 * @Author: moxuan
 * @Date: 2021-04-13 17:30:36
 * @LastEditTime: 2022-02-18 15:33:14
 * @LastEditors: YoHo
 * @Description: 采购条款预览
 * @FilePath: \rise\src\views\ws3\generalPage\mainSubSuppliersAndProductNames\index.vue
-->
<template>
  <div>
    <div class="pageTitle">
      <span>采购条款</span>
      <div v-if="!isOrder && !readOnly" class="btn-box">
        <uploadButton class="margin-right10" button-text="上传其它采购条款" :supplierId="supplierId" :userId="userId" :upload="termsUpload" :accept="'.doc, .docx'" />
        <iButton @click="updataApply" :disabled="signWay=='off_line'">发起审批</iButton>
      </div>
    </div>
      <div class="query" v-if="!readOnly">
        <div>
          <div class="query-item">
            <iLabel label="条款类型" class="label" :required="true" icons="iconxinxitishi" tip="若需上传标准采购条款\附件采购条款请联系条款管理员。" slot="label"></iLabel>
            <iSelect v-model="termsType" @change="getProcurementInfo">
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
      <div class="changeContent">
        <pdf ref="pdf" :src="baseInfo.placeHolderTermsTextUrl || baseInfo.termsTextUrl"></pdf>
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
                  <span class="openLinkText underline" @click="filePreview({src:scope.row.attachmentUrl, title: scope.row.attachmentName})">{{scope.row.attachmentName}}</span>
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
              <span class="openLinkText underline" @click="filePreview({src:scope.row.fileUrl,title:scope.row.fileName})">{{scope.row.fileName}}</span>
              <!-- 下载 -->
              <!-- <a class="openLinkText underline" :href="scope.row.fileUrl">{{scope.row.fileName}}</a> -->
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
import uploadButton from './upload.vue'
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
      show:false,
      baseInfo:{},
      tipInfo:{
        '0':'该供应商已完成电子签章认证，建议线上签署。',
        '1':'该供应商未完成电子签章认证，建议线下签署。',
      },
      termsType:'Terms_CG', // 默认标准采购条款
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
    supplierIdMain(){
      return this.$route.query.supplierIdMain || ''
    },
    userId(){
      return this.$store.state.permission.userInfo.id
    },
    userName(){
      return this.$store.state.permission.userInfo.nameZh
    }
  },
  created(){
    this.getProcurementInfo()
    if(!this.readOnly){
      this.getSelectData()
      if(this.supplierIdMain){
        certificate({supplierIds:this.supplierIdMain}).then(res=>{
          if(res?.code=='200'){
            let item = res.data[0]
            this.signStatus = item.identifyStatus
          }
        })
      }
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
        if(res?.code=='200'){
          this.typeList = res.data
        }
      })
    },
    // 获取签署方式下拉项
    signWaySelector(){
      signWaySelector().then(res=>{
        if(res?.code=='200'){
          this.signWayList = res.data
        }
      })
    },
    // 发起审批
    updataApply(){
      if(+(this.baseInfo.termsStatus)>1){
        return iMessage.error('已提交审批，请勿重复操作')
      }
      if(!this.baseInfo.syncSupplier){
        iMessage.error('请先同步供应商')
        return
      }
      console.log(this.termsType);
      if(this.termsType!='Terms_OTHERCG' && !this.baseInfo.id || !this.baseInfo.id){
        let params = {
          userId:this.userId,
          supplierId: this.supplierId,
          termsId:this.baseInfo.id,
          termsCode: this.termsType,
          signWay:this.signWay,
          remark:'',
        }
        saveTerms(params).then(res=>{
          if(res?.code=='200'){
            this.baseInfo.id = res.data.id
            // this.getProcurementInfo()
          }
        })
      }
      this.updataValue = true
      this.remark = ''
      this.attachList()
    },
    // 同步供应商
    sync(){
      if([2,3,4,5].includes(+this.baseInfo.termsStatus)){
        return iMessage.error('已提交审批，请勿重复操作')
      }
      if(this.baseInfo.syncSupplier && this.baseInfo.signWay == this.signWay){
        return iMessage.error('请不要重复同步')
      }
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
        termsCode: this.termsType,
        signWay: this.signWay,
        userId: this.userId
      }
      syncSupplierById(params).then(res=>{
        if(res?.code=='200'){
          // this.getProcurementInfo()
          this.baseInfo = res.data[0]
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
        termsCode: this.termsType,
        userId: this.userId
      }
      purchaseTermsById(params).then(res=>{
        if(res?.code=='200'){
          this.baseInfo = res.data[0]
          this.tableData = (this.baseInfo.attachments || []).map(i=>{
            i.attachmentSize = Number((i.attachmentSize || 0) / 1024).toFixed(2)
            return i
          })
        }
        this.$refs.pdf.loading()
      })
    },
    // 提交申请
    submit(){
      let params = {
        supplierId:this.supplierId,
        termsCode:this.termsType,
        signWay:this.signWay,
        remark: this.remark,
        termsId: this.baseInfo.id,
        userId: this.userId
      }
      approveTerms(params).then(res=>{
        if(res?.code=='200'){
          this.updataValue = false
          this.getProcurementInfo()
          setTimeout(()=>{
            window.close()
          },2000)
          iMessage.success(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        }else{
          iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        }
      })
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
          this.termsType = 'Terms_OTHERCG'
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
        if(res?.code=='200'){
          tableListData = res.data.map(i=>{
            i.fileSize = Number((i.fileSize || 0) / 1024 / 1024).toFixed(2)
            return i
          })
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
    // 附件预览
    filePreview(query) {
      // let query = {
      //   src:row.attachmentUrl,
      //   title: row.attachmentName
      // }
      const router =  this.$router.resolve({path: '/clausepage/attach', query})
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
