<template>
  <iSearch @reset="handleSearchReset"
           @sure="getTableList">
    <el-form>
      <el-row class="margin-bottom20">
        <!--SAP号-->
        <el-form-item :label="$t('SUPPLIER_SAPHAO')">
          <iInput :placeholder="$t('LK_QINGSHURU')"
                  v-model="form.sap"></iInput>
        </el-form-item>
        <!--供应商名称-->
        <el-form-item :label="$t('SPR_FRM_DEP_SUPNAME')">
          <iInput :placeholder="$t('LK_QINGSHURU')"
                  v-model="form.name"></iInput>
        </el-form-item>
        <!--供应商状态-->
        <el-form-item :label="$t('SPR_FRM_DEP_STATE')">
          <iSelect :placeholder="$t('LK_QINGXUANZE')"
                   v-model="form.status">
            <el-option :value="item.name"
                       :label="item.name"
                       v-for="item in fromGroup.DEEP_COMMENT_STATUS"
                       :key="item.code"></el-option>
          </iSelect>
        </el-form-item>
        <!--集团打包-->
        <el-form-item :label="$t('SPR_FRM_DEP_GROUPPACK')">
          <iSelect :placeholder="$t('LK_QINGXUANZE')"
                   v-model="form.deepCommentSupplierId">
            <el-option :value="item.id"
                       :label="item.deepCommentSupplierName"
                       v-for="item in financialSuppleData"
                       :key="item.code"></el-option>
          </iSelect>
        </el-form-item>
        <!--相关科室-->
        <el-form-item :label="$t('SPR_FRM_DEP_REKADEP')">
          <iSelect :placeholder="$t('LK_QINGXUANZE')"
                   v-model="form.relevantDept">
            <el-option :value="item.name"
                       :label="item.name"
                       v-for="item in fromGroup.RELEVANT_DEPT"
                       :key="item.code"></el-option>
          </iSelect>
        </el-form-item>
      </el-row>
      <el-row class="margin-bottom20">
        <!--评级结果-->
        <el-form-item :label="language('SHENPINGJIEGUO','深评结果')">
          <iSelect :placeholder="$t('LK_QINGXUANZE')"
                   v-model="form.deepCommentResult">
            <el-option :value="item.code"
                       :label="item.name"
                       v-for="item in fromGroup.GRADE_RESULT"
                       :key="item.code"></el-option>
          </iSelect>
        </el-form-item>
        <!--评级时间-->
        <el-form-item :label="$t('SPR_FRM_XGYSPJ_PJSJ')">
          <iDatePicker value-format="yyyy-MM-dd"
                       type="daterange"
                       v-model="rating"
                       start-placeholder="开始日期"
                       end-placeholder="结束日期" />
        </el-form-item>
        <!--下次评级时间-->
        <el-form-item :label="$t('SPR_FRM_DEP_NEXTRATIME')">
          <iDatePicker value-format="yyyy-MM-dd"
                       type="daterange"
                       v-model="nextRating"
                       start-placeholder="开始日期"
                       end-placeholder="结束日期" />
        </el-form-item>
      </el-row>
    </el-form>
  </iSearch>
</template>

<script>
import { iSearch, iInput, iSelect, iDatePicker } from 'rise';
import { selectDictByKeys } from '@/api/dictionary';
export default {
  components: { iSearch, iInput, iSelect, iDatePicker },
  data () {
    return {
      form: {
        sap: "",
        name: "",
        status: "",
        deepCommentSupplierId: "",//集团打包
        deepCommentResult: "",
        relevantDept: "",
        nextRatingTimeStart: "",
        nextRatingTimeEnd: "",
        ratingTimeStart: "",
        ratingTimeEnd: "",
      },
      nextRating: [],
      rating: [],
      fieldList: [],
      fromGroup: {},//下拉框数据
    };
  },
  props: {
    financialSuppleData: {
      type: Array,
      default: () => []
    }
  },
  created () {
    this.getAllSelect()
  },
  methods: {
    handleSearchReset () {
      this.form = {};
      this.rating = [];
      this.nextRating = [];
      this.$emit('reset', this.form);
    },
    getTableList () {
      this.form.nextRatingTimeStart = this.nextRating[0]
      this.form.nextRatingTimeEnd = this.nextRating[1]
      this.form.ratingTimeStart = this.rating[0]
      this.form.ratingTimeEnd = this.rating[1]
      this.$emit('getTableList', this.form);
    },
    // 字段查询下拉框
    getAllSelect () {
      let data = ['DEEP_COMMENT_STATUS', 'RELEVANT_DEPT', 'GRADE_RESULT']
      let url = 'keys='
      url = url + data.join('&keys=')
      selectDictByKeys(url).then(res => {
        if (res.data) {
          this.fromGroup = res.data
        }
      })
    },
  },
};
</script>

<style scoped>
</style>
