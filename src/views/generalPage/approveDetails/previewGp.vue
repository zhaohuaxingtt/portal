<template>
  <iPage>
    <div style="font-size:1.5rem;margin-bottom:15px;">
      <span style="font-weight:bold">{{detail.desc}}</span>
    </div>
    <iCard class="margin-bottom20 clearFloat"
           tabCard
           collapse
           title="供应商信息">
      <template slot="header">
        <div>
          <span style="font-weight:bold">供应商信息</span>
        </div>
        <div>
          <iButton @click="goSupplierInfor"
                   :loading="buttonLoad">{{language('查看供应商信息')}}</iButton>
        </div>
      </template>
      <iFormGroup row="3"
                  ref="baseRulesForm">
        <iFormItem prop="nameZh">
          <iLabel label="供应商中文名"
                  slot="label"></iLabel>
          <iText>{{ detail.nameZh }}</iText>
        </iFormItem>
        <iFormItem prop="shortNameZh">
          <iLabel label="供应商简称（中）"
                  slot="label"></iLabel>
          <iText>{{ detail.shortNameZh }}</iText>
        </iFormItem>
        <iFormItem prop="socialcreditNo">
          <iLabel label="统一社会信用代码"
                  slot="label"></iLabel>
          <iText>{{ detail.socialcreditNo }}</iText>
        </iFormItem>
        <iFormItem prop="nameEn">
          <iLabel label="供应商英文名"
                  slot="label"></iLabel>
          <iText>{{ detail.nameEn }}</iText>
        </iFormItem>
        <iFormItem prop="shortNameEn">
          <iLabel label="供应商简称（英）"
                  slot="label"></iLabel>
          <iText>{{ detail.shortNameEn }}</iText>
        </iFormItem>
        <iFormItem prop="dunsCode">
          <iLabel label="DUNS"
                  slot="label"></iLabel>
          <div class="duns flex-align-center">
            <iText>{{ detail.dunsCode }}</iText>
          </div>
        </iFormItem>
        <iFormItem prop="sapCode">
          <iLabel label="SAP号"
                  slot="label"></iLabel>
          <iText>{{ detail.sapCode }}</iText>
        </iFormItem>
        <iFormItem prop="svwTempCode">
          <iLabel label="临时号"
                  slot="label"></iLabel>
          <iText>{{ detail.svwTempCode }}</iText>
        </iFormItem>
        <iFormItem prop="svwCode">
          <iLabel label="SVW号"
                  slot="label"></iLabel>
          <iText>{{ detail.svwCode }}</iText>
        </iFormItem>
        <iFormItem prop="vmCode">
          <iLabel label="VW号"
                  slot="label"></iLabel>
          <iText>{{ detail.svwCode }}</iText>
        </iFormItem>
      </iFormGroup>
    </iCard>
    <iCard class="margin-bottom20 clearFloat"
           tabCard
           collapse
           title="准入所需附件">
      <template slot="header">
        <div>
          <span style="font-weight:bold">准入所需附件</span>
        </div>
        <div>
          <iButton @click="handler('1')"
                   :loading="buttonLoad">{{language('QUEREN','确认')}}</iButton>
          <iButton @click="handler('0')"
                   :loading="buttonLoad">{{language('JUJUE','拒绝')}}</iButton>
        </div>
      </template>
      <table-list :tableData="tableListData"
                  :tableTitle="tableTitle"
                  :selection="false"
                  border
                  :index="true"
                  :openPageGetRowData="true"
                  openPageProps="templateName"
                  @openPage="handleDownload"
                  :tableLoading="tableLoading">
        <template #templateName="scope">
          <div>{{ scope.row.templateName }}<span style="color: red">*</span></div>
        </template>
      </table-list>
    </iCard>
  </iPage>
</template>

<script>
import { iCard, iFormGroup, iFormItem, iLabel, iText, iPage, iButton, iMessage } from 'rise'
import { priorApprovalDetail, priorApproval,gpAdmittanceInfo,commitAdmittance } from '../../../api/supplier360/approve'
import { generalPageMixins } from '@/views/generalPage/commonFunMixins'
import tableList from '@/components/commonTable'
import { TableTitleGP } from "./components/data";
import { downloadUdFile } from '@/api/file'

export default {
  mixins: [generalPageMixins],
  components: {
    iCard,
    iFormGroup,
    iFormItem,
    iLabel,
    iText,
    tableList,
    iPage,
    iButton
  },
  created () {
    this.$store.dispatch('setValiCode', this.$route.query.supplierToken)
    this.getTaskDetails()
  },
  data () {
    return {
      detail: {},
      loading: false,
      tableListData: [],
      tableTitle: TableTitleGP,
      tableLoading: false,
      selectTableData: [],
      buttonLoad: false,
    }
  },
  updated () {
    var tbody = window.document.getElementById('appRouterView')
    var height = tbody.clientHeight
    window.parent.postMessage({ key: 'setFormHeight', value: height + 'px' }, '*')
  },
  methods: {
    goSupplierInfor(){
      this.$router.push({
        path: '/view-suppliers',
        query: {
          current: 1,
          supplierType: 4,
          supplierToken: this.detail.token,
          subSupplierType:"GP",
          supplierId:this.detail.id,
        }
      })
    },
    async handleDownload (row) {
      const req = row.fileId
      await downloadUdFile(req)
    },
    async getTaskDetails () {
      this.loading = true
      try {
        const req = {
          supplierId: this.$route.query.taskId,
          businessType: this.$route.query.businessType,
        }
        const res = await gpAdmittanceInfo(req)
        this.detail = res.data
        this.supplierToken = res.data.supplierToken
        this.tableListData = res.data.attachList
        this.loading = false
      } catch {
        this.loading = false
      }
    },
    handler (val) {
      this.buttonLoad = true
      if (val === '0') {//拒绝
        this.$confirm('确认拒绝?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            approvalStatus: val,
            taskId: this.$route.query.taskId,
            businessType:this.$route.query.businessType,
            supplierId:this.detail.id,
          }
          commitAdmittance(params).then(res => {
            if (res.code == '200') {
              this.buttonLoad = false
              iMessage.success(res.desZh)
            } else {
              this.buttonLoad = false
              iMessage.error(res.desZh)
            }
          }).catch(e=>{
            this.buttonLoad = false
          })
        }).catch(e=>{
          this.buttonLoad = false
        })
      } else {//确认
        let params = {
          approvalStatus: val,
          taskId: this.$route.query.taskId,
          businessType:this.$route.query.businessType,
          supplierId:this.detail.id,
        }
        commitAdmittance(params).then(res => {
          if (res?.code === '200') {
            this.buttonLoad = false
            iMessage.success(res.desZh)
          } else {
            this.buttonLoad = false
            iMessage.error(res.desZh)
          }
        }).catch(e=>{
          this.buttonLoad = false
        })
      }

    }
  }
}
</script>

<style lang="scss" scoped>
.duns {
  > span {
    display: inline-block;
    width: 18px;
    height: 1px;
    margin: 0 10px;
    background-color: $color-black;
  }
}
</style>