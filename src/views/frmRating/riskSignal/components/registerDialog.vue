<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-18 09:48:38
 * @LastEditors: Please set LastEditors
 * @Descripttion: your project
-->
<template>
  <i-dialog :title="title"
            :visible.sync="value"
            width="90%"
            @close="clearDiolog">
    <div class="changeContent">
      <iFormGroup row="3"
                  :rules="supplierRegister"
                  :model="supplierRegisterForm"
                  ref="supplierRegisterForm">
        <iFormItem prop="supplierName">
          <iLabel label="供应商名称"
                  slot="label"
                  required></iLabel>
          <iInput maxlength="70"
                  placeholder="请输入供应商名称"
                  v-model="supplierRegisterForm.supplierName"></iInput>
        </iFormItem>
        <iFormItem prop="contactName">
          <iLabel label="供应商联系人姓名"
                  slot="label"
                  required></iLabel>
          <iInput :maxlength="$i18n.locale === 'zh' ? 10 : 20"
                  placeholder="请输入供应商联系人姓名"
                  v-model="supplierRegisterForm.contactName"></iInput>
        </iFormItem>
        <iFormItem prop="contactEmail">
          <iLabel label="供应商联系人邮箱"
                  slot="label"
                  required></iLabel>
          <iInput placeholder="请输入供应商联系人邮箱"
                  v-model="supplierRegisterForm.contactEmail"></iInput>
        </iFormItem>
      </iFormGroup>
    </div>
    <span slot="footer"
          class="dialog-footer">
      <iButton @click="clearDiolog">{{$t("LK_QUXIAO")}}</iButton>
      <iButton :loading='repeatClick'
               @click="saveInfos">{{$t('LK_QUEREN')}}</iButton>
    </span>
  </i-dialog>
</template>

<script>
import { iButton, iDialog, iFormGroup, iFormItem, iLabel, iInput } from 'rise'
import { supplierRegister } from "./data";
import { getInvitation } from "@/api/basic/basic";
import { invitation } from '@/api/supplierManagement/supplyMaintain/index.js'
import { generalPageMixins } from '@/views/generalPage/commonFunMixins'

export default {
  mixins: [generalPageMixins],
  components: {
    iDialog,
    iButton,
    iFormGroup,
    iFormItem,
    iLabel,
    iInput,
  },
  props: {
    title: { type: String, default: "N-tier供应商注册邀请" },
    value: { type: Boolean },
  },
  data () {
    return {
      repeatClick: false,
      supplierRegister: supplierRegister,
      supplierRegisterForm: {
        supplierName: "",
        contactName: "",
        contactEmail: "",
      },
    }
  },
  methods: {
    purchaseRulesValid () {
      return new Promise((resolve, reject) => {
        this.$refs.supplierRegisterForm.validate((valid) => {
          if (valid) {
            resolve(valid)
          } else {
            return false;
          }
        });
      })
    },
    // 验证是不是已经注册的用户
    saveInfos () {
      this.purchaseRulesValid().then(async (data) => {
        this.repeatClick = true
        const res = await invitation(this.supplierRegisterForm)
        this.resultMessage(res, () => {
          this.clearDiolog()
          this.$emit('getTableList')
          this.repeatClick = false
        }, () => {
          this.repeatClick = false
        })
      })
    },
    clearDiolog () {
      this.$emit("input", false);
    }
  }
}
</script>

<style scoped lang="scss">
.changeContent {
  padding: 0px 10px 20px 10px;
}
</style>