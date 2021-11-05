<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-18 09:48:38
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-05-27 11:44:38
 * @Descripttion: your project
-->
<template>
  <i-search @reset="handleSearchReset" @sure="getTableList" :icon="true">
    <el-form>
      <el-form-item label="数据渠道">
        <iSelect :placeholder="$t('LK_QINGXUANZE')" v-model="form.dataChannel">
          <el-option
            :value="item.code"
            :label="item.name"
            v-for="(item, index) in dataChannel"
            :key="index"
          ></el-option>
        </iSelect>
      </el-form-item>
      <el-form-item label="年份">
        <el-date-picker
          v-model="form.year"
          type="year"
          value-format="yyyy"
          :placeholder="$t('LK_QINGXUANZE')"
        >
        </el-date-picker>
      </el-form-item>
    </el-form>
  </i-search>
</template>

<script>
import { iSearch, iSelect } from "rise";
import { generalPageMixins } from "@/views/generalPage/commonFunMixins";
import { dictByCode } from "./data";
export default {
  mixins: [generalPageMixins],
  components: {
    iSearch,
    iSelect
  },
  data() {
    return {
      form: {
        dataChannel: "",
        year: ""
      },
      dataChannel: []
    };
  },
  created() {
    this.getTableList();
    this.getDictByCode();
  },
  methods: {
    async getDictByCode() {
      this.dataChannel = await dictByCode("dataChannel");
    },
    handleSearchReset() {
      this.form = {
        dataChannel: "",
        year: ""
      };
      this.getTableList();
    },
    getTableList() {
      this.$emit("getTableList", this.form);
    }
  }
};
</script>

<style scoped lang="scss">
.changeContent {
  padding: 0px 10px 20px 10px;
}
</style>