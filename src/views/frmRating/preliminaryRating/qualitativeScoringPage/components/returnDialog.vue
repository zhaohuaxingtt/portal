<template>
  <!--退回-->
  <iDialog
      :title="$t('LK_TUIHUI')"
      :visible.sync="value"
      width="381px"
      @close="clearDiolog"
      :close-on-click-modal="false"
  >
    <div class="content">
      <!--请选择退回原因-->
      <div class="row1">{{ $t('SPR_FRM_CBPJ_QXZTHYY') }}</div>
      <iSelect
          v-model="form.returnReason"
          style="width: 320px"
          class="margin-top10"
          :placeholder="$t('LK_QINGXUANZE')"
      >
        <el-option :value="item.name"
                   :label="item.name"
                   v-for="item of returnReasonList"
                   :key="item.name"></el-option>
      </iSelect>
      <div slot="footer" class="dialog-footer">
        <iButton @click="handleSubmit">{{ $t('LK_QUEREN') }}</iButton>
      </div>
    </div>
  </iDialog>
</template>

<script>
import {iDialog, iSelect, iButton} from 'rise';
import {getDictByCode} from '@/api/dictionary';

export default {
  components: {
    iDialog,
    iSelect,
    iButton,
  },
  props: {
    value: {type: Boolean},
  },
  data() {
    return {
      form: {
        returnReason: '',
      },
      returnReasonList: [],
    };
  },
  methods: {
    clearDiolog() {
      this.$emit('input', false);
    },
    async getReturnReasonList() {
      const res = await getDictByCode('GRADE_BACK_REASON');
      this.returnReasonList = res.data[0].subDictResultVo;
    },
    handleSubmit() {
      this.$emit('handleSubmit', this.form);
    },
  },
  watch: {
    value(val) {
      if (val) {
        this.getReturnReasonList();
      }
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
</style>
