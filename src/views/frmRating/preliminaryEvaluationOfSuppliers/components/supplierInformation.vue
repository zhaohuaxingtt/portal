<!--
 * @Author: 舒杰
 * @Date: 2021-05-27 13:57:04
 * @LastEditTime: 2021-07-08 16:31:53
 * @LastEditors: 舒杰
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\frmRating\preliminaryEvaluationOfSuppliers\components\supplierInformation.vue
-->
<template>
  <iCard tabCard collapse :title="$t('SUPPLIER_GONGYINGSHANGXINXI')" v-loading="loading">
    <iFormGroup row="3">
      <iFormItem :prop="item.props" v-for="item of supplierInformationTitle" :key="item.name">
        <iLabel :label="$t(item.key)" slot="label"/>
        <iText>{{ detail[item.props] }}</iText>
      </iFormItem>
    </iFormGroup>
  </iCard>
</template>

<script>
import {iCard, iFormGroup, iFormItem, iLabel, iText} from 'rise';
import {supplierInformationTitle} from './data';
import {getMessageBase} from '../../../../api/frmRating/preliminaryEvaluationOfSuppliers';

export default {
  components: {
    iCard,
    iFormGroup,
    iFormItem,
    iLabel,
    iText,
  },
  data() {
    return {
      supplierInformationTitle,
      detail: {},
      loading: false,
    };
  },
  created() {
    this.getMessageBase();
  },
  methods: {
    async getMessageBase() {
      try {
        this.loading = true;
        const req = {
          id: this.$route.query.id,
        };
        const res = await getMessageBase(req);
        if (res.data !== null) {
          this.detail = res.data;
        }
        this.loading = false;
      } catch {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>

</style>
