<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-18 09:48:38
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-05-27 11:43:58
 * @Descripttion: your project
-->
<template>
  <iCard
    v-permission="SUPPLIER_FINANCIALDATA_FINANCIALDATAREMARKS"
    title="财务数据备注："
    tabCard
  >
    <template slot="header-control">
      <iButton @click="saveInfo">{{ $t("LK_BAOCUN") }}</iButton>
    </template>
    <iInput v-model="remark" type="textarea" rows="4"></iInput>
  </iCard>
</template>

<script>
import { iCard, iButton, iInput } from "rise";
import {
  getAdditionalInfo,
  saveAdditionalInfo
} from "../../../../api/supplier360/supplierAdditional";
import { generalPageMixins } from "@/views/generalPage/commonFunMixins";

export default {
  mixins: [generalPageMixins],
  components: {
    iCard,
    iButton,
    iInput
  },
  data() {
    return {
      additionalType: "finanical_data",
      remark: "",
      contentLoading: false
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    async getInfo() {
      this.contentLoading = true;
      const pms = {
        additionalType: this.additionalType
      };
      const res = await getAdditionalInfo(pms);
      this.contentLoading = false;
      this.remark = res.data && res.data.remark;
    },
    async saveInfo() {
      const pms = {
        additionalType: this.additionalType,
        detail: this.remark
      };
      const res = await saveAdditionalInfo(pms);
      this.resultMessage(res, () => {
        this.getInfo();
      });
    }
  }
};
</script>

<style scoped>
</style>