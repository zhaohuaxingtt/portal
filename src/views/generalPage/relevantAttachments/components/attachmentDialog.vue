<template>
  <i-dialog
      :title="title"
      :visible.sync="value"
      width="90%"
      @close="clearDiolog"
  >
    <div class="changeContent" v-loading="loading">
      <div v-html="detail"></div>
    </div>
    <template v-if="showFooter">
       <span slot="footer" class="dialog-footer">
          <i-button @click="$emit('input',false)">{{ $t("LK_QUXIAO") }}</i-button>
          <i-button @click="handleSignature">{{$t('SUPPLIER_QIANSHU')}}</i-button>
    </span>
    </template>
  </i-dialog>
</template>

<script>
import {iDialog, iButton} from 'rise'

export default {
  components: {
    iDialog,
    iButton
  },
  props: {
    title: {type: String, default: ""},
    value: {type: Boolean},
    detail: {type: String, default: ''},
    loading: {type: Boolean, default: false},
    showFooter: {type: Boolean, default: true}
  },
  methods: {
    clearDiolog() {
      this.$emit("input", false);
    },
    handleSignature() {
      this.$emit("handleSignature");
    }
  }
}
</script>

<style scoped lang="scss">
.changeContent {
  padding: 0 10px 20px 10px;
}
</style>
\ No newline at end of file
