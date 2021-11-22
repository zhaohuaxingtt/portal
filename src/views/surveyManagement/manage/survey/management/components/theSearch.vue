<template>
  <iSearch
    style="margin-top: 20px"
    @reset="handleSearchReset"
    @sure="getTableList"
    :icon="true"
  >
    <el-form>
      <!--第一行-->
      <el-row>
        <!--问卷名称-->
        <el-form-item :label="'问卷名称'">
          <iInput
            :placeholder="$t('LK_QINGSHURU')"
            onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"
            v-model="form.name"
          ></iInput>
        </el-form-item>
        <!--问卷类型-->
        <el-form-item :label="'问卷类型'">
          <iSelect :placeholder="$t('LK_QINGXUANZE')" v-model="form.type">
            <el-option
              :value="item.value"
              :label="item.label"
              v-for="item of surveyType"
              :key="item.value"
            ></el-option>
          </iSelect>
        </el-form-item>
        <!-- 问卷状态 -->
        <el-form-item :label="'问卷状态'">
          <iSelect :placeholder="$t('LK_QINGXUANZE')" v-model="form.state">
            <el-option
              :value="item.value"
              :label="item.label"
              v-for="item of surveyStatus"
              :key="item.value"
            ></el-option>
          </iSelect>
        </el-form-item>
        <!--问卷发起人-->
        <el-form-item :label="'问卷发起人'">
          <iInput
            :placeholder="$t('LK_QINGSHURU')"
            onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"
            v-model="form.initiator"
          ></iInput>
        </el-form-item>
      </el-row>
    </el-form>
  </iSearch>
</template>

<script>
import { iInput, iSelect } from "rise";
import { surveyType, surveyStatus } from "./data";
import iSearch from "@/components/iSearch/index.vue";

export default {
  components: {
    iSearch,
    iInput,
    iSelect,
  },
  data() {
    return {
      form: {
        name: "",
        initiator: "",
        type: "",
        state: "",
      },
      surveyType,
      surveyStatus,
    };
  },
  mounted() {},
  methods: {
    handleSearchReset() {
      this.form = {};
      this.getTableList();
},
    getTableList() {
      this.$emit("getTableList", this.form);
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .iSearch-content {
  justify-content: space-between;
}
</style>