<template>
  <i-card v-loading="contentLoading">
    <div class="row1">
      <div class="left">
        <!--合作起始年份-->
        <div class="label margin-right20">{{$t('SUPPLIER_HEZUOQISHINIANFEN')}}：</div>
        <iDatePicker
            style="width: 350px;"
            value-format="yyyy-MM-dd"
            type="daterange"
            :range-separator="$t('SUPPLIER_ZHI')"
            :start-placeholder="$t('SUPPLIER_KAISHIRQI')"
            :end-placeholder="$t('SUPPLIER_JIESHURQI')"
            v-model="detail"
            v-permission="SUPPLIER_HISTORY_STARTYEAROFCOOPERATION"
        >
        </iDatePicker>
      </div>
      <i-button @click="saveAdditionalInfo" v-permission="SUPPLIER_HISTORY_STARTYEAROFCOOPERATION">{{$t('LK_BAOCUN')}}</i-button>
    </div>
    <div class="row2">
      <!--供货产品-->
      <div class="label">{{$t('SUPPLIER_GONGHUOCHANPIN')}}：</div>
      <i-input type="textarea" rows="4" resize="none" v-model="remark" class="margin-top30" v-permission="SUPPLIER_HISTORY_PRODUCTS"/>
      <!--        <div v-else class="text-box margin-top30"></div>-->
    </div>
  </i-card>
</template>

<script>
import {iButton, iCard, iInput,iDatePicker} from 'rise'
import {getAdditionalInfo, saveAdditionalInfo} from "../../../../api/supplier360/supplierAdditional";
import {generalPageMixins} from '@/views/generalPage/commonFunMixins'

export default {
  mixins: [generalPageMixins],
  components: {
    iCard,
    iButton,
    iInput,
    iDatePicker
  },
  data() {
    return {
      detail: '',
      remark: '',
      additionalType: 'start_cooperation_year,supply_product',
      contentLoading: false
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    async saveAdditionalInfo() {
      const date = this.detail !== null ? this.detail.join(',') : null
      const req = {
        additionalType: this.additionalType,
        detail: date,
        remark: this.remark
      }
      this.contentLoading = true
      try {
        const res = await saveAdditionalInfo(req)
        this.resultMessage(res, ()=>{
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
        this.detail = res.data.detail !== null ? res.data.detail.split(',') : null
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

::v-deep .el-date-editor .el-range-separator{
  line-height: 1.5rem;
}

</style>