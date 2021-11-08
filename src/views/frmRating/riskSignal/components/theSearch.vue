<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-21 10:18:28
 * @LastEditors: zbin
 * @Descripttion: your project
-->
<template>
  <i-search @reset="handleSearchReset" @sure="getTableList" :icon="true">
    <el-form>
      <el-form-item :label="$t('SPR_FRM_FXXH_FXGYS')">
        <iInput :placeholder="$t('LK_QINGSHURU')" v-model="form.tsPpSupplierName"></iInput>
      </el-form-item>
      <el-form-item :label="$t('LK_ZHUANGTAI')">
        <iSelect :placeholder="$t('LK_QINGXUANZE')" v-model="form.status">
          <el-option :value="item.code" :label="item.name" v-for="item of formGoup.statusList" :key="item.code"></el-option>
        </iSelect>
      </el-form-item>
      <el-form-item :label="$t('LK_FUZEREN')">
        <iSelect :multiple="false" remote reserve-keyword :remote-method="handlePrincipalName" :loading="principalNameLoading" filterable :placeholder="$t('LK_QINGXUANZE')" v-model="form.principalName">
          <el-option v-for="(item,index) in formGoup.principalNameList" :key="index" :label="item.nameZh" :value="item.id">
          </el-option>
        </iSelect>
      </el-form-item>
      <el-form-item :label="$t('SPR_FRM_FXXH_XHLY')">
        <iInput :placeholder="$t('LK_QINGSHURU')" v-model="form.signalFrom"></iInput>
      </el-form-item>
      <el-form-item :label="$t('SPR_FRM_FXXH_FKBM')">
        <iInput :placeholder="$t('LK_QINGSHURU')" v-model="form.relativeDept"></iInput>
      </el-form-item>
      <el-form-item :label="$t('SPR_FRM_FXXH_TJSJ')">
        <iDatePicker v-model="form.submitTime" :start-placeholder="$t('SUPPLIER_KAISHIRQI')" :end-placeholder="$t('SUPPLIER_JIESHURQI')" @change="handleSubmitTime" value-format="yyyy-MM-dd HH:mm:ss" type="daterange" />
      </el-form-item>
      <el-form-item :label="$t('SPR_FRM_FXXH_GHGX')">
        <iSelect :placeholder="$t('LK_QINGXUANZE')" v-model="form.supplyingRelationship">
          <el-option :value="item.code" :label="item.name" v-for="item of formGoup.supplyingRelationshipList" :key="item.fieldCode"></el-option>
        </iSelect>
      </el-form-item>
      <el-form-item :label="$t('SPR_FRM_FXXH_CZFS')">
        <iSelect :placeholder="$t('LK_QINGXUANZE')" v-model="form.processType">
          <el-option :value="item.code" :label="item.name" v-for="item of formGoup.processTypeList" :key="item.fieldCode"></el-option>
        </iSelect>
      </el-form-item>
      <el-form-item :label="$t('SPR_FRM_DEP_DEPRESULT')">
        <iSelect :placeholder="$t('LK_QINGXUANZE')" v-model="form.furtherRatingResult">
          <el-option :value="item.code" :label="item.name" v-for="item of formGoup.furtherRatingResultList" :key="item.code"></el-option>
        </iSelect>
      </el-form-item>
      <el-form-item :label="$t('SPR_FRM_FXXH_SFWY')">
        <iSelect :placeholder="$t('LK_QINGXUANZE')" v-model="form.isBreak">
          <el-option :value="item.code" :label="item.name" v-for="item of formGoup.isBreakList" :key="item.fieldCode"></el-option>
        </iSelect>
      </el-form-item>
      <el-form-item :label="$t('SPR_FRM_FXXH_FXXHDL')">
        <iSelect @change="handleRiskBigType" :placeholder="$t('LK_QINGXUANZE')" v-model="form.riskBigType">
          <el-option :value="item.code" :label="item.name" v-for="item of formGoup.riskBigTypeList" :key="item.fieldCode"></el-option>
        </iSelect>
      </el-form-item>
      <el-form-item :label="$t('SPR_FRM_FXXH_FXXHXL')">
        <iSelect :placeholder="$t('LK_QINGXUANZE')" v-model="form.riskSmallType">
          <el-option :value="item.code" :label="item.name" v-for="item of formGoup.riskSmallTypeList" :key="item.fieldCode"></el-option>
        </iSelect>
      </el-form-item>
      <el-form-item :label="$t('SPR_FRM_FXXH_YXQSJ')">
        <iDatePicker :placeholder="$t('LK_QINGXUANZE')" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" v-model="form.effectiveTime" />
      </el-form-item>
    </el-form>
  </i-search>
