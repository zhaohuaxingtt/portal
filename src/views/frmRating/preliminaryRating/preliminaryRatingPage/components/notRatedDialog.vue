<template>
  <!--无法评级-->
  <iDialog
      :title="$t('SPR_FRM_XGYSPJ_WFPJ')"
      :visible.sync="value"
      width="878px"
      @close="clearDiolog"
      :close-on-click-modal="false"
  >
    <div slot="title">
      {{ $t('SPR_FRM_XGYSPJ_WFPJ') }}
      <span class="required">*</span>
    </div>
    <div class="content" v-loading="loading">
      <iInput
          type="textarea"
          rows="8"
          v-model="form.notEvaluatedReason"
          :placeholder="$t('SPR_FRM_CBPJ_QSRWFPJYY')"
      ></iInput>
      <div slot="footer" class="dialog-footer">
        <iButton @click="handleSubmit">{{ $t('LK_QUEREN') }}</iButton>
        <iButton @click="$emit('input',false)">{{ $t('LK_QUXIAO') }}</iButton>
      </div>
    </div>
  </iDialog>
</template>

<script>
import {iDialog, iInput, iButton, iMessage} from 'rise';

export default {
  components: {
    iDialog,
    iInput,
    iButton,
  },
  props: {
    value: {type: Boolean},
    loading: {type: Boolean, default: false},
  },
  data() {
    return {
      form: {
        notEvaluatedReason: ''
      },
    };
  },
  methods: {
    clearDiolog() {
      this.$emit('input', false);
    },
    handleSubmit() {
      if (typeof this.form.notEvaluatedReason === 'string' && this.form.notEvaluatedReason.length > 0) {
        this.$emit('handleSubmit', this.form);
      } else {
        return iMessage.warn(this.$t('SPR_FRM_CBPJ_WPJYYYTIPS'));
      }
    },
  },
  watch: {
    value() {
      this.form = {};
    },
  },
};
</script>

<style scoped lang="scss">
.content {
  padding-bottom: 20px;
}

.row1 {
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  color: #000000;
}

.dialog-footer {
  margin-top: 30px;
  display: flex;
  justify-content: flex-end;
}

.required {
  font-size: 14px;
  color: red;
}
</style>
