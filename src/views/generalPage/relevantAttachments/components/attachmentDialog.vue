<!--
 * @Author: your name
 * @Date: 2021-11-09 15:26:24
 * @LastEditTime: 2022-02-09 19:51:42
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \front-portal\src\views\generalPage\relevantAttachments\components\attachmentDialog.vue
-->
<template>
  <i-dialog :title="title"
            :visible.sync="value"
            width="90%"
            @close="clearDiolog">
    <div class="changeContent"
         v-loading="loading">
      <div v-html="detail" class="termsContent"
           refs="termsContent"></div>
    </div>
    <template v-if="showFooter">
      <span slot="footer"
            class="dialog-footer">
        <i-button @click="$emit('input',false)">{{ $t("LK_QUXIAO") }}</i-button>
        <i-button @click="handleSignature"
                  :disabled="disableButton">{{$t('SUPPLIER_QIANSHU')}}</i-button>
      </span>
    </template>
  </i-dialog>
</template>

<script>
import { iDialog, iButton } from 'rise'

export default {
  components: {
    iDialog,
    iButton
  },
  props: {
    title: { type: String, default: "" },
    value: { type: Boolean },
    detail: { type: String, default: '' },
    loading: { type: Boolean, default: false },
    showFooter: { type: Boolean, default: true },
    disableButton: { type: Boolean, default: false }
  },
  methods: {
    clearDiolog () {
      this.$emit("input", false);
    },
    handleSignature () {
      var allInputs = document.querySelector(".termsContent").querySelectorAll("input");
      allInputs.forEach(inputEl => {
        if (inputEl.checked) {
          inputEl.setAttribute("checked",true);
        }
      })
      // console.log(document.querySelector(".termsContent").innerHTML.replace(/="true"/g, ""))

      this.$emit("handleSignature",  document.querySelector(".termsContent").innerHTML.replace(/="true"/g, "").replace(/\\/g, "").replace(/\s/g, "").replace(/\r/g, ""));
    }
  },
  mounted () {


  }
}
</script>

<style scoped lang="scss">
.changeContent {
  padding: 0 10px 20px 10px;
}
</style>
