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
      <el-form-item :label="$t('SPR_FRM_XGYSPJ_SQSJ')">
        <iDatePicker
            style="width: 220px"
            v-model="valueSQ"
            @change="handleChangeSQ"
            type="daterange"
            :clearable="true"
            value-format="yyyy-MM-dd"
            :range-separator="$t('SUPPLIER_ZHI')"
            :start-placeholder="$t('MT_KAISHISHIJIAN')"
            :end-placeholder="$t('MT_JIEZHISHIJIAN')"
          >
          </iDatePicker>
      </el-form-item>
      <el-form-item :label="$t('SPR_FRM_XGYSPJ_PJSJ')">
        <iDatePicker
            style="width: 220px"
            v-model="valuePJ"
            @change="handleChangePJ"
            type="daterange"
            :clearable="true"
            value-format="yyyy-MM-dd"
            :range-separator="$t('SUPPLIER_ZHI')"
            :start-placeholder="$t('MT_KAISHISHIJIAN')"
            :end-placeholder="$t('MT_JIEZHISHIJIAN')"
          >
          </iDatePicker>
      </el-form-item>
      <el-form-item :label="$t('SPR_FRM_DEP_STATE')">
        <iSelect :placeholder="$t('LK_QINGXUANZE')"
                 v-model="form.newVendorRatingStatus">
          <el-option :value="item.code"
                     :label="item.name"
                     v-for="item of formGoup.ratingList"
                     :key="item.fieldCode"></el-option>
        </iSelect>
      </el-form-item>
    </el-form>
  </i-search>
</template>

<script>
import { iSearch, iInput, iSelect,iDatePicker } from "rise";
import { dictByCode } from "./data";

import { getDept,newSupplierRating } from "@/api/frmRating/newSupplierRating/newSupplierRating.js";
export default {
  components: {
    iSearch,
    iInput,
    iSelect,
    iDatePicker,
  },
  data () {
    return {
      form: {
        nameZh: "",
        socialcreditNo: "",
        dunsCode: "",
        buyerDeptId: "",
        ratingResult: "",
        newVendorRatingStatus:"",
      },
      formGoup: {
        ratingResultList: [],
        deptList: [],
        ratingList:[],
      },
      fieldList: [],

      valueSQ:"",
      valuePJ:"",
    };
  },
  created () {
    this.handleDict();
    this.getDept();
    this.newSupplierRating();
  },
  methods: {
    handleChangeSQ(e){
      console.log(e)
    },
    handleChangePJ(e){
      console.log(e)
    },
    async handleDict () {
      const res = await dictByCode("newSupplierRating");
      this.formGoup.ratingResultList = res;
    },
    newSupplierRating(){
      newSupplierRating("newVendorRatingStatus").then(res=>{
        if(res.result){
          this.formGoup.ratingList = res.data[0].subDictResultVo;
        }
      })
    },
    handleSearchReset () {
      this.form = {
        nameZh: "",
        socialcreditNo: "",
        dunsCode: "",
        buyerDeptId: "",
        ratingResult: "",
        newVendorRatingStatus:"",
      };
      this.valueSQ = ""
      this.valuePJ = ""
      this.getTableList();
    },
    getTableList () {
      var formSearchData = {
        ...this.form,
        dateStart:this.valueSQ?this.valueSQ[0]:"",
        dateEnd:this.valueSQ?this.valueSQ[1]:"",
        ratingDateStart:this.valuePJ?this.valuePJ[0]:"",
        ratingDateEnd:this.valuePJ?this.valuePJ[1]:"",
      }
      this.$emit("getTableList", formSearchData);
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
