<template>
  <iPage>
    <div class="margin-bottom20 clearFloat djsc_title">
      <span class="font18 font-weight">
        {{ $t('SUPPLIER_SHIFOUTONGYIJIANG') }}
        {{ $i18n.locale === 'zh' ? detail.nameZh : detail.nameEn }}
        {{ $t('SUPPLIER_GONGSIZHUANEWIZHENGSHIGONGYINGSHANG') }}
      </span>
      <iButton v-if="!jumpF" @click="jumpF=true" style="float:right;">{{ $t('LK_FANHUI') }}</iButton>
    </div>
    <div v-if="jumpF">
      <!--供应商信息-->
      <iCard tabCard
            collapse
            :title="$t('SUPPLIER_GONGYINGSHANGXINXI')"
            v-loading="loading">
        <template slot="header-control">
          <iButton v-if="rsType" @click="rsChoise">{{ $t('CHAKANRSDAN') }}</iButton>
          <iButton @click="onJump360">{{ $t('SUPPLIER_CHAKANGAIGONGYINGSHANGXINXI') }}</iButton>
        </template>
        <iFormGroup row="3"
                    ref="baseRulesForm">
          <iFormItem prop="nameZh">
            <!--供应商中文名-->
            <iLabel :label="$t('SUPPLIER_GONGYINGSHANGZHONGWENMING')"
                    slot="label"></iLabel>
            <iText>{{ detail.nameZh }}</iText>
          </iFormItem>
          <iFormItem prop="shortNameZh">
            <!--供应商简称（中）-->
            <iLabel :label="$t('SUPPLIER_GONGYINGSHANGJIANCHENZH')"
                    slot="label"></iLabel>
            <iText>{{ detail.shortNameZh }}</iText>
          </iFormItem>
          <iFormItem prop="socialcreditNo">
            <!--统一社会信用代码-->
            <iLabel :label="$t('SUPPLIER_TONGYISHEHUIXINGYONGDAIMA')"
                    slot="label"></iLabel>
            <iText>{{ detail.socialcreditNo }}</iText>
          </iFormItem>
          <iFormItem prop="nameEn">
            <!--供应商英文名-->
            <iLabel :label="$t('SUPPLIER_GONGYINGSHANGYINGWENMING')"
                    slot="label"></iLabel>
            <iText>{{ detail.nameEn }}</iText>
          </iFormItem>
          <iFormItem prop="shortNameEn">
            <!--供应商简称（英）-->
            <iLabel :label="$t('SUPPLIER_GONGYINGSHANGJIANCHENGEN')"
                    slot="label"></iLabel>
            <iText>{{ detail.shortNameEn }}</iText>
          </iFormItem>
          <iFormItem prop="dunsCode">
            <iLabel label="DUNS"
                    slot="label"></iLabel>
            <div class="duns flex-align-center">
              <iText>{{ detail.dunsCode }}</iText>
              <!--            <span></span>
                          <iText></iText>
                          <span></span>
                          <iText></iText>-->
            </div>
          </iFormItem>
          <iFormItem prop="sapCode">
            <!--SAP号-->
            <iLabel :label="$t('SUPPLIER_SAPHAO')"
                    slot="label"></iLabel>
            <iText>{{ detail.sapCode }}</iText>
          </iFormItem>
          <iFormItem prop="svwTempCode">
            <!--临时号-->
            <iLabel :label="$t('SUPPLIER_LINGSHIHAO')"
                    slot="label"></iLabel>
            <iText>{{ detail.svwTempCode }}</iText>
          </iFormItem>
          <iFormItem prop="svwCode">
            <!--SVW号-->
            <iLabel :label="$t('SUPPLIER_SVWHAO')"
                    slot="label"></iLabel>
            <iText>{{ detail.svwCode }}</iText>
          </iFormItem>
          <iFormItem prop="">
            <!--VW号-->
            <iLabel :label="$t('SUPPLIER_VWHAO')"
                    slot="label"></iLabel>
            <iText></iText>
          </iFormItem>
        </iFormGroup>
      </iCard>
      <!--转正所需附件-->
      <iCard class="margin-top20">
        <div class="margin-bottom20">
          <span class="font18 font-weight">{{ $t('SUPPLIER_ZHUANZHENGSUOXUFUJIAN') }}</span>
          <div class="floatright"
              v-if="$route.query.showButton">
            <i-button :loading="approveLoading"
                      @click="handleSubmit(true)">{{ $t('LK_QUEREN') }}</i-button>
            <i-button :loading="rejectLoading"
                      @click="handleSubmit(false)">{{ $t('LK_TUIHUI') }}</i-button>
          </div>
        </div>
        <table-list :tableData="tableListData"
                    :tableTitle="tableTitle"
                    :tableLoading="tableLoading"
                    :index="true"
                    :selection="false"
                    :openPageGetRowData="true"
                    class="uploadTable">
          <template #templateName="scope">
            <span :class=" scope.row.fileId?['openLinkText', 'underline']:''"
                  @click="
                  handleFileDownload(scope.row)">
              {{ scope.row.templateName }}</span>
            <span class="required  margin-left5"
                  v-if="scope.row.required">*</span>
            <el-popover trigger="hover"
                        :content="scope.row.remark"
                        placement="top-start">
              <icon slot="reference"
                    symbol
                    name="iconxinxitishi"
                    class="exampleFileIconStyle margin-left5"
                    v-if="scope.row.remark" />
            </el-popover>
          </template>
        </table-list>
      </iCard>
    </div>

    <div v-else style="height: calc(100% - 2.7rem);">
      <rsList :src="pdfSrc"></rsList>
    </div>
    
    <attachment-dialog :detail="attachmentDetail"
                       :loading="attachmentLoading"
                       :showFooter="false"
                       v-model="attachmentDialog" />
  </iPage>
