<template>
  <!--供应商信息-->
    <iCard tabCard collapse :title="$t('SUPPLIER_GONGYINGSHANGXINXI')" v-loading="loading">
      <template slot="header-control">
        <iButton @click="onJump360">{{ $t('SUPPLIER_CHAKANGAIGONGYINGSHANGXINXI') }}</iButton>
      </template>
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
</template>

<script>
import { iCard,iFormGroup,iFormItem,iLabel,iText,iButton } from "rise";
import {getTaskDetails} from '@/api/supplier360/task'
export default {
    components:{
        iCard,
        iFormGroup,
        iFormItem,
        iLabel,
        iText,
        iButton
    },
    data(){
        return{
            detail:{},
            loading:false,
        }
    },
    created(){
        this.getTaskDetails()
    },
    methods:{
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

::v-deep .el-form{
    .row3{
        margin-right:6.25rem!important;
    }

    .row3:nth-child(3n){
        margin-right:0!important;
    }
}
</style>