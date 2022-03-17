<template>
  <iSearch
    class="margin-bottom20"
    style="margin-top: 20px"
    @reset="handleSearchReset"
    @sure="getTableList"
    :icon="true"
  >
    <el-form>
      <!--第一行-->
      <el-row>
        <!-- 条款名称 -->
        <el-form-item :label="$t('TM_TIAOKUANMINGCHENG')">
          <iInput v-model="form.name"></iInput>
        </el-form-item>
        <!-- 是否个人条款  -->
        <el-form-item :label="$t('TM_SHIFOUGERENTIAOKUAN')">
          <iSelect
            :placeholder="$t('TM_QUANBU')"
            v-model="form.isPersonalTerms"
            clearable
          >
            <el-option
              :value="item.value"
              :label="$t(item.i18n)"
              v-for="item of isPersonalTermsList"
              :key="item.value"
            ></el-option>
          </iSelect>
        </el-form-item>
        <!-- 供应商范围 -->
        <el-form-item :label="$t('TM_GONGYINGSHANGFANWEI')">
          <iSelect
            :placeholder="$t('TM_QUANBU')"
            v-model="form.supplierRange"
            clearable
            multiple
            collapse-tags
          >
            <el-option
              :value="item.value"
              :label="$t(item.i18n)"
              v-for="item of supplierRangeList"
              :key="item.value"
            ></el-option>
          </iSelect>
        </el-form-item>
        <!-- 供应商身份  -->
        <el-form-item :label="$t('TM_GONGYINGSHANGSHENFEN')">
          <iSelect
            :placeholder="$t('TM_QUANBU')"
            v-model="form.supplierIdentity"
            clearable
            multiple
            collapse-tags
          >
            <el-option
              :value="item.value"
              :label="$t(item.i18n)"
              v-for="item of supplierIdentityList"
              :key="item.value"
            ></el-option>
          </iSelect>
        </el-form-item>
        <!-- 条款状态 -->
        <el-form-item :label="$t('TM_TIAOKUANZHUANGTAI')">
          <iSelect
            :placeholder="$t('TM_QUANBU')"
            v-model="form.state"
            clearable
            multiple
            collapse-tags
          >
            <el-option
              :value="item.value"
              :label="$t(item.i18n)"
              v-for="item of statusList"
              :key="item.value"
            ></el-option>
          </iSelect>
        </el-form-item>
      </el-row>

      <!--第二行-->
      <el-row style="margin-top: 1rem">
        <!-- 签署节点 -->
        <el-form-item :label="$t('TM_QIANSHUJIEDIAN')">
          <iSelect
            :placeholder="$t('TM_QUANBU')"
            v-model="form.signNode"
            clearable
            multiple
            collapse-tags
          >
            <el-option
              :value="item.name"
              :label="item.describe"
              v-for="item of signNodeList"
              :key="item.name"
            ></el-option>
          </iSelect>
        </el-form-item>
        <!-- 条款负责人 -->
        <el-form-item :label="$t('TM_TIAOKUANFUZEREN')">
          <iInput v-model="form.chargeName"></iInput>
        </el-form-item>
        <!-- 发布日期 -->
        <!-- <iDateRangePicker
          class="LastSearchOption"
          :startDateProps="form.publishDate"
          :endDateProps="form.publishDateEnd"
          @change-start="changeStart"
          @change-end="changeEnd"
          ref="iDateRangePicker"
          :label="$t('发布日期')"
        /> -->
        <el-form-item :label="$t('TM_FABURIQI')" class="searchFormItem">
          <iDatePicker
            v-model="resolutionPassTime"
            @change="handleChangeDate"
            :start-placeholder="$t('TM_KAISHIRIQI')"
            :end-placeholder="$t('TM_JIESHURIQI')"
            type="daterange"
            :range-separator="$t('TM_ZHI')"
            style="width: 300px"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          >
          </iDatePicker>
        </el-form-item>
      </el-row>
    </el-form>
    <template v-slot:button>
      <iButton @click="getTableList">{{ $t('TM_CHAXUN') }}</iButton>
      <iButton @click="handleSearchReset">{{ $t('TM_CHONGZHI') }}</iButton>
    </template>
  </iSearch>
</template>

<script>
import { iInput, iSelect, iButton, iSearch, iDatePicker } from 'rise'
// import iDateRangePicker from "@/components/iDateRangePicker/index.vue";
import {
  statusList,
  isSignatureList,
  isPersonalTermsList,
  supplierRangeList,
  supplierIdentityList
} from './data'
import { getDictByCode } from '@/api/dictionary/index'

export default {
  components: {
    iInput,
    iSelect,
    iSearch,
    iButton,
    // iDateRangePicker,
    iDatePicker
  },
  data() {
    return {
      form: {
        // name: "",
        // isPersonalTerms: "",
        // supplierRange: "",
        // supplierIdentity: "",
        // state: "",
        // signNode: "",
        // chargeName: "",
        // publishDate: "",
        // publishDateEnd: "",
      },
      statusList,
      supplierRangeList,
      supplierIdentityList,
      signNodeList: [],
      isSignatureList,
      isPersonalTermsList,
      resolutionPassTime: []
    }
  },
  mounted() {
    getDictByCode('SIGN_NODE').then((res) => {
      if (res && res.data !== null && res.data.length > 0) {
        this.signNodeList = res.data[0].subDictResultVo
      }
    })
  },
  methods: {
    handleChangeDate(val) {
      this.form.publishDate = val ? val[0] : ''
      this.form.publishDateEnd = val ? val[1] : ''
    },
    handleSearchReset() {
      this.form = {}
      // setTimeout(() => {
      //   this.$refs.iDateRangePicker.initDate();
      // }, 4);
      this.resolutionPassTime = []
      this.getTableList()
    },
    getTableList() {
      this.$emit('getTableList', this.form)
    }
    // changeStart(e) {
    //   this.form.publishDate = e
    // },
    // changeEnd(e) {
    //   this.form.publishDateEnd = e
    // },
    // getAllSelectList() {
    //   let param = {
    //     pageSize: 1000,
    //     pageNum: 1,
    //   };
    //   getClauseList(param).then((res) => {
    //     // this.clauseTypeList = res.data;
    //     console.log(res);
    //   });
    // },
  }
}
</script>

<style lang="scss" scoped></style>
