<template>
  <iSearch @reset="handleSearchReset"
           @sure="getTableList"
           :icon="false">
    <el-form>
      <!--第一行-->
      <el-row class="margin-bottom20">
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
        <!--供应商状态-->
        <el-form-item :label="$t('GONGHUO1')">
          <iSelect :placeholder="$t('LK_QINGXUANZE')"
                   v-model="form.supplierStatus">
            <!--            <el-option value="" :label="$t('all')"></el-option>-->
            <el-option value="1"
                       label="正常"></el-option>
            <el-option value="0"
                       label="受控"></el-option>
          </iSelect>
        </el-form-item>
        <!--相关科室-->
        <el-form-item :label="$t('SPR_FRM_FRMGL_XGKS1')">
          <iSelect :placeholder="$t('LK_QINGXUANZE')"
                   v-model="form.responsibleDepartment">
            <!--            <el-option value="" :label="$t('all')"></el-option>-->
            <el-option :value="item.name"
                       :label="$i18n.locale === 'zh'  ? item.name : item.nameEn"
                       v-for="item of allSelectObject.RELEVANT_DEPT"
                       :key="item.name"></el-option>
          </iSelect>
        </el-form-item>
        <!--外评-->
        <el-form-item :label="$t('SPR_FRM_FRMGL_WP1')">
          <el-row gutter="5"
                  style="display: inline-block">
            <el-col :span="11">
              <iSelect :placeholder="$t('LK_QINGXUANZE')"
                       v-model="form.externalBegin">
                <!--                <el-option value="" :label="$t('all')"></el-option>-->
                <el-option :value="item.name"
                           :label="$i18n.locale === 'zh'  ? item.name : item.nameEn"
                           v-for="item of allSelectObject.ADJUSTED_RATING_LEVEL"
                           :key="item.name"></el-option>
              </iSelect>
            </el-col>
            <el-col :span="2">-</el-col>
            <el-col :span="11">
              <iSelect :placeholder="$t('LK_QINGXUANZE')"
                       v-model="form.externalEnd">
                <!--                <el-option value="" :label="$t('all')"></el-option>-->
                <el-option :value="item.name"
                           :label="$i18n.locale === 'zh'  ? item.name : item.nameEn"
                           v-for="item of allSelectObject.ADJUSTED_RATING_LEVEL"
                           :key="item.name"></el-option>
              </iSelect>
            </el-col>
          </el-row>
        </el-form-item>
      </el-row>

      <!--第二行-->
      <el-row class="margin-bottom20">
        <!--初步评级-->
        <el-form-item :label="$t('SUPPLIER_CHUBUPINGJI1')">
          <el-row gutter="5"
                  style="display: inline-block">
            <el-col :span="11">
              <iSelect :placeholder="$t('LK_QINGXUANZE')"
                       v-model="form.gradeBegin">
                <!--                <el-option value="" :label="$t('all')"></el-option>-->
                <el-option :value="item.name"
                           :label="$i18n.locale === 'zh'  ? item.name : item.nameEn"
                           v-for="item of allSelectObject.ADJUSTED_RATING_LEVEL"
                           :key="item.name"></el-option>
              </iSelect>
            </el-col>
            <el-col :span="2">-</el-col>
            <el-col :span="11">
              <iSelect :placeholder="$t('LK_QINGXUANZE')"
                       v-model="form.gradeEnd">
                <!--                <el-option value="" :label="$t('all')"></el-option>-->
                <el-option :value="item.name"
                           :label="$i18n.locale === 'zh'  ? item.name : item.nameEn"
                           v-for="item of allSelectObject.ADJUSTED_RATING_LEVEL"
                           :key="item.name"></el-option>
              </iSelect>
            </el-col>
          </el-row>
        </el-form-item>

        <!--初评时间起止-->
        <el-form-item :label="$t('SPR_FRM_FRMGL_CPSJQZ')">
          <iDatePicker value-format="yyyy-MM-dd"
                       type="daterange"
                       v-model="form.createTime" />
        </el-form-item>

        <!--是否连降两级-->
        <el-form-item :label="$t('SPR_FRM_CBPJ_SFLJLJ')">
          <iSelect :placeholder="$t('LK_QINGXUANZE')"
                   v-model="form.isLow">
            <!--            <el-option value="" :label="$t('all')"></el-option>-->
            <el-option :value="item.code"
                       :label="$i18n.locale === 'zh'  ? item.name : item.nameEn"
                       v-for="item of allSelectObject.TURE_FALSE"
                       :key="item.name"></el-option>
          </iSelect>
        </el-form-item>
        <!--有无加减分-->
        <el-form-item :label="$t('SPR_FRM_CBPJ_JJF')">
          <iSelect :placeholder="$t('LK_QINGXUANZE')"
                   v-model="form.isAddition">
            <!--            <el-option value="" :label="$t('all')"></el-option>-->
            <el-option value="1"
                       :label="$t('SPR_FRM_CBPJ_Y')"></el-option>
            <el-option value="0"
                       :label="$t('SPR_FRM_CBPJ_W')"></el-option>
          </iSelect>
        </el-form-item>
        <!--是否显示历史评级-->
        <el-form-item :label="$t('SPR_FRM_CBPJ_SFXSLSPJ')">
          <iSelect :placeholder="$t('LK_QINGXUANZE')"
                   v-model="form.isHistory">
            <!--            <el-option value="" :label="$t('all')"></el-option>-->
            <el-option :value="item.code"
                       :label="$i18n.locale === 'zh'  ? item.name : item.nameEn"
                       v-for="item of allSelectObject.TURE_FALSE"
                       :key="item.name"></el-option>
          </iSelect>
        </el-form-item>
      </el-row>
      <el-row class="margin-bottom20">
        <el-form-item :label="language('CHUPINGZHUANGTAI','初评状态')">
          <iSelect :placeholder="$t('LK_QINGXUANZE')"
                   v-model="form.preliminaryStatus">
            <!--            <el-option value="" :label="$t('all')"></el-option>-->
            <el-option :value="item.code"
                       :label="$i18n.locale === 'zh'  ? item.name : item.nameEn"
                       v-for="item of allSelectObject.RELIMINARY_STATUS_CODE"
                       :key="item.name"></el-option>
          </iSelect>
        </el-form-item>
      </el-row>
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
        supplierStatus: '',
        responsibleDepartment: '',
        externalBegin: '',
        externalEnd: '',
        gradeBegin: '',
        gradeEnd: '',
        createTime: '',
        isLow: '',
        isAddition: '',
        isHistory: '0',
        preliminaryStatus: ''
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
      const data = ['SUPPLIER_STATUS', 'RELEVANT_DEPT', 'ADJUSTED_RATING_LEVEL', 'TURE_FALSE', 'RELIMINARY_STATUS_CODE'];
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
