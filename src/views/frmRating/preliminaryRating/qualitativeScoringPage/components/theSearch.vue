<template>
  <iSearch @reset="handleSearchReset"
           @sure="getTableList"
           :icon="false">
    <el-form>
      <!--SAP号-->
      <el-form-item :label="$t('SUPPLIER_SAPHAO')">
        <iInput :placeholder="$t('LK_QINGSHURU')"
                v-model="form.sapCode"></iInput>
      </el-form-item>
      <!--供应商名称-->
      <el-form-item :label="$t('LK_GONGYINGSHANGMINGCHENG1')">
        <iInput :placeholder="$t('LK_QINGSHURU')"
                v-model="form.keyWords"></iInput>
      </el-form-item>
      <!--状态-->
      <el-form-item :label="$t('LK_ZHUANGTAI')">
        <iSelect :placeholder="$t('LK_QINGXUANZE')"
                 v-model="form.qualitativeScoreStatus">
          <!--            <el-option value="" :label="$t('all')"></el-option>-->
          <el-option :value="item.name"
                     :label="$i18n.locale === 'zh'  ? item.name : item.nameEn"
                     v-for="item of allSelectObject.QUALITATIVE_GRADE_STATUS"
                     :key="item.name"></el-option>
        </iSelect>
      </el-form-item>
      <!--负责科室-->
      <el-form-item :label="language('FUZEKEGU','负责科股')">
        <iInput :placeholder="$t('LK_QINGSHURU')"
                v-model="form.sectionName"></iInput>
      </el-form-item>
      <!--发出时间起止-->
      <el-form-item :label="$t('SPR_FRM_FRMGL_FCSJQ')">
        <iDatePicker value-format="yyyy-MM-dd"
                     type="daterange"
                     v-model="form.createTime" />
      </el-form-item>

      <!--是否显示历史打分-->
      <el-form-item :label="$t('SPR_FRM_FRMGL_SFXSLSDF')">
        <iSelect :placeholder="$t('LK_QINGXUANZE')"
                 v-model="form.isHistory">
          <!--            <el-option value="" :label="$t('all')"></el-option>-->
          <el-option :value="item.code"
                     :label="$i18n.locale === 'zh'  ? item.name : item.nameEn"
                     v-for="item of allSelectObject.TURE_FALSE"
                     :key="item.name"></el-option>
        </iSelect>
      </el-form-item>

    </el-form>
  </iSearch>
</template>

<script>
import { iSearch, iInput, iSelect, iDatePicker } from 'rise';
import { selectDictByKeys } from '@/api/dictionary';

export default {
  components: {
    iSearch,
    iInput,
    iSelect,
    iDatePicker,
  },
  data () {
    return {
      form: {
        sapCode: '',
        keyWords: '',
        qualitativeScoreStatus: '',
        sectionName: '',
        isHistory: '0',
        createTime: '',
      },
      allSelectObject: {},
    };
  },
  created () {
    this.getAllSelectList();
  },
  methods: {
    handleSearchReset () {
      this.form = {};
      this.getTableList();
    },
    getTableList () {
      const form = this.form;
      if (Array.isArray(form.createTime)) {
        form.createBeginTime = form.createTime[0];
        form.createEndTime = form.createTime[1];
        delete form.createTime;
      }
      this.$emit('getTableList', form);
    },
    async getAllSelectList () {
      const data = ['QUALITATIVE_GRADE_STATUS', 'TURE_FALSE'];
      let req = 'keys=';
      req = req + data.join('&keys=');
      const res = await selectDictByKeys(req);
      this.allSelectObject = res.data;
    },
  },
};
</script>

<style scoped>
</style>
