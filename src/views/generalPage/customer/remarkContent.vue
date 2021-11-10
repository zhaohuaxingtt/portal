<template>
  <i-card v-loading="contentLoading">
    <div class="row1">
      <div class="left">
        <div class="label">{{$t('SUPPLIER_YEWUFAZHANJIHUA')}}：</div>
      </div>
      <i-button @click="saveAdditionalInfo" v-permission="SUPPLIER_NAMEOFCUSTOMERS_SAVE">{{$t('LK_BAOCUN')}}</i-button>
    </div>
    <i-input type="textarea" rows="4" resize="none" v-model="detail" class="margin-top30"  v-permission="SUPPLIER_NAMEOFCUSTOMERS_BUSINESSDEVELOPMENTPLAN"/>
    <div class="row2">
      <div class="label">{{$t('SUPPLIER_XIAOSHOUXINXIBEIZHU')}}：</div>
      <i-input type="textarea" rows="4" resize="none" v-model="remark" class="margin-top30" v-permission="SUPPLIER_NAMEOFCUSTOMERS_SALESINFORMATIONREMARKS"/>
    </div>
  </i-card>
</template>

<script>
import {iCard, iButton, iInput} from 'rise'
import {saveAdditionalInfo, getAdditionalInfo} from '../../../api/supplier360/supplierAdditional'
import {generalPageMixins} from '@/views/generalPage/commonFunMixins'

export default {
  mixins: [generalPageMixins],
  components: {
    iCard,
    iButton,
    iInput
  },
  data() {
    return {
      detail: '',
      remark: '',
      additionalType: 'business_development_plan,sale_info',
      contentLoading: false
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    async saveAdditionalInfo() {
      const req = {
        additionalType: this.additionalType,
        detail: this.detail,
        remark: this.remark
      }
      this.contentLoading = true
      try {
        const res = await saveAdditionalInfo(req)
        this.resultMessage(res, () => {
          this.getInfo()
        })
      } catch {
        this.contentLoading = false
      }
    },
    async getInfo() {
      const req = {
        additionalType: this.additionalType
      }
      this.contentLoading = true
      try {
        const res = await getAdditionalInfo(req)
        this.detail = res.data.detail
        this.remark = res.data.remark
        this.contentLoading = false
      } catch {
        this.contentLoading = false
      }
    }
  }
}
</script>

<style scoped lang="scss">
.label {
  font-size: 18px;
  font-weight: bold;
  line-height: 21px;
  color: #000000;
  white-space: nowrap;
}

.row1 {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left {
    display: flex;
    align-items: center;

    .value {
      width: 275px;
      height: 35px;
      margin-left: 63px;
    }
  }
}

.row2 {
  margin-top: 20px;

  .text-box {
    width: 100%;
    height: 100px;
    background: #F8F8FA;
    border-radius: 10px;
  }
}

</style>