</template>

<script>
import { iSearch, iInput, iSelect, iDatePicker } from 'rise'
import { getPageListByParams } from "@/api/authorityMgmt/index.js";
import { dictByCode } from "./data";
export default {
  components: {
    iSearch,
    iInput,
    iSelect, iDatePicker
  },
  data() {
    return {
      form: {
        tsPpSupplierName: '',
        status: '',
        principalName: '',
        signalFrom: '',
        relativeDept: '',
        submitDateStart: '',
        submitDateEnd: '',
        supplyingRelationship: '',
        processType: '',
        furtherRatingResult: '',
        isBreak: '',
        riskBigType: '',
        riskSmallType: '',
        effectiveTime: '',
      },
      formGoup: {
        statusList: [],
        principalNameList: [],
        supplyingRelationshipList: [],
        processTypeList: [],
        furtherRatingResultList: [
          {
            name: '红灯',
            code: '红'
          },
          {
            name: '黄灯',
            code: '黄'
          },
          {
            name: '绿灯',
            code: '绿'
          },
          {
            name: '终止',
            code: '终止'
          },
        ],
        isBreakList: [
          {
            name: '是',
            code: true
          },
          {
            name: '否',
            code: false
          }
        ],
        riskBigTypeList: [],
        riskSmallTypeList: [],
      },
      fieldList: []
    }
  },
  created() {
    this.dictByCode()
  },
  methods: {
    async dictByCode() {
      const res1 = await dictByCode('RISK_SIGNAL_STATE')
      const res2 = await dictByCode('RISK_SIGNAL_SUPPLY_RELATIONSHIP')
      const res3 = await dictByCode('RISK_SIGNAL_DISPOSAL')
      const res6 = await dictByCode('RISK_SIGNAL_TYPE')
      this.formGoup.statusList = res1
      this.formGoup.supplyingRelationshipList = res2
      this.formGoup.processTypeList = res3
      this.formGoup.riskBigTypeList = res6
    },
    async handlePrincipalName(val) {
      const res = await getPageListByParams({ nameZh: val })
      this.formGoup.principalNameList = res.data
    },
    handleRiskBigType(e) {
      this.form.riskSmallType = ''
      this.formGoup.riskSmallTypeList = []
      this.formGoup.riskBigTypeList.forEach((item) => {
        if (item.code === e) {
          this.formGoup.riskSmallTypeList = item.subDictResultVo
        }
      })
    },
    handleSubmitTime(e) {
      this.form.submitDateStart = e[0]
      this.form.submitDateEnd = e[1]
    },
    handleSearchReset() {
      this.form = {
        tsPpSupplierName: '',
        status: '',
        principalName: '',
        signalFrom: '',
        relativeDept: '',
        submitDateStart: '',
        submitDateEnd: '',
        supplyingRelationship: '',
        processType: '',
        furtherRatingResult: '',
        isBreak: '',
        riskBigType: '',
        riskSmallType: '',
        effectiveTime: '',
        submitTime: []
      }
      this.getTableList()
    },
    getTableList() {
      this.$emit('getTableList', this.form)
    },
  }
}
</script>

<style scoped>
</style>
