<!--
* @author:shujie
* @Date: 2021-4-13 16:57:20
* @Description: 基础信息
 -->
<template>
  <div>
    <div class="margin-bottom20 clearFloat">
      <span v-if="$route.path==='/supplier/frmrating/newsupplierrating/rating1'"
            class="font18 font-weight">{{$t('SUPPLIER_XINGONGYINGSHANGPINGJI')}}</span>
      <div v-if="$route.path==='/supplier/frmrating/newsupplierrating/rating1'"
           class="floatright">
        <i-button @click="$emit('handleSumbit','无法评级')"
                  v-permission="PORTAL_SUPPLIER_NAV_XINGONGYINGSHANGPINGJI_INFOR_WUFAPINGJI">{{ $t('SPR_FRM_XGYSPJ_WFPJ') }}</i-button>
        <i-button @click="$emit('handleSumbit','提交计算')"
                  v-permission="PORTAL_SUPPLIER_NAV_XINGONGYINGSHANGPINGJI_INFOR_TIJIAOJISUAN">{{ $t('SPR_FRM_XGYSPJ_TJJS') }}</i-button>
        <i-button @click="$emit('handleSumbit','提交审批')"
                  v-permission="PORTAL_SUPPLIER_NAV_XINGONGYINGSHANGPINGJI_INFOR_TIJIAOSHENPI">{{ $t('SPR_FRM_XGYSPJ_TJSP') }}</i-button>
        <i-button @click="$emit('handleSumbit','保存')"
                  v-permission="PORTAL_SUPPLIER_NAV_XINGONGYINGSHANGPINGJI_INFOR_SAVE">{{ $t('LK_BAOCUN') }}</i-button>
        <i-button @click="handleBackProcurement">{{ $t('SPR_FRM_XGYSPJ_TJQQCG') }}</i-button>
      </div>
    </div>
    <iCard v-if="$route.path==='/supplier/frmrating/newsupplierrating/rating1'"
           class="margin-bottom20"
           tabCard
           collapse
           :title="$t('SUPPLIER_GONGYINGSHANGXINXI')">
      <template slot="header-control">

        <iButton @click="onJump360"
                 v-permission="PORTAL_SUPPLIER_NAV_XINGONGYINGSHANGPINGJI_INFOR_CKGGYSXX">{{ $t('SUPPLIER_CHAKANGAIGONGYINGSHANGXINXI') }}</iButton>
      </template>
      <iFormGroup row="3">
        <iFormItem v-for="(item,index) in supplierMessageTitle"
                   :key="index">
          <iLabel :label="$t(item.name) "
                  :required="item.required"
                  :icons="item.icons"
                  :tip="$t(item.tip)"
                  slot="label"
                  v-permission="item.permission"></iLabel>
          <div v-permission="item.permission"
               class="duns flex-align-center"
               v-if="item.name==='DUNS'">
            <iText>{{baseMsg['one']}}</iText>
            <span></span>
            <iText>{{baseMsg['tow']}}</iText>
            <span></span>
            <iText>{{baseMsg['three']}}</iText>
          </div>
          <div v-permission="item.permission"
               v-else>
            <iText>{{ baseMsg[item.key] }}</iText>
          </div>
        </iFormItem>
      </iFormGroup>
    </iCard>
    <iCard v-if="$route.path==='/supplier/frmrating/newsupplierrating/task'"
           class="margin-bottom20"
           tabCard
           collapse
           :title="$t('SUPPLIER_GONGYINGSHANGXINXI')">
      <template slot="header-control">
        <!-- <iButton @click="onJump360" v-permission="PORTAL_SUPPLIER_NAV_XINGONGYINGSHANGPINGJI_INFOR_CKGGYSXX">{{ $t('SUPPLIER_CHAKANGAIGONGYINGSHANGXINXI') }}</iButton> -->
      </template>
      <iFormGroup row="3">
        <iFormItem v-for="(item,index) in supplierMessageTitleSP"
                   :key="index">
          <iLabel :label="$t(item.name) "
                  :required="item.required"
                  :icons="item.icons"
                  :tip="$t(item.tip)"
                  slot="label"></iLabel>
          <div class="duns flex-align-center"
               v-if="item.name==='DUNS'">
            <iText>{{baseMsg['one']}}</iText>
            <span></span>
            <iText>{{baseMsg['tow']}}</iText>
            <span></span>
            <iText>{{baseMsg['three']}}</iText>
          </div>
          <div v-else>
            <iText>{{ baseMsg[item.key] }}</iText>
          </div>
        </iFormItem>
      </iFormGroup>
    </iCard>
    <!-- 供应商财务评级结果 -->
    <iCard v-if="$route.path==='/supplier/frmrating/newsupplierrating/task'"
           :title="$t('SPR_FRM_XGYSPJ_GYSCWPJJG')">
      <iFormGroup row="3">
        <iFormItem>
          <iLabel :label="$t('SPR_FRM_XGYSPJ_SFTGPG') "
                  slot="label"></iLabel>
          <iText>{{info.ratingResult}}</iText>
        </iFormItem>
      </iFormGroup>
    </iCard>
    <!-- 供应商财务评级结果-备注 -->
    <iCard v-if="$route.path==='/supplier/frmrating/newsupplierrating/task'"
           class="margin-top20"
           :title="$t('SPR_FRM_XGYSPJ_GYSCWPJJGBZ')">
      <iInput v-model="info.remark"
              type="textarea"
              rows="4"></iInput>
    </iCard>


    <iDialog
      :visible="goSullpierType"
      v-if="goSullpierType"
      width="30%"
      @close="close"
      :title="$t('QSRTHYY')"
      >
      <iInput style="margin-bottom:20px;" type="textarea" :rows="10" :placeholder="$t('QSRTHYY')" v-model="textarea" maxlength="300"></iInput>
      <div class="sullpierGo">
        <iButton @click="bingo">{{$t('LK_QUEREN')}}</iButton>
        <iButton @click="close">{{$t('MT_QUXIAO')}}</iButton>
      </div>
    </iDialog>
  </div>