</template>

<script>
import { iPage, iButton, iCard, iFormGroup, iFormItem, iLabel, iText, icon } from 'rise'
import { getTaskDetails, handleTaskInfo } from '../../../api/supplier360/task'
import { generalPageMixins } from '@/views/generalPage/commonFunMixins'
import tableList from '@/components/commonTable'
import rsList from '@/components/pdf'
import { tableTitle } from './data'
import { downloadUdFile } from '@/api/file'
import attachmentDialog from '../../generalPage/relevantAttachments/components/attachmentDialog'
import { getAttachmentCommitment } from '@/api/register/relevantAttachments'

export default {
  mixins: [generalPageMixins],
  components: {
    iPage,
    iButton,
    iCard,
    iFormGroup,
    iFormItem,
    iLabel,
    iText,
    tableList,
    icon,
    attachmentDialog,
    rsList
  },
  created () {
    this.getTaskDetails()
  },
  data () {
    return {
      pdfSrc:"",
      jumpF:true,
      detail: {},
      loading: false,
      approveLoading: false,
      rejectLoading: false,
      tableListData: [],
      tableTitle: tableTitle,
      tableLoading: false,
      supplierToken: '',
      attachmentDialog: false,
      attachmentDetail: '',
      attachmentLoading: false,
      currentTemplateId: '',
      supplierId: "",
      rsType:false,
    }
  },
  methods: {
    rsChoise(){
      this.jumpF = false;
    },
    async getTaskDetails () {
      this.loading = true
      this.tableLoading = true
      try {
        const req = {
          id: this.$route.query.id,
        }
        const res = await getTaskDetails(req)
        this.detail = res.data ? res.data : {}

        if(this.detail.rsFileId){
          this.pdfSrc = process.env.VUE_APP_FILE_SERVER + "/fileud/getFileByFileId?fileId=" + this.detail.rsFileId
          // this.pdfSrc = "http://rise-nginx-internal.apps.vmocp-test.csvw.com/fileApi/fileud/getFileByFileId?fileId=" + this.detail.rsFileId
          this.rsType = true;
        }

        this.supplierToken = this.detail.token
        this.supplierId = this.detail.supplierId
        this.tableListData = res.data.informationList ? res.data.informationList : []
        this.loading = false
        this.tableLoading = false

      } catch {
        this.loading = false
        this.tableLoading = false
      }
    },
    async handleSubmit (type) {
      try {
        this.handleButtonLoading(type, true)
        const req = {
          id: this.$route.query.id,
          type,
        }
        const res = await handleTaskInfo(req)
        this.handleButtonLoading(type, false)
        this.resultMessage(res)
      } catch {
        this.handleButtonLoading(type, false)
      }
    },
    handleButtonLoading (type, status) {
      if (type) {
        this.approveLoading = status
      } else {
        this.rejectLoading = status
      }
    },
    onJump360 () {
      this.$router.push({
        path: '/view-suppliers',
        query: {
          current: 14,
          supplierType: 4,
          supplierToken: this.supplierToken,
          subSupplierId: this.supplierId
        },
      })
    },
    async handleFileDownload (row) {
      if (row.attachId && !row.isCommitment) {
        // const req = {
        //   applicationName: 'rise',
        //   fileList: [row.fileName]
        // }
        await downloadUdFile(row.fileId)
      } else if (row.isCommitment) {
        await this.handleViewAttachment(row)
      } else {
        return false
      }
    },
    async handleViewAttachment (row) {
      this.attachmentDetail = ''
      this.attachmentDialog = true
      this.attachmentLoading = true
      this.currentTemplateId = row.templateId
      const req = {
        id: this.currentTemplateId
      }
      const res = await getAttachmentCommitment(req)
      this.attachmentDetail = res.data.detail
      this.attachmentLoading = false
    },
  },
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

.openLinkText {
  color: $color-blue;
}

.underline {
  text-decoration: underline;
}

.icon {
  color: $color-blue;
}

.exampleFileIconStyle {
  font-size: 16px;
}

.required {
  font-size: 14px;
  color: red;
}

.uploadTable {
  ::v-deep .el-form-item {
    margin-top: 0;
    margin-bottom: 0;
  }
}

.djsc_title{
  width: 100%;
}
</style>
