<!--
 * @Author: YoHo
 * @Date: 2022-01-17 10:59:14
 * @LastEditTime: 2022-01-23 14:25:23
 * @LastEditors: YoHo
 * @Description: 上传其它采购条款
-->
<template>
  <el-upload class="upload"
             :disabled="disabled || uploadButtonLoading"
             action="/fileApi/upload"
             :show-file-list="false"
             :data="{ applicationName: 'rise' }"
             name="multipartFile"
             with-credentials
             :http-request="upload"
             v-bind="$attrs"
             :accept="accept"
             ref="upload">
      <iButton slot="trigger" @click="uploadCheck"
               :loading="uploadButtonLoading"
               :disabled="disabled">{{ $t(buttonText) }}</iButton>
  </el-upload>
</template>
<script>
import { iButton, iMessage } from 'rise';
import { termsUpload } from '@/api/frmRating/overView/overView.js'
export default {
  components: {
    iButton,
  },
  props: {
    buttonText: { type: String, default: 'LK_SHANGCHUANFUJIAN' },
    repeatClick: Boolean,
    uploadButtonLoading: { type: Boolean, default: false },
    showText: { type: Boolean, default: false },
    showTextUnderLine: { type: Boolean, default: false },
    uploadByBusiness: { type: Boolean, default: false },
    hideButton: { type: Boolean, default: false },
    accept: { type: String, default: ".xlsx,.pdf,.docx,.doc" },
    selectionArr: { type: Array, default:()=>[]},
    disabled: { type: Boolean, default: false },
    uploadCheck: { type: Function },
    upload: { type: Function },
    supplierId: { type: String || Number },
    userId: { type:  String || Number },
  },

};
</script>
<style lang='scss' scoped>
.upload {
  display: inline-block;
}

.openLinkText {
  color: $color-blue;
}

.underline {
  text-decoration: underline;
}
</style>

