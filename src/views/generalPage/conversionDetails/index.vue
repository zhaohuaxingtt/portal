<template>
  <iPage>
    <div class="margin-bottom20 clearFloat" >
<!--      <span class="font18 font-weight">是否同意{{ detail.nameZh }}的转正申请</span>-->
      <div class="floatright" v-if="$route.query.showButton">
        <i-button :loading="approveLoading" @click="handleTaskInfo(true)">{{ $t('SUPPLIER_PIZHUN') }}</i-button>
        <i-button :loading="rejectLoading" @click="handleTaskInfo(false)">{{ $t('LK_JUJUE') }}</i-button>
      </div>
    </div>
    <!--供应商信息-->
    <iCard tabCard collapse :title="$t('SUPPLIER_GONGYINGSHANGXINXI')" v-loading="loading">
      <iFormGroup row="3" inline ref="baseRulesForm">
        <iFormItem prop="nameZh">
          <!--供应商中文名-->
          <iLabel :label="$t('SUPPLIER_GONGYINGSHANGZHONGWENMING')" slot="label"></iLabel>
          <iText>{{ detail.nameZh }}</iText>
        </iFormItem>
        <iFormItem prop="shortNameZh">
          <!--供应商简称（中）-->
          <iLabel :label="$t('SUPPLIER_GONGYINGSHANGJIANCHENZH')" slot="label"></iLabel>
          <iText>{{ detail.shortNameZh }}</iText>
        </iFormItem>
        <iFormItem prop="socialcreditNo">
          <!--统一社会信用代码-->
          <iLabel :label="$t('SUPPLIER_TONGYISHEHUIXINGYONGDAIMA')" slot="label"></iLabel>
          <iText>{{ detail.socialcreditNo }}</iText>
        </iFormItem>
        <iFormItem prop="nameEn">
          <!--供应商英文名-->
          <iLabel :label="$t('SUPPLIER_GONGYINGSHANGYINGWENMING')" slot="label"></iLabel>
          <iText>{{ detail.nameEn }}</iText>
        </iFormItem>
        <iFormItem prop="shortNameEn">
          <!--供应商简称（英）-->
          <iLabel :label="$t('SUPPLIER_GONGYINGSHANGJIANCHENGEN')" slot="label"></iLabel>
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
          <!--SAP号-->
          <iLabel :label="$t('SUPPLIER_SAPHAO')" slot="label"></iLabel>
          <iText>{{ detail.sapCode }}</iText>
        </iFormItem>
        <iFormItem prop="svwTempCode">
          <!--临时号-->
          <iLabel :label="$t('SUPPLIER_LINGSHIHAO')" slot="label"></iLabel>
          <iText>{{ detail.svwTempCode }}</iText>
        </iFormItem>
        <iFormItem prop="svwCode">
          <!--SVW号-->
          <iLabel :label="$t('SUPPLIER_SVWHAO')" slot="label"></iLabel>
          <iText>{{ detail.svwCode }}</iText>
        </iFormItem>
        <iFormItem prop="">
          <!--VW号-->
          <iLabel :label="$t('SUPPLIER_VWHAO')" slot="label"></iLabel>
          <iText></iText>
        </iFormItem>
      </iFormGroup>
    </iCard>
  </iPage>
</template>

<script>
import {iPage, iButton, iCard, iFormGroup, iFormItem, iLabel, iText} from 'rise'
import {getTaskDetails, handleTaskInfo} from '../../../api/supplier360/task'
import {generalPageMixins} from '@/views/generalPage/commonFunMixins'


export default {
  mixins: [generalPageMixins],
  components: {
    iPage,
    iButton,
    iCard,
    iFormGroup,
    iFormItem,
    iLabel,
    iText
  },
  created() {
    this.getTaskDetails()
  },
  data() {
    return {
      detail: {},
      loading: false,
      approveLoading: false,
      rejectLoading: false
    }
  },
  methods: {
    async getTaskDetails() {
      this.loading = true
      try {
        const req = {
          id: this.$route.query.id
        }
        const res = await getTaskDetails(req)
        this.detail = res.data ? res.data : {}
        this.loading = false
      } catch {
        this.loading = false
      }
    },
    async handleTaskInfo(type) {
      try {
        this.handleButtonLoading(type, true)
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
    handleButtonLoading(type, status) {
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
</style>