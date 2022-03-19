<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-21 10:18:28
 * @LastEditors: Please set LastEditors
 * @Descripttion: your project
-->
<template>
  <i-search @reset="handleSearchReset"
            @sure="getTableList"
            :icon="true">
    <el-form>
      <el-form-item :label="$t('LK_GONGYINGSHANGMINGCHENG1')">
        <iInput :placeholder="$t('LK_QINGSHURU')"
                v-model="form.nameZh"></iInput>
      </el-form-item>
      <el-form-item :label="$t('UnifySocialCreditCode')">
        <iInput :placeholder="$t('LK_QINGSHURU')"
                v-model="form.socialcreditNo"></iInput>
      </el-form-item>
      <el-form-item label="DUNS">
        <iInput :placeholder="$t('LK_QINGSHURU')"
                v-model="form.dunsCode"></iInput>
      </el-form-item>
      <el-form-item :label="$t('SPR_FRM_XGYSPJ_CGKS')">
        <iSelect :placeholder="$t('LK_QINGXUANZE')"
                 v-model="form.buyerDeptId">
          <el-option :value="item.id"
                     :label="item.nameZh"
                     v-for="item of formGoup.deptList"
                     :key="item.id"></el-option>
        </iSelect>
      </el-form-item>
      <el-form-item :label="$t('SPR_FRM_XGYSPJ_PJJG')">
        <iSelect :placeholder="$t('LK_QINGXUANZE')"
                 v-model="form.ratingResult">
          <el-option :value="item.code"
                     :label="item.name"
                     v-for="item of formGoup.ratingResultList"
                     :key="item.fieldCode"></el-option>
        </iSelect>
      </el-form-item>
    </el-form>
  </i-search>
</template>

<script>
import { iSearch, iInput, iSelect } from "rise";
import { dictByCode } from "./data";
import { getDept } from "@/api/frmRating/newSupplierRating/newSupplierRating.js";
export default {
  components: {
    iSearch,
    iInput,
    iSelect,
  },
  data () {
    return {
      form: {
        nameZh: "",
        socialcreditNo: "",
        dunsCode: "",
        buyerDeptId: "",
        ratingResult: "",
      },
      formGoup: {
        ratingResultList: [],
        deptList: [],
      },
      fieldList: [],
    };
  },
  created () {
    this.handleDict();
    this.getDept();
  },
  methods: {
    async handleDict () {
      const res = await dictByCode("newSupplierRating");
      this.formGoup.ratingResultList = res;
    },
    handleSearchReset () {
      this.form = {
        nameZh: "",
        socialcreditNo: "",
        dunsCode: "",
        buyerDeptId: "",
        ratingResult: "",
      };
      this.getTableList();
    },
    getTableList () {
      this.$emit("getTableList", this.form);
    },
    async getDept () {
      const res = await getDept();
      this.formGoup.deptList = res.data;
    },
  },
};
</script>

<style scoped>
</style>
