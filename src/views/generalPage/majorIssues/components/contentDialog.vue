<template>
  <i-dialog
      :title="title"
      :visible.sync="value"
      width="500px"
      @close="clearDiolog"
  >
    <div class="changeContent" v-loading="loading">
      <div>
        {{detail}}
      </div>
    </div>
<!--    <span slot="footer" class="dialog-footer">
          <i-button @click="$emit('input',false)">{{ $t("LK_QUXIAO") }}</i-button>
    </span>-->
  </i-dialog>
</template>

<script>
import {iDialog} from 'rise'

export default {
  components: {
    iDialog
  },
  props: {
    title: {type: String, default: ""},
    value: {type: Boolean},
    detail: {type: String, default: ''},
    loading: {type: Boolean, default: false}
  },
  methods: {
    clearDiolog() {
      this.$emit("input", false);
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
