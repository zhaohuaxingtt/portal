<template>
  <iPage>
    <!-- <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">
        {{ $t('SUPPLIER_SHIFOUTONGYIJIANG') }}
        {{ $i18n.locale === 'zh' ? detail.nameZh : detail.nameEn }}
        {{ $t('SUPPLIER_GONGSIZHUANEWIZHENGSHIGONGYINGSHANG') }}
      </span>
    </div> -->
    <!--供应商信息-->
    <iCard tabCard
           collapse
           :title="$t('SUPPLIER_GONGYINGSHANGXINXI')"
           v-loading="loading">
      <template slot="header-control">
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
    <updating-files class="margin-top20"
                  ref="updatingFiles"></updating-files>
    <freeFiles class="margin-top20"
                  ref="freeFiles">
    </freeFiles>
  </iPage>
</template>

<script>
import { iPage, iButton, iCard, iFormGroup, iFormItem, iLabel, iText, icon } from 'rise'
import { getTaskDetails, handleTaskInfo,gpAdminRegularAppro } from '@/api/supplier360/task'
import { generalPageMixins } from '@/views/generalPage/commonFunMixins'
import tableList from '@/components/commonTable'
import updatingFiles from '../relevantAttachments/components/updatingFilesTableNew'
import freeFiles from './freeFiles'
import { downloadUdFile } from '@/api/file'
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
    updatingFiles,
    freeFiles
  },
  created () {
    this.getTaskDetails()
  },
  data () {
    return {
      detail: {},
      loading: false,
      approveLoading: false,
      rejectLoading: false,
      tableListData: [],
      tableLoading: false,
      supplierToken: '',
      attachmentDetail: '',
      attachmentLoading: false,
      currentTemplateId: '',
    }
  },
  methods: {
    async getTaskDetails () {
      this.loading = true
      this.tableLoading = true
      try {
        const req = {
          id: this.$route.query.id,
        }
        const res = await getTaskDetails(req)
        this.detail = res.data ? res.data : {}
        this.supplierToken = this.detail.token
        this.$refs.freeFiles.getTableList(this.supplierToken)
        // console.log(this.supplierToken);
        this.$refs.updatingFiles.getTableList(this.supplierToken);
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
        const res = await gpAdminRegularAppro(req)
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
          current: 1,
          supplierType: 4,
          supplierToken: this.detail.token,
          subSupplierType:"GP",
          supplierId:this.detail.id,
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
</style>
