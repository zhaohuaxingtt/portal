<template>
  <!--转派-->
  <iDialog
      :title="$t('LK_ZHUANPAI')"
      :visible.sync="value"
      width="381px"
      @close="clearDiolog"
      :close-on-click-modal="false"
  >
    <div class="content" v-loading="loading">
      <!--请选择转派对象-->
      <div class="row1">{{ $t('SPR_FRM_CBPJ_QXZZPDX') }}</div>
      <iSelect
          v-model="form.userIds"
          style="width: 320px"
          class="margin-top10"
          :placeholder="$t('LK_QINGXUANZE')"
      >
        <el-option :value="item.id" :label="item.nameZh" v-for="item of selectList"
                   :key="item.id"></el-option>
      </iSelect>
      <div slot="footer" class="dialog-footer">
        <iButton @click="handleSubmit">{{ $t('LK_QUEREN') }}</iButton>
      </div>
    </div>
  </iDialog>
</template>

<script>
import {iDialog, iSelect, iButton, iMessage} from 'rise';
import {getPurchaseUsers} from '../../../../../api/usercenter';

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
  },
  data() {
    return {
      form: {
        userIds: '',
      },
      selectList: [],
    };
  },
  methods: {
    clearDiolog() {
      this.$emit('input', false);
    },
    handleSubmit() {
      if (!this.form.userIds) {
        return iMessage.warn(this.$t('LK_QINGXUANZE'));
      }
      const params = {
        userIds: [this.form.userIds],
      };
      this.$emit('handleSubmit', params);
    },
    async getAssignSelectList() {
      const req = {
        userId: this.$store.state.permission.userInfo.id,
      };
      const res = await getPurchaseUsers(req);
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
