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
        <el-form-item :label="'条款名称'">
          <iInput
            :placeholder="$t('LK_QINGSHURU')"
            v-model="form.name"
          ></iInput>
        </el-form-item>
        <!-- 是否个人条款  -->
        <el-form-item :label="'是否个人条款'">
          <iSelect
            :placeholder="$t('LK_QINGXUANZE')"
            v-model="form.isPersonalTerms"
            clearable
          >
            <el-option
              :value="item.value"
              :label="item.label"
              v-for="item of isPersonalTermsList"
              :key="item.value"
            ></el-option>
          </iSelect>
        </el-form-item>
        <!-- 供应商范围 -->
        <el-form-item :label="'供应商范围'">
          <iSelect
            :placeholder="$t('LK_QINGXUANZE')"
            v-model="form.supplierRange"
            clearable
          >
            <el-option
              :value="item.value"
              :label="item.label"
              v-for="item of supplierRangeList"
              :key="item.value"
            ></el-option>
          </iSelect>
        </el-form-item>
        <!-- 供应商身份  -->
        <el-form-item :label="'供应商身份'">
          <iSelect
            :placeholder="$t('LK_QINGXUANZE')"
            v-model="form.supplierIdentity"
            clearable
          >
            <el-option
              :value="item.value"
              :label="item.label"
              v-for="item of supplierIdentityList"
              :key="item.value"
            ></el-option>
          </iSelect>
        </el-form-item>
        <!-- 条款状态 -->
        <el-form-item :label="'条款状态'">
          <iSelect
            :placeholder="$t('LK_QINGXUANZE')"
            v-model="form.state"
            clearable
          >
            <el-option
              :value="item.value"
              :label="item.label"
              v-for="item of statusList"
              :key="item.value"
            ></el-option>
          </iSelect>
        </el-form-item>
      </el-row>

      <!--第二行-->
      <el-row style="margin-top: 1rem">
        <!-- 签署节点 -->
        <el-form-item :label="'签署节点'">
          <iSelect
            :placeholder="$t('LK_QINGXUANZE')"
            v-model="form.signNode"
            clearable
          >
            <el-option
              :value="item.id"
              :label="item.name"
              v-for="item of signNodeList"
              :key="item.id"
            ></el-option>
          </iSelect>
        </el-form-item>
        <!-- 条款负责人 -->
        <el-form-item :label="'条款负责人'">
          <iInput
            :placeholder="$t('LK_QINGSHURU')"
            v-model="form.chargeName"
          ></iInput>
        </el-form-item>
        <!-- 发布日期 -->
        <iDateRangePicker
          class="LastSearchOption"
          :startDateProps="form.publishDate"
          :endDateProps="form.publishDateEnd"
          @change-start="changeStart"
          @change-end="changeEnd"
          ref="iDateRangePicker"
          :label="$t('发布日期')"
        />
      </el-row>
    </el-form>
    <template v-slot:button>
      <iButton @click="getTableList">{{ "查询" }}</iButton>
      <iButton @click="handleSearchReset">{{ "重置" }}</iButton>
    </template>
  </iSearch>
</template>

<script>
import { iInput, iSelect, iButton, iSearch } from "rise";
import iDateRangePicker from "@/components/iDateRangePicker/index.vue";
import {
  statusList,
  isSignatureList,
  isPersonalTermsList,
  supplierRangeList,
  supplierIdentityList,
} from "./data";
import { getDictByCode } from "@/api/dictionary/index";

export default {
  components: {
    iInput,
    iSelect,
    iSearch,
    iButton,
    iDateRangePicker,
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
      // clauseTypeList: [],
      statusList,
      supplierRangeList,
      supplierIdentityList,
      signNodeList: [],
      isSignatureList,
      isPersonalTermsList,
      // supplierRange1: "",
      // supplierCheckList: [],
    };
  },
  mounted() {
    getDictByCode("SIGN_NODE").then((res) => {
      if (res && res.data !== null && res.data.length > 0) {
        this.signNodeList = res.data[0].subDictResultVo;
      }
    });
    // this.signNodeList = [
    //   {
    //     name: "注册",
    //     id: "01",
    //   },
    //   {
    //     name: "询价",
    //     id: "02",
    //   },
    //   {
    //     name: "定点",
    //     id: "03",
    //   },
    // ];
  },
  methods: {
    handleSearchReset() {
      this.form = {};
      setTimeout(() => {
        this.$refs.iDateRangePicker.initDate();
      }, 4);
      this.getTableList();
      // this.supplierRange1 = "";
      // this.supplierCheckList = [];
    },
    getTableList() {
      // this.form.supplierType = this.supplierRange1;
      this.$emit("getTableList", this.form);
    },
    changeStart(e) {
      this.form.publishDate = e
    },
    changeEnd(e) {
      this.form.publishDateEnd = e
    },
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
  },
};
</script>

<style lang="scss" scoped>
</style>
