<template>
  <iSearch @reset="handleSearchReset"
           @sure="getTableList"
           :icon="false">
    <el-form>
      <!--第一行-->
      <el-row class="margin-bottom20">
        <!--供应商名称-->
        <el-form-item :label="$t('LK_GONGYINGSHANGMINGCHENG')">
          <iInput :placeholder="$t('LK_QINGSHURU')"
                  v-model="form.nameZh"></iInput>
        </el-form-item>
        <!--统一社会信用代码-->
        <el-form-item :label="$t('SUPPLIER_SHEHUITONGYIXINYONGDAIMA')">
          <iInput :placeholder="$t('LK_QINGSHURU')"
                  v-model="form.socialcreditNo"></iInput>
        </el-form-item>
        <!--SAP号-->
        <el-form-item :label="$t('SUPPLIER_SAPHAO')">
          <iInput :placeholder="$t('LK_QINGSHURU')"
                  v-model="form.sapCode"></iInput>
        </el-form-item>
        <!--企业类型-->
        <el-form-item :label="$t('EnterpriseType')">
          <iSelect :placeholder="$t('LK_QINGXUANZE')"
                   v-model="form.enterpriseType">
            <!--            <el-option value="" :label="$t('all')"></el-option>-->
            <el-option :value="item.name"
                       :label="$i18n.locale === 'zh'  ? item.name : item.nameEn"
                       v-for="item of allSelectObject.LEGALSTATUS"
                       :key="item.name"></el-option>
          </iSelect>
        </el-form-item>
        <!--相关科室-->
        <el-form-item :label="$t('SPR_FRM_FRMGL_XGKS')">
          <iSelect :placeholder="$t('LK_QINGXUANZE')"
                   v-model="form.takeChargeSection">
            <el-option value=""
                       :label="$t('all')"></el-option>
            <el-option :value="item.name"
                       :label="$i18n.locale === 'zh'  ? item.name : item.nameEn"
                       v-for="item of allSelectObject.RELEVANT_DEPT"
                       :key="item.name"></el-option>
          </iSelect>
        </el-form-item>
      </el-row>

      <!--第二行-->
      <el-row class="margin-bottom20">
        <!--供应商状态-->
        <el-form-item :label="$t('GONGHUO')">
          <iSelect :placeholder="$t('LK_QINGXUANZE')"
                   v-model="form.isActive">
            <!--            <el-option value="" :label="$t('all')"></el-option>-->
            <el-option value="1"
                       label="正常"></el-option>
            <el-option value="0"
                       label="受控"></el-option>
          </iSelect>
        </el-form-item>

        <!--定性打分状态-->
        <el-form-item :label="$t('SPR_FRM_FRMGL_DXDFZT')">
          <iSelect :placeholder="$t('LK_QINGXUANZE')"
                   v-model="form.qualitativeScoreStatus">
            <!--            <el-option value="" :label="$t('all')"></el-option>-->
            <el-option :value="item.name"
                       :label="$i18n.locale === 'zh'  ? item.name : item.nameEn"
                       v-for="item of allSelectObject.QUALITATIVE_GRADE_STATUS"
                       :key="item.name"></el-option>
          </iSelect>
        </el-form-item>

        <!--定性打分时间起止-->
        <el-form-item :label="$t('SPR_FRM_FRMGL_DXDFSJQZ')">
          <iDatePicker value-format="yyyy-MM-dd"
                       type="daterange"
                       v-model="form.qualitativeScoreDate" />
        </el-form-item>

        <!--初评结果-->
        <el-form-item :label="$t('SPR_FRM_FRMGL_CPJG')">
          <el-row gutter="5"
                  style="display: inline-block">
            <el-col :span="11">
              <iSelect :placeholder="$t('LK_QINGXUANZE')"
                       v-model="form.initialScoreBegin">
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
                       v-model="form.initialScoreEnd">
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
                       v-model="form.initialCreateDate" />
        </el-form-item>

      </el-row>

      <!--第三行-->
      <el-row>
        <!--外评-->
        <el-form-item :label="$t('SPR_FRM_FRMGL_WP')">
          <el-row gutter="5"
                  style="display: inline-block">
            <el-col :span="11">
              <iSelect :placeholder="$t('LK_QINGXUANZE')"
                       v-model="form.externalAccessScoreStart">
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
                       v-model="form.externalAccessScoreEnd">
                <!--                <el-option value="" :label="$t('all')"></el-option>-->
                <el-option :value="item.name"
                           :label="$i18n.locale === 'zh'  ? item.name : item.nameEn"
                           v-for="item of allSelectObject.ADJUSTED_RATING_LEVEL"
                           :key="item.name"></el-option>
              </iSelect>
            </el-col>
          </el-row>
        </el-form-item>

        <!--外评时间起止-->
        <el-form-item :label="$t('SPR_FRM_FRMGL_WPSJQZ')">
          <iDatePicker value-format="yyyy-MM-dd"
                       type="daterange"
                       v-model="form.externalAccessDate"
                       :picker-options="externalAccessDateBeginPickerOptions" />
        </el-form-item>

        <!--深评状态-->
        <el-form-item :label="$t('SPR_FRM_FRMGL_SPZT')">
          <iSelect :placeholder="$t('LK_QINGXUANZE')"
                   v-model="form.deepStatus">
            <!--            <el-option value="" :label="$t('all')"></el-option>-->
            <el-option :value="item.name"
                       :label="$i18n.locale === 'zh'  ? item.name : item.nameEn"
                       v-for="item of allSelectObject.DEEP_COMMENT_STATUS"
                       :key="item.name"></el-option>
          </iSelect>
        </el-form-item>

        <!--深评结果-->
        <el-form-item :label="$t('SPR_FRM_FRMGL_SPJG')">
          <iSelect :placeholder="$t('LK_QINGXUANZE')"
                   v-model="form.deepCommentResult">
            <!--            <el-option value="" :label="$t('all')"></el-option>-->
            <el-option :value="item.code"
                       :label="$i18n.locale === 'zh'  ? item.name : item.nameEn"
                       v-for="item of allSelectObject.TEST_RESULT"
                       :key="item.name"></el-option>
          </iSelect>
        </el-form-item>

        <!--深评时间起止-->
        <el-form-item :label="$t('SPR_FRM_FRMGL_SPSJQZ')">
          <iDatePicker value-format="yyyy-MM-dd"
                       type="daterange"
                       v-model="form.deepCreateDate" />
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
        nameZh: '',
        socialcreditNo: '',
        sapCode: '',
        enterpriseType: '',
        takeChargeSection: '',
        isActive: '',
        qualitativeScoreStatus: '',
        qualitativeScoreDate: '',
        qualitativeScoreDateEnd: '',
        initialScoreBegin: '',
        initialScoreEnd: '',
        initialCreateDate: '',
        initialCreateDateEnd: '',
        externalAccessScoreStart: '',
        externalAccessScoreEnd: '',
        externalAccessDate: '',
        externalAccessDateEnd: '',
        deepStatus: '',
        deepCommentResult: '',
        deepCreateDate: '',
        deepCreateDateEnd: '',
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
      if (Array.isArray(form.qualitativeScoreDate)) {
        form.qualitativeScoreDateBegin = form.qualitativeScoreDate[0];
        form.qualitativeScoreDateEnd = form.qualitativeScoreDate[1];
        delete form.qualitativeScoreDate;
      }
      if (Array.isArray(form.initialCreateDate)) {
        form.initialCreateDateBegin = form.initialCreateDate[0];
        form.initialCreateDateEnd = form.initialCreateDate[1];
        delete form.initialCreateDate;
      }
      if (Array.isArray(form.externalAccessDate)) {
        form.externalAccessDateBegin = form.externalAccessDate[0];
        form.externalAccessDateEnd = form.externalAccessDate[1];
        delete form.externalAccessDate;
      }
      if (Array.isArray(form.deepCreateDate)) {
        form.deepCreateDateBegin = form.deepCreateDate[0];
        form.deepCreateDateEnd = form.deepCreateDate[1];
        delete form.deepCreateDate;
      }
      this.$emit('getTableList', form);
    },
    async getAllSelectList () {
      const data = [
        'SUPPLIER_STATUS',
        'QUALITATIVE_GRADE_STATUS',
        'LEGALSTATUS',
        'RELEVANT_DEPT',
        'ADJUSTED_RATING_LEVEL',
        'TEST_RESULT',
        'DEEP_COMMENT_STATUS',
      ];
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
