<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-31 15:03:54
 * @LastEditors: zbin
 * @LastEditTime: 2021-06-16 14:52:34
 * @Descripttion: 调取外部评级
-->
<template>
  <iDialog
    :title="$t('SPR_FRM_XGYSPJ_DQWBPJ')"
    :visible.sync="value"
    width="381px"
    @close="clearDiolog"
  >
    <el-form :model="form" ref="formName">
      <el-form-item
        prop="externalType"
        :rules="[{ required: true, message: '请选择' }]"
        :label="$t('SPR_FRM_XGYSPJ_QXZSJLY')"
      >
        <iSelect v-model="form.externalType" :placeholder="language('请选择')">
          <el-option
            v-for="(items, index) in dataChannelList"
            :key="index"
            :value="items.code"
            :label="items.name"
          />
        </iSelect>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <iButton :loading="loading" @click="handleSubmit">{{ $t('LK_QUEREN') }}</iButton>
    </span>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iSelect } from 'rise'
import { dictByCode } from './data'
import { externalRating } from '@/api/register/financialData'
import { generalPageMixins } from '@/views/generalPage/commonFunMixins'

export default {
  mixins: [generalPageMixins],
  components: {
    iDialog,
    iButton,
    iSelect
  },
  props: {
    value: { type: Boolean }
  },
  data() {
    return {
      rules: [],
      form: {
        externalType: ''
      },
      dataChannelList: [],
      loading: false
    }
  },
  created() {
    this.getSelectList()
  },
  methods: {
    clearDiolog() {
      this.$emit('input', false)
    },
    handleSubmit() {
      if(!this.loading){
        this.loading = true
        this.$refs.formName.validate(async (valid) => {
          if (valid) {
            const { supplierId, subSupplierId } = this.$route.query
            const pms = {
              externalType: this.form.externalType,
              ratingSupplierId: supplierId || subSupplierId
            }
            const res = await externalRating(pms)
            this.loading = false
            this.resultMessage(
              res,
              () => {
                this.clearDiolog()
                this.$emit('refreshTable', '')
                this.$refs.formName.resetFields()
              },
              () => {}
            )
          }
        })
      }
    },
    async getSelectList() {
      const res = await dictByCode('externalDataChannel')
      this.dataChannelList = res
    }
  },
  watch: {
    value() {
      this.form = {}
    }
  }
}
</script>

<style scoped lang="scss"></style>
