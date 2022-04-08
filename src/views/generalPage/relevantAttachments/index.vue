<!--
 * @Author: moxuan
 * @Date: 2021-04-13 17:30:36
 * @LastEditTime: 2022-04-08 15:14:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
-->
<template>
  <div>
    <base-info-card ref="baseInfoCard" />
    <updating-files class="margin-top20"
                    ref="updatingFiles" />
    <free-upload class="margin-top20"
                 ref="freeUpload" />
  </div>
</template>

<script>
import baseInfoCard from '@/views/generalPage/components/baseInfoCard'
import updatingFiles from './components/updatingFilesTable'
import freeUpload from './components/freeUploadTable'
import { generalPageMixins } from '@/views/generalPage/commonFunMixins'
import { supplierComplete } from "./components/data";
import { supplierDetail } from "@/api/register/baseInfo";

export default {
  mixins: [generalPageMixins],
  components: {
    baseInfoCard,
    updatingFiles,
    freeUpload,

  },
  data () {
    return {
      supplierComplete
    }
  },
  created () {
    this.supplierDetail()
  },
  computed: {

  },
  methods: {
    async saveInfos (step) {
      await Promise.all([
        this.$refs.updatingFiles.saveInfos(step),
        this.$refs.freeUpload.saveInfos(step)
      ])
    },
    async handleNextStep () {
      let flag = false
      const res = await Promise.all([
        this.$refs.updatingFiles.handleNextStep(),
        this.$refs.freeUpload.handleNextStep()
      ])
      flag = res[0] && res[1]
      return flag
    },
    // 调整详情数据
    reView (data) {
      for (let i in data) {
        if (data[i]) {
          for (let k in data[i]) {
            if (data[i][k] == null || k == 'createDate' || k == 'updateDate') {
              data[i][k] = ""
            }
            if (k == 'registeredCapital') {
              data[i][k] = data[i][k] + ""
            }
          }
        }
      }
      return data
    },
    supplierDetail () {
      supplierDetail(this.supplierType).then(res => {
        if (res.data) {
          //初始数据很多为null 需要重置为“” 不然会触发表单验证
          let baseInfo = this.reView(res.data)

          baseInfo.supplierInfoVo.isListing = baseInfo.supplierInfoVo.isListing.toString()
          if (baseInfo.gpSupplierInfoVO) this.supplierComplete.gpSupplierDTO = baseInfo
            .gpSupplierInfoVO
          if (baseInfo.ppSupplierInfoVo) {
            baseInfo.ppSupplierInfoVo.isSign = baseInfo.ppSupplierInfoVo.isSign ? '1' : '0'
            this.supplierComplete.ppSupplierDTO = baseInfo.ppSupplierInfoVo
          }
          if (baseInfo.settlementBankVo) {
            if (!baseInfo.settlementBankVo.bankTaxCode || baseInfo.settlementBankVo.bankTaxCode == '') {
              baseInfo.settlementBankVo.bankTaxCode = baseInfo.supplierInfoVo.socialcreditNo
            }
            this.supplierComplete.settlementBankDTO = baseInfo.settlementBankVo

          }
          if (baseInfo.supplierInfoVo) this.supplierComplete.supplierDTO = baseInfo.supplierInfoVo
          // 如果是查看修改 需要从不同的表获取 基础信息
          // if (baseInfo.gpSupplierInfoVO) {
          // 	baseInfo.supplierInfoVo.svwTempCode = baseInfo.gpSupplierInfoVO.svwTempCode
          // 	baseInfo.supplierInfoVo.vmCode = ""
          // } else {
          // 	baseInfo.supplierInfoVo.svwTempCode = baseInfo.ppSupplierInfoVo.svwTempCode
          // 	baseInfo.supplierInfoVo.svwCode = baseInfo.ppSupplierInfoVo.svwCode
          // 	baseInfo.supplierInfoVo.vmCode = baseInfo.ppSupplierInfoVo.vmCode
          // }
          this.$store.dispatch('setBaseInfo', this.supplierComplete)
          // vw号可以修改
          this.$refs.baseInfoCard.changeTitle()
          //如果有详情，则获取下拉框数据 回显
        }
      })
    },
  }
}
</script>

<style scoped>
</style>
