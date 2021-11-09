<template>
  <!--导出财报-->
  <iDialog
      :title="$t('SPR_FRM_FRMGL_DCCB')"
      :visible.sync="value"
      width="381px"
      @close="clearDiolog"
      :close-on-click-modal="false"
  >
    <div class="content" v-loading="loading">
      <!-- 请选择起止时间-->
      <div class="row1">{{ $t('SPR_FRM_FRMGL_QXZQZSJ') }}</div>
      <div class="box">
        <iDatePicker
            value-format="yyyy"
            type="year"
            v-model="form.startTime"
            style="width: 150px"
            :picker-options="startTimePickerOptions"
        />
        <div>-</div>
        <iDatePicker
            value-format="yyyy"
            type="year"
            v-model="form.endTime"
            style="width: 150px"
            :picker-options="endTimePickerOptions"
        />
      </div>
      <div slot="footer" class="dialog-footer">
        <iButton @click="handleSubmit">{{ $t('LK_QUEREN') }}</iButton>
      </div>
    </div>
  </iDialog>
</template>

<script>
import {iDialog, iButton, iDatePicker, iMessage} from 'rise';
import resultMessageMixin from '@/mixins/resultMessageMixin';

export default {
  mixins: [resultMessageMixin],
  components: {
    iDialog,
    iButton,
    iDatePicker,
  },
  props: {
    value: {type: Boolean},
    loading: {type: Boolean, default: false},
  },
  data() {
    return {
      form: {
        startTime: null,
        endTime: null,
      },
      startTimePickerOptions: {
        disabledDate: time => {
          return time.getFullYear() > this.form.endTime - 1;
        },
      },
      endTimePickerOptions: {
        disabledDate: time => {
          return time.getFullYear() < Number(this.form.startTime) + 1;
        },
      },
    };
  },
  created() {
  },
  methods: {
    clearDiolog() {
      this.$emit('input', false);
    },
    handleSubmit() {
      if (typeof this.form.startTime !== 'string' && typeof this.form.endTime !== 'string') {
        return iMessage.warn(this.$t('SPR_FRM_FRMGL_BJQZYGSJ'));
      }
      let yearList = [];
      if (typeof this.form.startTime === 'string') {
        yearList.push(this.form.startTime);
      }
      if (typeof this.form.endTime === 'string') {
        yearList.push(this.form.endTime);
      }
      this.$emit('handleSubmit', yearList);
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

.box {
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
  align-content: center;
}

.dialog-footer {
  margin-top: 30px;
  display: flex;
  justify-content: flex-end;
}
</style>
