<!--
 * @Author: moxuan
 * @Date: 2021-03-17 17:24:15
-->
<template>
  <el-upload class="upload"
             :disabled="disabled"
             action="/fileApi/upload"
             :show-file-list="false"
             :data="{ applicationName: 'rise' }"
             name="multipartFile"
             with-credentials
             :http-request="myUpload"
             :accept="accept"
             ref="upload">
    <template v-if="!hideButton">
      <span v-if="showText"
            class="openLinkText cursor"
            :class="{'underline': showTextUnderLine}">{{
        $t(buttonText)
        }}</span>
      <iButton v-else
               :loading="uploadButtonLoading"
               :disabled="disabled">{{ $t(buttonText) }}</iButton>
    </template>
  </el-upload>
</template>
<script>
import { iButton } from 'rise';
import { uploadFileWithNoToken } from '@/api/file/upload';
import resultMessageMixin from '@/mixins/resultMessageMixin';

export default {
  mixins: [resultMessageMixin],
  components: {
    iButton,
  },
  props: {
    buttonText: { type: String, default: 'LK_SH   ANGCHUANFUJIAN' },
    repeatClick: Boolean,
    uploadButtonLoading: { type: Boolean, default: false },
    showText: { type: Boolean, default: false },
    showTextUnderLine: { type: Boolean, default: false },
    uploadByBusiness: { type: Boolean, default: false },
    hideButton: { type: Boolean, default: false },
    accept: { type: String, default: ".xlsx,.pdf,.docx" },
    disabled: { type: Boolean, default: false }
  },
  data () {
    return {};
  },
  methods: {
    async myUpload (content) {
      if (this.uploadByBusiness) {
        this.$emit('uploadedCallback', content);
      } else {
        const formData = new FormData();
        formData.append('file', content.file);
        formData.append('applicationName', 'rise');
        const res = await uploadFileWithNoToken(formData);
        const resData = res.data;
        resData.fileSize = content.file.size;
        if (res.result) {
          this.$emit('uploadedCallback', resData);
        } else {
          this.resultMessage(res);
        }
      }
    },
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

