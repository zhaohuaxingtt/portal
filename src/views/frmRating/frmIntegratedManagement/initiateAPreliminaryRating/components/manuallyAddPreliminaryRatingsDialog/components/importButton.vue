<!--
 * @Author: moxuan
 * @Date: 2021-05-29 17:24:15
-->
<template>
  <el-upload
      class="upload"
      action="/fileApi/upload"
      :show-file-list="false"
      :data="{ applicationName: 'rise' }"
      name="multipartFile"
      with-credentials
      :http-request="myUpload"
      accept=".xlsx"
  >
    <iButton :loading="loading">{{ $t(buttonText) }}</iButton>
  </el-upload>
</template>

<script>
import {iButton} from 'rise';

export default {
  components: {
    iButton,
  },
  props: {
    buttonText: {type: String, default: 'LK_SHANGCHUANFUJIAN'},
    repeatClick: Boolean,
    loading: {type: Boolean, default: false},
    showText: {type: Boolean, default: false},
    showTextUnderLine: {type: Boolean, default: false},
  },
  data() {
    return {};
  },
  methods: {
    async myUpload(content) {
      this.$emit('uploadedCallback', content);
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

