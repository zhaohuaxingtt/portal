<template>
  <!--自动添加-->
  <iDialog
      :title="$t('SPR_FRM_FRMGL_ZDTJ')"
      :visible.sync="value"
      width="381px"
      @close="clearDiolog"
      :close-on-click-modal="false"
  >
    <div class="content" v-loading="loading">
      <!--      请设置查看“待确认初评清单”时间-->
      <div class="row1">{{ $t('SPR_FRM_FRMGL_ZDTJ_TIP1') }}</div>
      <iDatePicker
          value-format="yyyy-MM-dd"
          type="date"
          v-model="form.addTime"
          style="width: 321px;"
          class="margin-top10 margin-bottom20"
          :picker-options="{disabledDate(time) {return time.getTime() < Date.now()}}"
      />
      <!--      提示：请于选定日期后前往“待确认初评清单”查看-->
      <div class="row2">{{ $t('SPR_FRM_FRMGL_ZDTJ_TIP2') }}</div>
      <div slot="footer" class="dialog-footer">
        <iButton @click="handleSubmit">{{ $t('LK_QUEREN') }}</iButton>
      </div>
    </div>
  </iDialog>
</template>

<script>
import {iDialog, iDatePicker, iButton} from 'rise';

export default {
  components: {
    iDialog,
    iDatePicker,
    iButton,
  },
  props: {
    value: {type: Boolean},
    loading: {type: Boolean, default: false},
  },
  data() {
    return {
      form: {
        addTime: '',
      },
    };
  },
  methods: {
    clearDiolog() {
      this.$emit('input', false);
    },
    handleSubmit() {
      this.$emit('handleSubmit', this.form);
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

.row2 {
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  color: #999999;
}

.dialog-footer {
  margin-top: 30px;
  display: flex;
  justify-content: flex-end;
}
</style>