</template>

<script>
import { iCard, iButton, iFormGroup, iFormItem, iText, iLabel, iInput,iDialog } from "rise";
import { supplierMessageTitle,supplierMessageTitleSP } from "../../components/data"
import { getNewSupplierInfo, backProcurement, getApprove } from "@/api/frmRating/newSupplierRating/newSupplierRating";
import { generalPageMixins } from '@/views/generalPage/commonFunMixins'

export default {
  mixins: [generalPageMixins],
  components: {
    iCard, iButton, iFormGroup, iFormItem, iLabel, iText, iInput,iDialog
  },
  data () {
    return {
      supplierMessageTitle,
      supplierMessageTitleSP,
      info: {
        ratingResult: this.$route.query.ratingResult || '',
        remark: ''
      },
      baseMsg: {},
      supplierToken: "",

      goSullpierType:false,
      textarea:"",
    }
  },
  computed: {
    baseMsg () {
      return this.$store.state.baseInfo.baseMsg
    }
  },
  created () {
    this.getInfo()
  },
  methods: {
    close(){
      this.goSullpierType = false;
      this.textarea = "";
    },
    async getInfo () {
      const pms = {
        ratingId: this.$route.query.ratingId || this.$route.query.id,
        ratingSupplierId: this.$route.query.supplierId,
      }
      const res = await getNewSupplierInfo(pms)
      this.baseMsg = res.data
      this.supplierToken = res.data.supplierToken
      this.$store.dispatch('setValiCode', res.data.supplierToken)
      this.$emit("requestBtn");

      // console.log(this.$route.query);
      var res1;
      if(this.$route.path !== "/supplier/frmrating/newsupplierrating/rating1"){
        res1 = await getApprove({ ratingId: this.$route.query.ratingId })
        if (res1.result) {
          this.info = res1.data
        }
      }

      if (!res.data || !res.data.dunsCode) {
        return false
      }
      res.data.dunsCode = res.data.dunsCode.replace(/-/g, '')
      this.baseMsg['one'] = res.data.dunsCode.slice(0, 2)
      this.baseMsg['tow'] = res.data.dunsCode.slice(2, 5)
      this.baseMsg['three'] = res.data.dunsCode.slice(5, 9)
    },
    onJump360 () {
      this.$router.push({
        path: '/view-suppliers',
        query: {
          current: 14,
          supplierType: 4,
          supplierToken: this.supplierToken,
          subSupplierId: this.$route.query.supplierId,
        }
      })
    },
    async bingo(){
      if(this.textarea){
        const pms = {
          ratingSupplierId: this.$route.query.supplierId || '',
          remark:this.textarea
        }
        const res = await backProcurement(pms)
        this.resultMessage(res, () => {
          this.$router.push({ path: '/supplier/frmrating/newsupplierrating' })
        })
      }else{
        iMessage.error(this.$t('QSRTHYY'))
      }
    },
    handleBackProcurement () {
      this.goSullpierType = true;
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
}
.duns {
  > span {
    display: inline-block;
    width: 18px;
    height: 1px;
    margin: 0 10px;
    background-color: $color-black;
  }
}
.sullpierGo{
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom:30px;
}
</style>
