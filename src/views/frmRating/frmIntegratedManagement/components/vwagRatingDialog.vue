<template>
  <!--VWAG评级-->
  <iDialog
      :title="$t('SPR_FRM_FRMGL_VWAGPJ')"
      :visible.sync="value"
      width="381px"
      @close="clearDiolog"
      :close-on-click-modal="false"
  >
    <div class="content">
      <!-- 请选择评级结果-->
      <div class="row1">{{ $t('SPR_FRM_FRMGL_QXZPJJG') }}</div>
      <iSelect
          v-model="form.vwagAssessResult"
          style="width: 320px"
          class="margin-top10"
          :placeholder="$t('LK_QINGXUANZE')"
      >
        <el-option :value="item.name" :label="item.name" v-for="item of selectList" :key="item.name">
          <icon symbol name="iconhongdeng" v-if="item.name === '红'"/>
          <icon symbol name="iconhuangdeng" v-else-if="item.name === '黄'"/>
          <icon symbol name="iconlvdeng" v-else-if="item.name === '绿'"/>
        </el-option>
      </iSelect>
      <div slot="footer" class="dialog-footer">
        <iButton @click="handleSubmit">{{ $t('LK_QUEREN') }}</iButton>
      </div>
    </div>
  </iDialog>
</template>

<script>
import {iDialog, iSelect, iButton, icon} from 'rise';
import {getDictByCode} from '../../../../api/dictionary';

export default {
  components: {
    iDialog,
    iSelect,
    iButton,
    icon,
  },
  props: {
    value: {type: Boolean},
  },
  data() {
    return {
      form: {
        vwagAssessResult: '',
      },
      selectList: [],
    };
  },
  created() {
    this.getSelectList();
  },
  methods: {
    clearDiolog() {
      this.$emit('input', false);
    },
    async getSelectList() {
      try {
        const res = await getDictByCode('vwag_rating_results');
        this.selectList = res.data[0].subDictResultVo;
      } catch {
        this.selectList = [];
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
