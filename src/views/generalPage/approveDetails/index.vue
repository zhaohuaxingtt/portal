<template>
  <div>
    <iCard class="margin-bottom20 clearFloat" tabCard collapse title="供应商信息">
      <iFormGroup row="3" ref="baseRulesForm">
        <iFormItem prop="nameZh">
          <iLabel label="供应商中文名" slot="label"></iLabel>
          <iText>{{ detail.nameZh }}</iText>
        </iFormItem>
        <iFormItem prop="shortNameZh">
          <iLabel label="供应商简称（中）" slot="label"></iLabel>
          <iText>{{ detail.shortNameZh }}</iText>
        </iFormItem>
        <iFormItem prop="socialcreditNo">
          <iLabel label="统一社会信用代码" slot="label"></iLabel>
          <iText>{{ detail.socialcreditNo }}</iText>
        </iFormItem>
        <iFormItem prop="nameEn">
          <iLabel label="供应商英文名" slot="label"></iLabel>
          <iText>{{ detail.nameEn }}</iText>
        </iFormItem>
        <iFormItem prop="shortNameEn">
          <iLabel label="供应商简称（英）" slot="label"></iLabel>
          <iText>{{ detail.shortNameEn }}</iText>
        </iFormItem>
        <iFormItem prop="dunsCode">
          <iLabel label="DUNS" slot="label"></iLabel>
          <div class="duns flex-align-center">
            <iText>{{ detail.dunsCode }}</iText>
            <!--            <span></span>
                        <iText></iText>
                        <span></span>
                        <iText></iText>-->
          </div>
        </iFormItem>
        <iFormItem prop="sapCode">
          <iLabel label="SAP号" slot="label"></iLabel>
          <iText>{{ detail.sapCode }}</iText>
        </iFormItem>
        <iFormItem prop="svwTempCode">
          <iLabel label="临时号" slot="label"></iLabel>
          <iText>{{ detail.svwTempCode }}</iText>
        </iFormItem>
        <iFormItem prop="svwCode">
          <iLabel label="SVW号" slot="label"></iLabel>
          <iText>{{ detail.svwCode }}</iText>
        </iFormItem>
        <iFormItem prop="vmCode">
          <iLabel label="VW号" slot="label"></iLabel>
          <iText></iText>
        </iFormItem>
      </iFormGroup>
    </iCard>
    <iCard>
      <table-list :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="tableLoading" />
    </iCard>
  </div>
</template>

<script>
import {  iCard, iFormGroup, iFormItem, iLabel, iText } from 'rise'
import { getApprove } from '../../../api/supplier360/approve'
import { generalPageMixins } from '@/views/generalPage/commonFunMixins'
import tableList from '@/components/commonTable'
import { TableTitle } from "./components/data";


export default {
  mixins: [generalPageMixins],
  components: {
    iCard,
    iFormGroup,
    iFormItem,
    iLabel,
    iText,
    tableList
  },
  created() {
    this.$store.dispatch('setValiCode', this.$route.query.supplierToken)
    this.getTaskDetails()
  },
  data() {
    return {
      detail: {},
      loading: false,
      tableListData: [],
      tableTitle: TableTitle,
      tableLoading: false,
      selectTableData: []
    }
  },
  methods: {
    async getTaskDetails() {
      this.loading = true
      try {
        const req = {
          id: this.$route.query.applyId
        }
        const res = await getApprove(req.id)
        this.detail = res.data
        this.tableListData = res.data.supplierMaterialDTOList
        this.loading = false
      } catch {
        this.loading = false
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