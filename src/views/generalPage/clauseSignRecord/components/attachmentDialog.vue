<!--
 * @Author: your name
 * @Date: 2021-11-10 19:14:16
 * @LastEditTime: 2023-01-11 17:25:02
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \front-portal\src\views\generalPage\clauseSignRecord\components\attachmentDialog.vue
-->
<template>
  <i-dialog
    :title="title"
    :visible.sync="value"
    width="90%"
    @close="clearDiolog"
  >
    <div class="changeContent" v-loading="loading">
      <div v-html="termsText" ref="termsContent"></div>
    </div>
    <span slot="footer" class="dialog-footer">
      <i-button @click="$emit('input', false)">{{ $t('LK_QUXIAO') }}</i-button>
      <i-button @click="handleSignature">{{ $t('SUPPLIER_QIANSHU') }}</i-button>
    </span>
  </i-dialog>
</template>

<script>
import { iDialog, iButton } from 'rise'
import { findById } from '@/api/terms/terms'

export default {
  components: {
    iDialog,
    iButton
  },
  props: {
    title: { type: String, default: '' },
    value: { type: Boolean },
    detail: { type: String, default: '' },
    loading: { type: Boolean, default: false },
    id: { type: String, default: '' }
  },
  data() {
    return {
      currentTemplateId: 0,
      termsText: '',
      info:{},
    }
  },
  watch: {
    id(val) {
      this.currentTemplateId = val
    }
  },
  created() {
    this.findById()
  },
  methods: {
    findById() {
      findById({ id: this.id }).then((res) => {
        this.info = res
        this.termsText = res.termsText || ''
      })
    },
    clearDiolog() {
      this.$emit('input', false)
    },
    handleSignature() {
      this.$emit('handleSignature', this.info)
    }
  },
  mounted() {}
}
</script>

<style scoped lang="scss">
.changeContent {
  padding: 0 10px 20px 10px;
}
</style>

