<template>
  <iPage>
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">
        {{ $t('SUPPLIER_QINGTONGYI') }}
        {{ $i18n.locale === 'zh' ? detail.nameZh : detail.nameEn }}
        {{ $t('SUPPLIER_GONGSITIJIAODEJIBENXINXIXIUGAISHENQING') }}
      </span>
      <div v-if="$route.query.showButton==='true'"
           class="floatright">
        <i-button :loading="approveLoading"
                  @click="handleTaskInfo(true)">{{ $t('SUPPLIER_PIZHUN') }}</i-button>
        <i-button :loading="rejectLoading"
                  @click="handleTaskInfo(false)">{{ $t('LK_JUJUE') }}</i-button>
      </div>
    </div>
    <!--供应商信息-->
    <iCard tabCard
           collapse
           :title="$t('SUPPLIER_GONGYINGSHANGXINXI')"
           v-loading="loading">
      <template slot="header-control">
        <!--        <iButton @click="onJump360">{{ $t('SUPPLIER_CHAKANGAIGONGYINGSHANGXINXI') }}</iButton>-->
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
    <!--修改详情-->
    <iCard class="margin-top20">
      <table-list :tableData="tableListData"
                  :tableTitle="tableTitle"
                  :tableLoading="tableLoading"
                  :index="true"
                  :selection="false" />
    </iCard>
    <!--修改详情-->
    <iCard class="margin-top20">

      <table-list :tableData="fileTableListData"
                  :openPageGetRowData="true"
                  :openPageProps="'templateName'"
                  @openPage="openPage"
                  :tableTitle="filTableTitle"
                  :tableLoading="tableLoading"
                  :index="true"
                  :selection="false" />
    </iCard>
  </iPage>
</template>

<script>
import { iPage, iButton, iCard, iFormGroup, iFormItem, iLabel, iText } from 'rise'
import { getTaskDetailsChangeInfo, handleTaskInfo } from '../../../api/supplier360/task'
import { generalPageMixins } from '@/views/generalPage/commonFunMixins'
import tableList from '@/components/commonTable'
import { tableTitle, filTableTitle } from "./data";
import { downloadUdFile } from '@/api/file'


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
    tableList
  },
  created () {
    this.getTaskDetailsChangeInfo()
  },
  data () {
    return {
      detail: {},
      loading: false,
      approveLoading: false,
      rejectLoading: false,
      tableListData: [],
      tableTitle: tableTitle,
      tableLoading: false,
      filTableTitle: filTableTitle,
      fileTableListData: [],
      supplierToken: ''
    }
  },
  methods: {
    async openPage (row) {
      console.log(row)
      // const req = {
      //   applicationName: 'rise',
      //   fileList: [row.fileName],
      // }
      await downloadUdFile(row.fileId)
    },
    async getTaskDetailsChangeInfo () {
      this.loading = true
      this.tableLoading = true
      try {
        const req = {
          id: this.$route.query.id
        }
        const res = await getTaskDetailsChangeInfo(req)
        this.loading = false
        this.tableLoading = false
        if (res.result) {
          this.detail = res.data ? res.data : {}
          this.supplierToken = this.detail.token
          this.tableListData = res.data.list ? res.data.list : []
          this.fileTableListData = res.data.informationList ? res.data.informationList : []
        }
      } catch {
        this.loading = false
        this.tableLoading = false
      }
    },
    async handleTaskInfo (type) {
      try {
        await this.handleButtonLoading(type, true)
        const req = {
          id: this.$route.query.id,
          type
        }
        const res = await handleTaskInfo(req)
        this.handleButtonLoading(type, false)
        this.resultMessage(res)
      } catch {
        this.handleButtonLoading(type, false)
      }
    },
    onJump360 () {
      this.$router.push({
        path: '/supplier/view-suppliers',
        query: {
          current: 14,
          supplierType: 4,
          supplierToken: this.supplierToken
        }
      })
    },
    handleButtonLoading (type, status) {
      if (type) {
        this.approveLoading = status
      } else {
        this.rejectLoading = status
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
.title {
  font-size: 2rem;
}
</style>
