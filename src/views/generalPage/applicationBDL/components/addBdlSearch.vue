<template>
  <div class="bdlSearch">
    <div class="item">
      <div class="label">{{$t('SUPPLIER_CAILIAOZUBIANHAO')}}</div>
      <iInput v-permission="SUPPLIER_ADDBDL_STUFFGATEGORYCATEGORYCODE" :placeholder="$t('LK_QINGSHURU')" v-model="form.categoryCode" class="inputStyle"></iInput>
    </div>
    <div class="item">
      <div class="label">{{$t('SUPPLIER_CAILIAOZUMINGCHENG')}}</div>
      <iInput v-permission="SUPPLIER_ADDBDL_STUFFGATEGORYCATEGORYNAME" :placeholder="$t('LK_QINGSHURU')" v-model="form.categoryName" class="inputStyle"></iInput>
    </div>
    <div class="item">
      <div class="label">{{$t('SUPPLIER_LINIEJIBIE')}}</div>
      <iInput v-permission="SUPPLIER_ADDBDL_LINIE_GROUP" :placeholder="$t('LK_QINGSHURU')" v-model="form.linieGroup" class="inputStyle"></iInput>
    </div>
    <div class="item">
      <div class="label">{{$t('SUPPLIER_CAILIAOZUGONGYIBIANHAO')}}</div>
      <iInput v-permission="SUPPLIER_ADDBDL_STUFFGATEGORYSTUFFCODE" :placeholder="$t('LK_QINGSHURU')" v-model="form.stuffCode" class="inputStyle"></iInput>
    </div>
    <div class="item">
      <div class="label">{{$t('SUPPLIER_CAILIAOZUGONGYINGZHONGWENMINGCHENG')}}</div>
      <iInput v-permission="SUPPLIER_ADDBDL_STUFFGATEGORYSTUFFNAMEZN" :placeholder="$t('LK_QINGSHURU')" v-model="form.stuffName" class="inputStyle"></iInput>
    </div>
    <i-button v-permission="SUPPLIER_ADDBDL_CONFIRM" class="buttonStyle" @click="handleSearch">{{$t('LK_INQUIRE')}}</i-button>
    <i-button v-permission="SUPPLIER_ADDBDL_RESET" class="buttonStyle" @click="handleSearchReset">{{$t('LK_ZHONGZHI')}}</i-button>
  </div>
</template>

<script>
import { iButton, iInput } from 'rise'

export default {
  components: {
    iButton,
    iInput
  },
  data() {
    return {
      form: {
        categoryCode: '',
        categoryName: '',
        linieGroup: '',
        stuffCode: '',
        stuffName: ''
      }
    }
  },
  methods: {
    handleSearchReset() {
      this.form = {
        categoryCode: '',
        categoryName: '',
        linieGroup: '',
        stuffCode: '',
        stuffName: ''
      }
      this.handleSearch()
    },
    handleSearch() {
      this.$emit('getTableList', this.form)
    }

  }
}
</script>

<style scoped lang="scss">
.bdlSearch {
  display: inline-flex;
  height: 110px;
  border-bottom: 1px solid #e3e3e3;
  margin-bottom: 30px;
  .item {
    margin-right: 68px;
    .label {
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      color: #000000;
      margin-bottom: 6px;
    }
    .inputStyle {
      width: 220px;
    }
  }
  .buttonStyle {
    margin-top: 28px;
    height: 35px;
  }
}
</style>