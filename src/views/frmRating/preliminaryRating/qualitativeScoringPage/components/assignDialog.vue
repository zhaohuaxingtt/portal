<template>
  <!--分派-->
  <iDialog
      :title="$t('SPR_FRM_CBPJ_FP')"
      :visible.sync="value"
      width="381px"
      @close="clearDiolog"
      :close-on-click-modal="false"
  >
    <div class="content" v-loading="loading">
      <!-- 请选择科/股-->
      <div class="row1">{{ $t('SPR_FRM_CBPJ_QXZKG') }}</div>
      <iSelect
          v-model="form.shareValue"
          style="width: 320px"
          class="margin-top10"
          :placeholder="$t('LK_QINGXUANZE')"
          value-key="existShareId"
      >
        <el-option
            v-for="item of selectList"
            :value="item"
            :label="item.existShareName"
            :key="item.existShareName"></el-option>
      </iSelect>
      <div slot="footer" class="dialog-footer">
        <iButton @click="handleSubmit">{{ $t('LK_QUEREN') }}</iButton>
      </div>
    </div>
  </iDialog>
</template>

<script>
import {iDialog, iSelect, iButton, iMessage} from 'rise';
import {getAssignSelectList} from '../../../../../api/frmRating/preliminaryRating/qualitativeScoringPage';

export default {
  components: {
    iDialog,
    iSelect,
    iButton,
  },
  props: {
    value: {type: Boolean},
    loading: {type: Boolean, default: false},
    selectOptionsList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    selectTableData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    initialId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      form: {
        shareValue: '',
      },
      selectList: [],
    };
  },
  methods: {
    clearDiolog() {
      this.$emit('input', false);
    },
    handleSubmit() {
      const shareValue = this.form.shareValue;
      if (!shareValue) {
        return iMessage.warn(this.$t('LK_QINGXUANZE'));
      }
      const req = {
        qualitativeScoreSectionName: shareValue.existShareName,
        qualitativeScoreSectionId: shareValue.existShareId,
        sectionChiefId: shareValue.existShareLeaderId,
      };
      this.$emit('handleSubmit', req);
    },
    async getAssignSelectList() {
      const req = {
        initialId: this.initialId
      }
      const res = await getAssignSelectList(req);
      this.selectList = res.data;
    },
  },
  watch: {
    value(val) {
      if (val) {
        this.getAssignSelectList();
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
