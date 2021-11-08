<template>
  <!--深入评级-->
  <iDialog
      :title="$t('SUPPLIER_SHENRUPINGJI')"
      :visible.sync="value"
      width="381px"
      @close="clearDiolog"
      :close-on-click-modal="false"
  >
    <div class="content" v-loading="loading">
      <!-- 选择深评原因-->
      <div class="row1">{{ $t('SPR_FRM_FRMGL_XZSPYY') }}</div>
      <iSelect
          v-model="form.deepCommentReasons"
          style="width: 320px"
          class="margin-bottom20 margin-top10"
          :placeholder="$t('LK_QINGXUANZE')"
      >
        <el-option :value="item.name" :label="item.name" v-for="item of reasonList" :key="item.name"></el-option>
      </iSelect>
      <iInput
          v-model="form.deepCommentOtherReasons"
          :placeholder="$t('SPR_FRM_FRMGL_QSRXXYY')"
          style="width: 320px"
      />
      <div slot="footer" class="dialog-footer">
        <iButton @click="handleSubmit">{{ $t('LK_QUEREN') }}</iButton>
      </div>
    </div>
  </iDialog>
</template>

<script>
import {iDialog, iSelect, iButton, iInput} from 'rise';
import {getDictByCode} from '../../../../api/dictionary';
import resultMessageMixin from '@/mixins/resultMessageMixin';

export default {
  mixins: [resultMessageMixin],
  components: {
    iDialog,
    iSelect,
    iButton,
    iInput,
  },
  props: {
    value: {type: Boolean},
    loading: {type: Boolean, default: false},
  },
  data() {
    return {
      form: {
        deepCommentReasons: '',
        deepCommentOtherReasons: '',
      },
      reasonList: [],
    };
  },
  created() {
    this.getReasonList();
  },
  methods: {
    clearDiolog() {
      this.$emit('input', false);
    },
    async getReasonList() {
      try {
        const res = await getDictByCode('DEEP_COMMENT_REASON');
        this.reasonList = res.data[0].subDictResultVo;
      } catch {
        this.reasonList = [];
      }
    },
    handleSubmit() {
      this.$emit('handleSubmit', this.form);
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
</style>
